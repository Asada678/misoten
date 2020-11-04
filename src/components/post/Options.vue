<template>
  <nav class="options">
    <ul>
      <li v-for="link in links" :key="link.text" @click="onClick(link.icon)" class="option">
        <i :class="`option fas fa-${link.icon}`"></i>
        <span class="option">{{ link.text }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
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
      switch(icon) {
        case 'edit':
          this.$emit('edit');
          break;
        case 'trash':
          this.$emit('remove');
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.options {
  position: absolute;
  z-index: 900;
  // top: $userMenuHeight;
  // right: 30px;
  bottom: 16px;
  right: 0;
  width: 120px;
  // background-color: rgba($orange, 0.8);
  transform: scale(0);
  transform-origin: bottom right;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility .5s, transform 0.3s;
  // transition: all .3s;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  li {
    position: relative;
    height: 30px;
    width: 100%;
    line-height: 30px;
    list-style: none;
    // margin: 10px 0;
    border-bottom: 1px solid rgba($color: $orange, $alpha: 0.3);
    background-color: rgba(grey, 1);
    cursor: pointer;
    overflow: hidden;

    i {
      position: absolute;
      top: 50%;
      left: 20px;
      width: 30px;
      color: $white;
      font-size: 16px;
      text-align: center;
      transform: translateY(-50%);
    }

    span {
      position: absolute;
      top: 50%;
      left: 70px;
      color: $white;
      transform: translateY(-50%);
      font-size: 14px;
      font-weight: 400;
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