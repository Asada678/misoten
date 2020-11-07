<template>
  <ul class="m-tabs">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    this.$el.firstChild.classList.add('active');
    console.log('this.$el.childNodes.length:', this.$el.childNodes.length);
    this.$el.childNodes.forEach(el => {
      el.style.width = `${100 / this.$el.childNodes.length}%`;
    })
  }
};
</script>

<style lang="scss" scoped>
.m-tabs {
  position: relative;
  z-index: 1;
  display: flex;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  width: 100%;
  box-shadow: -1px -1px 1px rgba($color: $black, $alpha: 0.2),
    1px 1px 1px rgba($color: $black, $alpha: 0.2),
    3px 3px 3px rgba($color: $black, $alpha: 0.2);
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