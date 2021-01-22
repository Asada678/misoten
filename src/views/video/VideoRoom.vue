<template>
  <div class="video-room">
    <header class="video-room-header">
      <i
        class="fas fa-chevron-left prev"
        @click="$router.push({ name: 'Video' })"
      ></i>
      <h2>{{ roomInfo.roomName }}</h2>
      <i class="fas fa-bars"></i>
    </header>
    <div class="active-users">
      <transition-group tag="div" name="user-card" class="flex wrap">
        <m-user-card
          v-for="user in roomUsers"
          :key="user.id"
          :user="user"
          class="user-card-item"
        ></m-user-card>
      </transition-group>
    </div>
    <span v-if="isStreaming" class="streaming">配信中</span>
    <div class="flex">
      <m-button
        :disabled="!!localStream"
        class="w-50"
        icon="camera"
        @click="openUserMedia"
        >camera</m-button
      >
      <!-- <m-button
        v-if="isOwner"
        :disabled="!localStream || isStreaming"
        class="w-50 green"
        @click="startVideo"
        >start!</m-button
      > -->
      <m-button :disabled="!localStream" class="w-50 indigo" @click="joinRoom"
        >join!</m-button
      >
    </div>
    <m-button v-if="localStream" class="w-50 red" @click="stopVideo"
      >hang up</m-button
    >

    <video id="local-video" muted autoplay playsInline></video>

    <div class="remote-videos">
      <div v-for="id in peerConnectionIds" :key="id" class="remote-video">
        <p>{{ peerConnectionUserNames[id] }}</p>
        <video :id="id" autoplay playsInline></video>
      </div>
    </div>
  </div>
</template>

