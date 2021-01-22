<template>
  <header class="header">
    <transition name="fade">
      <i v-if="prev" class="fas fa-chevron-left prev" @click="toPrev"></i>
    </transition>
    <slot></slot>
    <transition name="fade">
      <i v-if="next" class="fas fa-chevron-right next" @click="toNext"></i>
    </transition>
  </header>
</template>

<script>
export default {
  components: {},
  props: {
    prev: { type: Boolean, default: false },
    next: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    toPrev() {
      this.$router.go(-1);
    },
    toNext() {},
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1050px;
  height: 40px;
  margin: 0 auto;
  padding: 0 10px;
  background-color: $orange;
  color: $white;

  i {
    position: absolute;
    font-size: 30px;
    color: $black;

    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }

  span {
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    width: 100%;
    font-size: 30px;
    font-weight: 700;
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