<template>
  <div class="m-user-card" :class="user.state">
    <p>{{ user.state }}</p>
    <div class="icon-box">
      <img :src="userIcon" alt="" />
    </div>
    <div class="username">
      <p>{{ username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    user: Object,
  },
  data() {
    return {
      state: 'offline',
      userIcon: "/img/kuma.png",
      username: "ゲスト",
      userInfo: {},
    };
  },
  computed: {},
  methods: {
    fetchUserInfo() {
      if (this.user.userRef) {
        this.user.userRef.get().then((doc) => {
          // console.log("doc.data():", doc.data());
          if (doc.exists) {
            this.userIcon = doc.data().userIcon;
            this.username = doc.data().username;
          }
        });
      }
    },
  },
  created() {
    this.fetchUserInfo();
  },
  mounted() {},
  watch: {
    user() {
      this.fetchUserInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.m-user-card {
  position: relative;
  // display: flex;
  display: inline-block;
  flex-direction: column;
  width: 80px;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  background-color: $white;
  color: $black;
  @extend .bs-b-8;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  &.offline::before {
    background-color: rgba($black, 0.2);
  }

  .icon-box {
    width: 100%;
    img {
      width: 100%;
      border-radius: 50%;
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