<script>
import { db, rd } from "@/firebase/firebase";
import firebase from "firebase";
import sleep from "@/libs/sleep";
export default {
  components: {},
  props: {},
  data() {
    return {
      joinRoomAt: new Date(),
      isOwner: false,
      isStreaming: false,
      roomRef: null,
      roomSnapshot: null,
      iceCandidatesCollection: null,
      roomInfo: {},
      roomUsers: [],
      localVideo: null,
      localStream: null,
      remoteStream: null,
      remoteStreams: [],
      peerConnection: null,
      peerConnections: {},
      peerConnectionIds: [],
      peerConnectionUserNames: {},
      configuration: {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
        sdpSemantics: "unified-plan",
        // iceCandidatePoolSize: 10,
      },
      userStatusDatabaseRef: null,
      userStatusFirestoreRef: null,
    };
  },
  computed: {},
  methods: {
    async openUserMedia() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log(
      //   "this.localVideo, this.localStream:",
      //   this.localVideo,
      //   this.localStream
      // );
      this.playVideo(this.localVideo, this.localStream);
      this.isStreaming = true;
    },
    isVideoAvailable(video, stream) {
      if (!video.srcObject) {
        return true;
      }
      return video.srcObject !== stream;
    },
    playVideo(video, stream) {
      if (video.srcObject === stream) {
        return;
      }
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    },
    cleanupVideo(video) {
      if (!video) {
        return;
      }
      video.pause();
    },
    stopVideo() {
      this.hangUpAll();
      this.cleanupVideo(this.localVideo);
      this.stopStream(this.localStream);
      this.localStream = null;
    },
    stopStream(stream) {
      if (!stream) {
        return;
      }
      stream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
    },
    createPeerConnection(fromUserId, isOffer) {
      if (this.peerConnections[fromUserId]) {
        console.log("peer connection already exists:");
        return;
      }
      this.peerConnectionIds.push(fromUserId);

      const peerConnection = new RTCPeerConnection(this.configuration);

      peerConnection.addEventListener("track", async (event) => {
        console.log("event:", event);
        const stream = event.streams[0];
        await this.$nextTick();
        await sleep(100);
        const video = document.querySelector(`#${fromUserId}`);
        // console.log("video:", video);
        if (this.isVideoAvailable(video, stream)) {
          // console.log("video is available, play video:");
          this.playVideo(video, stream);
        }
      });
      peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          this.sendIceCandidate(event.candidate);
        } else {
          console.log("empty ice event:");
        }
      });
      peerConnection.addEventListener("negotiationneeded", async () => {
        if (!isOffer) {
          console.log("not offer:");
          return;
        }

        if (peerConnection.remoteDescription !== null) {
          console.log("peerConnection has remoteDescription:");
          return;
        }

        try {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          this.sendSdp(peerConnection.localDescription);
        } catch (err) {
          console.log("err:", err);
        }
      });

      peerConnection.addEventListener("iceconnectionstatechange", () => {
        switch (peerConnection.iceConnectionState) {
          case "closed":
          case "failed":
            if (this.peerConnections[fromUserId]) {
              this.hangUp(fromUserId);
            }
            break;
          case "disconnected":
            break;
        }
      });

      if (this.localStream) {
        // console.log("track local stream:");
        this.localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, this.localStream);
        });
      } else {
        const snackbar = {
          text: "カメラをオンにしてください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
      }

      return peerConnection;
    },
    async makeOffer(fromUserId) {
      // console.log("make offer:");

      if (this.peerConnections[fromUserId]) {
        console.log("peer connection already exist:");
        return;
      }
      const peerConnection = this.createPeerConnection(fromUserId, false);
      this.peerConnections[fromUserId] = peerConnection;

      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        this.sendSdp(peerConnection.localDescription);
      } catch (err) {
        console.log("err:", err);
      }
    },
    async setOffer(fromUserId, offer) {
      // console.log("set offer:",);
      if (this.peerConnections[fromUserId]) {
        console.log("peerConnection already exists:");
      } else {
        this.peerConnections[fromUserId] = this.createPeerConnection(
          fromUserId,
          true
        );
      }

      try {
        await this.peerConnections[fromUserId].setRemoteDescription(offer);
        await this.makeAnswer(fromUserId);
      } catch (err) {
        console.log("err:", err);
      }
    },
    async makeAnswer(fromUserId) {
      // console.log("make answer:");
      if (!this.peerConnections[fromUserId]) {
        console.log("peerConneciton not exist:");
        return;
      }

      try {
        const answer = await this.peerConnections[fromUserId].createAnswer();
        // console.log("answer:", answer);
        await this.peerConnections[fromUserId].setLocalDescription(answer);
        this.sendSdp(this.peerConnections[fromUserId].localDescription);
      } catch (err) {
        console.log("err:", err);
      }
    },
    async setAnswer(fromUserId, answer) {
      // console.log("set answer:", answer);
      if (!this.peerConnections[fromUserId]) {
        console.log("peerConnection not exist:");
        return;
      }

      try {
        await this.peerConnections[fromUserId].setRemoteDescription(answer);
      } catch (err) {
        console.log("err:", err);
      }
    },
    sendIceCandidate(candidate) {
      // console.log("send ice candidate:");
      const message = {
        type: "candidate",
        ice: JSON.stringify(candidate),
      };
      this.pushMessage(message);
    },
    addIceCandidate(fromUserId, candidate) {
      // console.log("add ice candidate:");
      if (this.peerConnections[fromUserId]) {
        this.peerConnections[fromUserId].addIceCandidate(candidate);
      } else {
        console.log("peerConnection not exist:");
      }
    },
    async joinRoom() {
      this.callMe();
    },
    async hangUp(userId) {
      console.log("hang up:");
      if (!this.peerConnections[userId]) {
        console.log("not found:");
        return;
      }
      if (this.peerConnections[userId].iceConnectionState === "closed") {
        console.log("already closed:");
        return;
      }

      this.peerConnections[userId].close();
      delete this.peerConnections[userId];
      const video = document.querySelector(`#${userId}`);
      this.cleanupVideo(video);
      this.peerConnectionIds = this.peerConnectionIds.filter(
        (id) => id !== userId
      );
    },
    hangUpAll() {
      for (const id in this.peerConnections) {
        this.hangUp(id);
      }
      const message = {
        type: "close",
      };
      this.pushMessage(message);
    },
    async fetchRoomInfo() {
      await db
        .collection("rooms")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          // console.log('doc:', doc);
          // console.log('doc.data():', doc.data());
          this.roomInfo = doc.data();
        });
    },
    async fetchRoomUsers() {
      const roomId = this.$route.params.id;
      db.collection(`rooms/${roomId}/users/`)
        .where("state", "==", "online")
        .orderBy("lastChanged", "desc")
        // .collection("rooms")
        // .doc(this.$route.params.id)
        .onSnapshot((snapshot) => {
          // console.log('snapshot:', snapshot);
          snapshot.docChanges().forEach((change) => {
            // console.log("change.doc.data():", change.doc.data());
            // console.log("change.type:", change.type);
            const userRef = change.doc.data().userRef;
            // console.log("userRef:", userRef);
            // console.log("change.doc.data().state:", change.doc.data().state);
            const roomUser = {
              ...change.doc.data(),
              id: change.doc.id,
              userRef,
            };
            if (change.type === "added") {
              // console.log("user added:");
              // this.makeOffer(roomUser.id);
              this.roomUsers = [roomUser, ...this.roomUsers];
            }
            if (change.type === "modified") {
              // console.log("user modified:");
              this.roomUsers = this.roomUsers.map((user) => {
                if (user.id === change.doc.id) {
                  return roomUser;
                } else {
                  return user;
                }
              });
            }
            if (change.type === "removed") {
              // const index = this.roomUsers.map(u => u.id).indexOf(change.doc.id);
              // console.log('index:', index);
              // this.roomUsers.splice(index, 1);
              this.roomUsers = this.roomUsers.filter(
                (user) => user.id !== change.doc.id
              );
            }
            // console.log('this.roomUsers:', this.roomUsers);
          });
        });
    },
    sendUserStatusToDatabaseAndFirestore() {
      // console.log("rd:", rd);
      // console.log('rd.ServerValue:', rd.ServerValue);
      const uid = this.$store.getters.user.uid;
      const roomId = this.$route.params.id;
      this.userStatusDatabaseRef = rd.ref(`/rooms/${roomId}/users/${uid}`);
      this.userStatusFirestoreRef = db.doc(`/rooms/${roomId}/users/${uid}`);
      // console.log("this.userStatusDatabaseRef:", this.userStatusDatabaseRef);
      // console.log("this.userStatusFirestoreRef:", this.userStatusFirestoreRef);

      const isOfflineForDatabase = {
        state: "offline",
        lastChanged: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOfflineForFirestore = {
        state: "offline",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
        userRef: db.doc(`users/${this.$store.getters.user.uid}`),
      };
      const isOnlineForDatabase = {
        state: "online",
        lastChanged: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOnlineForFirestore = {
        state: "online",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
        userRef: db.doc(`users/${this.$store.getters.user.uid}`),
      };

      rd.ref(".info/connected").on("value", (snapshot) => {
        // console.log("snapshot:", snapshot);
        if (snapshot.val() == false) {
          this.userStatusFirestoreRef.set(isOfflineForFirestore);
          return;
        }
        this.userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            this.userStatusDatabaseRef.set(isOnlineForDatabase);
            this.userStatusFirestoreRef.set(isOnlineForFirestore, {
              merge: true,
            });
          });
      });
    },
    async listenToMessages() {
      // console.log("this.joinRoomAt:", this.joinRoomAt);
      await this.roomRef
        .collection("messages")
        .orderBy("createdAt")
        .startAt(this.joinRoomAt)
        // .where("crea", "==", this.$store.getters.user.uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const fromUserId = change.doc.data().fromUserId;
              const fromUserName = change.doc.data().fromUserName;
              const message = change.doc.data();
              // console.log("change.doc.data().type:", change.doc.data().type);
              // console.log("fromUserId:", fromUserId);
              // console.log("fromUserName:", fromUserName);
              // console.log('message:', message);

              if (fromUserId === this.$store.getters.user.uid) {
                // console.log("from user id equals to client:");
                return;
              }

              if (!this.peerConnectionUserNames[fromUserId]) {
                this.peerConnectionUserNames[fromUserId] = fromUserName;
              }
              // console.log(' this.peerConnectionUserNames[fromUserId]:',  this.peerConnectionUserNames[fromUserId]);
              switch (change.doc.data().type) {
                case "call me":
                  await this.makeOffer(fromUserId);
                  break;
                case "offer":
                  await this.setOffer(fromUserId, message);
                  break;
                case "answer":
                  await this.setAnswer(fromUserId, message);
                  break;
                case "candidate": {
                  // console.log("type : candidate:");
                  const ice = JSON.parse(message.ice);
                  const candidate = new RTCIceCandidate(ice);
                  this.addIceCandidate(fromUserId, candidate);
                  break;
                }
                case "close":
                  this.hangUp(fromUserId);
                  break;
                default:
                  console.log("message.type:", message.type);
                  break;
              }
            }
          });
        });
    },
    sendSdp(sessionDescription) {
      // console.log("sessionDescription:", sessionDescription);
      if (!sessionDescription) {
        console.log("sessionDescription is null or undefined:");
        return;
      }
      const message = {
        type: sessionDescription.type,
        sdp: sessionDescription.sdp,
      };
      this.pushMessage(message);
    },
    pushMessage(message) {
      if (!this.roomRef) {
        return;
      }
      message.fromUserId = this.$store.getters.user.uid
        ? this.$store.getters.user.uid
        : `guest-${this.joinRoomAt}`;
      message.fromUserName = this.$store.getters.user.username
        ? this.$store.getters.user.username
        : "guest";
      message.createdAt = new Date();
      // await this.roomRef.collection("messages").doc(`${message.type}-from${message.fromUserId}`).set(message);
      this.roomRef.collection("messages").add(message);
    },
    callMe() {
      const message = {
        type: "call me",
      };
      this.pushMessage(message);
    },
  },
  async created() {
    this.roomRef = await db.collection("rooms").doc(this.$route.params.id);
    // this.callMe();
    await this.listenToMessages();
    await this.sendUserStatusToDatabaseAndFirestore();
    await this.fetchRoomInfo();
    await this.fetchRoomUsers();
  },
  mounted() {
    this.localVideo = this.$el.querySelector("#local-video");
  },
  beforeDestroy() {
    console.log("before destroy:");
    const isOfflineForDatabase = {
      state: "offline",
      lastChanged: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOfflineForFirestore = {
      state: "offline",
      lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
      userRef: db.doc(`users/${this.$store.getters.user.uid}`),
    };
    this.userStatusDatabaseRef.set(isOfflineForDatabase);
    this.userStatusFirestoreRef.set(isOfflineForFirestore);
  },
};
</script>

<style lang="scss" scoped>
.flex.wrap {
  flex-wrap: wrap;
  // justify-content: space-evenly;
}
.video-room {
  position: relative;
  padding-bottom: 80vh;

  &-header {
    position: sticky;
    z-index: 100;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    background-color: $blue;
    color: $white;

    i {
      color: $white;
      font-size: 20px;
    }
  }
  .streaming {
    position: fixed;
    top: 100px;
    // left: 0;
    // right: 0;
    text-align: center;
    padding: 10px;
    background-color: rgba($color: $green, $alpha: 0.9);
    color: #fff;
    font-weight: 900;
  }

  #local-video {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 180px;
  }
  video {
    width: 50%;
    // min-width: 300px;
    // min-height: 200px;
  }
}

.user-card-item {
  transition: all 0.7s;
}
.user-card-leave-active {
  position: absolute !important;
}
.user-card-enter,
.user-card-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0);
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>