<template>
  <div class="user-menu-container">
    <nav class="user-menu">
      <i class="fab fa-accusoft user-icon" @click="toggleMenu"></i>
    </nav>
    <ul class="user-menu-list">
      <li>
        <a href="#">
          <i class="fab fa-accusoft"></i>
          <span>test</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fab fa-accusoft"></i>
          <span>test</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fab fa-accusoft"></i>
          <span>test</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fab fa-accusoft"></i>
          <span>test</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    toggleMenu() {
      const userIcon = document.querySelector(".user-icon");
      userIcon.addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.toggle("user-menu-open");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-menu {
  position: fixed;
  z-index: 1000;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 5%;
  background-color: rgba(255, 165, 0, 0.9);
}
.user-menu-open {
  .user-menu-list {
    z-index: 900;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
.user-menu-list {
  position: absolute;
  top: 40px;
  right: 0;
  width: 200px;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(255, 165, 0, 0.8);
  transform: translateY(-100%);
  transition: all 0.3s;
  // text-align: right;

  li {
    // height: 30px;
    line-height: 30px;
    list-style: none;
    padding: 10px;
    // margin: 10px 0;
    border-bottom: 1px solid orange;
    background-color: rgba(grey, 0.4);

    a {
      text-decoration: none;
      i {
        color: #eee;
      }

      span {
        color: #eee;
      }
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
}

@media (min-width: 1200px) {
}
</style>