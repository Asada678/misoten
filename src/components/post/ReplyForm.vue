<template>
  <div class="reply-form">
    <!-- <div class="reply-form-cover rep"></div> -->
    <div class="">
      <m-textarea v-model="reply" label="コメント" class="rep"></m-textarea>
    </div>
    <div class="py-4">
      <m-button class="w-100 rep" icon="paper-plane">送信</m-button>
    </div>
    <div class="developing">
      <img src="/img/developing.png" alt="" />
      <p class="font-bold">準備中</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      reply: null,
      links: [
        { text: "編集", icon: "edit", to: "/coach" },
        { text: "削除", icon: "trash", to: "/title" },
        // { text: "設定", icon: "cog", to: "/config" },
        // { text: "言語", icon: "globe", to: "/language" },
      ],
    };
  },
  computed: {},
  methods: {
    onClick(icon) {
      // console.log('icon:', icon);
      switch (icon) {
        case "edit":
          this.$emit("edit");
          break;
        case "trash":
          this.$emit("remove");
          break;
        default:
          break;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.reply-form {
  position: absolute;
  z-index: 900;
  // top: $userMenuHeight;
  // right: 30px;
  bottom: 20px;
  left: 0;
  width: 80vw;
  max-width: 400px;
  padding: 24px 8px 0;
  background-color: rgba($white, 1);
  transform: scale(0);
  transform-origin: bottom left;
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s, transform 0.3s;
  // transition: all .3s;
  overflow: hidden;
  font-weight: 400;
  @extend .bs-b-8;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  &-cover {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($black, 0.2);
    pointer-events: auto;
  }

  .developing {
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($black, 0.4);
    backdrop-filter: blur(2px);

    img {
      @extend .fit-img;
    }

    p {
      position: absolute;
      top: 5%;
      font-size: 18px;
      letter-spacing: 3px;
      color: $white;
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