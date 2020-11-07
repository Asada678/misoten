<template>
  <div>
    <div class="group-card">
      <div class="icon-box">
        <img src="/img/kuma.png" alt="" />
      </div>
      <div class="content-box">
        <h2 class="group-name">グループ名</h2>
        <p class="latest-message">最新メッセージ</p>
      </div>
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
.group-card {
  position: relative;
  display: flex;
  width: 100%;
  max-height: 200px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 2px;
  background-color: rgba($black, 0.8);
  box-shadow: 0px 1px 2px 1px rgba($color: $white, $alpha: 0.4),
    0px -1px 2px 1px rgba($color: $white, $alpha: 0.2);

  .icon-box {
    display: flex;
    align-items: center;
    width: 50px;

    img {
      width: 50px;
      border-radius: 50%;
    }
  }
  .content-box {
    width: calc(100% - 50px);
    padding: 0 10px;

    .group-name {
      font-weight: 900;
      color: $white;
      border-bottom: 1px solid $white;
    }
    .latest-message {
      padding: 10px;
      color: $white;
    }
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