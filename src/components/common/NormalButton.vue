<template>
  <button @click="click">
    <i :class="`fas fa-${icon}`"></i>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    icon: String,
    to: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    click() {
      if (this.to) {
        console.log("to:");
        this.$router.push({ path: this.to });
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  display: inline-block;
  width: 150px;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid $orange;
  background-color: rgba($orange, 0.7);
  color: $black;
  font-size: 18px;
  font-weight: 700;
  word-break: break-word;

  &.w-100 {
    width: 100%;
  }
  &.t-white {
    color: $white;
  }

  &.blue {
    border: 1px solid rgba($blue, 1);
    background-color: rgba($blue, .7);
  }
  &.indigo {
    border: 1px solid rgba($indigo, 1);
    background-color: rgba($indigo, .7);
  }
  &.grey {
    border: 1px solid rgba($grey, 1);
    background-color: rgba($grey, .7);
  }

  i {
    position: relative;
    left: -10px;
  }
  span {
    // position: relative;
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