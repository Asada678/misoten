<template>
  <nav class="main-menu">
    <ul>
      <li v-for="link in links" :key="link.text">
        <router-link :to="link.to">
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
        { text: "投稿", icon: "comment-dots", to: "/timeline" },
        { text: "グループ", icon: "users", to: "/group" },
        { text: "動画配信", icon: "video", to: "/video" },
        { text: "カレンダー", icon: "calendar-alt", to: "/calendar" },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.main-menu {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;

  ul {
    display: flex;

    li {
      width: 25%;
      height: 60px;
      list-style: none;
      border-top: 1px solid orange;
      border-right: 1px solid orange;
      background-color: rgba(#f0f0f0, 0.9);

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
        color: orange;
        background-color: rgba(#f0f0f0, 0.9);
        text-decoration: none;

        &.router-link-active {
          background-color: rgba(orange, 0.3);
          font-weight: 600;
          i {
            font-size: 30px;
          }
          span {
            position: absolute;
            bottom: 5px;
            line-height: 16px;
            font-size: 16px;
          }
        }

        i {
          position: absolute;
          top: 5px;
          font-size: 25px;
          transition: 0.3s;
        }

        span {
          position: absolute;
          bottom: 5px;
          line-height: 14px;
          font-size: 14px;
        }
      }
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
  .main-menu {
    width: 300px;
    min-height: 100vh;
    background-color: rgba(orange, 0.4);

    ul {
      flex-direction: column;
      padding-top: 60px;

      li {
        width: 90%;
        margin: 0 auto;
        border-bottom: none;
        border-left: 1px solid orange;

        &:last-child {
          border-right: 1px solid orange;
          border-bottom: 1px solid orange;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
}
</style>