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
      // console.log('event:', event);
      const targetTab = event
        ? event.target
        : this.$el.parentNode.querySelector(".m-tab.active");
      // if(!(this.$el.classList.contains('active') && targetTab.classList.contains('active'))) return;
      // console.log("targetTab:", targetTab);

      if (!targetTab) return;

      const tabKey = this.$el.parentNode.dataset.tabKey;
      // console.log("tabKey:", tabKey);

      const targetTabContents = document.querySelector(
        `[data-tab-key="${tabKey}"].m-tab-contents`
      );
      // console.log("targetTabContents:", targetTabContents);

      const targetTabContent = targetTabContents.querySelector(
        `${targetTab.dataset.tabTarget}.m-tab-content`
      );
      // console.log("targetTabContent:", targetTabContent);
      const activeTab = this.$el.parentNode.querySelector(".m-tab.active");
      const activeTabContent = targetTabContents.querySelector(
        ".m-tab-content.active"
      );
      // console.log("activeTab:", activeTab);
      // console.log("activeTabContent:", activeTabContent);

      const resultTabs = [].slice.call(
        this.$el.parentNode.querySelectorAll(".m-tab")
      );
      const index = resultTabs.indexOf(targetTab);
      // console.log("index:", index);

      activeTab.classList.remove("active");
      targetTab.classList.add("active");

      targetTabContents.querySelector(
        ".m-tab-contents-slide"
      ).style.transform = `translateX(-${index * 100}%)`;

      activeTabContent.classList.remove("active");
      targetTabContent.classList.add("active");
    },
  },
  created() {},
  mounted() {
    // console.log('this.$el:', this.$el);
    // console.log("tab mounted:");
    this.onClickTab();
  },
};
</script>

<style lang="scss" scoped>
.m-tab {
  position: relative;
  display: flex;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-left: 1px solid rgba($grey, 0.9);
  // border-bottom: 1px solid rgba($cGrey, 0.9);
  background-color: rgba($white, 0.8);
  color: rgba($black, 0.9);
  // font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: 0.5s;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($white, 0.8);
  }

  &:first-child {
    border-left: none;
  }

  &:hover {
    background-color: rgba($grey, 0.9);
  }
  &.active {
    background-color: rgba($orange, 1);
    color: $white;
    box-shadow: -1px -1px 5px rgba($white, 0.2);

    &:hover {
      background-color: rgba($orange, 0.9);
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