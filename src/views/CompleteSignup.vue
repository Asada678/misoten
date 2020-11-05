<template>
  <div class="complete-user-register">
    <m-header>
      <span>ユーザー登録完了！</span>
    </m-header>

    <m-button class="w-100 lg green" icon="sign-in-alt" to="/user/set-target"
      >目標設定へ進む</m-button
    >
    <m-button class="w-100 lg grey" icon="user" to="/"
      >目標は後で設定する</m-button
    >
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
.complete-user-register {
  @extend .fixed-page;
  display: flex;
  flex-direction: column;
  justify-content: center;
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