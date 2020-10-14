<template>
  <div>
    <p>This is a Group page!</p>
    <FloatBtn icon="user" size="70" right="40" color="#E53935" />
  </div>
</template>

<script>
import FloatBtn from '@/components/common/FloatBtn'

export default {
  components: {
    FloatBtn
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
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