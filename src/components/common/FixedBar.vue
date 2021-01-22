<template>
  <nav class="m-fixed-bar">
    <i class="fas fa-chevron-left" @click="$router.go(-1)"></i>
    <span class="nav-title">{{ $route.meta.navLabel }}</span>
    <i
      v-if="$store.getters.user.username && pathIsProfile"
      class="fas fa-sign-out-alt"
      @click="onClick"
    ></i>
  </nav>
</template>

<script>
import so from "@/libs/scroll";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    pathIsProfile() {
      return this.$route.path === "/user/profile";
    },
  },
  methods: {
    onClick() {
      console.log("on click:");
      this.$emit("logout");
    },
    fixedBarAnimation(el, value) {
      // console.log("el, value:", el, value);
      const fixedBar = this.$el;
      if (value) {
        fixedBar.classList.remove("active");
      } else {
        fixedBar.classList.add("active");
      }
    },
  },
  created() {},
  mounted() {
    const observer = document.createElement('div');
    observer.id = 'fixed-bar-observer';
    // console.log('observer:', observer);
    this.$el.parentNode.insertBefore(observer, this.$el);
    new so("#fixed-bar-observer", this.fixedBarAnimation, { once: false });
  },
};
</script>

<style lang="scss" scoped>
.m-fixed-bar {
  position: fixed;
  z-index: 20;
  // top: $userMenuHeight;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: $appMaxWidth;
  height: 40px;
  // margin-bottom: 20px;
  padding: 10px;
  background-color: $orange;
  transition: 0.5s;

  &.active {
    @extend .bs-b-4;
  }

  .nav-title {
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    color: $black;
    text-align: center;
  }

  i {
    font-size: 30px;
    color: $black;

    &.fa-sign-out-alt {
      // color: $red;
    }
  }
  .list-container {
    position: fixed;
    z-index: 1100;
    right: 0;
    width: 100%;

    &-inner {
      position: relative;
      width: 100%;
      // max-width: $containerMaxWidth;
      margin: 0 auto;
    }
  }

  &-ul {
    position: absolute;
    z-index: 1000;
    top: $userMenuHeight;
    right: 0;
    width: 200px;
    opacity: 0;
    visibility: hidden;
    // background-color: rgba($orange, 0.8);
    transform: translateX(100%);
    transition: all 0.3s;
    @extend .bs-b-8;

    &.user-menu-open {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    li {
      position: relative;
      height: 50px;
      width: 100%;
      line-height: 30px;
      list-style: none;
      // margin: 10px 0;
      border-bottom: 1px solid $orange;
      background-color: rgba(grey, 0.9);
      overflow: hidden;
      cursor: pointer;

      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;

        &.router-link-active {
          background-color: rgba($orange, 0.3);
          font-weight: 600;
        }
      }
      i {
        position: absolute;
        top: 50%;
        left: 20px;
        width: 30px;
        color: $white;
        font-size: 20px;
        text-align: center;
        transform: translateY(-50%);
      }

      span {
        position: absolute;
        top: 50%;
        left: 70px;
        color: $white;
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

@media (min-width: 768px) {
  .coach {
    .m-fixed-bar {
      padding-left: $mainMenuWidth + 10px;
    }
  }
}

@media (min-width: 1200px) {
}
</style>