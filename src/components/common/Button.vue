<template>
  <button :disabled="disabled || loading" :class="{ loading }" @click="onClick">
    <i :class="`fas fa-${icon}`"></i>
    <span>
      <slot v-if="!loading"></slot>
      <i v-else class="fas fa-spinner"></i>
    </span>
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    icon: String,
    to: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick(event) {
      event.preventDefault();
      if (this.to) {
        // console.log("to:");
        this.$router.push(this.to);
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.black {
  button {
    color: $white;
    i:not(.fa-spinner) {
      color: $white;
  }
  }
}
button {
  position: relative;
  z-index: 10;
  display: inline-block;
  min-width: 100px;
  margin: 10px;
  padding: 5px 20px;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid $orange;
  background-color: rgba($orange, 0.8);
  color: $black;
  // font-size: 16px;
  font-weight: 700;
  word-break: break-word;
  overflow: hidden;
  transition: 0.5s;
  @extend .bs-b-4;

  span {
    letter-spacing: 1.5px;
  }

  &.loading {
    .fa-spinner {
      font-size: 20px;
      animation: spin 1.2s linear infinite;
    }
  }

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

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
  i:not(.fa-spinner) {
    position: relative;
    left: -10px;
    color: $black;
    transition: 0.5s;
  }

  &:hover {
    color: $white;
    @extend .bs-b-8;

    &::before {
      transform: scaleY(2);
      opacity: 1;
    }

    i {
      color: $white;
    }
  }
  &.w-100 {
    width: calc(100% - 20px);
  }
  &.w-75 {
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
    background-color: rgba($red, 0.8);
  }
  &.blue {
    border: 1px solid rgba($blue, 1);
    background-color: rgba($blue, 0.8);
  }
  &.indigo {
    border: 1px solid rgba($indigo, 1);
    background-color: rgba($indigo, 0.8);
  }
  &.green {
    border: 1px solid rgba($green, 1);
    background-color: rgba($green, 0.8);
  }
  &.grey {
    border: 1px solid rgba($grey, 1);
    background-color: rgba($grey, 0.8);
  }
  &.m-0 {
    margin: 0;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
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