<template>
  <div class="m-video-room">
    <span v-if="isStreaming" class="streaming">配信中</span>
    <div class="flex">
      <m-button
        :disabled="localStream"
        class="w-50"
        icon="camera"
        @click="openUserMedia"
        >camera</m-button
      >
      <m-button
        v-if="isOwner"
        :disabled="!localStream || isStreaming"
        class="w-50 green"
        @click="startVideo"
        >start!</m-button
      >
      <m-button
        v-else
        :disabled="!localStream || isStreaming"
        class="w-50 indigo"
        @click="joinRoomById"
        >join!</m-button
      >
    </div>
    <m-button v-if="localStream" class="w-50 red" @click="hangUp"
      >hang up</m-button
    >

    <video id="local-video" muted autoplay playsInline></video>
    <video id="remote-video" autoplay playsInline></video>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      isOwner: false,
      isStreaming: false,
      roomRef: null,
      roomSnapshot: null,
      roomInfo: {},
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      configuration: {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      },
    };
  },
  computed: {},
  methods: {
    async openUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.querySelector("#local-video").srcObject = stream;
      this.localStream = stream;
    },
    async startVideo() {
      this.isStreaming = true;
      console.log("start video:");
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // Code for collecting ICE candidate
      const callerCandidateCollection = this.roomRef.collection(
        "callerCandidates"
      );
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          callerCandidateCollection.add(event.candidate.toJSON());
        }
      });

      // Code for creating a room
      const offer = await this.peerConnection.createOffer();
      console.log("offer:", offer);
      await this.peerConnection.setLocalDescription(offer);
      const roomWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      await this.roomRef.update(roomWithOffer);
      const roomId = this.roomRef.id;
      console.log("roomId:", roomId);

      this.peerConnection.addEventListener("track", (event) => {
        // console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          // console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });

      // Listening for remote session description
      this.roomRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (!this.peerConnection.currentRemoteDescription && data.answer) {
          const answer = new RTCSessionDescription(data.answer);
          await this.peerConnection.setRemoteDescription(answer);
        }
      });

      // Listen for remote ICE candidates
      this.roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            console.log('data:', data);
            const data = change.doc.data();
            await this.peerConnection.addIceCandidate(
              new RTCIceCandidate(data)
            );
          }
        });
      });
    },
    async joinRoomById() {
      // this.roomSnapshot = await this.roomRef.get();

      if (!this.roomSnapshot.exists) return;

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // // Code for collecting ICE candidates
      // const calleeCandidatesCollection = this.roomRef.collection("calleeCandidates");
      // this.peerConnection.addEventListener("icecandidate", (event) => {
      //   if (event.candidate) {
      //     calleeCandidatesCollection.add(event.candidate.toJSON());
      //   }
      // });

      // this.peerConnection.addEventListener("track", (event) => {
      //   // console.log("Got remote track:", event.streams[0]);
      //   event.streams[0].getTracks().forEach((track) => {
      //     // console.log("Add a track to the remoteStream:", track);
      //     this.remoteStream.addTrack(track);
      //   });
      // });

      // // Code for creating SDP answer
      // const offer = roomSnapshot.data().offer;
      // await this.peerConnection.setRemoteDescription(
      //   new RTCSessionDescription(offer)
      // );
      // const answer = await this.peerConnection.createAnswer();
      // await this.peerConnection.setLocalDescription(answer);

      // const roomWithAnswer = {
      //   answer: {
      //     type: answer.type,
      //     sdp: answer.sdp,
      //   },
      // };
      // await this.roomRef.update(roomWithAnswer);

      // // Listening for remote ICE candidates
      // this.roomRef.collection("callerCandidates").onSnapshot((snapshot) => {
      //   snapshot.docChanges().forEach(async (change) => {
      //     if (change.type === "added") {
      //       const data = change.doc.data();
      //       await this.peerConnection.addIceCandidate(
      //         new RTCIceCandidate(data)
      //       );
      //     }
      //   });
      // });
    },
    async hangUp() {
      const tracks = document
        .querySelector("#local-video")
        .srcObject.getTracks();

      tracks.forEach((track) => track.stop());
      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => track.stop());
      }
      if (this.peerConnection) {
        this.peerConnection.close();
      }

      this.localStream = null;
      this.remoteStream = null;
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
    initPeerConnection() {
      this.peerConnection = new RTCPeerConnection(this.configuration);
    },
  },
  async created() {
    await this.fetchRoomInfo();
    this.roomRef = await db.collection("rooms").doc(this.$route.params.id);
    this.roomSnapshot = await this.roomRef.get();
    console.log("this.roomRef:", this.roomRef);
    // console.log("this.roomRef.id:", this.roomRef.id);
    this.peerConnection = new RTCPeerConnection(this.configuration);
    // console.log("this.peerConnection:", this.peerConnection);
    if (this.$store.getters.user.uid === this.roomInfo.createUserId) {
      console.log("owner:");
      this.isOwner = true;
    } else {
      console.log("guest:");
      this.remoteStream = new MediaStream();
      document.querySelector("#remote-video").srcObject = this.remoteStream;
      // Code for collecting ICE candidates
      const calleeCandidatesCollection = this.roomRef.collection(
        "calleeCandidates"
      );
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          calleeCandidatesCollection.add(event.candidate.toJSON());
        }
      });

      this.peerConnection.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });

      // Code for creating SDP answer
      const offer = this.roomSnapshot.data().offer;
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await this.roomRef.update(roomWithAnswer);

      // Listening for remote ICE candidates
      this.roomRef.collection("callerCandidates").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            await this.peerConnection.addIceCandidate(
              new RTCIceCandidate(data)
            );
          }
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.m-video-room {
  position: relative;
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
  video {
    width: 100%;
    min-width: 300px;
    min-height: 200px;
  }
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