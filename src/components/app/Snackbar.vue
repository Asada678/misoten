<template>
  <div class="snackbar">
    <p>通知を表示します。</p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
      adipisci!
    </p>
  </div>
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
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: fixed;
  z-index: 500;
  top: $userMenuHeight + 20px;
  left: 0;
  right: 0;
  width: 90%;
  max-width: 400px;
  min-height: 60px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  color: #222222;
  background-color: #ffb74d;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-50px);
  transition: all 0.3s;

  &.appear {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
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