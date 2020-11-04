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
    // RTC Module
    async createOffer(
      connection,
      loaclStream,
      userToCall,
      doOffer,
      db,
      username
    ) {
      connection.addStream(loaclStream);

      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);

      doOffer(userToCall, offer, db, username);
    },
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
    async sendAnswer(conn, loaclStream, notif, doAnswer, db, username) {
      conn.addStream(loaclStream);

      const offer = JSON.parse(notif.offer);
      conn.setRemoteDescription(offer);

      const answer = await conn.createAnswer();
      conn.setLocalDescription(answer);

      doAnswer(notif.from, answer, db, username);
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
      this.createOffer(
        this.localConnection,
        this.loaclStream,
        this.userToCall,
        this.doOffer,
        db,
        "Asada"
      );
    },
    // firebase Module
    async doCandidate(to, candidate, db, username) {
      await db.ref(`/notifs/${to}`).update({
        type: "candidate",
        from: username,
        candidate: JSON.stringify(candidate),
      });
    },
    handleUpdate(notif, username) {
      if(!notif) return;
      switch(notif.type) {
        case 'offer':
          listenToConnectionEvents(this.localConnection, username, notif.from, db, this.videoRef, this.doCandidate);
          this.sendAnswer(this.localConnection, this.loaclStream, notif, doAnswer, db, username);
          break;
        case 'answer':
          break;
        case 'candidate':
          break;
        default:
          break;
      }
    } 
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
  width: 100%;
  min-width: 300px;
  min-height: 200px;
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