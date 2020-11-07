<template>
  <div class="m-drop-zone">
    <span v-if="!value" class="m-drop-zone__prompt">Drop file here or click to upload</span>
    <input type="file" name="file" class="m-drop-zone__input" />
    <i v-if="value" class="fas fa-times unselect" @click="unselectFile"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: File
  },
  data() {
    return {
      dropZone: null,
      input: null,
      thumbnail: null,
      filesExists: false
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
    removeThumbnail() {

    }
  },
  mounted() {
    this.dropZone = this.$el;
    this.input = this.$el.querySelector(".m-drop-zone__input");

    this.dropZone.addEventListener("click", (event) => {
      // console.log('event.target:', event.target);
      if(event.target.classList.contains('unselect'))  {
        this.unselectFile();
        // console.log('unselect:', );
        return;
      }
      this.input.click();
    });

    this.input.addEventListener("change", () => {
      if (this.input.files.length) {
        this.filesExists = true;
        this.updateThumbnail(this.dropZone, this.input.files[0]);
        this.onInputChange();
      }
    });

    this.dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      this.dropZone.classList.add("m-drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      this.dropZone.addEventListener(type, () => {
        this.dropZone.classList.remove("m-drop-zone--over");
      });
    });

    this.dropZone.addEventListener("drop", (event) => {
      event.preventDefault();

      if (event.dataTransfer.files.length) {
        this.input.files = event.dataTransfer.files;
        this.filesExists = true;
        this.updateThumbnail(this.dropZone, event.dataTransfer.files[0]);
        this.onInputChange();
      }
      this.dropZone.classList.remove("m-drop-zone--over");
    });
  },
  watch: {
    value() {
      if(!this.value && this.thumbnail) {
        this.thumbnail.remove();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-drop-zone {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // max-width: 200px;
  height: 200px;
  padding: 25px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: $grey;
  border: 4px dashed $blue;
  border-radius: 10px;
  cursor: pointer;

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