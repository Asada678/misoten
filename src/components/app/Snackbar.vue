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
      this.$store.commit("closeSnackbar");
    },
  },
  created() {},
  watch: {
    $route() {
      // console.log('watch route:', );
      this.$store.commit("closeSnackbar");
    }
  }
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: fixed;
  z-index: 3000;
  top: $userMenuHeight + 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 400px;
  min-height: 60px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 10px 40px;
  text-align: center;
  color: $white;
  background-color: rgba($orange, 0.85);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-50px);
  transition: all 0.3s;
  @extend .bs-b-8;

  &.appear {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &.orange {
    border: 1px solid $orange;
    background-color: rgba($orange, 0.85);
  }
  &.red {
    border: 1px solid $red;
    background-color: rgba($red, 0.85);
  }
  &.pink {
    border: 1px solid $pink;
    background-color: rgba($pink, 0.85);
  }
  &.blue {
    border: 1px solid $blue;
    background-color: rgba($blue, 0.85);
  }
  &.green {
    border: 1px solid $green;
    background-color: rgba($green, 0.85);
  }
  &.white {
    border: 1px solid $white;
    background-color: rgba($white, 0.85);
    color: $black;

    i {
      color: $charcoal;
    }
  }
  &.black {
    border: 1px solid $black;
    background-color: rgba($black, 0.85);
  }

  i {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 20px;
    color: rgba($white, 0.9);
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