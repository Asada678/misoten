<template>
  <div class="coach">
    <fixed-bar></fixed-bar>
    <transition
      name="fade"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      mode="out-in"
    >
      <router-view class="coach__router-view" :class="zAuto"></router-view>
    </transition>

    <div class="squares"></div>
  </div>
</template>

<script>
import FixedBar from "@/components/common/FixedBar";
export default {
  components: {
    FixedBar,
  },
  props: {},
  data() {
    return {
      enterActiveClass: null,
      leaveActiveClass: null,
      pageHierarchy: 0,
    };
  },
  computed: {
    zAuto() {
      return this.$route.meta.zAuto ? 'z-auto' : 'z-10';
    }
  },
  methods: {
    createSquare() {
      const squares = this.$el.querySelector(".squares");
      const square = document.createElement("span");
      square.classList.add("square");

      const colors = ["#ffa931", "#ffc000", "#f6f6f6", "#808080", "#232323"];

      const size = Math.random() * 40;
      const time = 3 + Math.random() * 4;

      square.style.width = `${20 + size}px`;
      square.style.height = `${20 + size}px`;
      square.style.top = `${Math.random() * innerHeight}px`;
      square.style.left = `${Math.random() * innerWidth}px`;
      square.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      square.style.animationDuration = `${time}s`;
      square.style.opacity = Math.random();

      squares.appendChild(square);

      setTimeout(() => {
        square.remove();
      }, time * 1000);
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
  created() {},
  mounted() {
    setInterval(this.createSquare, 300);
  },
  watch: {
    $route(to, from) {
      // bf();
      this.pageHierarchy = to.meta.pageHierarchy;
      const toPageHierarchy = to.meta.pageHierarchy;
      const fromPageHierarchy = from.meta.pageHierarchy;
      // console.log(
      //   "user toPageHierarchy, fromPageHierarchy :",
      //   toPageHierarchy,
      //   fromPageHierarchy
      // );
      if (toPageHierarchy > 10 && fromPageHierarchy > 10) {
        if (toPageHierarchy < fromPageHierarchy) {
          // 浅い階層へ進むとき
          // console.log("user left in:");
          this.leftIn();
          return;
        } else if (toPageHierarchy > fromPageHierarchy) {
          // 深い階層へ進むとき
          // console.log("user right in:");
          this.rightIn();
          return;
        } else {
          // console.log("user fade in:");
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

<style lang="scss" scoped>
.black,
.blue {
  .coach {
    color: rgba($white, 0.9);
    color: #eee;
    color: $grey;
    background: transparent;
  }
}

.coach {
  padding: 0;
  background-color: rgba($white, 0.9);

  &__router-view {
    position: relative;
    // z-index: auto;
    padding: 40px 0 40vh;
  }

  ::v-deep .squares {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.2;
    
    span.square {
      position: absolute;
      background-color: $white;
      pointer-events: none;
      // animation: square 5s linear infinite;
      animation-name: square;
      // : 3s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      @extend .bs-b-8;
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .coach {
    &__router-view {
      padding-left: $mainMenuWidth + 16px;
      padding-right: 16px;
    }
  }
}

@media (min-width: 1200px) {
}

@keyframes wave1 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}
@keyframes wave2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}
@keyframes square {
  0% {
    transform: scale(0) translateY(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(-500%) rotate(360deg);
    opacity: 0;
  }
}
</style>