<template>
  <div>
    <p>This is a Video page!</p>
    <p v-for="(room, index) in rooms" :key="index">
      {{room}}
    </p>
    <m-button icon="camera" @click="openUserMedia">camera</m-button>
    <m-button @click="hangUp">hang up</m-button>
    <m-button @click="createRoom">create room</m-button>
    <input type="text" v-model="remoteRoomId" />
    <m-button @click="joinRoomById">join room</m-button>
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
      peerConnection: null,
      loaclStream: null,
      remoteStream: null,
      roomId: null,
      remoteRoomId: null,
      rooms: [],
      // videoRef: null,
      // userToCall: null,
      // localConnection: null,
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
    async createRoom() {
      const roomRef = await db.collection("rooms").doc();
      console.log("roomRef:", roomRef);

      this.peerConnection = new RTCPeerConnection(this.configuration);
      console.log("this.peerConnection:", this.peerConnection);

      this.loaclStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.loaclStream);
      });

      // Code for collecting ICE candidate
      const callerCandidateCollection = roomRef.collection("callerCandidates");
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          callerCandidateCollection.add(event.candidate.toJSON());
        }
      });

      // Code for creating a room
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      const roomWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      await roomRef.set(roomWithOffer);
      const roomId = roomRef.id;
      console.log("roomId:", roomId);

      this.peerConnection.addEventListener("track", (event) => {
        // console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          // console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });

      // Listening for remote session description
      roomRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (!this.peerConnection.currentRemoteDescription && data.answer) {
          const answer = new RTCSessionDescription(data.answer);
          await this.peerConnection.setRemoteDescription(answer);
        }
      });

      // Listen for remote ICE candidates
      roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            await this.peerConnection.addIceCandidate(
              new RTCIceCandidate(data)
            );
          }
        });
      });
    },
    async joinRoomById() {
      const roomRef = db.collection("rooms").doc(this.remoteRoomId);
      const roomSnapshot = await roomRef.get();

      if (!roomSnapshot.exists) return;

      this.peerConnection = new RTCPeerConnection(this.configuration);
      this.loaclStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.loaclStream);
      });

      // Code for collecting ICE candidates
      const calleeCandidatesCollection = roomRef.collection("calleeCandidates");
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          calleeCandidatesCollection.add(event.candidate.toJSON());
        }
      });

      this.peerConnection.addEventListener("track", (event) => {
        // console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          // console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });

      // Code for creating SDP answer
      const offer = roomSnapshot.data().offer;
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        }
      }
      await roomRef.update(roomWithAnswer);

      // Listening for remote ICE candidates
      roomRef.collection('callerCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if(change.type === 'added') {
            const data = change.doc.data();
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        })
      })
    },
    async openUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.querySelector("#local-video").srcObject = stream;
      this.loaclStream = stream;

      this.remoteStream = new MediaStream();
      document.querySelector("#remote-video").srcObject = this.remoteStream;
    },
    async hangUp() {
      const tracks = document
        .querySelector("#local-video")
        .srcObject.getTracks();

      tracks.forEach((track) => track.stop());
      if (this.remoteStream)
        this.remoteStream.getTracks().forEach((track) => track.stop());
      if (this.peerConnection) this.peerConnection.close();

      this.loaclStream = null;
      this.remoteStream = null;
    },
  },
  created() {
    db.collection('rooms').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
          this.rooms.push(change.doc.id);
        }
      })
    })
  },
  async mounted() {
    // this.videoRef = this.$refs.video;
    // this.loaclStream = await this.initiateLocalStream();
    // this.videoRef.srcObject = this.loaclStream;
    // this.localConnection = await this.initiateConnection();
  },
};
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  min-width: 300px;
  min-height: 200px;
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>