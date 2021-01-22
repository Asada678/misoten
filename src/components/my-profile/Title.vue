<template>
  <div class="title grid-5">
    <div v-for="i in 100" :key="i" class="img-box">
      <img src="/img/icon-title.png" alt="" />
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
.black {
  .title {
    background-color: rgba($charcoal, 1);
  }
}
.title {
  max-height: 300px;
  padding: 10px 20px;
  background-color: rgba($grey, 1);
  border-radius: 20px;
  overflow-y: auto;
  @extend .bs-b-8;

  .img-box {
    display: flex;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      object-fit: contain;
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