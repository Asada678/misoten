<template>
  <div class="group">
    <!-- tabs start -->
    <m-tabs>
      <m-tab
        v-for="tab in tabs"
        :key="tab.target"
        :target="tab.target"
        @click="onClickTab"
        >{{ tab.text }}</m-tab
      >
    </m-tabs>
    <!-- tab-contents start -->
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
    <!-- dialog start -->
    <m-dialog
      :dialog="dialog"
      color="indigo"
      header-text="グループ作成"
      button-text="作成"
      @action="postTodayWorkout"
      @close="dialog = false"
    >
      <m-form-group>
        <m-form
          v-model="groupName"
          label="groupName"
          :class="{ error: $v.groupName.$error }"
          @blur="$v.groupName.$touch()"
        ></m-form>
        <m-error-message v-if="$v.groupName.$error">
          <span v-if="!$v.groupName.maxLength">
            グループ名は{{
              $v.groupName.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.groupName.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
    </m-dialog>
    <!-- button start -->
    <transition name="fade">
      <float-button
        v-if="true"
        icon="plus"
        right="20"
        size="70"
        @click="dialog = true"
      />
    </transition>
  </div>
</template>

<script>
import GroupCard from "@/components/group/GroupCard";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  components: {
    GroupCard,
  },
  props: {},
  data() {
    return {
      groupName: null,
      dialog: false,
      searchWord: null,
      tabs: [
        { text: "グループ一覧", target: "group-list" },
        { text: "検索", target: "search" },
      ],
    };
  },
  validations: {
    groupName: { required, maxLength: maxLength(20) },
  },
  computed: {},
  methods: {
    onClickTab() {},
  },
};
</script>

<style lang="scss" scoped>
// .group {
//   &::before {
//     content: "";
//     background-image: url(/img/gym.jpg);
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.3;
//   }
//   &::after {
//     content: "";
//     background: linear-gradient(
//       90deg,
//       rgba(0, 29, 48, 1) 0%,
//       rgba(74, 84, 102, 1) 33%,
//       rgba(0, 29, 48, 1) 100%
//     );
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.5;
//   }
// }
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>