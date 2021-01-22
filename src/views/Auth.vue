<template>
  <div class="auth">
    <div class="auth-inner">
      <div class="bg-top"></div>
      <div class="bg-bottom"></div>
      <transition
        name="fade"
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
        mode="out-in"
      >
        <router-view class="auth__router-view"></router-view>
      </transition>
      <h3 class="copyright">©HAL Osaka Group OH211</h3>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      vh: null,
      vw: null,
      enterActiveClass: "animate__animated animate__fadeIn animate__fastest",
      leaveActiveClass: "animate__animated animate__fadeOut animate__fastest",
    };
  },
  computed: {},
  methods: {
    setHeight(el, height, min = false) {
      if (min) {
        el.style.minHeight = `${height}px`;
      } else {
        el.style.height = `${height}px`;
      }
    },
    onResize() {
      this.vw = window.innerWidth;
      this.vh = window.innerHeight;
      this.setHeight(this.$el, this.vh, true);
      this.setHeight(this.$el.querySelector(".bg-top"), this.vh * 0.6);
      this.setHeight(this.$el.querySelector(".bg-bottom"), this.vh * 0.6);
      this.$el.querySelector(".bg-bottom").style.top = `${this.vh * 0.6}px`;
    },
  },
  created() {},
  mounted() {
    this.onResize();

    window.addEventListener("resize", () => {
      if (this.vw === window.innerWidth) {
        return;
      }
      this.onResize();
    });
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      if (this.vw === window.innerWidth) {
        return;
      }
      this.onResize();
    });
  },
};
</script>

<style lang="scss" scoped>
$yellow: #ffc000;
$orange: #f9813a;
$black-1: #39313d;
$black-2: #a4a6a6;
$black-3: #5e5454;
.auth {
  position: relative;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 95%;
  max-width: 650px;
  // min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  // overflow: auto;

  &__router-view {
    position: relative;
  }
}

.auth-inner {
  position: relative;
  // display: flex;
  width: 100%;
  // min-height: 100vh;
  padding: 3vh 0;

  &::before {
    content: "";
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(#212121, 0.2);
    // // 上から順に右下→左上
    // background: linear-gradient(
    //   315deg,
    //   rgba($black-1, 0.8) 0%,
    //   rgba($black-1, 0.1) 31%,
    //   rgba($black-1, 0.1) 80%,
    //   rgba($black-1, 0.3) 100%
    // );
  }
}

.bg-top,
.bg-bottom {
  position: fixed;
  width: 100%;
  left: 0;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    transition: 0.3s;
    transform-origin: bottom;
  }
}
.bg-top {
  // height: 60vh;
  background: $yellow;
  top: 0;

  &::before,
  &::after {
    bottom: 0px;
  }

  &::before {
    height: 101%;
    clip-path: polygon(100% 0, 45% 100%, 100% 100%);
    background-color: $black-1;
  }
  &::after {
    height: 70%;
    clip-path: polygon(0% 0%, 0% 100%, 45% 100%);
    background-color: $black-2;
  }
}
.bg-bottom {
  // height: 40vh;
  background: $black-3;
  // bottom: 0;

  &::before,
  &::after {
    top: -1px;
    transform-origin: top;
  }

  &::before {
    height: 80%;
    clip-path: polygon(45% 0, 0 0, 0 100%);
    background-color: $black-2;
  }
  &::after {
    height: 75%;
    clip-path: polygon(100% 0%, 45% 0%, 100% 100%);
    background-color: $black-1;
  }
}

.copyright {
  position: absolute;
  font-weight: 900;
  font-style: italic;
  text-align: center;
  width: 100%;
  bottom: 5px;
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>