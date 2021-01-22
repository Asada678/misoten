<template>
  <div class="menu-list">
    <div class="px-4 py-6 grid grid-cols-5 relative z-10">
      <div
        class="menu-list-img border-2 p-1 max-h-64 max-w-xs rounded-lg col-span-2 text-center align-middle"
      >
        <img src="/img/menu-list.png" alt="MENU LIST" />
      </div>
      <div class="col-span-3 flex flex-col justify-center">
        <p class="text-center font-bold tracking-wide">
          {{ day.year }}年 {{ day.month }}月 {{ day.date }}日
        </p>
        <div class="flex justify-center">
          <!-- <m-button class="w-50">start</m-button> -->
          <m-button class="w-100 green" icon="check" @click="finish"
            >完了</m-button
          >
        </div>
      </div>
    </div>

    <!-- <m-tabs class="sticky z-30 top-10" tab-key="menu-list">
      <m-tab v-for="tab in plan" :key="tab.target" :target="tab.target">{{
        tab.text
      }}</m-tab>
    </m-tabs> -->
    <!-- <m-tab-contents class="py-2 relative z-10" tab-key="menu-list">
      <m-tab-content
        v-for="(part, index) in plan"
        :key="index"
        :class="{ active: index === 0 }"
        :id="part.target"
      > -->
    <div
      v-for="menu in menus"
      :key="menu.menuName"
      class="menu px-2 pt-3 pb-1 grid grid-cols-10 border-b-2 border-gray-300"
      :class="{ done: menu.done }"
      @click="toWorkout(menu)"
    >
      <i
        class="fas fa-check-circle col-span-1 flex items-center justify-center text-center text-2xl"
      ></i>

      <div class="col-span-5 pr-2 font-bold md:text-lg">
        {{ menu.menuName }}
      </div>
      <div
        class="col-span-2 flex items-center justify-end font-bold text-xs md:text-sm"
      >
        {{ menu.weight }}kg x {{ menu.reps }}回
      </div>
      <div
        class="col-span-1 flex items-center justify-end font-bold text-xs md:text-sm"
      >
        {{ menu.sets }} set
      </div>
      <div
        v-if="!menu.done"
        class="col-span-1 flex items-center justify-center"
      >
        <i class="fas fa-chevron-right col-span-1 text-center text-lg"></i>
      </div>
    </div>
    <!-- </m-tab-content>
    </m-tab-contents> -->

    <m-dialog
      :dialog="finishDialog"
      header-text="確認"
      button-text="完了"
      color="red"
      @action="toCompleteWorkout"
      @close="finishDialog = false"
    >
      <div>
        <div
          v-for="(menu, index) in notDoneMenus"
          :key="index"
          class="font-bold tracking-wider t-red"
        >
          {{ menu.menuName }}
        </div>
        <div class="p-4">
          <span class="text-sm"
            >上記のメニューを完了していません。<br />終了してよろしいですか？</span
          >
        </div>
      </div>
    </m-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  // props: ['day', 'month', 'date'],
  data() {
    return {
      day: {
        year: 2021,
        month: 1,
        date: 10,
      },
      plan: [
        {
          text: "腕",
          target: "arm",
          menus: [
            {
              name: "ハンマーカール",
              weight: 120,
              reps: 10,
              sets: 3,
            },
            {
              name: "コンセントレーションダンベルカール",
              weight: 20,
              reps: 10,
              sets: 3,
            },
            {
              name: "ダンベルフレンチプレス",
              weight: 20,
              reps: 10,
              sets: 3,
            },
            {
              name: "ダンベルキックバック",
              weight: 20,
              reps: 10,
              sets: 3,
            },
          ],
        },
        {
          text: "肩",
          target: "shoulder",
          menus: [
            {
              name: "ダンベルショルダープレス",
              weight: 20,
              reps: 10,
              sets: 3,
            },
            {
              name: "ダンベルフロントレイズ",
              weight: 20,
              reps: 10,
              sets: 3,
            },
          ],
        },
        {
          text: "胸",
          target: "chest",
          menus: [
            {
              name: "リアレイズ",
              weight: 20,
              reps: 10,
              sets: 3,
            },
            {
              name: "ダンベルチェストプレス",
              weight: 20,
              reps: 10,
              sets: 3,
            },
          ],
        },
        {
          text: "背中",
          target: "back",
          menus: [
            {
              name: "ダンベルデッドリフト",
              weight: 20,
              reps: 10,
              sets: 3,
            },
          ],
        },

        {
          text: "脚",
          target: "leg",
          menus: [
            {
              name: "ダンベルレッグランジ",
              weight: 20,
              reps: 10,
              sets: 3,
            },
          ],
        },
      ],
      menus: [
        {
          menuName: "ダンベルショルダープレス",
          imgName: "shoulder",
          weight: 10,
          reps: 10,
          sets: 3,
          menuType: "weight",
          messages: [
            'しっかりとベンチに座りましょう。',
            'ダンベルを持ち、手のひらを前に向けてください。',
            'ダンベルを持ち上げましょう。',
            '上まで持ち上げたら停止してください。',
            'ゆっくりとダンベルを下ろしましょう。',
          ]
        },
        {
          menuName: "アームカール",
          imgName: "arm",
          weight: 8,
          reps: 10,
          sets: 3,
          menuType: "weight",
          messages: [
            'ダンベルを肩幅で持ってください。',
            '肘を曲げて、ダンベルを持ち上げましょう。',
            '胸は張りすぎないようにしてください。',
            'ゆっくりとダンベルを下ろしましょう。',
          ]
        },
      ],
      notDoneMenus: [],
      finishDialog: false,
    };
  },
  computed: {},
  methods: {
    toWorkout(workout) {
      this.$router.push({ name: "Workout", params: { workout } });
    },
    finish() {
      if (this.menus.some((m) => !m.done)) {
        this.notDoneMenus = this.menus.filter((m) => !m.done);
        this.finishDialog = true;
        return;
      }

      this.toCompleteWorkout();
    },
    setCompleteMenu() {
      const completeMenu = this.menus.filter((m) => m.done);
      console.log("completeMenu:", completeMenu);
      this.$store.commit("setCompleteMenu", completeMenu);
    },
    toCompleteWorkout() {
      this.setCompleteMenu();
      this.$router.push({ name: "CompleteWorkout" });
    },
    setMenuDone() {
      const params = this.$route.params;
      console.log("params:", params);
      if (params.done) {
        console.log("params:", params);
        this.menus = this.menus.map((menu) => {
          if (menu.imgName === params.doneMenuName) {
            return Object.assign(menu, { done: true });
          }
          return menu;
        });
      }
    },
    setDay() {
      if (this.$route.params.day) {
        this.day = this.$route.params.day;
      }
    },
  },
  created() {
    this.setDay();
    this.setMenuDone();
    // console.log('this.$route.params.day:', this.$route.params.day);
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.menu-list {
  &-img {
    img {
      height: 180px;
      max-height: 100%;
      margin: auto;
      object-fit: cover;
    }
  }
  .menu {
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: $grey, $alpha: 0.3);
    }
    i.fa-check-circle {
      // display: none;
      opacity: 0;
      visibility: hidden;
    }
    &.done {
      // background-color: rgba($orange, 0.5);
      pointer-events: none;
      color: $orange;

      i {
        // display: block;
        opacity: 1;
        visibility: visible;
        color: $orange;
      }
      &:hover {
        background-color: rgba($orange, 0.1);
      }
    }
    &:hover {
      background-color: rgba($color: $grey, $alpha: 0.3);
    }
  }
  .m-tabs {
    z-index: 100;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .sample {
    padding: 60px 10px 200px (250px + 10px);
  }
}

@media (min-width: 1200px) {
}
</style>