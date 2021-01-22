<template>
  <div class="m-form">
    <input
      :value="value"
      :type="type ? type : 'text'"
      :class="{ 'is-input': inputText }"
      :autocomplete="autocomplete"
      :autofocus="true"
      :inputmode="numeric ? 'numeric' : ''"
      :pattern="numeric ? '\\d*' : ''"
      @input="onInput"
      @blur="onBlur"
    />
    <i v-if="icon" :class="`fas fa-${icon}`"></i>
    <label>{{ label }}</label>
    <span class="focus-line"></span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      // type: String,
      // default: "",
    },
    icon: String,
    label: String,
    type: String,
    autocomplete: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    numeric: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // errorMessage: null,
    };
  },
  computed: {
    inputText() {
      if(this.value === '0' || this.value === 0) {
        return true;
      }
      return this.value;
    },
    // errorMessage() {

    //   return message;
    // },
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    },
    onInput(event) {
      // console.log('event.target.value:', event.target.value);
      this.$emit("input", event.target.value);
    },
  },
  mounted() {
    // console.log('required:', required);
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
.black {
  .m-form {
    input {
      color: $white;
    }
  }
}
.m-form {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 2px solid transparent;
  // transform: translate3d(0, 0, -1000px);
  // opacity: 0;
  transition: all 0.3s;

  &.error {
    border: 2px solid rgba($red, 0.6);
    border-radius: 5px;
    background-color: rgba($red, 0.2);

    input[type="text"],
    input[type="email"],
    input[type="number"],
    input[type="password"] {
      @extend .bs-b-4;
      & ~ label {
        top: -10px;
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

  i {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    transition: 0.3s;
  }

  input[type="text"],
  input[type="email"],
  input[type="number"],
  input[type="password"] {
    font-size: 16px;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    outline: none;
    padding: 4px;
    border: 0;
    border-radius: 2px;
    border-bottom: 1px solid #aaaaaa;
    background-color: transparent;
    transition: 0.3s;
      @extend .bs-b-2;

    &:focus,
    &:hover {
      @extend .bs-b-8;
    }

    & ~ label {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 4px;
      transform: translateY(-50%);
      width: 100%;
      transition: 0.3s;
      letter-spacing: 0.5px;
      color: $grey;
      text-align: left;
      transition: 0.3s;
    }
    &:focus ~ label,
    &:focus ~ i,
    &.is-input ~ label, &.is-input ~ i {
      font-size: 12px;
      top: -10px;
      font-weight: 600;
    }
    &:focus ~ label, &:focus ~ i {
      color: $orange;
    }
    & ~ .focus-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      transition: 0.4s;
      background-color: $orange;
    }
    &:focus ~ .focus-line {
      left: 0;
      width: 100%;
      transition: width 0.4s, left 0.4s;
    }
  }

  &.w-50 {
    width: 50%;
  }
  &.bg-white {
    background-color: rgba($white, 0.6);
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