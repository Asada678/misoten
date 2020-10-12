<template>
  <a class="float-btn" @click="openDialog">
    <i class="fas fa-pen"></i>
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
      const app = document.querySelector("#app");
      app.classList.add("dialog-open");
    }
  },
};
</script>

<style lang="scss" scoped>
.float-btn {
  position: fixed;
  z-index: 1000;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(orange, 0.8);
  font-size: 24px;
  overflow: hidden;
  cursor: pointer;
  line-height: 50px;
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