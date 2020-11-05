<template>
  <div class="m-textarea">
    <textarea
      :value="value"
      type="text"
      :class="{ 'is-input': inputText }"
      @input="onInput"
      @blur="onBlur"
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
    onBlur() {
      this.$emit("blur");
    },
    onInput(event) {
      this.$emit("input", event.target.value);
    },
  },
  mounted() {
    // console.log('this.value:', this.value);
  }
};
</script>

<style lang="scss" scoped>
.m-textarea {
  position: relative;
  // margin: 20px 0;
  padding: 0;
  display: block;
  width: 100%;
  // transform: translate3d(0, 0, -1000px);
  // opacity: 0;
  // transition: transform 0.3s, opacity 0.4s;

  &.error {
    
    textarea {
    border: 2px solid rgba($red, 0.6);
    border-radius: 5px;
    background-color: rgba($red, 0.2);
      @extend .box-shadow-2;
      & ~ label {
        top: -18px;
        font-size: 12px;
        font-weight: 600;
        color: $red;
        transition: 0.3s;
      }
      &:focus ~ label {
        color: $red;
      }
      & ~ .focus-line {
        background-color: rgba($red, 0.3);
      }
    }
  }

  textarea {
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
    resize: none;

    &:focus {
      @extend .box-shadow-2;
    }

    & ~ label {
      position: absolute;
      z-index: -1;
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
      top: -18px;
      font-size: 12px;
      font-weight: 600;
      transition: 0.3s;
    }
    &:focus ~ label {
      color: $blue;
    }
    & ~ .focus-line {
      position: absolute;
      bottom: 5px;
      left: 50%;
      width: 0;
      height: 2px;
      transition: 0.4s;
      background-color: $blue;
    }
    &:focus ~ .focus-line {
      bottom: 5px;
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

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>