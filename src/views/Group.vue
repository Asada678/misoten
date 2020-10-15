<template>
  <div>
    <p>This is a Group page!</p>
    <float-button icon="user" size="70" right="40" color="#E53935" />
    <m-button @click="test">test</m-button>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {},
  data() {
    return {
      name: null,
      area: null,
    };
  },
  computed: {},
  methods: {
    test() {
      console.log('this.name, this.area:', this.name, this.area);
    }
  },
};
</script>

<style lang="scss" scoped>


@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>