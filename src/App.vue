<template>
  <div id="app">
    <!-- <div
      id="global-container"
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
    > -->
    <transition name="fade">
      <UserMenu
        v-if="isUserMenuVisible"
        ref="userMenu"
        @toggle="searchContainer = true"
      />
    </transition>
    <Snackbar :snackbar="snackbar" />
    <transition name="fade">
      <MainMenu v-if="isMainMenuVisible" />
    </transition>
    <SearchContainer
      :active="searchContainer"
      @close="searchContainer = false"
    />
    <div id="container">
      <div id="observer"></div>
      <transition
        name="fade"
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
        mode="out-in"
      >
        <router-view class="app-router-view"></router-view>
      </transition>
    </div>

    <CreatePostDialog :dialog="postDialog" />
    <!-- <CreateGroupDialog :dialog="groupDialog" />
    <CreateVideoRoomDialog :dialog="videoRoomDialog" /> -->
    <PlanDialog :dialog="planDialog" />
  </div>
</template>

<script>
import MainMenu from "@/components/app/MainMenu";
import SearchContainer from "@/components/app/SearchContainer";
import Snackbar from "@/components/app/Snackbar";
import UserMenu from "@/components/app/UserMenu";
import CreatePostDialog from "@/components/app/CreatePostDialog";
// import CreateGroupDialog from "@/components/app/CreateGroupDialog";
// import CreateVideoRoomDialog from "@/components/app/CreateVideoRoomDialog";
import PlanDialog from "@/components/app/PlanDialog";
import bf from "@/libs/bodyfixer";
export default {
  components: {
    MainMenu,
    SearchContainer,
    Snackbar,
    CreatePostDialog,
    // CreateGroupDialog,
    // CreateVideoRoomDialog,
    PlanDialog,
    UserMenu,
  },
  props: {},
  data() {
    return {
      // swipe: false,
      enterActiveClass: null,
      leaveActiveClass: null,
      pageHierarchy: 0,
      searchContainer: false,
    };
  },
  computed: {
    isUserMenuVisible() {
      return this.pageHierarchy > 10 && this.pageHierarchy < 30;
    },
    isMainMenuVisible() {
      return this.pageHierarchy > 10 && this.pageHierarchy < 80;
    },
    snackbar() {
      return this.$store.getters.snackbar;
    },
    groupDialog() {
      return this.$store.getters.groupDialog;
    },
    postDialog() {
      return this.$store.getters.postDialog;
    },
    videoRoomDialog() {
      return this.$store.getters.videoRoomDialog;
    },
    planDialog() {
      return this.$store.getters.planDialog;
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
    setThemeColor() {
      const themeColor = "EverFitUpFirstThemeColor";
      const color = localStorage.getItem(themeColor);
      // console.log("color:", color);
      if (color) {
        // console.log(":");
        this.$el.classList = [];
        this.$el.classList.add(color);
      } else {
        this.$el.classList.add("white");
        localStorage.setItem("EverFitUpFirstThemeColor", "white");
      }
    },
    confirmFirstAccess() {
      const keyName = "EverFitUpFirstAccess";
      const keyValue = true;
      if (!localStorage.getItem(keyName)) {
        // console.log('first:', );
        localStorage.setItem(keyName, keyValue);
        const snackbar = {
          text: "始めまして！<br>今日から頑張りましょう！。",
          color: "orange",
        };
        this.$store.commit("setSnackbar", snackbar);
        this.$router.push({ name: "Login" });
      } else {
        // console.log('not first:', );
        this.pageHierarchy = this.$route.meta.pageHierarchy;
      }
    },
    setEventType() {
      const eventType = window.ontouchstart ? "touchstart" : "click";
      this.$store.commit("setEventType", eventType);
    },
  },
  created() {
    this.confirmFirstAccess();
    this.setEventType();
  },
  mounted() {
    const container = document.querySelector("#container");
    container.addEventListener(this.$store.getters.eventType, (event) => {
      // console.log("event.target:", event.target);
      // console.log("event.target.parentNode:", event.target.parentNode);
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
      // reply-form が開いていたら閉じる
      if (
        !event.target.classList.contains("rep") &&
        !event.target.parentNode.classList.contains("rep")
      ) {
        const openedReplyForm = document.querySelector(".reply-form.open");
        if (openedReplyForm) {
          openedReplyForm.classList.remove("open");
        }
      }
    });

    this.setThemeColor();
  },
  watch: {
    $route(to, from) {
      bf();
      this.pageHierarchy = to.meta.pageHierarchy;
      const target = document.querySelector(`a[href="${to.path}"]`);
      if (target && to.path !== "/user/profile") {
        const ripple = document.createElement("small");
        target.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }
      // console.log("to, from:", to, from);

      if (
        // to.path === "/" ||
        to.path === "/first-access" ||
        to.path === "/login" ||
        to.path === "/signup" ||
        from.path === "/login" ||
        from.path === "/signup"
      ) {
        this.fadeIn();
        return;
      }
      // if(to.path === "/user/profile") {
      //   this.enterActiveClass =
      //   "animate__animated animate__rotateInDownRight animate__fastest";
      //   return;
      // }

      const toPageHierarchy = to.meta.pageHierarchy;
      const fromPageHierarchy = from.meta.pageHierarchy;
      // console.log(
      //   "toPageHierarchy, fromPageHierarchy :",
      //   toPageHierarchy,
      //   fromPageHierarchy
      // );
      if (toPageHierarchy > 10 && fromPageHierarchy > 10) {
        if (toPageHierarchy < fromPageHierarchy) {
          // 浅い階層へ進むとき
          // console.log('left in:', );
          this.leftIn();
          return;
        } else if (toPageHierarchy > fromPageHierarchy) {
          // 深い階層へ進むとき
          // console.log('right in:', );
          this.rightIn();
          return;
        } else {
          // console.log('fade in:', );
          this.fadeIn();
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  // font-family: "M PLUS Rounded 1c", sans-serif;
  font-family: "M PLUS 1p", sans-serif;
}
i {
  color: rgba($white, 0.8);
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &.fixed {
    position: fixed;
  }
}

#app {
  position: relative;
  width: 100%;
  max-width: $appMaxWidth;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  // background: rgba($white, .8);
  background: rgba($white, 0.9);
  background-size: 400% 400%;
  background-position: 200% 200%;
  color: rgba($black, 0.9);
  transition: 0.5s;

  &.blue {
    color: $white;
    background: rgba($blue, 0.9);
  }
  &.pink {
    // color: $white;
    background: rgba($pink, 0.9);
  }
  &.green {
    // color: $white;
    background: rgba($green, 0.9);
  }
  &.orange {
    // color: $white;
    background: rgba($orange, 0.9);
  }
  &.white {
    background: rgba($white, 0.9);
  }
  &.black {
    color: rgba($white, 0.8);
    background: rgba($black, 0.9);
  }
}
.blue {
  i {
    // color: rgba($white, 0.9);
  }
}
.white {
  i {
    color: $charcoal;
  }
}
.pink,
.green,
.orange {
  i {
    color: rgba($black, 0.8);
  }
}

.app-router-view {
  padding: ($userMenuHeight + 20px) 10px 100px;
}

#container {
  min-height: 100vh;
  // max-width: $containerMaxWidth;
  margin: auto;
}

// menuタップ時のripple
small {
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba($orange, 0.1);
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
  #app {
    position: relative;
    right: 0;
  }
  .app-router-view {
    padding: ($userMenuHeight + 20px) 10px 300px ($mainMenuWidth + 10px);
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
