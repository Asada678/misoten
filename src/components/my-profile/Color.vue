<template>
  <div class="color">
    <div class="blue"></div>
    <div class="pink"></div>
    <div class="green"></div>
    <div class="orange"></div>
    <div class="white"></div>
    <div class="black"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      divs: null,
    };
  },
  computed: {},
  methods: {
    onClick() {},
  },
  mounted() {
    const appColor = document.querySelector("#app").classList[0];
    this.$el.querySelector(`.${appColor}`).classList.add("selected");

    this.divs = this.$el.querySelectorAll("div");
    this.divs.forEach((div) => {
      div.addEventListener(this.$store.getters.eventType, () => {
        const selectedDiv = this.$el.querySelector(".selected");
        if (selectedDiv) {
          selectedDiv.classList.remove("selected");
        }
        div.classList.add("selected");
        const color = div.classList[0];
        const app = document.querySelector("#app");
        app.classList = [];
        app.classList.add(color);

        const keyName = "EverFitUpFirstThemeColor";
        const keyValue = color;
        localStorage.setItem(keyName, keyValue);

        const snackbar = {
          text: "テーマカラーを変更しました。",
          color: color,
        };
        this.$store.commit("setSnackbar", snackbar);
      });
    });
  },
  destroyed() {
    this.divs.forEach((div) => {
      div.removeEventListener(this.$store.getters.eventType, () => {
        const selectedDiv = this.$el.querySelector(".selected");
        if (selectedDiv) {
          selectedDiv.classList.remove("selected");
        }
        div.classList.add("selected");
        const color = div.classList[0];
        const app = document.querySelector("#app");
        app.classList = [];
        app.classList.add(color);

        const keyName = "EverFitUpFirstThemeColor";
        const keyValue = color;
        localStorage.setItem(keyName, keyValue);

        const snackbar = {
          text: "テーマカラーを変更しました。",
          color: color,
        };
        this.$store.commit("setSnackbar", snackbar);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.black {
  .color {
    background-color: rgba($charcoal, 1);
  }
}
.color {
  // @extend .router-view-padding;
  display: flex;
  padding: 10px 20px;
  // background-color: rgba($black, 0.8);
  background-color: rgba($grey, 1);
  border-radius: 20px;
  @extend .bs-b-8;
  div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    opacity: 0.9;
    transition: 0.5s;
    @extend .bs-b-4;

    // &::before {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   transform: translateX(-100%);
    //   background-color: rgba($white, 0.1);
    //   transition: 0.5s;
    // }

    // &:hover::before {
    //   transform: translateX(0);
    // }
    &::after {
      content: "";
      background-image: url("/img/logo-mini.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      display: block;
      width: 90%;
      height: 90%;
      opacity: 0;
      transition: 0.5s;
    }

    &.selected {
      // border: 2px solid $grey;
      opacity: 1;
      @extend .bs-b-8;
    }
    &.selected::after {
      opacity: 1;
      // border: 2px solid $grey;
    }

    &.blue {
      background-color: rgba($blue, 0.8);
    }
    &.pink {
      background-color: rgba($pink, 0.8);
    }
    &.green {
      background-color: rgba($green, 0.8);
    }
    &.orange {
      background-color: rgba($orange, 0.8);
    }
    &.white {
      background-color: rgba($white, 0.8);
    }
    &.black {
      background-color: rgba($black, 0.8);
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