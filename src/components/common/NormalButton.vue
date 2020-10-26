<template>
  <button @click="onClick">
    <i :class="`fas fa-${icon}`"></i>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    icon: String,
    to: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick() {
      if (this.to) {
        console.log("to:");
        this.$router.push({ path: this.to });
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  z-index: 10;
  display: inline-block;
  // width: 150px;
  margin: 10px 0;
  padding: 10px 30px;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid $orange;
  background-color: rgba($orange, 0.7);
  color: $black;
  font-size: 18px;
  font-weight: 700;
  word-break: break-word;
  overflow: hidden;
  transition: 0.5s;
  @extend .box-shadow-2;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transform: scaleY(0);
    transform-origin: bottom;
    background-color: inherit;
    transition: 0.5s;
  }

  &:hover {
    color: $white;
    @extend .box-shadow-1;

    &::before {
      transform: scaleY(2);
      opacity: 1;
    }
  }

  &.w-100 {
    width: 100%;
  }
  &.w-50 {
    width: 50%;
  }
  &.lg {
    font-size: 24px;
    padding: 30px 30px;
  }
  &.md {
    font-size: 20px;
    padding: 20px 30px;
  }
  &.t-white {
    color: $white;
  }
  &.red {
    border: 1px solid rgba($red, 1);
    background-color: rgba($red, 0.7);
  }
  &.blue {
    border: 1px solid rgba($blue, 1);
    background-color: rgba($blue, 0.7);
  }
  &.indigo {
    border: 1px solid rgba($indigo, 1);
    background-color: rgba($indigo, 0.7);
  }
  &.green {
    border: 1px solid rgba($green, 1);
    background-color: rgba($green, 0.7);
  }
  &.grey {
    border: 1px solid rgba($grey, 1);
    background-color: rgba($grey, 0.7);
  }

  i {
    position: relative;
    left: -10px;
  }
  span {
    // position: relative;
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