<template>
  <a class="float-btn" @click="openDialog">
    <i class="fas fa-chalkboard-teacher"></i>
  </a>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    openDialog() {
      
      
    },
  },
};
</script>

<style lang="scss" scoped>
.float-btn {
  position: fixed;
  z-index: 1000;
  bottom: 80px;
  left: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(royalblue, 0.8);
  font-size: 32px;
  overflow: hidden;
  cursor: pointer;
  line-height: 70px;
  outline: none;
  text-align: center;
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