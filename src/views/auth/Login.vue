<template>
  <div class="login">
    <div class="login-container">
      <m-form label="mail"></m-form>
      <m-form label="password"></m-form>
      <m-button class="w-100 blue">ログイン</m-button>
    </div>
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
.login {
  @extend .fixed-page;

  &-container {
    @extend .fixed-page-container;
    display: flex;
    flex-direction: column;
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