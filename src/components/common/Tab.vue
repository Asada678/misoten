<template>
  <li class="m-tab" :data-tab-target="`#${target}`" @click="onClickTab">
    <slot></slot>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    target: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickTab(event) {
      const targetTab = event.target;

      const targetTabContent = document.querySelector(
        targetTab.dataset.tabTarget
      );
      const activeTab = document.querySelector(".m-tab.active");
      const activeTabContent = document.querySelector(".m-tab-content.active");

      const resultTabs = [].slice.call(document.querySelectorAll(".m-tab"));
      const index = resultTabs.indexOf(targetTab);
      console.log("index:", index);

      activeTab.classList.remove("active");
      targetTab.classList.add("active");

      document.querySelector(
        ".m-tab-contents-slide"
      ).style.transform = `translateX(-${index * 100}%)`;

      activeTabContent.classList.remove("active");
      targetTabContent.classList.add("active");
    },
  },
};
</script>

<style lang="scss" scoped>
.m-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: rgba($white, 0.9);
  border-left: 1px solid rgba($grey, 0.9);
  // border-bottom: 1px solid rgba($cGrey, 0.9);
  cursor: pointer;
  transition: 0.5s;

  &:first-child {
    border-left: none;
  }

  &:hover {
    background-color: rgba($grey, 0.9);
  }
  &.active {
    background-color: rgba($indigo, 0.6);
    color: $white;
    box-shadow: -1px -1px 5px rgba($color: $white, $alpha: 0.2);

    &:hover {
      background-color: rgba($indigo, 0.7);
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