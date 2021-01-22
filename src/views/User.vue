<template>
  <div class="user">
    <fixed-bar @logout="logoutDialog = true"></fixed-bar>
    <transition
      name="fade"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      mode="out-in"
    >
      <router-view class="user__router-view"> </router-view>
    </transition>
    <logout-dialog
      :dialog="logoutDialog"
      @close="logoutDialog = false"
    ></logout-dialog>
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
      logoutDialog: false,
    };
  },
  computed: {},
  methods: {
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
  mounted() {},
  watch: {
    $route(to, from) {
      // bf();
      this.pageHierarchy = to.meta.pageHierarchy;
      const toPageHierarchy = to.meta.pageHierarchy;
      const fromPageHierarchy = from.meta.pageHierarchy;
      console.log(
        "user toPageHierarchy, fromPageHierarchy :",
        toPageHierarchy,
        fromPageHierarchy
      );
      if (toPageHierarchy > 10 && fromPageHierarchy > 10) {
        if (toPageHierarchy < fromPageHierarchy) {
          // 浅い階層へ進むとき
          console.log("user left in:");
          this.leftIn();
          return;
        } else if (toPageHierarchy > fromPageHierarchy) {
          // 深い階層へ進むとき
          console.log("user right in:");
          this.rightIn();
          return;
        } else {
          console.log("user fade in:");
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
.user {
  padding: 0;

  &__router-view {
    padding: 40px 0 60vh;
  }
}

.fa-sign-out-alt {
  color: $red;
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