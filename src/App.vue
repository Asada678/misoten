<template>
  <div id="app">
    <div id="global-container">
      <UserMenu />
      <MainMenu />
      <float-btn
        icon="chalkboard-teacher"
        color="#304FFE"
        left="20"
        size="70"
        @click="showSnackbar"
      />
      <Snackbar />
      <div
        id="container"
        v-touch:swipe.left="swipeLeft"
        v-touch:swipe.right="swipeRight"
      >
        <transition
          name="fade"
          class=""
          :enter-active-class="enterActiveClass"
          :leave-active-class="leaveActiveClass"
          mode="out-in"
        >
          <!-- <transition name="fade" mode="out-in"> -->
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/common/UserMenu";
import MainMenu from "@/components/common/MainMenu";
import Snackbar from "@/components/common/Snackbar";
export default {
  components: {
    UserMenu,
    MainMenu,
    Snackbar,
  },
  props: {},
  data() {
    return {
      swipe: false,
      enterActiveClass: null,
      leaveActiveClass: null,
    };
  },
  computed: {
    coachBtn() {
      return this.$route.path.includes("/user");
    },
  },
  methods: {
    showSnackbar() {
      const app = document.querySelector(".snackbar");
      app.classList.toggle("appear");
    },
    swipeLeft() {
      this.swipe = true;
      console.log("left:");
      this.enterActiveClass =
        "animate__animated animate__fadeInRight animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutLeft animate__fastest";
      const nextPageName = this.$route.meta.nextPageName;
      if (nextPageName) {
        this.$router.push({ name: nextPageName });
      }
    },
    swipeRight() {
      this.swipe = true;
      console.log("right:");
      this.enterActiveClass =
        "animate__animated animate__fadeInLeft animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutRight animate__fastest";
      const prevPageName = this.$route.meta.prevPageName;
      if (prevPageName) {
        this.$router.push({ name: prevPageName });
      }
    },
  },
  watch: {
    $route(to, from) {
      console.log("this.swipe:", this.swipe);
      if (this.swipe) {
        this.swipe = false;
        console.log("this.swipe:", this.swipe);
        return;
      }
      console.log("after if:");
      console.log("to, from:", to, from);
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      // const toOrder = to.meta.menuOrder;
      // const fromOrder = from.meta.menuOrder;
      if (toDepth < fromDepth) {
        // if (toOrder < fromOrder) {
        this.enterActiveClass =
          "animate__animated animate__fadeInLeft animate__fastest";
        this.leaveActiveClass =
          "animate__animated animate__fadeOutRight animate__fastest";
        return;
      }
      // if (toOrder > fromOrder) {
      if (toDepth > fromDepth) {
        this.enterActiveClass = this.leaveActiveClass =
          "animate__animated animate__fadeInRight animate__fastest";
        this.leaveActiveClass =
          "animate__animated animate__fadeOutLeft animate__fastest";
        return;
      }
      this.enterActiveClass =
        "animate__animated animate__fadeIn animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOut animate__fastest";
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
#global-container {
  position: relative;
  width: 100%;
  min-height: 101vh;
  // overflow-y: scroll;
  overflow-x: hidden;
}
#container {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 100px 0;
}

.user-page {
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - #{$MobileMainMenuHeight});
  background-color: #eee;
  @extend .container-padding;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.animate__fastest {
  --animate-duration: 0.3s;
}
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
  #container {
    position: absolute;
    left: $desktopMainMenuWidth;
    right: 0;
    width: calc(100% - #{$desktopMainMenuWidth});
    margin: 0;
    padding: 100px 30px;
  }
  .user-page {
    position: absolute;
    right: 0;
  }
}

@media (min-width: 1200px) {
}
</style>
