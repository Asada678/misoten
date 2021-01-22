<template>
  <span
    class="m-chip"
    :class="{ border, shadow, small }"
    @click="$emit('click')"
  >
    <slot></slot>
    <i v-if="removable" class="fas fa-times" @click="$emit('remove')"></i>
  </span>
</template>

<script>
export default {
  components: {},
  props: {
    removable: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.black {
  .m-chip {
    background-color: rgba($charcoal, 0.7);
  }
}
.black,
.blue {
  .m-chip {
    color: rgba($white, 0.7);
    &.border {
      border: 2px solid rgba($white, 0.5);
      &.active {
        color: rgba($white, 0.9);
        border: 2px solid rgba($white, 0.9);
      }
    }
    &.shadow {
      @extend .bs-b-2-w;
    }
  }
}
.m-chip {
  display: inline-block;
  padding: 0px 15px;
  margin: 5px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  color: rgba($charcoal, 0.7);
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    @extend .bs-b-4;
  }
  &.shadow {
    @extend .bs-b-4;
  }
  &.border {
    border: 2px solid rgba($charcoal, 0.7);
  }
  &.small {
    padding: 2px 5px;
  }
  &.active {
    border: 2px solid rgba($black, 0.7);
    background-color: rgba($orange, 0.8);
    color: rgba($black, 0.8);
    // box-shadow: 0 3px 2px rgba($black, 0.2), 0 0px 10px rgba($black, 0.2);
    @extend .bs-b-4;

    &:hover {
      @extend .bs-b-8;
    }
  }
  &.w-50 {
    width: 50%;
  }
  i {
    margin-left: 20px;
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