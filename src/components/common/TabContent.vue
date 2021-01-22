<template>
  <div class="m-tab-content">
    <slot></slot>
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
.m-tab-content {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  min-height: 450px;
  // min-height: 100vh;
  // padding: 20px;
  opacity: 0;
  // background-color: rgba($black, .8);
  // overflow-y: auto;
  transition: opacity 1.5s;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      left: ($i - 1) * 100%;
    }
  }

  &.active {
    position: relative !important;
    opacity: 1;
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