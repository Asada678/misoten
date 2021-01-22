<template>
  <div class="coach-home">
    <div class="img-box py-6">
      <img :src="coachImage" alt="" />
    </div>
    <p
      class="py-5 text-center font-bold tracking-wider text-xs md:text-base leading-5"
    >
    <span v-if="user.username">
      目標設定を完了した方は開始を押して下さい<br />
      完了していない方は先に設定してください
    </span>
    <span v-else>
      ご利用の前にログインをしてください。<br />
    </span>
    </p>
    <div class="buttons">
      <m-button class="w-100" icon="caret-right" :disabled="!target" :to="{ name: 'PlanDetail' }"
        >開始</m-button
      >

      <m-button v-if="user.username" class="w-100" icon="chart-line" :to="{ name: 'SetTarget' }">目標設定</m-button>
      <m-button v-else class="w-100" icon="sign-in-alt" :to="{ name: 'Login' }">ログイン</m-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    coachImage() {
      const gender = this.$store.getters.user.gender;
      if (gender) {
        return gender === "male"
          ? "/img/coach-male.png"
          : "/img/coach-female.png";
      } else {
        return "/img/coach-male.png";
      }
    },
    user() {
      return this.$store.getters.user;
    },
    target() {
      return this.$store.getters.user.target;
    },
  },
  methods: {},
  created() {},
  mounted() {
    // console.log('this.$store.getters.user.gender:', this.$store.getters.user.gender);
  },
};
</script>

<style lang="scss" scoped>
.coach-home {
  position: relative;
  width: 100%;
  padding-top: 10vh;

  .img-box {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    img {
      @extend .fit-img;
      // width: 70%;
      // max-width: 600px;
      // height: 100%;
      // max-height: 80vh;
      // min-height: 300px;
      // object-fit: contain;
      filter: drop-shadow(0 5px 5px rgba($black, 0.8));
    }
  }

  .text {
    padding: 20px 0;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    letter-spacing: 1px;
  }

  .buttons {
    max-width: 600px;
    margin: 0 auto;
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
  .sample {
    padding: 60px 10px 200px (250px + 10px);
  }
}

@media (min-width: 1200px) {
}
</style>