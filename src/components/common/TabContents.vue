<template>
  <div :data-tab-key="tabKey" class="m-tab-contents">
    <div class="m-tab-contents-slide">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabKey: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.m-tab-contents {
  position: relative;
  width: 100%;
  // background-color: rgba($white, 0.9);
  overflow-x: hidden;
  overflow-y: auto;
  // @extend .bs-b-8;

  &-slide {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateX(0%);
    transition: 0.6s;
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