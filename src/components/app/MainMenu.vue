<template>
  <nav class="main-menu">
    <ul>
      <li v-for="link in links" :key="link.text">
        <router-link :to="link.to" exact>
          <i :class="`fas fa-${link.icon}`"></i>
          <span>{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      links: [
        { text: "投稿", icon: "comment-dots", to: "/" },
        { text: "グループ", icon: "users", to: "/group" },
        { text: "動画配信", icon: "video", to: "/video" },
        { text: "カレンダー", icon: "calendar-alt", to: "/calendar" },
      ],
    };
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
// @import "@/scss/_variables.scss";
.main-menu {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.4);

  ul {
    display: flex;

    li {
      position: relative;
      width: 25%;
      height: $mobileMainMenuHeight;
      list-style: none;
      border-top: 1px solid rgba($orange, 0.4);
      border-right: 1px solid rgba($orange, 0.2);
      background-color: rgba(#f0f0f0, 1);
      overflow: hidden;

      &:last-child {
        border-right: none;
      }

      a {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        // background-color: rgba(#f0f0f0, 0.9);
        color: grey;
        text-decoration: none;
        transition: 0.2s;

        &.router-link-active {
          background-color: rgba($orange, 0.1);
          color: $orange;
          i {
            font-size: 28px;
          }
          span {
            font-weight: 600;
          }
        }

        i {
          position: absolute;
          top: 4px;
          font-size: 24px;
          transition: 0.3s;
        }

        span {
          position: absolute;
          bottom: 2px;
          line-height: 12px;
          font-size: 12px;
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

@media (min-width: 767px) {
  .main-menu {
    width: $mainMenuWidth;
    min-height: calc(100vh - #{$userMenuHeight});
    background-color: rgba($orange, 0.4);
    box-shadow: 2px 0px 10px -2px rgba(0, 0, 0, 0.4);

    ul {
      flex-direction: column;
      padding-top: 60px;

      li {
        width: 90%;
        margin: 0 auto;
        border-top: 1px solid $orange;
        border-right: 1px solid $orange;
        border-left: 1px solid $orange;

        &:last-child {
          border-right: 1px solid $orange;
          border-bottom: 1px solid $orange;
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
            line-height: 24px;
            font-size: 18px;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
}
</style>