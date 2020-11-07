<template>
  <div class="set-icon">
    <m-drop-zone @change="onFileChange"></m-drop-zone>
    <vue-croppie
      ref="croppieRef"
      :boundary="{ height: 300 }"
      :viewport="{ width: 200, height: 200, type: 'circle' }"
      :enableResize="false"
      :enforceBoundary="false"
    ></vue-croppie>
    <img :src="cropped" alt="" />
    <m-button class="w-100" @click="setIcon">設定</m-button>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      croppieImage: null,
      cropped: null,
      files: null,
    };
  },
  computed: {},
  methods: {
    onFileChange(files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.$refs.croppieRef.bind({
          url: event.target.result,
        });
      };
      this.files = files;
    },
    setIcon() {
      if (!this.$store.getters.user.username) {
        const snackbar = {
          text: "ログインしてください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }

      const options = {
        type: "base64",
        size: { width: 200, height: 200 },
        format: "png",
      };
      let url = "";
      this.$refs.croppieRef.result(options).then(async (output) => {
        // console.log("output:", output);
        this.cropped = this.croppieImage = output;
        // outputをBlobへと変換
        const byteString = atob(output.split(",")[1]);
        const content = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          content[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([content], { type: "image/png" });

        const storageRef = storage.ref();
        const fileRef = storageRef.child(`user-icons/${this.$store.getters.user.uid}-icon.png`);
        // console.log("fileRef:", fileRef);
        await fileRef.put(blob).then();
        url = await fileRef.getDownloadURL();

        const updateData = {userIcon: url};
        await db.collection("users").doc(this.$store.getters.user.uid).update(updateData);
        this.$store.commit("updateUser", updateData);
      });
    },
  },
  mounted() {},
  watch: {
    files() {
      // console.log("this.files:", this.files);
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