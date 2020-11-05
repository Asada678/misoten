<template>
  <div class="dialog-container" :class="{ 'dialog-open': dialog }">
    <div class="dialog">
      <div class="dialog__header" :class="color">
        <p>{{ headerText }}</p>
        <i class="fas fa-times" @click="closeDialog"></i>
      </div>
      <div class="dialog__content">
        <slot></slot>
      </div>
      <div v-if="footer" class="dialog__footer">
        <m-button class="grey w-25" @click="closeDialog">キャンセル</m-button>
        <m-button class="w-25" :class="color" @click="doAction">{{ buttonText }}</m-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialog: Boolean,
    color: String,
    headerText: String,
    buttonText: { type: String, default: "OK" },
    footer: { type: Boolean, default: true },
  },
  data() {
    return {
      dialogContainer: null,
    };
  },
  computed: {},
  methods: {
    closeDialog() {
      // this.dialogContainer.classList.remove("dialog-open");
      this.$emit("close");
    },
    doAction() {
      // this.closeDialog();
      this.$emit("action");
    },
  },
  mounted() {
    this.$el.addEventListener("click", (event) => {
      event.stopPropagation();
      // console.log("event.target:", event.target);
      if (event.target.classList.contains("dialog-container")) {
        this.$emit("close");
      }
    });
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.dialog-open {
  .dialog {
    // transform: translate(-50%, -50%);
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scaleY(1);
  }
}
.dialog-container {
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;

  &.dialog-open {
    z-index: 1100;
    background-color: rgba(20, 20, 20, 0.4);
    opacity: 1;
    visibility: visible;
  }
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  width: 90%;
  max-width: 600px;
  max-height: 80%;
  margin: auto;
  background-color: rgba($color: $white, $alpha: 1);
  transform: translate(-50%, -50%) scaleY(0);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: opacity 0.6s, visibility 0.6s, transform 0.4s;

  &__header {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: rgba($color: $orange, $alpha: 0.9);

    &.red {
      color: $white;
      background-color: rgba($color: $red, $alpha: 0.9);
    }
    &.blue {
      color: $white;
      background-color: rgba($color: $blue, $alpha: 0.9);
    }
    &.green {
      background-color: rgba($color: $green, $alpha: 0.9);
    }
    &.indigo {
      background-color: rgba($color: $indigo, $alpha: 0.9);
    }

    p {
      font-weight: 700;
    }

    i {
      font-size: 24px;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-height: 280px;
    max-height: 400px;
    padding: 20px;
    padding: 20px 20px 100px 20px;
    overflow-y: auto;
    text-align: center;

    p {
      font-size: 20px;
      font-weight: 700;
    }
  }

  &__footer {
    // position: relative;
    position: absolute;
    z-index: 10;
    // top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    min-height: 60px;
    padding: 10px 20px;
    // background-color: rgba($color: $orange, $alpha: 0.2);
    background-color: $lightOrange;
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