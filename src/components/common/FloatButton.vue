<template>
  <a class="float-btn" @click="$emit('click')">
    <i :class="`fas fa-${icon}`"></i>
  </a>
</template>

<script>
export default {
  components: {},
  props: {
    icon: String,
    size: String,
    color: String,
    top: String,
    bottom: String,
    left: String,
    right: String,
  },
  data() {
    return {
      floatBtn: null,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.floatBtn = this.$el;
    if (this.size) {
      this.floatBtn.style.width = `${this.size}px`;
      this.floatBtn.style.height = `${this.size}px`;
      this.floatBtn.style.lineHeight = `${this.size}px`;
      this.floatBtn.style.fontSize = `${(24 * this.size) / 50}px`;
    }
    if (this.color) {
      let color = this.color;
      if (color.slice(0, 1) == "#") color = color.slice(1);
      if (color.length == 3) {
        color =
          color.slice(0, 1) +
          color.slice(0, 1) +
          color.slice(1, 2) +
          color.slice(1, 2) +
          color.slice(2, 3) +
          color.slice(2, 3);
      }
      // console.log("this.color:", this.color);
      const R = parseInt(color.slice(0, 2), 16);
      const G = parseInt(color.slice(2, 4), 16);
      const B = parseInt(color.slice(4, 6), 16);

      this.floatBtn.style.backgroundColor = `rgba(${R},${G},${B}, 0.8)`;
    }
    if (this.top) this.floatBtn.style.top = `${this.top}px`;
    if (this.bottom) this.floatBtn.style.bottom = `${this.bottom}px`;
    if (this.left) this.floatBtn.style.left = `${this.left}px`;
    if (this.right) this.floatBtn.style.right = `${this.right}px`;
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.float-btn {
  position: fixed;
  z-index: 1050;
  bottom: $mobileMainMenuHeight + 20px;
  // left: 20px;
  width: $defaultFloatButtonSize;
  height: $defaultFloatButtonSize;
  border-radius: 50%;
  background-color: rgba($orange, 0.85);
  font-size: 24px;
  overflow: hidden;
  cursor: pointer;
  line-height: $defaultFloatButtonSize;
  outline: none;
  text-align: center;
  box-shadow: 2px 2px 10px 0px rgba($black, 0.4);

  &.red {
    border: 1px solid $red;
    background-color: rgba($red, 0.85);
  }
  &.blue {
    border: 1px solid $blue;
    background-color: rgba($blue, 0.85);
  }
  &.green {
    border: 1px solid $green;
    background-color: rgba($green, 0.85);
  }
  &.black {
    border: 1px solid $black;
    background-color: rgba($black, 0.85);
  }

  i {
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