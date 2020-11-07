<template>
  <div class="set-icon">
    <m-drop-zone v-if="!file" @change="onFileChange"></m-drop-zone>
    <vue-croppie
    v-else
      ref="croppieRef"
      :boundary="{ height: 300 }"
      :viewport="{ width: 200, height: 200, type: 'circle' }"
      :enableResize="false"
      :enforceBoundary="false"
    ></vue-croppie>
    <m-dialog
      :dialog="dialog"
      header-text="確認"
      button-text="設定"
      @action="uploadIcon"
      @close="dialog = false"
    >
      <p>このアイコンを設定します。</p>
      <img :src="cropped" alt="cropped image" />
    </m-dialog>
    <m-button :disabled="!file" class="w-100" @click="crop">切り取り</m-button>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      cropped: null,
      file: null,
      dialog: false,
    };
  },
  computed: {},
  methods: {
    onFileChange(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        this.$refs.croppieRef.bind({
          url: event.target.result,
        });
      };
      this.file = file;
    },
    crop() {
      const options = {
        type: "base64",
        size: { width: 200, height: 200 },
        format: "png",
      };
      this.$refs.croppieRef.result(options).then(async (output) => {
        // console.log("output:", output);
        this.cropped = output;
        this.dialog = true;
      });
    },
    async uploadIcon() {
      // outputをBlobへと変換
      const byteString = atob(this.cropped.split(",")[1]);
      const content = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([content], { type: "image/png" });

      const storageRef = storage.ref();
      const fileRef = storageRef.child(
        `user-icons/${this.$store.getters.user.uid}-icon.png`
      );
      // console.log("fileRef:", fileRef);
      await fileRef.put(blob).then();
      const url = await fileRef.getDownloadURL();

      const updateData = { userIcon: url };
      await db
        .collection("users")
        .doc(this.$store.getters.user.uid)
        .update(updateData)
        .then((result) => {
          console.log("result:", result);
          this.dialog = false;
          this.$store.commit("updateUser", updateData);
          const snackbar = {
            text: "アイコンを設定しました。",
            color: "green",
          };
          this.$store.commit("setSnackbar", snackbar);
        })
        .catch(() => {
          const snackbar = {
            text: "アイコンの設定に失敗しました。",
            color: "red",
          };
          this.$store.commit("setSnackbar", snackbar);
        });
    },
  },
  mounted() {},
  watch: {
    file() {
      // console.log("this.file:", this.file);
    },
  },
};
</script>

<style lang="scss" scoped>
.set-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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