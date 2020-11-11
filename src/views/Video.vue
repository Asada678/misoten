<template>
  <div>
    <video-room-card
      v-for="room in rooms"
      :key="room.id"
      :video-room="room"
      @click="openJoinRoomDialog(room.id)"
    >
    </video-room-card>

    <m-dialog
      :dialog="joinRoomDialog"
      header-text="入室確認"
      button-text="入室"
      color="indigo"
      @action="joinRoom"
      @close="joinRoomDialog = false"
    >
      <p>この部屋に入りますか？</p>
    </m-dialog>
    <m-dialog
      :dialog="createRoomDialog"
      :disabled="$v.$invalid"
      header-text="新規ルーム作成"
      button-text="作成"
      color="blue"
      @action="createRoom"
      @close="createRoomDialog = false"
    >
      <m-form-group>
        <m-form
          v-model="newRoomName"
          label="newRoomName"
          :class="{ error: $v.newRoomName.$error }"
          @input="$v.newRoomName.$touch()"
        ></m-form>
        <m-error-message v-if="$v.newRoomName.$error">
          <span v-if="!$v.newRoomName.maxLength">
            ユーザ名は{{
              $v.newRoomName.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.newRoomName.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
    </m-dialog>
    <float-button
      class="blue"
      icon="plus"
      right="20"
      @click="createRoomDialog = true"
    />
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";
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
      remoteRoomId: null,
      rooms: [],
    };
  },
  validations: {
    newRoomName: { required, maxLength: maxLength(10) },
  },
  computed: {},
  methods: {
    async createRoom() {
      if (!this.$store.getters.user.uid) {
        const snackbar = {
          text: "ログインしてください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      await db
        .collection("rooms")
        .add({
          roomName: this.newRoomName,
          createUserId: this.$store.getters.user.uid,
          createdAt: new Date(),
        })
        .then((doc) => {
          // console.log("doc:", doc);
          this.$router.push({ name: "VideoRoom", params: { id: doc.id } });
        });
    },

    openJoinRoomDialog(roomId) {
      // console.log("roomId:", roomId);
      this.joinRoomDialog = true;
      this.selectedRoomId = roomId;
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
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>