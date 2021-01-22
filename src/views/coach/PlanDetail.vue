<template>
  <div class="plan-detail">
    <div class="px-4 py-6 grid grid-cols-5 relative z-10">
      <div
        class="plan-name border-2 p-1 max-h-64 max-w-xs rounded-lg col-span-2 text-center align-middle"
      >
        <!-- <span class="font-bold text-lg text-center">
          {{ $route.params.planName }}
        </span> -->
        <img src="/img/plan-detail-1.png" alt="PLAN DETAIL 1" />
      </div>
      <div class="col-span-3 flex flex-col justify-center tracking-widest">
        <p class="font-bold text-center text-lg">
          {{ $route.params.planName }} <br />
          {{ settedTarget.periodValue }}週間プラン
        </p>
        <m-button
          class="w-100 my-0 text-sm"
          icon="user-graduate"
          @click="openCoachDialog"
          >未来コーチ</m-button
        >
      </div>
    </div>

    <div class="relative z-10">
      <p class="pl-2 font-bold text-sm">週間スケジュール</p>
    </div>

    <m-tabs class="sticky top-10 z-30" tab-key="plan-detail">
      <m-tab
        v-for="(tab, index) in weekList"
        :class="{ active: index === 0 }"
        :key="index"
        :target="`week${index + 1}`"
        >{{ index + 1 }}</m-tab
      >
    </m-tabs>
    <m-tab-contents class="py-2 relative z-10" tab-key="plan-detail">
      <m-tab-content
        v-for="(week, index) in weekList"
        :key="index"
        :class="{ active: index === 0 }"
        :id="`week${index + 1}`"
      >
        <div v-if="!index">
          <div
            v-for="(day, index) in week.dayList"
            :key="index"
            class="day px-2 pt-3 pb-1 grid grid-cols-12 border-b-2 border-gray-300"
            @click="toMenuList(day)"
          >
            <i class="fas fa-check-circle col-span-2 text-center text-2xl"></i>
            <div class="col-span-9 pr-2 flex items-center font-bold md:text-lg">
              {{ day.month }}月 {{ day.date }}日
            </div>
            <i class="fas fa-chevron-right col-span-1 text-center text-2xl"></i>
          </div>
        </div>
        <div v-else>
          <div class="py-6 font-bold text-center">
            {{ calcStartScheduleDate(index) }}
            <span class="text-xs">から</span>
            {{ calcEndScheduleDate(index) }}
            <span class="text-xs">のプランは後日決まります。</span>
          </div>
          <div class="plan-detail-img flex justify-center">
            <img src="/img/plan-detail-2.png" alt="PLAN DETAIL 1" />
          </div>
        </div>
      </m-tab-content>
    </m-tab-contents>

    <m-dialog
      :dialog="coachDialog"
      :footer="false"
      class="coach-appear"
      header-text="未来コーチ"
      button-text="トレーニング開始"
      @action="action"
      @close="coachDialog = false"
    >
      <p class="description">
        {{ settedTarget.periodValue }}週間後のあなたがこちらです
      </p>
      <!-- <img src="/img/body-type-m1.png" alt="" /> -->
      <video
        id="coach-video"
        src="https://firebasestorage.googleapis.com/v0/b/misoten-dev.appspot.com/o/videos%2Fbody.mp4?alt=media&token=ee0516ad-b22c-448f-bfac-545bb999da86"
        type="video/mp4"
        playsinline
        webkit-playsinline
        muted
      ></video>
    </m-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  components: {},
  props: {},
  data() {
    return {
      coachDialog: false,
      coachVideo: null,
      weekList: [
        {
          dayList: [
            {
              year: 2021,
              month: 1,
              date: 10,
            },
            {
              year: 2021,
              month: 1,
              date: 12,
            },
            {
              year: 2021,
              month: 1,
              date: 13,
            },
          ],
        },
        // {
        //   dayList: [
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 11,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 12,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 13,
        //     },
        //   ],
        // },
        // {
        //   dayList: [
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 14,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 17,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 20,
        //     },
        //   ],
        // },
        // {
        //   dayList: [
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 24,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 27,
        //     },
        //     {
        //       year: 2021,
        //       month: 1,
        //       date: 30,
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    settedTarget() {
      return this.$store.getters.user.target
        ? this.$store.getters.user.target
        : {};
    },
  },
  methods: {
    calcStartScheduleDate(index) {
      const firstDay = this.weekList[0].dayList[0];
      const d = new Date(firstDay.year, firstDay.month - 1, firstDay.date);
      const day = dayjs(d);
      return day.add(7 * index, "day").format("M/D");
    },
    calcEndScheduleDate(index) {
      const firstDay = this.weekList[0].dayList[0];
      const d = new Date(firstDay.year, firstDay.month - 1, firstDay.date + 7);
      const day = dayjs(d);
      return day.add(7 * index, "day").format("M/D");
    },
    openCoachDialog() {
      this.coachDialog = true;
      this.coachVideo.currentTime = 0;
      this.coachVideo.play();
    },
    action() {},
    toMenuList(day) {
      this.$router.push({ name: "MenuList", params: { day } });
    },
    setWeekList() {
      for (let i = 1; i < this.settedTarget.periodValue; i++) {
        this.weekList.push({});
      }
      console.log("this.weekList:", this.weekList);
    },
  },
  created() {
    this.setWeekList();
  },
  mounted() {
    this.coachVideo = this.$el.querySelector("#coach-video");
    // this.openCoachDialog();
  },
};
</script>

<style lang="scss" scoped>
.plan-detail {
  .plan-name {
    // background-color: $orange;
    // color: $white;
  }
  .day {
    cursor: pointer;
    transition: 0.3s;

    i.fa-check-circle {
      // display: none;
      opacity: 0;
      visibility: hidden;
    }
    &.done {
      // background-color: rgba($orange, 0.5);
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

  .description {
    padding: 5px 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 2px;
  }
  video {
    height: 100%;
    height: 400px;
  }
}

.plan-detail-img {
  img {
    @extend .fit-img;
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