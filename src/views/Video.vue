<template>
  <div>
    <p>This is a Video page!</p>
    <video ref="video" autoplay playsInline></video>
    <input type="text" v-model="userToCall" />
    <button @click="startCall">start call</button>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      videoRef: null,
      userToCall: null,
      localConnection: null,
      loaclStream: null,
    };
  },
  computed: {},
  methods: {
    async initiateLocalStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("stream:", stream);
      return stream;
    },
    async initiateConnection() {
      const configration = {
        iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
      };
      const conn = new RTCPeerConnection(configration);
      return conn;
    },
    listenToConnectionEvents(
      conn,
      username,
      remoteUsername,
      db,
      remoteVideoRef,
      doCandidate
    ) {
      conn.onicecandidate = function (event) {
        if (event.candidate) {
          doCandidate(remoteUsername, event.candidate, db, username);
        }
      };

      conn.ontrack = function (event) {
        if (this.videoRef.srcObject !== event.stream[0]) {
          this.videoRef.srcObject = event.stream[0];
        }
      };
    },
    async createOffer(connection, loaclStream, userToCall, doOffer, db, username) {
      connection.addStream(loaclStream)

      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);

      doOffer(userToCall, offer, db, username)
    },
    async doCandidate(to, candidate, db, username) {
      await db.ref(`/notifs/${to}`).update({
        type: "candidate",
        from: username,
        candidate: JSON.stringify(candidate),
      });
    },
    startCall() {
      this.listenToConnectionEvents(
        this.localConnection,
        "Asada",
        this.userToCall,
        this.loaclStream,
        db,
        this.videoRef,
        this.doCandidate
      );
      this.createOffer(this.localConnection, this.loaclStream, this.userToCall, this.doOffer, db, 'Asada')
    },
  },
  async mounted() {
    this.videoRef = this.$refs.video;
    this.loaclStream = await this.initiateLocalStream();
    this.videoRef.srcObject = this.loaclStream;

    this.localConnection = await this.initiateConnection();
  },
};
</script>

<style lang="scss" scoped>
video {
  width: 300px;
  height: 200px;
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