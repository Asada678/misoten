<template>
  <span class="m-chip">
    <slot></slot>
    <i class="fas fa-times" @click="$emit('remove')"></i>
  </span>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.m-chip {
  padding: 5px 15px;
  margin: 5px;
  border-radius: 15px;
  font-weight: 700;
  color: rgba($black, .8);
  @extend .box-shadow-1;

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