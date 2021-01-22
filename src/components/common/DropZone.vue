<template>
  <div class="m-drop-zone">
    <span v-if="!value" class="m-drop-zone__prompt">ファイルアップロード</span>
    <input type="file" name="file" class="m-drop-zone__input" />
    <i v-if="value" class="fas fa-times unselect" @click="unselectFile"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: File,
  },
  data() {
    return {
      dropZone: null,
      input: null,
      thumbnail: null,
      filesExists: false,
    };
  },
  computed: {},
  methods: {
    onInputChange() {
      // console.log("on input change:");
      this.$emit("change", this.input.files[0]);
      // this.updateThumbnail(this.dropZone, null);
    },
    unselectFile() {
      this.input.files = null;
      this.thumbnail.remove();
      this.filesExists = false;
      this.$emit("unselect");
    },
    updateThumbnail(dropZone, file) {
      // console.log("dropZone, file:", dropZone, file);
      this.thumbnail = dropZone.querySelector(".m-drop-zone__thumb");

      // if (dropZone.querySelector(".m-drop-zone__prompt")) {
      //   dropZone.querySelector(".m-drop-zone__prompt").remove();
      // }

      if (!this.thumbnail) {
        this.thumbnail = document.createElement("div");
        this.thumbnail.classList.add("m-drop-zone__thumb");
        dropZone.appendChild(this.thumbnail);
      }

      if (file) {
        this.thumbnail.dataset.label = file.name;
      }

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.thumbnail.style.backgroundImage = `url(${reader.result})`;
        };
      } else {
        // console.log('else:', );
        this.thumbnail.style.backgroundImage = null;
      }
    },
    removeThumbnail() {},
    onClick(event) {
      if (event.target.classList.contains("unselect")) {
        this.unselectFile();
        // console.log('unselect:', );
        return;
      }
      this.input.click();
    },
    onChange() {
      if (this.input.files.length) {
        this.filesExists = true;
        this.updateThumbnail(this.dropZone, this.input.files[0]);
        this.onInputChange();
      }
    },
    onDragover(event) {
      event.preventDefault();
      this.dropZone.classList.add("m-drop-zone--over");
    },
    onDrop(event) {
      event.preventDefault();

      if (event.dataTransfer.files.length) {
        this.input.files = event.dataTransfer.files;
        this.filesExists = true;
        this.updateThumbnail(this.dropZone, event.dataTransfer.files[0]);
        this.onInputChange();
      }
      this.dropZone.classList.remove("m-drop-zone--over");
    },
    onLeave() {
      this.dropZone.classList.remove("m-drop-zone--over");
    },
  },
  mounted() {
    this.dropZone = this.$el;
    this.input = this.$el.querySelector(".m-drop-zone__input");

    this.dropZone.addEventListener(this.$store.getters.eventType, this.onClick);
    this.dropZone.addEventListener("dragover", this.onDragover);
    this.dropZone.addEventListener("drop", this.onDrop);
    this.input.addEventListener("change", this.onChange);

    ["dragleave", "dragend"].forEach((type) => {
      this.dropZone.addEventListener(type, this.onLeave);
    });
  },
  destroyed() {
    this.dropZone.removeEventListener(
      this.$store.getters.eventType,
      this.onClick
    );
    this.dropZone.removeEventListener("dragover", this.onDragover);
    this.dropZone.removeEventListener("drop", this.onDrop);
    this.input.removeEventListener("change", this.onChange);
    ["dragleave", "dragend"].forEach((type) => {
      this.dropZone.removeEventListener(type, this.onLeave);
    });
  },
  watch: {
    value() {
      if (!this.value && this.thumbnail) {
        this.thumbnail.remove();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.black {
  .m-drop-zone {
    color: $grey;
  }
}
.m-drop-zone {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // max-width: 200px;
  height: 150px;
  padding: 25px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: $grey;
  color: rgba($color: $black, $alpha: 0.5);
  border: 4px dashed $orange;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba($orange, 0.2);
    color: rgba($color: $black, $alpha: 0.8);
  }

  &--over {
    border-style: solid;
  }

  &__input {
    display: none;
  }
  ::v-deep &__thumb {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: $grey;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;

    &::after {
      content: attr(data-label);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px 0;
      color: $white;
      background-color: rgba($black, 0.8);
      font-size: 14px;
      text-align: center;
    }
  }

  i {
    position: absolute;
    top: 5px;
    right: 5px;
    color: $red;
    /* width: 150%; */
    font-size: 30px;
    line-height: 30px;
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