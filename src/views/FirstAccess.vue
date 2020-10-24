<template>
  <div class="first-access">
    <div class="first-access-container">
      <m-button class="w-100" to="/signup">ユーザー登録</m-button>
      <m-button class="w-100" to="/login">ログイン</m-button>
      <m-button class="w-100" to="/">ゲストとして利用</m-button>
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
.first-access {
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

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>