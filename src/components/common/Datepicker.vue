<template>
  <div class="m-datepicker">
    <datepicker
      :class="{ 'is-input': inputText }"
      :format="format"
      :language="languages[language]"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    ></datepicker>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as languages from "vuejs-datepicker/src/locale";
export default {
  components: {
    Datepicker,
  },
  props: {
    value: Date,
    label: String,
    type: String,
  },
  data() {
    return {
      language: "ja",
      languages,
      format: "yyyy-MM-dd",
      inputText: false,
    };
  },
  computed: {
    // inputText() {
    //   return this.value;
    // },
  },
  methods: {
    onBlur() {
      // console.log('datepicker blur:', );
      this.$emit("blur");
    },
    onInput(event) {
      if (event) {
        this.inputForm.classList.add("is-input");
      } else {
        this.inputForm.classList.remove("is-input");
      }
      this.$emit("input", event);
    },
  },
  mounted() {
    this.inputForm = document.querySelector('.m-datepicker input[type="text"]');
    const label = document.createElement("label");
    label.innerText = this.label;
    const span = document.createElement("span");
    span.classList.add("focus-line");
    this.inputForm.parentElement.appendChild(label);
    this.inputForm.parentElement.appendChild(span);

    if (this.value) {
      this.inputText = !!this.value;
    }
  },
};
</script>

<style lang="scss">
.m-datepicker {
  position: relative;
  padding: 0;
  display: block;
  width: 100%;

  .is-input {
    input[type="text"] {
      & ~ label {
        font-size: 12px;
        top: -5px;
        transition: 0.3s;
        font-weight: 600;
      }
    }
  }

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
    transition: .3s;

    &:focus, &:hover {
      @extend .box-shadow-2;
    }

    & ~ label {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      transition: 0.3s;
      letter-spacing: 0.5px;
      color: #aaaaaa;
      text-align: left;
    }
    &:focus ~ label {
      font-size: 12px;
      top: -5px;
      transition: 0.3s;
      font-weight: 600;
    }
    &:focus ~ label {
      color: $blue;
    }
    & ~ .focus-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      transition: 0.4s;
      background-color: $blue;
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

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>