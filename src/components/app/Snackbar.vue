<template>
  <div
    class="snackbar"
    :class="{ appear: snackbar.appear, [snackbar.color]: snackbar.color }"
  >
    <p v-html="snackbar.text"></p>
    <i class="fas fa-times" @click="closeSnackbar"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    snackbar: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeSnackbar() {
      const snackbar = {
        text: "",
        appear: false,
        color: "",
      };
      this.$store.commit("setSnackbar", snackbar);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: fixed;
  z-index: 3000;
  top: $userMenuHeight + 10px;
  left: 0;
  right: 0;
  // display: flex;
  // justify-content: space-evenly;
  // align-items: center;
  width: 95%;
  max-width: 400px;
  min-height: 60px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 10px 40px;
  text-align: center;
  color: $white;
  background-color: $orange;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-50px);
  transition: all 0.3s;
  @extend .box-shadow-1;

  &.appear {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &.red {
    border: 1px solid $red;
    background-color: rgba($red, .85);
  }
  &.blue {
    border: 1px solid $blue;
    background-color: rgba($blue, .85);
  }
  &.green {
    border: 1px solid $green;
    background-color: rgba($green, .85);
  }
  &.black {
    border: 1px solid $black;
    background-color: rgba($black, .85);
  }

  i {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 20px;
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