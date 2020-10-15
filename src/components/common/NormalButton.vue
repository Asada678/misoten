<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
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

button {
  display: inline-block;
  width: 150px;
  padding: 10px;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid orange;
  background-color: rgba(orange, 0.7);
  font-size: 18px;
  font-weight: 700;
}


@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
}

@media (min-width: 1200px) {
}
</style>