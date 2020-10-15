<template>
  <div class="user-menu-container">
    <nav class="user-menu">
      <i v-if="backBtn" class="fas fa-chevron-left" @click="back"></i>
      <img class="user-icon" src="/img/kuma.png" alt="" @click="toggleMenu" />
    </nav>
    <ul class="user-menu-list">
      <li v-for="link in links" :key="link.to">
        <router-link :to="`/user${link.to}`" exact>
          <i :class="`fas fa-${link.icon}`"></i>
          <span>{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      links: [
        { text: "AIコーチ", icon: "user-graduate", to: "/coach" },
        { text: "称号", icon: "crown", to: "/title" },
        { text: "設定", icon: "cog", to: "/config" },
        { text: "言語", icon: "globe", to: "/language" },
      ],
      // backBtn: false,
    };
  },
  computed: {
    backBtn() {
      return this.$route.path.includes("/user");
    },
  },
  methods: {
    back() {
      // while(this.$route.path.includes('/user')) {
      //   this.$router.go(-1);
      // }
    },
    toggleMenu() {
      const app = document.querySelector(".user-menu-list");
      app.classList.toggle("user-menu-open");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.user-menu {
  position: fixed;
  z-index: 1200;
  top: 0;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $userMenuHeight;
  padding: 0 5%;
  background-color: rgba(255, 165, 0, 0.9);

  .user-icon {
    position: absolute;
    // top: 50%;
    right: 5%;
    // transform: translateY(-50%);
    width: $userMenuHeight * 0.9;
    height: $userMenuHeight * 0.9;
    border-radius: 50%;
    cursor: pointer;
  }
}

.user-menu-list {
  position: fixed;
  top: $userMenuHeight;
  right: 0;
  width: 200px;
  opacity: 0;
  visibility: hidden;
  // background-color: rgba(255, 165, 0, 0.8);
  transform: translateY(-100%);
  transition: all 0.3s;
  
  &.user-menu-open {
    z-index: 1200;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  li {
    height: 50px;
    width: 100%;
    line-height: 30px;
    list-style: none;
    // margin: 10px 0;
    border-bottom: 1px solid orange;
    background-color: rgba(grey, 0.9);

    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;

      &.router-link-active {
        background-color: rgba(orange, 0.3);
        font-weight: 600;
      }
      i {
        position: absolute;
        top: 50%;
        left: 20px;
        width: 30px;
        color: #eee;
        font-size: 20px;
        text-align: center;
        transform: translateY(-50%);
      }

      span {
        position: absolute;
        top: 50%;
        left: 70px;
        color: #eee;
        transform: translateY(-50%);
        font-size: 18px;
      }
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
  .user-menu-list {
    right: 5%;
  }
}

@media (min-width: 1200px) {
}
</style>