<template>
  <div class="achievement relative z-10">
    <div v-if="user.username">
      <div class="grid grid-cols-3 text-center">
        <m-chip
          class="small"
          :class="{ active: building }"
          border
          @click="onClick('building')"
          >タワー</m-chip
        >
        <m-chip
          class="small"
          :class="{ active: weight }"
          border
          @click="onClick('weight')"
          >体重</m-chip
        >
        <m-chip
          class="small"
          :class="{ active: rate }"
          border
          @click="onClick('rate')"
          >達成率</m-chip
        >
      </div>
      <transition name="active" mode="out-in" @after-enter="afterEnter">
        <div
          v-if="building"
          key="building"
          class="building mt-6 pb-6 fex flex-col justify-center items-center"
        >
          <div class="building-bg-img"></div>
          <div class="w-full z-10 p-4 items-center">
            <div class="line" id="high-start-observer"></div>
            <WorkoutRecords :workout-records="highWorkoutRecords" id="high" />
            <div class="line" id="middle-start-observer"></div>
            <WorkoutRecords
              :workout-records="middleWorkoutRecords"
              id="middle"
            />
            <div class="line" id="low-start-observer"></div>
            <WorkoutRecords :workout-records="lowWorkoutRecords" id="low" />
            <div class="line" id="low-end-observer"></div>
          </div>
          <!-- <img src="/img/achievement/bg-1.jpg" alt="" class="building-bg-img" /> -->
        </div>
        <div
          v-else-if="weight"
          key="weight"
          class="weight pt-6 px-3 relative z-10"
        >
          <!-- <div class="flex items-center col-span-2">
            <m-form type="number" label="現在体重" numeric ref="form"></m-form>
          </div> -->
          <div class="w-100">
            <m-button class="w-100" icon="location-arrow" @click="dialog = true"
              >体重記録</m-button
            >
            <InputWeightDialog :dialog="dialog" @close="dialog = false" />
          </div>
          <div v-if="user.username" class="">
            <div class="chart-box mt-4">
              <line-chart
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"
              />
            </div>
            <div class="records max-w-md mt-6 mx-auto pb-6">
              <h3 class="py-3 font-bold text-center text-sm">体重記録</h3>
              <div class="px-3 flex flex-col-reverse">
                <div
                  v-for="(data, index) in weightData"
                  :key="index"
                  class="record pt-3 pb-1 grid grid-cols-6 text-center border-b-2"
                >
                  <div class="col-span-3 text-sm">
                    {{ data.x }}
                  </div>
                  <div class="col-span-2 font-bold kg">
                    {{ formatWeight(data.y) }}
                  </div>
                  <div class="col-span-1" @click="removeWeightData(data.id)">
                    <i class="fas fa-times-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="img-box flex justify-center">
              <img src="/img/chart.png" alt="" />
            </div>
          </div>
        </div>
        <div v-else-if="rate" key="rate" class="rate px-3">
          <div v-if="target">
            <div class="pt-6 grid grid-cols-12 text-center font-bold">
              <div class="col-span-3 flex flex-col justify-center">
                <p class="text-xs">スタート</p>
                <p class="text-xl kg">{{ target.startWeight }}</p>
              </div>
              <div class="col-span-1 flex justify-center items-center">
                <i class="fas fa-long-arrow-alt-right text-3xl"></i>
              </div>
              <div class="col-span-4 flex flex-col justify-between">
                <p class="text-sm">現在</p>
                <p class="text-4xl kg">{{ user.latestWeight }}</p>
              </div>
              <div class="col-span-1 flex justify-center items-center">
                <i class="fas fa-long-arrow-alt-right text-3xl"></i>
              </div>
              <div class="col-span-3 flex flex-col justify-center">
                <p class="text-xs">目標</p>
                <p class="text-xl kg">{{ target.targetWeight }}</p>
              </div>
            </div>
            <div class="circle py-5 flex justify-center">
              <vue-ellipse-progress
                :size="300"
                :progress="progress"
                color="#ffa931"
                legendClass="percent"
              />
            </div>
          </div>
          <div v-else>
            <m-button class="w-100" :to="{ name: 'SetTarget' }"
              >目標設定</m-button
            >
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <div class="img-box">
        <img src="/img/auth.png" alt="">
      </div>
      <p class="py-6 px-3 font-bold text-center">トレーニング履歴の確認には<br>ログインが必要です。</p>
      <div class="flex justify-center">
        <m-button class="w-75" icon="sign-in-alt" :to="{name: 'Login'}">ログイン</m-button>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/achievement/LineChart.vue";
