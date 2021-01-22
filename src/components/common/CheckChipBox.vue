<template>
  <div class="m-chip-check">
    <m-chip
      v-for="option in options"
      border
      :key="option.value"
      :class="{ active: checkedItems.includes(option.value) }"
    >
      <input
        type="checkbox"
        :id="option.value"
        :name="name"
        :value="option.value"
        v-model="checkedItems"
        @change="onChange"
      />
      <label :for="option.value" :class="option.color">
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
    name: String,
    options: Array,
    value: Array,
  },
  data() {
    return {
      checkedItems: [],
    };
  },
  computed: {},
  methods: {
    onChange() {
      // console.log('this.checkedItems:', this.checkedItems);
      // console.log("event.target.value:", event.target.value);
      // console.log("event.target.checked:", event.target.checked);
      this.$emit("input", this.checkedItems);
    },
  },
  created() {
    if (this.value) {
      this.checkedItems = this.value;
    }
    this.onChange();
  },
};
</script>
<style lang="scss" scoped>
// .black {
//   .m-radio {
//     color: $white;
//   }
// }
.m-chip-check {
  // display: flex;
  // flex-wrap: wrap;
  justify-content: space-evenly;
  color: rgba($black, 0.9);
  text-align: center;

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