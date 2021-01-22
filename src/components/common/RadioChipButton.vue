<template>
  <div class="m-chip-radio">
    <m-chip
      v-for="option in options"
      border
      :key="option.value"
      :class="{ active: option.value == selected }"
    >
      <input
        type="radio"
        :id="option.value"
        :name="name"
        :value="option.value"
        @change="onChange"
      />
      <label :for="option.value">
        {{ option.label }}
      </label>
    </m-chip>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: Array,
    name: String,
    value: String,
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {},
  methods: {
    onChange(event) {
      if (event) {
        this.selected = event.target.value;
      } else {
        this.selected = this.value;
      }
      // console.log("event:", event);
      // console.log('this.selected:', this.selected);
      this.$emit("input", this.selected);
    },
  },
  created() {
    // console.log('radio chip this.value:', this.value);
    this.onChange();
  },
};
</script>
<style lang="scss" scoped>
.black {
  .m-radio {
    color: $white;
  }
}
.m-chip-radio {
  // display: flex;
  // flex-wrap: wrap;
  justify-content: space-evenly;
  color: rgba($black, 0.9);
  .m-chip {
    padding: 0;

    label {
      display: block;
      width: 100%;
      cursor: pointer;
    }
    input {
      display: none;
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