import WorkoutRecords from "@/components/achievement/WorkoutRecords.vue";
import InputWeightDialog from "@/components/post/InputWeightDialog";
import { db } from "@/firebase/firebase";
import dayjs from "dayjs";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/scale-subtle.css";
import Velocity from "velocity-animate";
import so from "@/libs/scroll";
// import WDWT from "@/assets/workouts-diet-with-tool";
// import WDOT from "@/assets/workouts-diet-without-tool";
// import WTWT from "@/assets/workouts-training-with-tool";
// import WTOT from "@/assets/workouts-training-without-tool";

export default {
  components: {
    LineChart,
    WorkoutRecords,
    InputWeightDialog,
  },
  props: {},
  data() {
    return {
      // building: true,
      // weight: false,
      building: false,
      weight: true,
      rate: false,
      loaded: false,
      chartdata: null,
      lowWorkoutRecords: [],
      lowLength: 10,
      middleWorkoutRecords: [],
      middleLength: 20,
      highWorkoutRecords: [],
      weightData: [],
      idealWeightData: [],
      options: null,
      progress: null,
      timeFormat: "MM/DD/YYYY",
      dialog: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    target() {
      return this.$store.getters.user.target;
    },
  },
  methods: {
    onClick(value) {
      this.setFalse();
      this[value] = true;
    },
    setFalse() {
      this.building = false;
      this.weight = false;
      this.rate = false;
    },
    setProgress() {
      if (this.target) {
        // console.table(this.target);
        const diffFromTargetToStart =
          this.target.targetWeight - this.target.startWeight;
        const diffFromCurrentToStart =
          this.user.latestWeight - this.target.startWeight;

        // console.log('diffFromTargetToStart:', diffFromTargetToStart);

        const rate = diffFromCurrentToStart / diffFromTargetToStart;
        // console.log("rate:", rate);
        this.progress = Math.floor(rate * 100);
        if (this.progress < 0) {
          this.progress = 0;
        }
        if (this.progress > 100) {
          this.progress = 100;
        }
        // console.log("this.progress:", this.progress);
      }
    },
    setWeightSample() {
      for (let i = 0; i < 30; i++) {
        const num = Math.floor(Math.random() * 20) / 10;
        const year = 2020;
        const month = 12;
        const date = i + 1;
        const data = {
          weight: 65 + num,
          year,
          month,
          date,
          createdAt: new Date(),
        };
        db.collection("users")
          // .doc(this.user.uid)
          // .doc('Izd9Hiq98ZYq1Lvf5kZEeZTMmoo2')
          .collection("weight-records")
          .doc(`${year}-${month}-${date}`)
          .set(data, { merge: true });
      }
    },
    setWorkoutSample() {
      const sampleMenus = [
        {
          menuName: "ベンチプレス",
          weight: 10,
          reps: 10,
          weightSets: 3,
          menuType: "weight",
          timestamp: Date.now(),
        },
        {
          menuName: "スクワット",
          weight: 10,
          reps: 10,
          weightSets: 3,
          menuType: "weight",
          timestamp: Date.now(),
        },
        {
          menuName: "ショルダープレス",
          weight: 10,
          reps: 10,
          weightSets: 3,
          menuType: "weight",
          timestamp: Date.now(),
        },
        {
          menuName: "プランク",
          duration: 1,
          durationSets: 3,
          menuType: "duration",
          timestamp: Date.now(),
        },
        {
          menuName: "散歩",
          duration: 40,
          durationSets: 3,
          menuType: "duration",
          timestamp: Date.now(),
        },
      ];
      for (let i = 0; i < 30; i++) {
        let menus = [];
        const menuLength = Math.floor(Math.random() * sampleMenus.length);
        for (let i = 0; i < menuLength; i++) {
          const num = Math.floor(Math.random() * sampleMenus.length);
          menus.push(sampleMenus[num]);
        }
        const year = 2020;
        const month = 11;
        const date = i + 1;

        const d = new Date(`${year}-${month}-${date}`);
        // console.log("d:", d);

        const data = {
          menus,
          trainingDate: d,
        };
        console.log("data:", data);

        db.collection("users")
          // .doc(this.user.uid)
          .doc("Izd9Hiq98ZYq1Lvf5kZEeZTMmoo2")
          .collection("workout-records")
          .doc()
          .set(data, { merge: true });
      }
    },
    setSample() {
      // this.setWeightSample();
      this.setWorkoutSample();
    },
    formatWeight(value) {
      const length = value.toString().length;
      let num = value.toString();
      if (length < 3) {
        num = `${num}.0`;
      } else if (length > 4) {
        num = num.substring(0, 4);
      }
      return num;
    },
    // 時刻のフォーマット
    fromTimestampToFormattedDate(timestamp, format) {
      if (format) {
        return dayjs(timestamp.toDate()).format(format);
      }
      return dayjs(timestamp.toDate()).format(this.timeFormat);
    },
    fromSecondToFormattedDate(second) {
      // console.log(
      //   "dayjs(second).format(this.timeFormat):",
      //   dayjs(second).format(this.timeFormat)
      // );
      return dayjs(second).format(this.timeFormat);
    },
    fromSecondToDay(timestamp) {
      return dayjs(timestamp.toDate()).day();
    },
    async fetchWorkoutRecords() {
      if (!this.user.username) return;
      this.loaded = false;
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("workout-records")
        // .where("deleteFlg", "==", false)
        .orderBy("trainingDate", "asc")
        // .startAfter(this.lastPost)
        .get()
        .then((snapshot) => {
          // console.log("snapshot:", snapshot);
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const data = change.doc.data();
              const record = {
                ...change.doc.data(),
                day: this.fromSecondToDay(data.trainingDate),
                formattedDate: this.fromTimestampToFormattedDate(
                  data.trainingDate,
                  "M/D"
                ),
              };
              // console.log("record:", record);
              // labels = [`${d.month}/${d.date}`, ...labels];
              // data = [`${d.weight}`, ...data];
              // labels = [`${d.createdAt}`, ...labels];

              // 新しいのが上に
              const lowLength = this.lowWorkoutRecords.length;
              const middleLength = this.middleWorkoutRecords.length;
              if (lowLength < this.lowLength) {
                this.lowWorkoutRecords = [record, ...this.lowWorkoutRecords];
              } else if (middleLength < this.lowLength) {
                this.middleWorkoutRecords = [
                  record,
                  ...this.middleWorkoutRecords,
                ];
                // console.log("middle:");
              } else {
                this.highWorkoutRecords = [record, ...this.highWorkoutRecords];
                // console.log("high:");
              }
            }
          });
        });
      this.loaded = true;
    },
    async fetchWeightRecords() {
      if (!this.user.username) return;
      this.loaded = false;
      let maxWeight = 0;
      let minWeight = 1000;
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("weight-records")
        // .where("deleteFlg", "==", false)
        .orderBy("year", "desc")
        .orderBy("month", "desc")
        .orderBy("date", "desc")
        // .startAfter(this.lastPost)
        .get()
        .then((snapshot) => {
          // .onSnapshot((snapshot) => {
          // console.log("snapshot:", snapshot);
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const data = change.doc.data();
              // labels = [`${d.month}/${d.date}`, ...labels];
              // data = [`${d.weight}`, ...data];
              // labels = [`${d.createdAt}`, ...labels];
              this.weightData = [
                {
                  // x: this.fromTimestampToFormattedDate(d.createdAt),
                  x: `${data.year}/${data.month}/${data.date}`,
                  y: data.weight,
                  id: change.doc.id,
                },
                ...this.weightData,
              ];
              if (data.weight > maxWeight) {
                maxWeight = data.weight;
              }
              if (data.weight < minWeight) {
                minWeight = data.weight;
              }
            }
          });
        });

      let targetStart;
      let targetStartSecond;
      let targetEndSecond;
      try {
        targetStart = this.target.startAt.toDate();
        targetStartSecond = targetStart.setDate(targetStart.getDate());
        targetEndSecond = targetStart.setDate(
          targetStart.getDate() + this.target.periodValue * 7
        );
      } catch {
        targetStartSecond = this.target.startAt.getTime();
        targetEndSecond =
          this.target.startAt.getTime() +
          this.target.periodValue * 7 * 24 * 60 * 60 * 1000;
      }
      this.idealWeightData = [
        {
          x: this.fromSecondToFormattedDate(targetStartSecond),
          y: this.target.startWeight,
        },
        {
          x: this.fromSecondToFormattedDate(targetEndSecond),
          y: this.target.targetWeight,
        },
      ];
      this.chartdata = {
        datasets: [
          {
            label: "体重",
            data: this.weightData,
            backgroundColor: "#ffa93133",
            borderColor: "#ffa93188",
          },
          {
            label: "目標推移",
            data: this.idealWeightData,
            backgroundColor: "transparent",
            borderColor: "#66bb6a77",
            pointBackgroundColor: "transparent",
          },
        ],
      };
      // console.log('maxWeight, minWeight:', maxWeight, minWeight);
      this.options = {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                // parser: this.timeFormat,
                // tooltipFormat: "ll HH:mm",
                unit: "day",
                displayFormats: {
                  day: "M/D",
                },
                stepSize: 7,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                // beginAtZero: true,
                suggestedMax: maxWeight + 5,
                suggestedMin: minWeight - 10,
                stepSize: 2,
              },
            },
          ],
        },
        // plugins: {
        //   zoom: {
        //     pan: {
        //       enabled: true,
        //       mode: "x", // is panning about the y axis neccessary for bar charts?
        //     },
        //     zoom: {
        //       enabled: true,
        //       mode: "x",
        //       sensitivity: 3,
        //     },
        //   },
        // },
      };
      this.loaded = true;
    },
    removeWeightData(docId) {
      console.log("docId:", docId);
      this.weightData = this.weightData.filter((data) => data.id !== docId);
    },
    beforeEnter: function (el) {
      console.log("before enter el:", el);
      el.style.opacity = 0;
      el.style.transform = "translateX(500px)";
    },
    enter: function (el, done) {
      const index = el.dataset.index;
      const menus = JSON.parse(el.dataset.menus);
      // console.log('menus:', menus);
      let content = "";
      menus.forEach((menu) => {
        // console.log('menu:', menu);
        const sets = menu.weightSets || menu.durationSets || menu.sets;
        switch (menu.menuType) {
          case "weight":
            content += `${menu.menuName} ${menu.weight}kg x ${menu.reps}回 x ${sets}セット \n`;
            break;
          case "duration":
            content += `${menu.menuName} ${menu.duration}分 x ${sets}セット \n`;
            break;
        }
      });
      // console.log('content:', content);
      // console.log("el:", el);

      var delay = index * 100;
      setTimeout(function () {
        Velocity(el, { opacity: 1, translateX: "0" }, { complete: done });
        tippy(el, {
          animation: "scale",
          theme: el.dataset.day,
          // theme: "sunday",
          content,
        });
      }, delay);
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function () {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
    afterEnter() {
      if (this.building) {
        this.tippyRecords();
        this.setBuildingBg();
        this.observeBuildingBg();
      }
    },
    tippyRecords() {
      const records = this.$el.querySelectorAll(".record");
      records.forEach((record) => {
        const menus = JSON.parse(record.dataset.menus);
        // console.log('menus:', menus);
        let content = "";
        menus.forEach((menu) => {
          // console.log('menu:', menu);
          const sets = menu.weightSets || menu.durationSets || menu.sets;
          switch (menu.menuType) {
            case "weight":
              content += `${menu.menuName} ${menu.weight}kg x ${menu.reps}回 x ${sets}セット<br>`;
              break;
            case "duration":
              content += `${menu.menuName} ${menu.duration}分 x ${sets}セット<br>`;
              break;
          }
        });
        tippy(record, {
          allowHTML: true,
          animation: "scale",
          theme: record.dataset.day,
          // theme: "sunday",
          content,
        });
      });
    },
    setBuildingBg() {
      const hightLength = this.highWorkoutRecords.length;
      const middleLength = this.middleWorkoutRecords.length;
      // const lowLlength = this.lowWorkoutRecords.length;
      const buildingBgImg = this.$el.querySelector(".building-bg-img");

      if (hightLength) {
        buildingBgImg.classList.add("bg-3");
      } else if (middleLength) {
        buildingBgImg.classList.add("bg-2");
      } else {
        buildingBgImg.classList.add("bg-1");
      }
    },
    observeBuildingBg() {
      if (this.middleWorkoutRecords.length) {
        new so("#low-start-observer", this.changeToMiddle, { once: false });
      }
      if (this.highWorkoutRecords.length) {
        new so("#middle-start-observer", this.changeToHigh, { once: false });
        new so("#high-start-observer", this.addHigh, { once: false });
        new so("#low-end-observer", this.addLow, { once: false });
      }
    },
    addHigh(el, value) {
      setTimeout(() => {
        console.log("add high:");
        const buildingBgImg = this.$el.querySelector(".building-bg-img");
        if (value) {
          buildingBgImg.classList.remove("bg-2");
          buildingBgImg.classList.remove("bg-1");
          buildingBgImg.classList.add("bg-3");
        } else {
          // buildingBgImg.classList.add("bg-2");
        }
      }, 300);
    },
    changeToHigh(el, value) {
      setTimeout(() => {
        console.log("to high:");
        const buildingBgImg = this.$el.querySelector(".building-bg-img");
        if (value) {
          buildingBgImg.classList.remove("bg-2");
          buildingBgImg.classList.remove("bg-1");
          buildingBgImg.classList.add("bg-3");
        } else {
          buildingBgImg.classList.add("bg-2");
        }
      }, 200);
    },
    changeToMiddle(el, value) {
      setTimeout(() => {
        console.log("to middle:");
        const buildingBgImg = this.$el.querySelector(".building-bg-img");
        if (value) {
          buildingBgImg.classList.add("bg-2");
          buildingBgImg.classList.remove("bg-1");
        } else {
          buildingBgImg.classList.add("bg-1");
        }
      }, 100);
    },
    addLow(el, value) {
      const buildingBgImg = this.$el.querySelector(".building-bg-img");
      if (value) {
        buildingBgImg.classList.add("bg-1");
      }
    },
  },
  created() {
    // console.log("Velocity:", Velocity);
    // console.log("WDWT:", WDWT);
    // console.log("WDOT:", WDOT);
    // console.log("WTWT:", WTWT);
    // console.log("WTOT:", WTOT);
    this.setProgress();
    // this.setSample();
  },
  async mounted() {
    await this.fetchWeightRecords();
    await this.fetchWorkoutRecords();
  },
  watch: {
    weightData() {
      this.chartdata = {
        datasets: [
          {
            label: "体重",
            data: this.weightData,
            backgroundColor: "#ffa93133",
            borderColor: "#ffa93188",
          },
          {
            label: "目標推移",
            data: this.idealWeightData,
            backgroundColor: "transparent",
            borderColor: "#66bb6a77",
            pointBackgroundColor: "transparent",
          },
        ],
      };
    },
    rate() {
      if (this.rate) {
        this.setProgress();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.achievement {
  padding-left: 0px;
  padding-right: 0px;
  .img-box {
    img {
      @extend .fit-img;
    }
  }

  .kg {
    &::after {
      content: "kg";
      margin-left: 4px;
      font-size: 14px;
      font-weight: 900;
    }
  }
}

.building {
  position: relative;
  min-height: 100vh;
  &-bg-img {
    &.bg-3 {
      &::before {
        background-image: url("/img/achievement/bg-3.jpg");
        transition-delay: 0.3s;
      }
    }
    &.bg-2 {
      &::before {
        background-image: url("/img/achievement/bg-2.jpg");
      }
    }
    &.bg-1 {
      &::before {
        background-image: url("/img/achievement/bg-1.jpg");
      }
    }
    &::before {
      content: "";
      background-position: left;
      background-size: cover;
      position: fixed;
      z-index: -1;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: $appMaxWidth;
      height: 100vh;
      opacity: 0.8;
      transition: 0.6s;
    }
  }
}

.weight {
  .chart-box,
  .records {
    border-radius: 4px;
    @extend .bs-b-4;
  }
  .records {
    max-height: 300px;
    overflow-y: auto;

    .record {
      div {
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }

      i {
        color: rgba($red, 0.6);
      }
    }
  }
}

.rate {
  position: relative;

  .circle {
    filter: drop-shadow(5px 5px 5px rgba($black, 0.15))
      drop-shadow(0px 0px 50px rgba($black, 0.2));
    transform: translateZ(0);
  }

  ::v-deep .percent {
    span {
      font-size: 70px;
      font-weight: 700;

      &.ep-legend--value__counter::after {
        content: "%";
        font-size: 30px;
        font-weight: 900;
      }
    }
  }
}

.active-enter-active,
.active-leave-active {
  transition: all 0.3s;
}
.active-enter,
.active-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
// .line {
//   padding: 2px;
//   background-color: red;
// }
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .achievement {
    padding-left: 260px;
  }
}

@media (min-width: 1200px) {
}
</style>