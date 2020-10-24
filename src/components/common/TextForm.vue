<template>
  <div class="m-form">
    <input
      :value="value"
      type="text"
      :class="{ 'is-input': inputText }"
      @input="onInput"
    />
    <label>{{ label }}</label>
    <span class="focus-line"></span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: String,
    label: String,
  },
  data() {
    return {};
  },
  computed: {
    inputText() {
      return this.value;
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.m-form {
  position: relative;
  margin: 20px 0;
  padding: 0;
  display: block;
  width: 100%;
  // transform: translate3d(0, 0, -1000px);
  // opacity: 0;
  // transition: transform 0.3s, opacity 0.4s;

  input[type="text"] {
    font-size: 20px;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    outline: none;
    padding: 4px 0;
    border: 0;
    border-bottom: 1px solid #aaaaaa;
    background-color: transparent;

    & ~ label {
      position: absolute;
      // z-index: -1;
      top: 4px;
      left: 0;
      width: 100%;
      transition: 0.3s;
      letter-spacing: 0.5px;
      color: #aaaaaa;
      text-align: left;
    }
    &:focus ~ label,
    &.is-input ~ label {
      font-size: 12px;
      top: -16px;
      transition: 0.3s;
      font-weight: 600;
    }
    &:focus ~ label {
      color: #6585c7;
    }
    & ~ .focus-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      transition: 0.4s;
      background-color: #6585c7;
    }
    &:focus ~ .focus-line {
      left: 0;
      width: 100%;
      transition: width 0.4s, left 0.4s;
    }
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