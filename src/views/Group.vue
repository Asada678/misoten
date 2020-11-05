<template>
  <div>
    <p>This is a Group page!</p>
    <float-button icon="user" size="70" right="40" color="#E53935" />
    <m-button @click="dialog1 = true">test 1</m-button>
    <m-button @click="dialog2 = true">test 2</m-button>

    <m-dialog
      :dialog="dialog1"
      header-text="今日の頑張り 1"
      button-text="投稿"
      @close="dialog1 = false"
    >
    </m-dialog>
    <m-dialog
      :dialog="dialog2"
      header-text="今日の頑張り 2"
      button-text="投稿"
      @close="dialog2 = false"
    >
    <p>dialog 2</p>
    </m-dialog>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {},
  data() {
    return {
      dialog1: false,
      dialog2: false,
    };
  },
  computed: {},
  methods: {
    test() {
      console.log('this.name, this.area:', this.name, this.area);
    }
  },
};
</script>

<style lang="scss" scoped>


@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>