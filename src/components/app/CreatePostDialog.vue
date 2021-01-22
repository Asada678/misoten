<template>
  <!-- post-dialog -->
  <m-dialog
    class="p-none"
    :dialog="dialog"
    :loading="loading"
    :height="600"
    :disabled="$v.$invalid"
    header-text="今日の頑張り"
    button-text="投稿"
    @action="postTodayWorkout"
    @close="closeDialog"
  >
    <m-tabs class="absolute z-10 text-sm" tab-key="create-post-dialog">
      <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
        tab.text
      }}</m-tab>
    </m-tabs>
    <m-tab-contents class="pt-16 px-3" tab-key="create-post-dialog">
      <!-- コメント -->
      <m-tab-content class="active" id="comment">
        <!-- 1.trainingDate -->
        <m-form-group>
          <m-datepicker
            v-model="trainingDate"
            label="トレーニング日"
          ></m-datepicker>
          <m-error-message v-if="$v.trainingDate.$error">
            <span v-if="!$v.trainingDate.required">必須項目です。</span>
          </m-error-message>
        </m-form-group>
        <!-- 2.username -->
        <!-- <m-form-group>
        <m-form
          v-model="username"
          label="名前"
          :class="{ error: $v.username.$error }"
          @input="$v.username.$touch()"
        />
        <m-error-message v-if="$v.username.$error">
          <span v-if="!$v.username.maxLength">
            名前は{{
              $v.username.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.workout.required">必須項目です。</span>
        </m-error-message>
      </m-form-group> -->
        <!-- 2.genre -->
        <m-form-group>
          <m-radio name="genre">
            <p class="title">ジャンル</p>
            <span class="w-30">
              <input
                v-model="genre"
                type="radio"
                id="training"
                value="トレーニング"
              />
              <label class="p-3 flex-col" for="training">
                <img src="/img/icon-training.png" alt="" />
                トレーニング</label
              >
            </span>
            <span class="w-30">
              <input
                v-model="genre"
                type="radio"
                id="diet"
                value="ダイエット"
              />
              <label class="p-3 flex-col" for="diet">
                <img src="/img/icon-diet.png" alt="" />
                ダイエット</label
              >
            </span>
            <span class="w-30">
              <input v-model="genre" type="radio" id="talk" value="雑談" />
              <label class="p-3 flex-col" for="talk">
                <img src="/img/icon-talk.png" alt="" />
                雑談</label
              >
            </span>
          </m-radio>
          <m-error-message v-if="$v.genre.$error">
            <span v-if="!$v.genre.required"> 必須項目です。 </span>
          </m-error-message>
        </m-form-group>
        <!-- 3.workout -->
        <m-form-group>
          <m-textarea
            v-model="workout"
            label="コメント"
            :class="{ error: $v.workout.$error }"
            @input="$v.workout.$touch()"
          ></m-textarea>
          <m-error-message v-if="$v.workout.$error">
            <span v-if="!$v.workout.maxLength">
              トレーニング内容は{{
                $v.workout.$params.maxLength.max
              }}文字以下でなければいけません。
            </span>
            <!-- <span v-if="!$v.workout.required">必須項目です。</span> -->
          </m-error-message>
        </m-form-group>
        <!-- 4.file -->
        <m-form-group>
          <m-drop-zone
            :value="file"
            @change="onFileChange"
            @unselect="file = null"
          ></m-drop-zone>
        </m-form-group>
      </m-tab-content>
      <m-tab-content id="training">
        <div class="mb-5">
          <m-form v-model="menuName" label="種目"></m-form>
        </div>
        <div class="mb-5 flex justify-between items-center">
          <div class="flex items-center">
            <div>
              <m-form
                v-model="weight"
                type="number"
                label="重さ"
                ref="weight"
                numeric
              ></m-form>
              <p class="font-bold text-xs text-right">kg</p>
            </div>
            <p class="mx-2 pb-3 text-gray-600 font-black">x</p>
            <div>
              <m-form
                v-model="reps"
                type="number"
                label="回数"
                ref="reps"
                numeric
              ></m-form>
              <p class="font-bold text-xs text-right">回</p>
            </div>
            <p class="mx-2 pb-3 text-gray-600 font-black">x</p>
            <div>
              <m-form
                v-model="weightSets"
                type="number"
                label="セット数"
                ref="weightSets"
                numeric
              ></m-form>
              <p class="font-bold text-xs text-right">セット</p>
            </div>
          </div>
          <i
            class="ml-2 pb-3 fas fa-plus-circle text-2xl"
            @click="addWeightMenu"
          ></i>
        </div>
        <div class="mb-5 flex justify-between items-center">
          <div class="flex items-center">
            <div>
              <m-form
                v-model="duration"
                type="number"
                label="時間"
                ref="duration"
                numeric
              ></m-form>
              <p class="font-bold text-xs text-right">分</p>
            </div>
            <p class="mx-2 pb-3 text-gray-600 font-black">x</p>
            <div>
              <m-form
                v-model="durationSets"
                type="number"
                label="セット数"
                ref="durationSets"
                numeric
              ></m-form>
              <p class="font-bold text-xs text-right">セット</p>
            </div>
          </div>
          <i
            class="ml-2 pb-3 fas fa-plus-circle text-2xl"
            @click="addDurationMenu"
          ></i>
        </div>
        <div class="text-left">
          <transition-group name="menu">
            <div
              v-for="(menu, index) in menus"
              :key="menu.timestamp"
              class="border-b-2"
            >
              <div class="pt-3 pb-1 pr-1 flex justify-between items-center">
                <div class="">
                  <p class="pl-1 font-bold text-sm tracking-wider">
                    {{ menu.menuName }}
                  </p>
                  <p
                    v-if="menu.menuType === 'weight'"
                    class="pl-3 text-xs tracking-widest"
                  >
                    <span>{{ menu.weight }}</span>
                    <span class="unit">kg</span>
                    <span class="mx-1">x</span>
                    <span>{{ menu.reps }}</span>
                    <span class="unit">回</span>
                    <span class="mx-1">x</span>
                    <span>{{ menu.weightSets }}</span>
                    <span class="unit">セット</span>
                  </p>
                  <p
                    v-if="menu.menuType === 'duration'"
                    class="pl-3 text-xs tracking-widest"
                  >
                    <span class="unit">{{ menu.duration }}分</span>
                    <span class="mx-1">x</span>
                    <span class="unit">{{ menu.durationSets }}セット</span>
                  </p>
                </div>
                <i class="fas fa-times-circle" @click="removeMenu(index)"></i>
              </div>
            </div>
          </transition-group>
        </div>
      </m-tab-content>
      <m-tab-content id="tag">
        <div>
          <transition-group tag="div" name="selected-tag" class="selected-tags">
            <m-chip
              v-for="tag in selectedTags"
              :key="tag"
              shadow
              removable
              @remove="removeTag(tag)"
              >{{ tag }}</m-chip
            >
          </transition-group>
        </div>
        <m-form-group class="flex items-center">
          <m-form
            v-model="newTagName"
            label="新規タグ"
            :class="{ error: $v.newTagName.$error }"
            @input="$v.newTagName.$touch()"
          ></m-form>
          <m-error-message v-if="$v.newTagName.$error">
            <span v-if="!$v.newTagName.maxLength">
              タグ名は{{
                $v.newTagName.$params.maxLength.max
              }}文字以下でなければいけません。
            </span>
          </m-error-message>
          <div class="pl-3 py-1 flex items-center">
            <m-button
              class="m-0"
              :disabled="$v.newTagName.$error || !newTagName"
              @click="addTag"
              >追加</m-button
            >
          </div>
        </m-form-group>
        <!-- <m-form-group>
          </m-form-group> -->
        <m-form-group>
          <m-select
            :value="selectBoxTag"
            label="既存タグから選択"
            name="tag"
            search
            no-selected
            :options="existingTags"
            @input="onInput"
          >
          </m-select> </m-form-group
      ></m-tab-content>
    </m-tab-contents>
  </m-dialog>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  components: {},
  props: {
    dialog: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {
      trainingDate: new Date(),
      // comment
      username: "",
      genre: null,
      workout: null,
      // menu
      menuName: null,
      file: null,
      weight: null,
      reps: null,
      weightSets: null,
      duration: null,
      durationSets: null,
      menus: [],
      // tag
      newTagName: null,
      selectBoxTag: null,
      selectedTags: [],
      existingTags: [],
      loading: false,
      tabs: [
        { text: "コメント", target: "comment" },
        { text: "メニュー", target: "training" },
        { text: "タグ", target: "tag" },
      ],
    };
  },
  validations: {
    trainingDate: { required },
    genre: { required },
    // username: { required, maxLength: maxLength(20) },
    workout: { maxLength: maxLength(100) },
    newTagName: { maxLength: maxLength(10) },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    completeMenu() {
      return this.$store.getters.completeMenu;
    },
  },
  methods: {
    setSample() {
      // this.existingTags.forEach((tag) => {
      //   db.collection("post-tags").add(tag);
      // });
    },
    closeDialog() {
      this.$store.commit("setPostDialog", false);
    },
    onFileChange(file) {
      this.file = file;
    },
    validateMenuName() {
      // console.log("this.menuName:", this.menuName);
      if (!this.menuName) {
        const snackbar = {
          text: "メニュー名を入力してください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return false;
      }
      return true;
    },
    resetMenuForm() {
      this.menuName = null;
      this.weight = null;
      this.reps = null;
      this.weightSets = null;
      this.duration = null;
      this.durationSets = null;
    },
    addWeightMenu() {
      if (!this.validateMenuName()) return;
      const menu = {
        menuName: this.menuName,
        weight: this.weight,
        reps: this.reps,
        weightSets: this.weightSets ? this.weightSets : 1,
        menuType: "weight",
        timestamp: Date.now(),
      };

      // this.menus = [menu, ...this.menus];
      this.menus.splice(0, 0, menu);
      this.resetMenuForm();
    },
    addDurationMenu() {
      if (!this.validateMenuName()) return;
      const menu = {
        menuName: this.menuName,
        duration: this.duration,
        durationSets: this.durationSets ? this.durationSets : 1,
        menuType: "duration",
        timestamp: Date.now(),
      };

      // this.menus = [menu, ...this.menus];
      this.menus.splice(0, 0, menu);
      this.resetMenuForm();
    },
    removeMenu(index) {
      this.menus.splice(index, 1);
    },
    // 投稿
    async postTodayWorkout() {
      // console.log("this.workout:", this.workout);
      // snackbar の初期化
      const snackbar = {
        text: "",
        color: "",
      };
      this.$v.$touch();

      // 入力チェック
      let isValid = true;
      if (!this.trainingDate) {
        isValid = false;
        snackbar.text += "トレーニング日";
      }
      // if (!this.username) {
      //   if (!isValid) {
      //     snackbar.text += "<br>";
      //   }
      //   isValid = false;
      //   snackbar.text += "ユーザ名";
      // }
      if (!this.workout && !this.menus.length) {
        if (!isValid) {
          snackbar.text += "<br>";
        }
        isValid = false;
        snackbar.text += "コメント、もしくはメニュー";
      }
      if (!isValid) {
        snackbar.text += "<br>を入力してください。";
        snackbar.color = "red";
        this.$store.commit("setSnackbar", snackbar);
        return;
      }

      // 添付ファイルの有無のチェックとファイルアップロード
      // ファイルは/posts/へ格納。ファイル名は先頭に「現在時刻-」を付ける。
      // アップロードしたファイルのURLの取得
      let fileUrl = "";
      if (this.file) {
        // console.log('this.file:', this.file);
        const storageRef = storage.ref();
        const fileRef = storageRef.child(
          `posts/${Date.now()}-${this.file.name}`
        );
        await fileRef.put(this.file);
        fileUrl = await fileRef.getDownloadURL();
      }

      // loading
      this.loading = true;

      // collection"posts"へ格納するデータ
      const data = {
        trainingDate: this.trainingDate,
        username: this.username,
        workout: this.workout,
        postTags: [this.genre, ...this.selectedTags],
        fileUrl,
        deleteFlg: false,
        createdAt: new Date(),
        fromUserId: this.$store.getters.user.uid
          ? this.$store.getters.user.uid
          : "guest-user",
        menus: this.menus,
      };
      if (this.$store.getters.user.uid) {
        data.fromUserRef = db.doc(`users/${this.$store.getters.user.uid}`);
      }
      // console.log("data:", data);
      // データの追加
      await db
        .collection("posts")
        .add(data)
        .then(async () => {
          // 追加に成功
          snackbar.text += "今日の頑張りを投稿しました。";
          snackbar.color = "orange";

          const updatedData = {
            postCounts: this.$store.getters.user.postCounts + 1,
          };

          this.$store.commit("setPostDialog", false);
          this.$store.commit("setSnackbar", snackbar);
          this.$store.commit("updateUser", updatedData);

          if (this.menus.length) {
            const workoutRecord = {
              trainingDate: this.trainingDate,
              menus: this.menus,
            };

            await db
              .collection("users")
              .doc(this.$store.getters.user.uid)
              .collection("workout-records")
              .add(workoutRecord);
          }

          this.trainingDate = new Date();
          // this.genre = null;
          this.workout = null;
          this.file = null;
          this.selectedTags = [];
          this.menus = [];
          this.$v.$reset();
          this.closeDialog();

          if (this.$route.name === "CompleteWorkout") {
            this.$router.push({ name: "Post" });
          }
          this.resetActiveTabAndContent();
        })
        .catch((err) => {
          // 追加に失敗
          console.log("err:", err);
          snackbar.text += "投稿に失敗しました。";
          snackbar.color = "red";
          this.$store.commit("setSnackbar", snackbar);
        });

      this.loading = false;
    },
    // タグ
    fetchExistingTags() {
      db.collection("post-tags")
        .get()
        .then((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // console.log('change:', change);
            if (change.type === "added") {
              this.existingTags = [change.doc.data(), ...this.existingTags];
            }
          });
        });
    },
    addTag() {
      console.log("this.newTagName:", this.newTagName);
      let trimmed = this.newTagName.replace(/\s+/g, "");
      this.newTagName = null;
      if (this.selectedTags.includes(trimmed)) return;
      this.selectedTags = [...this.selectedTags, trimmed];
    },
    removeTag(removedTag) {
      console.log("removedTag:", removedTag);
      this.selectedTags = this.selectedTags.filter((tag) => tag !== removedTag);
    },
    onInput(tagName) {
      if (this.selectedTags.includes(tagName)) return;
      this.selectedTags = [...this.selectedTags, tagName];
    },
    resetActiveTabAndContent() {
      const tabs = this.$el.querySelector(".m-tabs");
      tabs.firstChild.click();
    },
  },
  created() {
    this.fetchExistingTags();
    // console.log("this.$route.name:", this.$route.name);
  },
  mounted() {},
  watch: {
    user() {
      if (this.user.username) {
        this.username = this.$store.getters.user.username;
        // const target = this.$store.getters.user.target;
        switch (this.$store.getters.user.target.purpose) {
          case "training":
            this.genre = "トレーニング";
            break;
          case "diet":
            this.genre = "ダイエット";
            break;
        }
        // console.log('this.genre:', this.genre);
      }
    },
    weight() {
      if (!this.weight) return;
      if (this.weight.toString().length === 2) {
        // console.log("watch weight this.$refs.reps.$el:", this.$refs.reps.$el);
        const inputReps = this.$refs.reps.$el.querySelector("input");
        inputReps.focus();
      }
    },
    reps() {
      if (!this.reps) return;
      if (this.reps.toString().length === 2) {
        // console.log("watch reps this.$refs.weightSets.$el:", this.$refs.weightSets.$el);
        const inputWeightSets = this.$refs.weightSets.$el.querySelector(
          "input"
        );
        inputWeightSets.focus();
      }
    },
    duration() {
      if (!this.duration) return;
      if (this.duration.toString().length === 2) {
        // console.log("watch duration this.$refs.weightSets.$el:", this.$refs.weightSets.$el);
        const inputDurationSets = this.$refs.durationSets.$el.querySelector(
          "input"
        );
        inputDurationSets.focus();
      }
    },
    completeMenu() {
      console.log("this.completeMenu:", this.completeMenu);
      this.menus = this.completeMenu.map((m) => {
        return {
          ...m,
          timestamp: Date.now(),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fa-plus-circle {
  color: $green;
}
.fa-times-circle {
  color: rgba($red, 0.6);
}
.unit {
  font-size: 0.5rem;
}
.selected-tags {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  min-height: 28px;
  margin-bottom: 40px;
}
.selected-tag-enter-active {
  transition: all 0.5s ease-out;
}
.selected-tag-enter,
.selected-tag-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.selected-tag-leave-active {
  position: absolute;
  transition: all 0.5s ease-in;
}
.selected-tag-move {
  transition: transform 0.8s ease;
}
.menu-enter-active {
  transition: all 0.3s ease-out;
}
.menu-enter {
  opacity: 0;
  transform: translateX(80px);
}
.menu-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.menu-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.2s ease-in;
}
.menu-move {
  transition: transform 0.4s ease;
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