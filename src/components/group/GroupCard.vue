<template>
  <div class="group-card">
    <router-link :to="`/group/room/${group.id}`">
      <div class="icon-box">
        <img :src="group.groupIcon" alt="group icon" />
      </div>
      <div class="content-box">
        <h2 class="group-name">{{ group.groupName }}</h2>
        <p class="latest-message">{{ group.latestMessage }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    group: Object,
  },
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
  margin: 5px 0;
  padding: 10px;
  border-radius: 2px;
  background-color: rgba($orange, 0.2);
  // background-color: rgba($black, 0.2);
  color: $black;
  @extend .box-shadow-2;

  a {
    // position: absolute;
    // top: 0;
    // left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    color: $black;
  }

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
      border-bottom: 1px solid $orange;
    }
    .latest-message {
      padding: 10px;
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