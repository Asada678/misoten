<template>
  <div class="set-icon">
    <m-input-icon @result="fetchResult"></m-input-icon>
    <m-dialog
      :dialog="dialog"
      header-text="確認"
      button-text="設定"
      @action="uploadIcon"
      @close="dialog = false"
    >
      <p>このアイコンを設定します。</p>
      <img :src="cropped" alt="cropped image" class="cropped"/>
    </m-dialog>
    
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
      blob: null,
      file: null,
      dialog: false,
    };
  },
  computed: {},
  methods: {
    onFileChange(file) {
      // console.log("file:", file);
      this.file = file;
    },
    afterEnter() {
      if (this.$refs.croppieRef) {
        console.log("this.$refs.croppieRef:", this.$refs.croppieRef);
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (event) => {
          this.$refs.croppieRef.bind({
            url: event.target.result,
          });
        };
      } else {
        console.log("this.$refs.dropZone.$el:", this.$refs.dropZone.$el);
        this.$refs.dropZone.$el.click()
      }
    },
    resetFile() {
      this.file = null;
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
    fetchResult(result) {
      this.cropped = result.cropped;
      this.blob = result.blob;
      this.dialog = true;
    },
    async uploadIcon() {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(
        `user-icons/${this.$store.getters.user.uid}-icon.png`
      );
      // console.log("fileRef:", fileRef);
      await fileRef.put(this.blob).then();
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
.cropped {
  width: 200px;
  height: 200px;
}

.reset {
  position: absolute;
  top: 0;
}
.set-icon-enter-active {
  transition: opacity 0.5s;
}
.set-icon-enter, .set-icon-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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