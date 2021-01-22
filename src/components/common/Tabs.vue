<template>
  <ul :data-tab-key="tabKey" class="m-tabs overflow-x-auto">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {
    overflow: {
      type: Boolean,
      default: false,
    },
    tabKey: String,
  },
  data() {
    return {
      activeTab: null,
    };
  },
  computed: {},
  methods: {
    addActive() {
      this.activeTab = this.$el.querySelector(".active");
      // console.log("this.activeTab:", this.activeTab);
      if (!this.activeTab) {
        // console.log("this.$el:", this.$el);
        this.activeTab = this.$el.firstChild;
        this.activeTab.classList.add("active");
      }
      // console.log("this.activeTab:", this.activeTab);
    },
    addWidthToTabs() {
      this.$el.childNodes.forEach((el) => {
        if (this.$el.childNodes.length < 6) {
          el.style.width = `${100 / this.$el.childNodes.length}%`;
        } else {
          el.style.width = `22%`;
        }
      });
    },
    scrollToActiveTab() {
      if (this.$el.childNodes.length < 6) return;
      const tabWidth = this.$el.querySelector(".m-tab").clientWidth;
      // console.log("tabWidth:", tabWidth);

      const activeIndex = [].slice
        .call(this.$el.childNodes)
        .indexOf(this.activeTab);
      // console.log("activeIndex:", activeIndex);

      // console.log('tabs this.$el.scrollLeft:', this.$el.scrollLeft);
      this.$el.scrollLeft = tabWidth * activeIndex;
    },
  },
  mounted() {
    // console.log("tabs mounted:");
    this.addActive();
    this.addWidthToTabs();
    this.scrollToActiveTab();
  },
};
</script>

<style lang="scss" scoped>
.m-tabs {
  // position: relative;
  // z-index: 1;
  // display: inline-block;
  display: block;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  width: 100%;
  white-space: nowrap;
  // box-shadow: -1px -1px 1px rgba($col  or: $black, $alpha: 0.2),
  //   1px 1px 1px rgba($color: $black, $alpha: 0.2),
  //   3px 3px 3px rgba($color: $black, $alpha: 0.2);
  @extend .bs-b-4;

  &.overflow {
    overflow-x: auto;
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