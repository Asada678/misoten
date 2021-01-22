<template>
  <div class="m-form-group">
    <p v-if="label" class="label">{{ label }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    label: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.m-form-group {
  position: relative;
  // z-index: auto;
  width: 100%;
  margin-bottom: 40px;
  // box-shadow: 0 1px 100px -30px rgba($black, .1);

  .label {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 3px;
  }

  &.m-sm {
    margin-bottom: 20px;
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