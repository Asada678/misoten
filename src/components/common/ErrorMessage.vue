<template>
    <p class="m-error-message">
      <slot></slot>
    </p>
</template>

<script>
export default {
  components: {},
  props: {
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.m-error-message {
  position: absolute;
  color: rgba($color: $red, $alpha: 0.8);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
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