<template>
  <button @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    to: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    click() {
      if(this.to) {
        console.log('to:');
        this.$router.push({path: this.to});
      } else {
        this.$emit('click');
      }
    }
  },
}
</script>

<style lang="scss" scoped>

button {
  display: inline-block;
  width: 150px;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid orange;
  background-color: rgba(orange, 0.7);
  font-size: 18px;
  font-weight: 700;
  word-break: break-word;

  &.w-100 {
    width: 100%;
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