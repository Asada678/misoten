<template>
  <div class="m-tab-contents">
    <div class="m-tab-contents-slide">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
  background-color: rgba($white, 0.9);
  overflow: hidden;
  @extend .box-shadow-1;

  &-slide {
    position: relative;
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