<template>
  <div class="set-target">
    <div class="px-2 relative z-10">
      <m-form-group label="目的">
        <m-chip-radio
          v-model="purpose"
          class="grid-2"
          name="purpose"
          :options="purposeOptions"
        ></m-chip-radio>
      </m-form-group>
      <m-form-group label="レベル">
        <m-chip-radio
          v-model="level"
          class="grid-3"
          name="level"
          :options="levelOptions"
        ></m-chip-radio>
      </m-form-group>
      <m-form-group label="期間">
        <m-range v-model="periodIndex" :options="periodOptions"></m-range>
      </m-form-group>
      <m-form-group label="一日の運動時間">
        <m-range
          v-model="minutesPerDayIndex"
          :options="minutesPerDayOptions"
        ></m-range>
      </m-form-group>
      <m-form-group v-if="!latestWeight" label="現在体重">
        <!-- <m-chip class="active w-50" border
          >{{ latestWeight }}kg</m-chip
        > -->
        <m-range
          v-model="startWeight"
          max="120"
          min="30"
          unit="kg"
          number
        ></m-range>
      </m-form-group>
      <m-form-group label="目標体重">
        <m-range
          v-model="targetWeight"
          max="100"
          min="40"
          unit="kg"
          number
        ></m-range>
      </m-form-group>
      <m-form-group label="鍛えたい部位">
        <m-chip-check
          v-model="selectedParts"
          class="grid-3"
          name="part"
          :options="partsOptions"
        ></m-chip-check>
      </m-form-group>
      <m-form-group label="道具を持っているか">
        <m-chip-radio
          v-model="hasTools"
          class="grid-2"
          name="has-tools"
          :options="hasToolsOptions"
        ></m-chip-radio>
        <transition name="has-tools" mode="out-in">
          <div v-if="hasTools === 'yes'" class="mt-2">
            <p class="text-sm font-bold">持っている道具を選択してください</p>
            <div class="tools py-2 px-3 mt-1 rounded-md grid grid-cols-3 gap-3">
              <div
                v-for="option in toolsOptions"
                :key="option.value"
                class="tool"
                :class="{ selected: selectedTools.includes(option.value) }"
              >
                <input
                  v-model="selectedTools"
                  type="checkbox"
                  name="tools"
                  :value="option.value"
                  :id="option.value"
                />
                <label :for="option.value"></label>
                <p>{{ option.label }}</p>
              </div>
            </div>
          </div>
        </transition>
      </m-form-group>

      <m-button class="w-100" @click="check">確認</m-button>
    </div>
    <!-- dialog -->
    <m-dialog
      :dialog="dialog"
      class="p-none"
      header-text="確認"
      button-text="設定"
      :height-fix="true"
      :loading="loading"
      @action="setTarget"
      @close="dialog = false"
    >
      <m-tabs class="absolute z-10 text-sm" tab-key="set-target-dialog">
        <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
          tab.text
        }}</m-tab>
      </m-tabs>
      <m-tab-contents tab-key="set-target-dialog">
        <m-tab-content id="coach" class="active coach-appear pt-16 px-3">
          <p class="description">
            {{ periodValue[this.periodIndex] }}週間後のあなたがこちらです
          </p>
          <!-- <img src="/img/body-type-m1.png" alt="" /> -->
          <video
            id="coach-video"
            src="https://firebasestorage.googleapis.com/v0/b/misoten-dev.appspot.com/o/videos%2Fbody.mp4?alt=media&token=ee0516ad-b22c-448f-bfac-545bb999da86"
            type="video/mp4"
            playsinline
            webkit-playsinline
            muted
            ref="coachVideo"
          ></video>
        </m-tab-content>
        <!-- <m-tab-content id="plan" class="pt-16 px-3"></m-tab-content> -->
        <m-tab-content id="target" class="pt-16 px-3">
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">目的</h3>
            <div class="col-span-3">{{ purposeLabel }}</div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">レベル</h3>
            <div class="col-span-3">{{ levelLabel }}</div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">期間</h3>
            <div class="col-span-3">{{ periodOptions[periodIndex] }}</div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">一日の運動時間</h3>
            <div class="col-span-3">
              {{ minutesPerDayOptions[minutesPerDayIndex] }}
            </div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">現在体重</h3>
            <div class="col-span-3">{{ startWeight }}kg</div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">目標体重</h3>
            <div class="col-span-3">{{ targetWeight }}kg</div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">鍛えたい部位</h3>
            <div div class="col-span-3">
              <span v-for="(part, index) in selectedParts" :key="index">
                {{ partLabel(part) }}
              </span>
            </div>
          </div>
          <div class="w-full grid grid-cols-5 border-b mb-2">
            <h3 class="col-span-2 font-bold">道具を持っているか</h3>
            <div class="col-span-3">{{ hasToolsLabel }}</div>
          </div>
          <div
            v-if="hasTools === 'yes'"
            class="w-full grid grid-cols-5 border-b mb-2"
          >
            <h3 class="col-span-2 font-bold">持っている道具</h3>
            <div div class="col-span-3">
              <span v-for="(tool, index) in selectedTools" :key="index">
                {{ toolLabel(tool) }}
              </span>
            </div>
          </div>
        </m-tab-content>
      </m-tab-contents>
    </m-dialog>
  </div>
