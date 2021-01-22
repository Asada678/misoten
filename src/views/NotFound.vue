<template>
  <div class="not-found">
    <div class="img-box">
      <img src="/img/not-found.png" alt="" />
    </div>
    <h2>Sorry!</h2>
    <h3>This page doesn't exist!</h3>
    <div class="img-box">
      <img src="/img/logo-mini.png" alt="" />
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
};
</script>

<style lang="scss" scoped>
.not-found {
  padding: 60px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, rgba($orange, .4), rgba($orange, .2));

  .img-box {
    img {
      margin: 0 auto;
      @extend .fit-img;
    }
  }

  h2 {
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 2px;
  }
  h3 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1px;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .not-found {
  }
}

@media (min-width: 1200px) {
}
</style>