<template>
  <div class="complete-workout text-center font-bold">
    <div class="pt-6 img-box flex justify-center">
      <img src="/img/complete-workout.png" alt="" />
    </div>
    <p class="pt-2">
      お疲れ様です！<br />
      今日のトレーニングは終了です。
    </p>
    <div class="pt-10">
      <p>今日の頑張りをシェアしましょう。</p>
      <div class="pt-4">
        <m-button class="w-75" @click="openPostDialog">シェア</m-button>
        <m-button class="w-75" :to="{name: 'Achievement'}">実績</m-button>
      </div>
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
  computed: {},
  methods: {
    openPostDialog() {
      this.$store.commit("setPostDialog", true);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.complete-workout {
  .img-box {
    img {
      @extend .fit-img;
    }
  }
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