<template>
  <div>
    <p>This is a Group page!</p>
  </div>
</template>

<script>


export default {
  components: {
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swipe {
  height: 200px;
  color: #333;
  background-color: #333;
  font-size: 30px;
  text-align: center;

  div {
    width: 400px;
    height: 200px;
  }
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
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