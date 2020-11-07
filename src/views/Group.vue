<template>
  <div class="group">
    <m-tabs>
      <m-tab
        v-for="tab in tabs"
        :key="tab.target"
        :target="tab.target"
        @click="onClickTab"
        >{{ tab.text }}</m-tab
      >
    </m-tabs>
    <m-tab-contents>
      <m-tab-content class="active" id="group-list">
        <group-card></group-card>
        <group-card></group-card>
        <group-card></group-card>
      </m-tab-content>
      <m-tab-content id="search">
        <m-form-group>
          <m-form v-model="searchWord" icon="search"></m-form>
        </m-form-group>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
          voluptates sapiente a doloremque, necessitatibus aliquam
          exercitationem soluta odio voluptatem eum ducimus optio eaque sequi
          fugit quos mollitia incidunt, maiores nam.
        </p>
      </m-tab-content>
    </m-tab-contents>
  </div>
</template>

<script>
import GroupCard from "@/components/group/GroupCard";
export default {
  components: {
    GroupCard,
  },
  props: {},
  data() {
    return {
      searchWord: null,
      tabs: [
        { text: "グループ一覧", target: "group-list" },
        { text: "検索", target: "search" },
      ],
    };
  },
  computed: {},
  methods: {
    onClickTab() {},
  },
};
</script>

<style lang="scss" scoped>
.group {
  &::before {
    content: "";
    background-image: url(/img/gym.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100vh;
    opacity: 0.3;
  }
  &::after {
    content: "";
    background: linear-gradient(
      90deg,
      rgba(0, 29, 48, 1) 0%,
      rgba(74, 84, 102, 1) 33%,
      rgba(0, 29, 48, 1) 100%
    );
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100vh;
    opacity: 0.5;
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