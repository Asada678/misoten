<template>
  <div class="first-access">
    <div class="first-access-container">
      <m-button class="w-100 lg" icon="user-plus" to="/signup"
        >ユーザー登録</m-button
      >
      <m-button class="w-100 lg blue" icon="sign-in-alt" to="/login"
        >ログイン</m-button
      >
      <m-button class="w-100 lg grey" icon="user" to="/"
        >ゲストとして利用</m-button
      >
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
  methods: {
  },
  created() {
    // const snackbar = {
    //   text: "",
    //   color: "blue",
    // };
    //   this.$store.commit("setSnackbar", snackbar);
  },
};
</script>

<style lang="scss" scoped>
.first-access {
  @extend .fixed-page;
  display: flex;
  align-items: center;

  &-container {
    @extend .fixed-page-container;
    display: flex;
    flex-direction: column;
    width: 100%;
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