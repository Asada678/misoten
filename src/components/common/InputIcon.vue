<template>
  <div class="m-input-icon">
    <transition name="set-icon" mode="out-in" @after-enter="afterEnter">
      <m-drop-zone
        v-if="!file"
        @change="onFileChange"
        ref="dropZone"
      ></m-drop-zone>
      <vue-croppie
        v-else
        ref="croppieRef"
        :boundary="{ height: 300 }"
        :viewport="{ width: 200, height: 200, type: 'circle' }"
        :enableResize="false"
        :enforceBoundary="false"
      >
      </vue-croppie>
    </transition>
    <div class="buttons">
      <m-button :disabled="!file" class="w-50 grey" @click="resetFile"
        >別の画像</m-button
      >
      <m-button :disabled="!file" class="w-50" @click="crop">切り取り</m-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      file: null,
    };
  },
  computed: {},
  methods: {
    onFileChange(file) {
      this.file = file;
    },
    resetFile() {
      this.file = null;
    },
    afterEnter() {
      if (this.$refs.croppieRef) {
        // console.log("this.$refs.croppieRef:", this.$refs.croppieRef);
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (event) => {
          this.$refs.croppieRef.bind({
            url: event.target.result,
          });
        };
      } else {
        // console.log("this.$refs.dropZone.$el:", this.$refs.dropZone.$el);
        this.$refs.dropZone.$el.click();
      }
    },
    crop() {
      const options = {
        type: "base64",
        size: { width: 400, height: 400 },
        format: "png",
      };
      this.$refs.croppieRef.result(options).then(async (output) => {
        // console.log("output:", output);

        // outputをBlobへと変換
        const byteString = atob(output.split(",")[1]);
        const content = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          content[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([content], { type: "image/png" });

        // blobとoutputを結果として返す。
        const result = {
          cropped: output,
          blob,
        };
        console.table(result);
        this.$emit("result", result);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.m-input-icon {
  width: 100%;

  .buttons {
    display: flex;
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