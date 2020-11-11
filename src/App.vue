<template>
  <div id="app">
    <div id="global-container">
      <!-- <div
      id="global-container"
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
    > -->
      <transition name="fade">
        <UserMenu v-if="menuVisible" />
      </transition>
      <Snackbar :snackbar="snackbar" />
      <div id="container">
        <transition name="fade">
          <MainMenu v-if="menuVisible" />
        </transition>
        <!-- coach button -->
        <!-- <transition name="fade">
          <float-button
            v-if="menuVisible"
            icon="chalkboard-teacher"
            color="#304FFE"
            left="20"
            size="70"
            @click="showSnackbar"
          />
        </transition> -->
        <div id="content-wrapper">
          <transition
            name="fade"
            :enter-active-class="enterActiveClass"
            :leave-active-class="leaveActiveClass"
            mode="out-in"
          >
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
      // swipe: false,
      enterActiveClass: null,
      leaveActiveClass: null,
      pageHierarchy: 0,
    };
  },
  computed: {
    menuVisible() {
      return this.pageHierarchy > 10;
    },
    snackbar() {
      return this.$store.getters.snackbar;
    },
  },
  methods: {
    showSnackbar() {
      // const snackbar = document.querySelector(".snackbar");
      // snackbar.classList.toggle("appear");
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
      this.enterActiveClass =
        "animate__animated animate__fadeInLeft animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutRight animate__fastest";
      const prevPageName = this.$route.meta.prevPageName;
      if (prevPageName) {
        this.$router.push({ name: prevPageName });
      }
    },
    leftIn() {
      this.enterActiveClass =
        "animate__animated animate__fadeInLeft animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutRight animate__fastest";
    },
    rightIn() {
      this.enterActiveClass = this.leaveActiveClass =
        "animate__animated animate__fadeInRight animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOutLeft animate__fastest";
    },
    fadeIn() {
      this.enterActiveClass =
        "animate__animated animate__fadeIn animate__fastest";
      this.leaveActiveClass =
        "animate__animated animate__fadeOut animate__fastest";
    },
  },
  created() {
    const keyName = "EverFitUpFirstAccess";
    const keyValue = true;
    if (!localStorage.getItem(keyName)) {
      // console.log('first:', );
      localStorage.setItem(keyName, keyValue);
      const snackbar = {
        text: "始めまして！<br>ご利用方法を選択してください。",
        color: "blue",
      };
      this.$store.commit("setSnackbar", snackbar);
      this.$router.push({ name: "FirstAccess" });
    } else {
      // console.log('not first:', );
      this.pageHierarchy = this.$route.meta.pageHierarchy;
    }
  },
  mounted() {
    const globalContainer = document.querySelector("#global-container");
    globalContainer.addEventListener("click", (event) => {
      // console.log("event.target:", event.target);
      event.stopPropagation();

      // user menu list が開いていたら閉じる
      if (!event.target.classList.contains("user-icon")) {
        const openedUserMenuList = document.querySelector(
          ".user-menu-list.user-menu-open"
        );
        if (openedUserMenuList) {
          openedUserMenuList.classList.remove("user-menu-open");
        }
      }

      // option が開いていたら閉じる
      if (!event.target.classList.contains("option")) {
        const openedOptions = document.querySelector(".options.open");
        if (openedOptions) {
          openedOptions.classList.remove("open");
        }
      }
    });
  },
  watch: {
    $route(to, from) {
      this.pageHierarchy = to.meta.pageHierarchy;
      const target = document.querySelector(`a[href="${to.path}"]`);
      if (target) {
        const ripple = document.createElement("small");
        target.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }
      // console.log("to, from:", to, from);

      if (
        to.path === "/" ||
        to.path === "/first-access" ||
        to.path === "/login" ||
        to.path === "/signup" ||
        from.path === "/login" ||
        from.path === "/signup"
      ) {
        this.fadeIn();
        return;
      }

      const toPageHierarchy = to.meta.pageHierarchy;
      const fromPageHierarchy = from.meta.pageHierarchy;
      if (toPageHierarchy > 10 && fromPageHierarchy > 10) {
        if (toPageHierarchy < fromPageHierarchy) {
          // 浅い階層へ進むとき
          this.leftIn();
          return;
        } else if (toPageHierarchy > fromPageHierarchy) {
          // 深い階層へ進むとき
          this.rightIn();
          return;
        }
      } else {
        // 遷移先・遷移元ともに階層が浅いとき
        this.fadeIn();
      }
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
  // font-family: "M PLUS Rounded 1c", sans-serif;
  font-family: "M PLUS 1p", sans-serif;
}
i {
  cursor: pointer;
}
a {
  color: $black;
  text-decoration: none;
}
body {
  overflow-y: scroll;
}

#global-container {
  position: relative;
  z-index: 100;
  width: 100%;
  min-height: 100vh;
 
}
#container {
  width: 100%;
  max-width: $containerWidth;
  min-height: 100vh;
  margin: 0 auto;
  padding: ($userMenuHeight + $mobileMainMenuHeight + 20px) 0 200px 0;
  background-color: rgba($orange, 0.1);
  // background: linear-gradient(315deg, rgba(0,29,48,0.8) 0%, rgba(0,29,48,0.6867121848739496) 51%, rgba(0,29,48,0.9472163865546218) 100%);
  // color: $white;
  overflow-x: hidden;
}
#content-wrapper {
  width: 99%;
  margin: 0 auto;
}
.user-page {
  position: fixed;
  z-index: 950;
  top: $userMenuHeight;
  left: 0;
  width: 100%;
  height: calc(100vh - #{$userMenuHeight});
  background-color: $white;
  overflow-y: auto;
  @extend .container-padding;
}

small {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba($orange, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  animation: ripple 0.8s linear;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
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

@media (min-width: 768px) {
  #container {
    position: relative;
    // left: $mainMenuWidth;
    right: 0;
    // width: calc(100% - #{$mainMenuWidth});
    // margin: 0 a;
  }
  #content-wrapper {
    position: relative;
    left: $mainMenuWidth;
    width: calc(100% - #{$mainMenuWidth});
    margin: 0;
    padding: 20px;
  }
  .user-page {
    position: relative;
    top: -$mobileMainMenuHeight - 20px;
    width: calc(100% + 40px);
    left: -20px;
    height: auto;
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
