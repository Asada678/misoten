<template>
  <m-dialog
    :dialog="dialog"
    :loading="loading"
    :disabled="$v.$invalid"
    header-text="新規ルーム作成"
    button-text="作成"
    @action="createRoom"
    @close="closeDialog"
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
          ルーム名は{{
            $v.newRoomName.$params.maxLength.max
          }}文字以下でなければいけません。
        </span>
        <span v-if="!$v.newRoomName.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
  </m-dialog>
</template>

<script>
import { db } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  components: {},
  props: {
    dialog: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {
      newRoomName: null,
      loading: false,
    };
  },
  validations: {
    newRoomName: { required, maxLength: maxLength(10) },
  },
  computed: {},
  methods: {
    closeDialog() {
      this.$store.commit("setVideoRoomDialog", false);
    },
    async createRoom() {
      if (!this.$store.getters.user.uid) {
        const snackbar = {
          text: "ログインしてください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      this.loading = true;
      await db
        .collection("rooms")
        .add({
          roomName: this.newRoomName,
          createUserId: this.$store.getters.user.uid,
          closed: false,
          createdAt: new Date(),
        })
        .then((doc) => {
          // console.log("doc:", doc);
          this.closeDialog();
          this.$router.push({ name: "VideoRoom", params: { id: doc.id } });
        });
      this.loading = false;
    },
  },
  created() {},
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