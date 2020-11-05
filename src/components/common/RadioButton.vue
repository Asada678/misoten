<template>
  <div class="m-radio">
    <span v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="option.value"
        :name="name"
        :value="option.value"
        @change="onChange"
      />
      <label :for="option.value" :class="option.color">
        <i :class="`fas fa-${option.icon}`"></i>
        {{ option.label }}
      </label>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: Array,
    name: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onChange(event) {
      console.log("event:", event);
      this.$emit("input", event.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.m-radio {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  span {
    display: inline-block;
    width: 48%;
    max-width: 250px;
    margin: 1%;
  }
  input {
    display: none;
    &[type="radio"]:checked {
      & + label {
        @extend .box-shadow-2;
        &.blue {
          background-color: rgba($blue, 0.4);
          border: 2px solid rgba($blue, 0.7);
          color: $blue;
        }
        &.red {
          background-color: rgba($red, 0.4);
          border: 2px solid rgba($red, 0.7);
          color: $red;
        }
        &.pink {
          background-color: rgba($pink, 0.4);
          border: 2px solid rgba($pink, 0.7);
          color: $pink;
        }
        &.indigo {
          background-color: rgba($indigo, 0.4);
          border: 2px solid rgba($indigo, 0.7);
          color: $indigo;
        }
      }
    }
  }
  label {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    border: 2px solid $grey;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
    color: $grey;
    cursor: pointer;
    transition: 0.2s;

    i {
      position: relative;
      left: -10px;
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