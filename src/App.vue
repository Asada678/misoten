<template>
  <div id="app">
    <div
      id="global-container"
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
    >
      <UserMenu />
      <Snackbar />
      <div id="container">
        <float-button
          icon="chalkboard-teacher"
          color="#304FFE"
          left="20"
          size="70"
          @click="showSnackbar"
        />
        <MainMenu />
        <div id="content-wrapper">
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
  </div>
</template>

<script>
import UserMenu from "@/components/app/UserMenu";
import MainMenu from "@/components/app/MainMenu";
import Snackbar from "@/components/app/Snackbar";
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
      const snackbar = document.querySelector(".snackbar");
      snackbar.classList.toggle("appear");
    },
    swipeLeft() {
      this.addSwiping();
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
      this.removeSwiping();
    },
    async swipeRight() {
      this.addSwiping();
      this.swipe = true;
      console.log("right:");
      this.enterActiveClass =
        "animate__animated animate__fadeInLeft animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutRight animate__fastest";
      const prevPageName = this.$route.meta.prevPageName;
      if (prevPageName) {
        await this.$router.push({ name: prevPageName });
      }
      await this.removeSwiping();
    },
    addSwiping() {
      const globalContainer = document.querySelector("#global-container");
      globalContainer.classList.add("swiping");
    },
    removeSwiping() {
      // const globalContainer = document.querySelector("#global-container");
      // globalContainer.classList.remove("swiping");
    },
  },
  mounted(){
    const container = document.querySelector('#container');
    container.addEventListener('click', (event) => {
      console.log('event.target:', event.target);
      if(!event.target.classList.contains('options')) {
        const options = document.querySelector('.options');
        options.classList.remove('open')
      }
    })
  },
  watch: {
    $route(to, from) {
      // console.log("this.swipe:", this.swipe);
      const target = document.querySelector(`a[href="${to.path}"]`);
      const ripple = document.createElement("small");
      target.appendChild(ripple);
      if (this.swipe) {
        this.swipe = false;
        // console.log("this.swipe:", this.swipe);
        return;
      }
      // console.log("after if:");
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
  font-family: "M PLUS Rounded 1c", sans-serif;
}
i {
  cursor: pointer;
}
html {
  overflow-y: scroll;
}

#global-container {
  width: 100%;
  min-height: 100vh;
}
#container {
  width: 100%;
  max-width: $containerWidth;
  min-height: 100vh;
  margin: 0 auto;
  padding: 100px 0 200px 0;
  background-color: rgba(orange, 0.1);
  overflow-x: hidden;
}
#content-wrapper {
  width: 95%;
  margin: 0 auto;
}
.user-page {
  position: fixed;
  z-index: 950;
  top: $userMenuHeight;
  left: 0;
  width: 100%;
  height: calc(100vh - #{$userMenuHeight});
  background-color: #eee;
  @extend .container-padding;
}

small {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(orange, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  animation: ripple 0.8s linear;
  opacity: 1;
  transition: 0.3s;
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

@media (min-width: 767px) {
  #container {
    position: relative;
    // left: $desktopMainMenuWidth;
    right: 0;
    // width: calc(100% - #{$desktopMainMenuWidth});
    // margin: 0 a;
    padding: 100px 0;
  }
  #content-wrapper {
    position: relative;
    left: $desktopMainMenuWidth;
    width: calc(100% - #{$desktopMainMenuWidth});
    margin: 0;
    padding: 20px;
  }
  .user-page {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}

@media (min-width: 1200px) {
}

@keyframes ripple {
  0% {
    width: 0px;
    height: 0px;
    // opacity: 0.5;
  }
  70% {
    width: 300%;
    height: 200%;
    opacity: 1;
  }
  100% {
    width: 300%;
    height: 200%;
    opacity: 0;
  }
}
</style>
