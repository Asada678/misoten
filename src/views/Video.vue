<template>
  <div class="video">
    <p>15</p>
    <video-room-card
      v-for="room in rooms"
      :key="room.id"
      :video-room="room"
      @click="openJoinRoomDialog(room)"
    >
    </video-room-card>
    
    <p v-if="!rooms.length">
      部屋がありません。
    </p>

    <m-dialog
      :dialog="joinRoomDialog"
      header-text="入室確認"
      button-text="入室"
      color="indigo"
      @action="joinRoom"
      @close="joinRoomDialog = false"
    >
      <p>「{{ selectedRoomName }}」<br>
        に入りますか？</p>
    </m-dialog>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
// import { required, maxLength } from "vuelidate/lib/validators";
import VideoRoomCard from "@/components/video/VideoRoomCard";

export default {
  components: {
    VideoRoomCard,
  },
  props: {},
  data() {
    return {
      joinRoomDialog: false,
      createRoomDialog: false,
      newRoomName: null,
      selectedRoomId: null,
      selectedRoomName: null,
      remoteRoomId: null,
      rooms: [],
    };
  },

  computed: {},
  methods: {
    openJoinRoomDialog(room) {
      console.log("room:", room);
      this.joinRoomDialog = true;
      this.selectedRoomName = room.roomName;
      this.selectedRoomId = room.id;
    },
    joinRoom() {
      this.$router.push({
        name: "VideoRoom",
        params: { id: this.selectedRoomId },
      });
    },
  },
  created() {
    db.collection("rooms")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const room = {
              ...change.doc.data(),
              id: change.doc.id,
            };
            // console.table(room);
            this.rooms = [...this.rooms, room];
          }
        });
      });
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.video {

}
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .video {
  }
}

@media (min-width: 1200px) {
}
</style>