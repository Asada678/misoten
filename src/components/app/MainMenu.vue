<template>
  <nav class="main-menu">
    <ul class="menu-list">
      <li id="coach">
        <router-link :to="{ name: 'CoachHome' }">
          <i class="fas fa-user-graduate"></i>
          <span>未来コーチ</span>
        </router-link>
      </li>
      <li v-for="link in links" :key="link.text">
        <router-link :to="link.to" exact>
          <i :class="`fas fa-${link.icon}`"></i>
          <span>{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
    <div class="main-button">
      <div class="plus-button">
        <span> </span>
        <span> </span>
      </div>
      <ul class="main-actions">
        <!-- <li @click="createGroup">
          <i class="fas fa-users"></i>
          <span>グループ作成</span>
        </li> -->
        <li @click="createPost">
          <i class="fas fa-pen"></i>
          <span>投稿</span>
        </li>
        <li>
          <router-link :to="{ name: 'CoachHome' }">
            <i class="fas fa-user-graduate"></i>
            <span>未来コーチ</span>
          </router-link>
        </li>
        <!-- <li @click="createVideoRoom">
          <i class="fas fa-video"></i>
          <span>配信</span>
        </li> -->
        <li @click="openPlan">
          <i class="far fa-calendar-alt"></i>
          <span>プラン</span>
        </li>
      </ul>
    </div>
    <div class="circle">
      <ul class="circle-main-actions">
        <li class="action" @click="toCoachHome">
          <i class="fas fa-user-graduate"></i>
          <span>未来コーチ</span>
        </li>
        <!-- <li class="action" @click="createGroup">
          <i class="fas fa-users"></i>
          <span>グループ作成</span>
        </li> -->
        <li class="action" @click="createPost">
          <i class="fas fa-pen"></i>
          <span>投稿</span>
        </li>
        <!-- <li class="action" @click="createVideoRoom">
          <i class="fas fa-video"></i>
          <span>配信</span>
        </li> -->
        <li class="action" @click="openPlan">
          <i class="far fa-calendar-alt"></i>
          <span>プラン</span>
        </li>
      </ul>
    </div>
    <div class="main-open-cover"></div>
  </nav>
</template>

<script>
import bf from "@/libs/bodyfixer";
export default {
  components: {},
  props: {},
  data() {
    return {
      links: [
        { text: "ホーム", icon: "home", to: "/" },
        // { text: "グループ", icon: "users", to: "/group" },
        // { text: "動画配信", icon: "video", to: "/video" },
        { text: "履歴", icon: "gopuram", to: "/achievement" },
      ],
    };
  },
  computed: {},
  methods: {
    toCoachHome() {
      const mainButton = this.$el.querySelector(".main-button");
      if (mainButton.classList.contains("open")) {
        mainButton.classList.remove("open");
      }
      this.$router.push({ name: "CoachHome" });
    },
    createGroup() {
      this.$store.commit("setGroupDialog", true);
    },
    createPost() {
      this.$store.commit("setPostDialog", true);
    },
    createVideoRoom() {
      this.$store.commit("setVideoRoomDialog", true);
    },
    openPlan() {
      this.$store.commit("setPlanDialog", true);
    },
  },
  mounted() {
    const mainButton = this.$el.querySelector(".main-button");
    mainButton.addEventListener(this.$store.getters.eventType, () => {
      mainButton.classList.toggle("open");
      if (
        this.$store.getters.postDialog ||
        this.$store.getters.groupDialog ||
        this.$store.getters.videoRoomDialog ||
        this.$store.getters.planDialog
      ) {
        return;
      }

      bf(mainButton.classList.contains("open"));
    });

    const mainOpenCover = this.$el.querySelector(".main-open-cover");
    mainOpenCover.addEventListener(this.$store.getters.eventType, (event) => {
      // console.log("event.target:", event.target);
      if (event.target.classList.contains("main-open-cover")) {
        mainButton.classList.toggle("open");
        bf(mainButton.classList.contains("open"));
      }
    });
  },
  watch: {},
};
</script>

<style lang="scss">
// @import "@/scss/_variables.scss";

.black {
  .main-menu {
    background-color: $black;
    ul.menu-list {
      background-color: $black;
    }
    .main-button {
      background-color: $black;
    }
  }
}
.main-menu {
  position: fixed;
  z-index: 1500;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  background-color: rgba($white, 1);
  @extend .bs-t-2;

  ul.menu-list {
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: rgba($white, 1);

    li {
      position: absolute;
      width: calc((100% - 90px) / 2);
      height: $mobileMainMenuHeight;
      list-style: none;
      overflow: hidden;
      transition: 0.5s;

      &#coach {
        display: none;
      }
      &:nth-child(1) {
        // left: calc((100% - 190px) / 4);
        // left: 12%;
        left: 0;
      }
      // &:nth-child(2) {
      // }
      // &:nth-child(3) {
      // }
      // &:nth-child(4) {
      //   right: 0;
      // }
      &:last-child {
        // right: 0;
        // right: calc((100% - 190px) / 4);
        //   right: 12%;
        right: 0;
      }

      a {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        transition: 0.2s;

        &.router-link-active {
          // background-color: rgba($orange, 0.1);
          i {
            color: $orange;
            font-size: 28px;
          }
          span {
            color: $orange;
            font-weight: 600;
          }
        }

        i {
          position: absolute;
          top: 50%;
          transform: translateY(-70%);
          font-size: 24px;
          color: $charcoal;
          transition: 0.3s;
        }

        span {
          position: absolute;
          bottom: 2px;
          line-height: 12px;
          font-size: 12px;
          display: none;
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
          transition: 0.3s;
        }
      }
    }
  }

  .main-button {
    position: absolute;
    z-index: 20;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $white;
    transition: 0.5s;
    @extend .bs-t-2;
    // box-shadow: 0 -1px 1px 0px rgba($black, 0.1),
    //     0 -2px 2px 0px rgba($black, 0.1), 0 -4px 4px 0px rgba($black, 0.1);
    box-shadow: 0 -1px 1px 0px rgba($black, 0.1),
      0 -2px 2px 0px rgba($black, 0.1);

    &.open {
      background-color: transparent;
      box-shadow: none;
      transition: 0.3s;

      & ~ .circle {
        transition: 0.5s;
        transform: translate(-50%, -85%) scale(1);
      }
      & ~ .main-open-cover {
        z-index: 15;
        opacity: 1;
        visibility: visible;
      }
      .main-actions {
        transform: scale(1);
        li {
          opacity: 1;
          visibility: visible;
          transition: 0.7s;
          // border: 1px solid red;
          transition-property: top, left, background-color, opacity, visibility;
          @extend .bs-b-4;

          // &:hover {
          //   transition-delay: 0s !important;
          // }
          &:nth-child(1) {
            transition-delay: 0.2s, 0.2s, 0s, 0.2s, 0.2s;
            top: -90px;
            left: -45px;
          }
          &:nth-child(2) {
            transition-delay: 0.35s, 0.35s, 0s, 0.35s, 0.35s;
            top: -180px;
          }
          &:nth-child(3) {
            transition-delay: 0.5s, 0.5s, 0s, 0.5s, 0.5s;
            top: -90px;
            left: calc(45px + 70px);
          }
          // &:nth-child(1) {
          //   transition-delay: 0.2s;
          //   top: -53px;
          //   left: -32px;
          // }
          // &:nth-child(2) {
          //   transition-delay: 0.25s;
          //   top: -130px;
          //   left: -50px;
          // }
          // &:nth-child(3) {
          //   transition-delay: 0.35s;
          //   top: -200px;
          // }
          // &:nth-child(4) {
          //   transition-delay: 0.45s;
          //   top: -130px;
          //   left: calc(50px + 70px);
          // }
          // &:nth-child(5) {
          //   transition-delay: 0.5s;
          //   top: -53px;
          //   left: calc(32px + 70px);
          // }
        }
      }

      .plus-button {
        background: rgba($white, 1);
        @extend .bs-b-16;

        span {
          background: $orange;
          &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(225deg);
          }
          &:nth-child(2) {
            transform: translate(-50%, -47%) translateY(-2%) rotate(-45deg);
          }
        }
      }
    }

    .plus-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 90%;
      border: none;
      border-radius: 50%;
      background-color: rgba($orange, 1);
      background: linear-gradient(
        142deg,
        rgba(243, 178, 35, 1) 12%,
        rgba(255, 169, 49, 1) 58%,
        rgba(249, 129, 58, 1) 96%
      );
      font-size: 40px;
      line-height: 40px;
      outline: none;
      cursor: pointer;
      transition: all 0.5s;
      // @extend .bs-b-8;
      i {
        color: $black;
      }

      span {
        position: relative;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 36px;
        height: 6px;
        background-color: $black;
        border-radius: 5px;
        transition: all 0.5s;

        &:nth-child(2) {
          top: 40%;
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
      small {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 4px;
        height: 4px;
        background-color: $red;
      }
    }
    .main-actions {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      list-style: none;
      transform: scale(0);
      transition: 0.7s;

      li {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px;
        opacity: 0;
        visibility: hidden;
        text-align: center;
        transition: 0.7s;
        color: $white;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: rgba($white, 0.1);
          transition: 0.3s;
          transition-delay: 0s !important;
        }

        i {
          font-size: 30px;
          line-height: 30px;
          color: $white;
        }

        span {
          top: 0;
          left: 0;
          display: block;
          width: 100px;
          color: $white;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
  .circle {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%) scale(0);
    transform-origin: bottom;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background-color: rgba($black, 0.6);
    transition: 0.5s 0.3s;
    @extend .bs-t-8;

    .circle-main-actions {
      display: none;
    }
  }
  .main-open-cover {
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    opacity: 0;
    visibility: hidden;
    background-color: rgba($black, 0.4);
    transition: background-color 0.5s, z-index 0s, opacity 0.5s, visibility 0.5s;
  }
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

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .main-menu {
    z-index: 1300;
    width: $mainMenuWidth;
    min-height: calc(100vh - #{$userMenuHeight});
    min-height: 100vh;
    padding: 0;
    background-color: rgba($white, 10);
    // box-shadow: 2px 0px 10px -2px rgba($black, 0.4),
    //   2px 0px 10px -2px rgba($black, 0.4);

    ul.menu-list {
      flex-direction: column;
      height: auto;
      padding: 100px 0 0 0;
      background-color: rgba($white, 0);

      li {
        position: relative;
        left: 0;
        right: 0;
        width: 100%;
        margin: 0 auto;
        // border-top: 1px solid $orange;
        // border-right: 1px solid $orange;
        // border-left: 1px solid $orange;
        &:hover {
          background-color: rgba($orange, 0.1);
        }

        &:last-child {
          // border-right: 1px solid $orange;
          // border-bottom: 1px solid $orange;
        }
        &:nth-child(1) {
        }
        &:nth-child(2) {
          left: 0;
        }
        &:nth-child(3) {
          right: 0;
        }
        &:nth-child(4) {
          right: 0;
        }

        a {
          &.router-link-active {
          }
          i {
            font-size: 24px;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
          }
          span {
            top: 50%;
            left: 80px;
            display: inline;
            line-height: 24px;
            font-size: 18px;
            transform: translateY(-50%);
          }
        }
      }
    }

    .main-button {
      z-index: 200;
      top: 15px;
      background-color: rgba($white, 0);

      &.open {
        & ~ .circle {
          transform: translate(-50%, -50%) scale(1);

          .circle-main-actions {
            .action {
              transform: perspective(200px);
              // transform: none;
              opacity: 1;
              visibility: visible;

              @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                  transition: transform 0.3s 0.15s * $i, opacity 0.3s 0.15s * $i,
                    visibility 0.3s 0.15s * $i, background-color 0.3s,
                    box-shadow 0.3s;
                }
              }
            }
          }
        }
      }

      .main-actions {
        display: none;
      }
    }

    .circle {
      position: fixed;
      z-index: 100;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -80%) scale(0);
      width: 80%;
      max-width: 900px;
      height: 600px;
      padding: 140px 10px;
      border-radius: 5px;
      transition: 0.5s;

      .circle-main-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;

        li {
          flex-basis: 30%;
        }

        .action {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
          border: 2px solid $white;
          border-radius: 4px;
          background-color: rgba($white, 0.1);
          color: $white;
          font-size: 25px;
          font-weight: 700;
          cursor: pointer;
          perspective: 800px;
          transform: perspective(500px) translateY(100px) translateZ(-400px);
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
          box-shadow: 0 1px 1px rgba($black, 0.1), 0 2px 2px rgba($black, 0.1),
            0 4px 4px rgba($black, 0.1), 0 0px 4px rgba($black, 0.1),
            0 0px 6px rgba($black, 0.1), 0 0px 8px rgba($black, 0.1);

          &:hover {
            background-color: rgba($white, 0.3);
          }

          i {
            color: $white;
            color: $orange;
            font-size: 40px;
            margin-bottom: 10px;
          }

          span {
            color: $orange;
            letter-spacing: 3px;
          }
        }
      }
    }
  }
  .main-menu ul.menu-list li#coach {
    display: block;
  }
}

@media (min-width: 1200px) {
}
</style>