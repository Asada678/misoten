<template>
  <div class="m-range">
    <input type="range" :max="maxValue" :min="minValue" :value="inputValue" />
    <!-- <div class="selected-value">{{ selectedValue }}{{ unit }}</div> -->
    <m-chip class="active w-50" border>{{ selectedValue }}{{ unit }}</m-chip>
    <div class="selector">
      <div class="range-value">
        <!-- {{ selectedValue }} -->
      </div>
      <div class="selector-button">
        <!-- <i class="fas fa-arrows-alt-h"></i> -->
      </div>
    </div>
    <div class="divisions"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    division: {
      type: Boolean,
      default: false,
    },
    max: String,
    min: String,
    number: {
      type: Boolean,
      default: false,
    },
    options: Array,
    unit: String,
    value: [String, Number],
  },
  data() {
    return {
      range: null,
      inputValue: null,
      selectedValue: null,
      maxValue: null,
      minValue: 0,
      diff: 0,
    };
  },
  computed: {},
  methods: {
    moveSelector(value) {
      const selector = this.$el.querySelector(".selector");
      if (this.options) {
        selector.style.left = `${(value / this.maxValue) * 100}%`;
      } else if (this.number) {
        selector.style.left = `${((value - this.minValue) / this.diff) * 100}%`;
      }
    },
    onInput(event) {
      if (event) {
        this.inputValue = event.target.value;
      } else if (this.value) {
        this.inputValue = this.value;
      }

      if (this.options) {
        this.selectedValue = this.options[this.inputValue];
      } else {
        this.selectedValue = this.inputValue;
      }

      this.moveSelector(this.inputValue);
      this.$emit("input", this.inputValue);
    },
    createDivisions() {
      const divisions = this.$el.querySelector(".divisions");
      let optionsLength;
      if (this.options) {
        optionsLength = this.options.length;
      } else {
        optionsLength = 5;
      }
      for (let i = 0; i < optionsLength; i++) {
        const division = document.createElement("div");
        division.classList.add("division");
        division.style.left = `${(i / (optionsLength - 1)) * 100}%`;
        if (this.options) {
          division.setAttribute("data-content", this.options[i]);
        } else {
          division.setAttribute(
            "data-content",
            this.minValue + this.diff * 0.25 * i + this.unit
          );
        }
        divisions.appendChild(division);
      }
    },
  },
  created() {
    if (this.options) {
      this.maxValue = this.options.length - 1;
      this.inputValue = Math.floor(this.maxValue / 2);
      this.selectedValue = this.options[this.inputValue];
    } else {
      this.maxValue = Number(this.max);
      this.minValue = Number(this.min);
      this.inputValue = Math.floor((this.maxValue + this.minValue) / 2);
      this.selectedValue = this.inputValue;
    }
    this.diff = this.maxValue - this.minValue;
  },
  mounted() {
    this.range = this.$el.querySelector('input[type="range"]');
    this.range.addEventListener("input", this.onInput);

    this.onInput();
    this.createDivisions();
  },
  destroyed() {
    this.range.removeEventListener("input", this.onInput);
  },
};
</script>

<style lang="scss" scoped>
$selectorButtonSize: 20px;
.m-range {
  position: relative;
  width: calc(100% - #{$selectorButtonSize} * 2);
  height: 60px;
  margin: 0 auto;

  input[type="range"] {
    position: absolute;
    z-index: 10;
    bottom: $selectorButtonSize / 2;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 3px;
    // border-radius: 3px;
    background-color: $charcoal;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    @extend .bs-b-2;

    &::-webkit-slider-thumb {
      position: relative;
      z-index: 10;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: transparent;
      // background-color: $red;
      border: none;
      cursor: pointer;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
    }
    &:active ~ .selector .selector-button {
      transform: scale(1.1);
      @extend .bs-b-8;
    }
  }

  .selected-value {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 20px;
    border-radius: 50%;
    background-color: $orange;
    font-weight: 700;
    line-height: 60px;
    @extend .bs-b-4;
  }

  .selector {
    position: absolute;
    z-index: 20;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    // width: 30px;
    padding-bottom: 3px;
    pointer-events: none;
    transition: 0.3s;

    .selector-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $selectorButtonSize;
      width: $selectorButtonSize;
      background-color: $orange;
      border-radius: 50%;
      transition: 0.2s;
      @extend .bs-b-4;

      i {
        color: $black;
        font-size: 24px;
      }
    }

    .range-value {
      // position: absolute;
      // z-index: 2;
      // bottom: -20px;
      // top: 0;
      z-index: 2;
      // left: 50%;
      // transform: translate(-50%, -50%);
      // transform: translateY(-50%);
      // width: 60px;
      // height: 30px;
      background-color: $orange;
    }
  }

  ::v-deep .divisions {
    position: absolute;
    z-index: 0;
    bottom: $selectorButtonSize * 0.9;
    // transform: translateX(-50%);
    width: 100%;

    .division {
      position: absolute;
      top: 0;
      width: 2px;
      height: $selectorButtonSize / 2;
      background-color: $charcoal;
      @extend .bs-b-2;

      &::before {
        content: attr(data-content);
        position: absolute;
        top: $selectorButtonSize * 0.9;
        transform: translateX(-50%);
        font-size: 10px;
        word-break: keep-all;
      }
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