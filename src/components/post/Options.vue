<template>
  <nav class="options">
    <ul>
      <li v-for="link in links" :key="link.text">
        <i :class="`fas fa-${link.icon}`"></i>
        <span>{{ link.text }}</span>
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
        { text: "設定", icon: "cog", to: "/config" },
        { text: "言語", icon: "globe", to: "/language" },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.options {
  position: absolute;
  z-index: 1000;
  top: $userMenuHeight;
  right: 30px;
  width: 120px;
  // background-color: rgba(255, 165, 0, 0.8);
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
    border-bottom: 1px solid rgba($color: orange, $alpha: 0.3);
    background-color: rgba(grey, 1);
    cursor: pointer;
    overflow: hidden;

    i {
      position: absolute;
      top: 50%;
      left: 20px;
      width: 30px;
      color: #eee;
      font-size: 16px;
      text-align: center;
      transform: translateY(-50%);
    }

    span {
      position: absolute;
      top: 50%;
      left: 70px;
      color: #eee;
      transform: translateY(-50%);
      font-size: 14px;
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>