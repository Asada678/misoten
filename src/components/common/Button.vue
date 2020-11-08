<template>
  <button :disabled="disabled" @click="onClick">
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick(event) {
      event.preventDefault();
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
  min-width: 100px;
  margin: 10px;
  padding: 10px 30px;
  outline: none;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid $orange;
  background-color: rgba($orange, 0.7);
  color: $black;
  font-size: 16px;
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
  &:disabled {
    opacity: .4;
    pointer-events: none;
  }
  i {
    position: relative;
    left: -10px;
  }

  &.w-100 {
    width: calc(100% - 20px);
  }
  &.w-50 {
    width: 75%;
  }
  &.w-50 {
    width: 50%;
  }
  &.w-25 {
    // width: 25%;
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
  &.m-0 {
    margin: 0;
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