</template>

<script>
// import Swiper from "swiper";
import firebase from "firebase";
import { db } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {},
  props: {},
  data() {
    return {
      purpose: "training",
      purposeOptions: [
        {
          label: "トレーニング",
          value: "training",
        },
        { label: "ダイエット", value: "diet" },
      ],
      level: "easy",
      levelOptions: [
        { label: "easy", value: "easy" },
        { label: "normal", value: "normal" },
        { label: "hard", value: "hard" },
      ],
      periodIndex: null,
      periodValue: [1, 5, 10, 30, 50],
      periodOptions: ["１週間", "５週間", "１０週間", "３０週間", "５０週間"],
      minutesPerDayIndex: null,
      minutesPerDayValue: [5, 15, 30, 60, 120, 180],
      minutesPerDayOptions: [
        "５分",
        "１５分",
        "３０分",
        "１時間",
        "２時間",
        "３時間",
      ],
      hasTools: "no",
      hasToolsOptions: [
        {
          label: "はい",
          value: "yes",
        },
        { label: "いいえ", value: "no" },
      ],
      selectedTools: [],
      toolsOptions: [
        { label: "ジムボール", value: "gym-ball" },
        { label: "ダンベル", value: "dumbell" },
        { label: "ケトルベル", value: "kettlebell" },
        { label: "縄跳び", value: "skipping" },
        { label: "腹筋ローラー", value: "ab-roller" },
        { label: "その他", value: "other" },
      ],
      startWeight: null,
      targetWeight: null,
      selectedParts: [],
      partsOptions: [
        { label: "お腹", value: "belly" },
        { label: "胸", value: "chest" },
        { label: "背中", value: "back" },
        { label: "肩", value: "shoulder" },
        { label: "腕", value: "arm" },
        { label: "お尻", value: "hip" },
        { label: "脚", value: "leg" },
      ],
      dialog: false,
      loading: false,
      tabs: [
        { text: "未来コーチ", target: "coach" },
        // { text: "プラン", target: "plan" },
        { text: "目標", target: "target" },
      ],
    };
  },
  validations: {
    username: {
      required,
      maxLength: maxLength(10),
    },
    email: {
      required,
      // maxLength: maxLength(10),
    },
  },
  computed: {
    purposeLabel() {
      const purposeObj = this.purposeOptions.find(
        (option) => option.value === this.purpose
      );
      // console.log("purposeObj:", purposeObj);
      return purposeObj.label;
    },
    levelLabel() {
      const levelObj = this.levelOptions.find(
        (option) => option.value === this.level
      );
      return levelObj.label;
    },
    hasToolsLabel() {
      const hasToolsObj = this.hasToolsOptions.find(
        (option) => option.value === this.hasTools
      );
      return hasToolsObj.label;
    },
    settedTarget() {
      return this.$store.getters.user.target
        ? this.$store.getters.user.target
        : null;
    },
    latestWeight() {
      return this.$store.getters.user.latestWeight;
    },
    // currentStep() {
    //   return
    // }
  },
  methods: {
    partLabel(part) {
      const partObj = this.partsOptions.find((option) => option.value === part);
      return partObj.label;
    },
    toolLabel(tool) {
      // console.log("tool:", tool);
      const toolObj = this.toolsOptions.find((option) => option.value === tool);
      return toolObj.label;
    },
    playCoachVideo() {
      // console.log('this.$refs.coachVideo:', this.$refs.coachVideo);
      this.$refs.coachVideo.currentTime = 0;
      this.$refs.coachVideo.play();
    },
    addEvent() {
      const coachTab = this.$el.querySelector(
        '.m-tab[data-tab-target="#coach"]'
      );
      // console.log('coachTab:', coachTab);
      coachTab.addEventListener(this.$store.getters.eventType, () => {
        this.playCoachVideo();
      });
    },
    check() {
      // console.log("this.purpose:", this.purpose);
      // console.log("this.level:", this.level);
      // console.log("this.hasTools:", this.hasTools);
      // console.log("this.selectedTools:", this.selectedTools);
      // console.log("this.periodIndex:", this.periodIndex);
      // console.log("this.minutesPerDayIndex:", this.minutesPerDayIndex);
      // console.log("this.targetWeight:", this.targetWeight);
      // console.log("this.selectedParts:", this.selectedParts);
      this.dialog = true;
      // this.$router.push({name: 'CoachAppears'});
    },
    async setTarget() {
      if (!this.$store.getters.user.username) {
        const snackbar = {
          text: "ログインが必要です。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      this.loading = true;
      const target = {
        startAt: new Date(),
        purpose: this.purpose,
        purposeLabel: this.purposeLabel,
        level: this.level,
        levelLabel: this.levelLabel,
        periodIndex: Number(this.periodIndex),
        period: this.periodOptions[this.periodIndex],
        periodValue: this.periodValue[this.periodIndex],
        minutesPerDayIndex: Number(this.minutesPerDayIndex),
        minutesPerDay: this.minutesPerDayOptions[this.minutesPerDayIndex],
        minutesPerDayValue: this.minutesPerDayValue[this.minutesPerDayIndex],
        startWeight: this.latestWeight
          ? this.latestWeight
          : Number(this.startWeight),
        targetWeight: Number(this.targetWeight),
        selectedParts: this.selectedParts,
        hasTools: this.hasTools,
        selectedTools: this.selectedTools,
      };
      const updatedData = {
        target,
        latestWeight: Number(this.startWeight),
      };

      await db
        .collection("users")
        .doc(this.$store.getters.user.uid)
        .update(updatedData)
        .then(() => {
          this.dialog = false;
          this.$router.go(-1);
          const snackbar = {
            text: "目標を設定しました。",
            color: "green",
          };
          this.$store.commit("setSnackbar", snackbar);
          this.$store.commit("updateUser", updatedData);
        });

      this.loading = false;
    },
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
        .then((cred) => {
          // await console.log("cred:", cred);
          cred.user.sendEmailVerification().then(() => {
            console.log("email sent:");
            const snackStatus = {
              snackbar: true,
              snackText: "登録完了です。確認メールを送信しました。",
              snackColor: "success",
            };
            this.$store.commit("setSnackStatus", snackStatus);
            db.collection("users")
              .doc(cred.user.uid)
              .set(
                {
                  name: this.name,
                  createdAt: new Date(),
                },
                { merge: true }
              )
              .then(() => {
                console.log("then after set :");
                this.$router.push({ name: "Home" });
              });
          });
        })
        .catch((err) => {
          let snackText = "登録に失敗しました。";
          switch (err.code) {
            case "auth/email-already-in-use":
              snackText += "既に使われているEmailです。";
              break;
            case "auth/invalid-email":
              snackText += "不適切なEmailです。";
              break;
            case "auth/operation-not-allowed":
              snackText += "不適切な操作です。";
              break;
            case "auth/weak-password":
              snackText += "パスワードが脆弱です。";
              break;
          }
          const snackStatus = {
            snackbar: true,
            snackText,
            snackColor: "red",
          };
          this.$store.commit("setSnackStatus", snackStatus);
        });
    },
    // prev() {
    //   const target = this.currentPage - 1;
    //   this.steps[target].classList.remove("done");
    //   this.setCurrentPage(target);
    // },
    next() {
      const target = this.currentPage + 1;
      this.steps[target - 1].classList.add("done");
      this.setCurrentPage(target);
    },
    setCurrentPage(target) {
      this.slidePage.style.marginLeft = `-${target * 25}%`;
      const currentStep = document.querySelector(".step.current");
      currentStep.classList.remove("current");
      this.steps[target].classList.add("current");
      this.currentPage = target;
    },
  },
  created() {
    if (this.settedTarget) {
      this.purpose = this.settedTarget.purpose;
      this.level = this.settedTarget.level;
      this.minutesPerDayIndex = this.settedTarget.minutesPerDayIndex;
      this.periodIndex = this.settedTarget.periodIndex;
      this.startWeight = this.latestWeight
        ? this.latestWeight
        : this.settedTarget.startWeight;
      this.targetWeight = this.settedTarget.targetWeight;
      this.selectedParts = this.settedTarget.selectedParts;
      this.hasTools = this.settedTarget.hasTools;
      this.selectedTools = this.settedTarget.selectedTools;
    }
  },
  mounted() {
    this.addEvent();
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.playCoachVideo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.black,
.blue {
  .set-target {
    color: $white;
    background: transparent;
  }
}
.set-target {
  min-height: 100vh;
  // padding: 20px 10px;
  padding-top: 60px;
  // padding-left: 10px;
  // padding-right: 10px;
  // background-color: rgba($white, 0.9);
  color: rgba($black, 0.9);
  text-align: center;

  .w-full {
    h3 {
      position: relative;
      font-size: 12px;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 70%;
        background-color: $grey;
      }
    }
  }

  .tools {
    background-color: rgba($grey, 0.9);
    @extend .bs-b-4;

    .tool {
      position: relative;
      padding-top: 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
      @extend .bs-b-2;

      &:hover {
        background-color: rgba($white, 0.2);
        @extend .bs-b-4;
      }

      &.selected {
        @extend .bs-b-4;

        &::before {
          content: "\f058";
          position: absolute;
          z-index: 1;
          top: 5px;
          left: 5px;
          font-family: "Font Awesome 5 Free";
          font-size: 24px;
          font-weight: 900;
          color: $orange;
        }
      }

      input[type="checkbox"] {
        display: none;

        &:checked {
          & + label {
            opacity: 1;
          }

          & ~ p {
            color: $orange;
          }
        }

        & + label {
          display: block;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          width: 100%;
          height: 100px;
          opacity: 0.6;
          transition: 0.3s;
          cursor: pointer;
        }
        &#gym-ball + label {
          background-image: url("/img/gym-ball.jpg");
        }
        &#dumbell + label {
          background-image: url("/img/dumbell.jpg");
        }
        &#skipping + label {
          background-image: url("/img/skipping.jpg");
        }
        &#kettlebell + label {
          background-image: url("/img/kettlebell.jpg");
        }
        &#ab-roller + label {
          background-image: url("/img/ab-roller.jpg");
        }
      }
      p {
        font-size: 12px;
        font-weight: 700;
        color: rgba($black, 0.9);
      }
    }
  }
}

.coach-appear {
  background-color: #383638;
  color: $white;
  font-weight: 700;
}
.has-tools-enter-active,
.has-tools-leave-active {
  transition: all 0.2s;
}
.has-tools-enter,
.has-tools-leave-to {
  opacity: 0;
  transform: translateY(30px);
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