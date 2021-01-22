<template>
  <div class="coach-appears">
    <div class="">
      <p class="py-6 font-bold text-center">５週間後のあなたを生成しました。</p>
      <div class="img-box flex justify-center">
        <img src="/img/body-type-m1.png" alt="" />
      </div>
      <div class="py-6">
        <m-button class="w-100">トレーニング開始</m-button>
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
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.coach-appears {
  .img-box {
    img {
      max-height: 60vh;
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