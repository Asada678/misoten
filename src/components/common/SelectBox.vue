<template>
  <div class="m-select-box">
    <div class="options-container" :class="{ search }">
      <div v-for="option in optionsClone" :key="option.value" class="option">
        <input
          type="radio"
          :id="name + option.value"
          :name="name"
          :value="option.value"
          @change="onChange"
        />
        <label :for="name + option.value">{{ option.text }}</label>
      </div>
    </div>
    <div class="selected" @click="clickSelected">
      <span class="label">{{ label }}</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div v-if="search" class="search-box">
      <m-form :value="word" icon="search" @input="onInput"></m-form>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: Array,
    name: String,
    label: String,
    search: {
      type: Boolean,
      default: false,
    },
    noSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      word: null,
      optionsEl: null,
      optionsClone: [],
    };
  },
  computed: {},
  methods: {
    onChange(event) {
      // console.log("event.target.nextElementSibling :", event.target.nextElementSibling )
      // console.log("this.noSelected:", this.noSelected);
      if (!this.noSelected) {
        this.selectedLabel.innerHTML =
          event.target.nextElementSibling.innerHTML;
      }
      this.optionsContainer.classList.remove("active");
      this.$emit("input", event.target.value);
    },
    clickSelected() {
      this.optionsContainer.classList.toggle("active");
    },
    onInput(searchWord) {
      this.word = searchWord;
      this.optionsClone = this.options.filter((option) =>
        option.text.includes(searchWord)
      );
    },
    addEventToOptions() {
      this.selectedLabel = this.$el.querySelector(".selected .label");
      this.optionsContainer = this.$el.querySelector(".options-container");
      // console.log('this.selectedLabel:', this.selectedLabel);
      // console.log('this.optionsContainer:', this.optionsContainer);
      this.optionsEl = this.$el.querySelectorAll(".option");
      // console.log("options:", options);
      this.optionsEl.forEach((option) => {
        option.addEventListener(this.$store.getters.eventType, () => {
          if (!this.noSelected) {
            this.selectedLabel.innerHTML = option.querySelector(
              "label"
            ).innerHTML;
          }
          this.optionsContainer.classList.remove("active");
        });
      });
    },
  },
  mounted() {
    this.addEventToOptions();
    // console.log("this.options:", this.options);
    this.optionsClone = this.options;
  },
  destroyed() {
    this.optionsEl.forEach((option) => {
      option.removeEventListener(this.$store.getters.eventType, () => {
        if (!this.noSelected) {
          this.selectedLabel.innerHTML = option.querySelector(
            "label"
          ).innerHTML;
        }
        this.optionsContainer.classList.remove("active");
      });
    });
  },
  watch: {
    options() {
      this.optionsClone = this.options;
    },
  },
};
</script>

<style lang="scss" scoped>
.m-select-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5px;
  text-align: left;

  &.disabled {
    .selected {
      background-color: rgba($color: $orange, $alpha: 0.4);
      pointer-events: none;
    }
  }

  .selected {
    position: relative;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: rgba($orange, 0.85);
    color: $white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    @extend .bs-b-8;

    i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      transition: all 0.4s;
    }
  }

  .search-box {
    position: absolute;
    z-index: 200;
    top: 46px;
    left: 10px;
    width: 90%;
    // height: 50px;
    padding: 5px;
    opacity: 0;
    // background-color: rgba($color: $white, $alpha: 1);
    pointer-events: none;
    transition: all 0.4s;
  }

  .options-container {
    position: absolute;
    z-index: 100;
    top: 100%;
    // bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    max-height: 0;
    border-radius: 8px;
    opacity: 0;
    overflow-y: hidden;
    background-color: rgba($color: $white, $alpha: 0.9);
    transition: all 0.4s;
    @extend .bs-b-4;

    &.active {
      max-height: 400px;
      opacity: 1;
      overflow-y: scroll;

      & + .selected i {
        transform: translateY(-50%) rotateZ(180deg);
      }

      & ~ .search-box {
        opacity: 1;
        pointer-events: auto;
      }
    }
    &.search {
      padding-top: 55px;
    }

    .option {
      background-color: rgba($color: $grey, $alpha: 0.3);
      color: rgba($orange, 0.9);
      cursor: pointer;

      label {
        display: block;
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        cursor: pointer;
        transition: .2s;
        &:hover {
          background-color: rgba($orange, 0.1);
        }
      }
      input[type="radio"] {
        display: none;
      }
    }
  }

  .m-error-message {
    top: 100%;
  }

  &.w-50 {
    width: 50%;
  }
  &.w-40 {
    width: 40%;
  }
  &.w-30 {
    width: 30%;
  }
  &.w-25 {
    width: 25%;
  }
}

@media (min-width: 480px) {
  .m-select-box {
    padding: 0 10px;
  }
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>