<template>
  <div class="dialog-container" :class="{ 'dialog-open': dialog }">
    <div class="dialog">
      <div class="dialog__header">
        <p>{{ headerText }}</p>
        <i class="fas fa-times" @click="closeDialog"></i>
      </div>
      <div class="dialog__content">
        <slot></slot>
      </div>
      <div v-if="footer" class="dialog__footer">
        <m-button @click="doAction">{{ buttonText }}</m-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialog: Boolean,
    headerText: String,
    buttonText: String,
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
    this.dialogContainer = document.querySelector(".dialog-container");
    this.dialogContainer.addEventListener("click", (event) => {
      event.stopPropagation();
      // console.log("event.target:", event.target);
      if (event.target.classList.contains("dialog-container")) {
        this.$emit("close");
      }
    });
  },
  watch: {
    dialog() {
      console.log("this.dialog:", this.dialog);
    },
  },
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
  min-height: 400px;
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

    p {
      font-weight: 700;
    }

    i {
      font-size: 24px;
    }
  }

  &__content {
    height: 280px;
    padding: 20px;
    overflow-y: auto;
    text-align: center;
  }

  &__footer {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    min-height: 60px;
    padding: 10px 20px;
    background-color: rgba($color: $orange, $alpha: 0.2);
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>