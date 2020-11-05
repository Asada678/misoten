<template>
  <div class="sign-up">
    <m-header prev>
      <span>ユーザー登録</span>
    </m-header>

    <form action="#">
      <!-- 1.username -->
      <m-form-group>
        <m-form
          v-model="username"
          label="username"
          :class="{ error: $v.username.$error }"
          @blur="$v.username.$touch()"
        ></m-form>
        <m-error-message v-if="$v.username.$error">
          <span v-if="!$v.username.maxLength">
            ユーザ名は{{
              $v.username.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.username.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
      <!-- 2.email -->
      <m-form-group>
        <m-form
          v-model="email"
          label="email"
          type="email"
          :class="{ error: $v.email.$error }"
          @blur="$v.email.$touch()"
        ></m-form>
        <m-error-message v-if="$v.email.$error">
          <span v-if="!$v.email.email"> 正しいEmailを入力して下さい。 </span>
          <span v-if="!$v.email.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
      <!-- 3.password -->
      <m-form-group>
        <m-form
          v-model="password"
          label="password"
          type="password"
          autocomplete
          :class="{ error: $v.password.$error }"
          @blur="$v.password.$touch()"
        ></m-form>
        <m-error-message v-if="$v.password.$error">
          <span v-if="!$v.password.maxLength || !$v.password.minLength">
            パスワードは{{ $v.password.$params.minLength.min }}～{{
              $v.password.$params.maxLength.max
            }}文字でないといけません。
          </span>
          <span v-if="!$v.password.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
      <!-- 4.gender -->
      <m-form-group>
        <m-radio
          v-model="gender"
          name="gender"
          :options="genderOptions"
        ></m-radio>
        <m-error-message v-if="$v.gender.$error">
          <span v-if="!$v.gender.required"> 必須項目です。 </span>
        </m-error-message>
      </m-form-group>
      <!-- 5.birthday -->
      <m-form-group class="flex">
        <m-select
          v-model="year"
          class="w-40"
          label="年"
          name="year"
          :options="yearOptions"
        >
          <m-error-message v-if="$v.year.$error">
            <span v-if="!$v.year.required"> 必須項目です。 </span>
          </m-error-message>
        </m-select>
        <m-select
          v-model="month"
          class="w-30"
          label="月"
          name="month"
          :options="monthOptions"
        >
          <m-error-message v-if="$v.month.$error">
            <span v-if="!$v.month.required"> 必須項目です。 </span>
          </m-error-message>
        </m-select>
        <m-select
          v-model="date"
          class="w-30"
          label="日"
          name="date"
          :class="{ disabled: !year || !month }"
          :options="dateOptions"
        >
          <m-error-message v-if="$v.date.$error">
            <span v-if="!$v.date.required"> 必須項目です。 </span>
          </m-error-message>
        </m-select>
      </m-form-group>
      <!-- 6.button -->
      <m-form-group>
        <m-button class="w-50" @click="signup">登録</m-button>
      </m-form-group>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/firebase/firebase";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";

export default {
  components: {},
  props: {},
  data() {
    return {
      currentPage: 0,
      slidePage: null,
      steps: null,
      swiper: null,
      username: null,
      email: null,
      password: null,
      gender: null,
      year: null,
      month: null,
      date: null,
      genderOptions: [
        { label: "男性", value: "male", color: "indigo", icon: "male" },
        { label: "女性", value: "female", color: "pink", icon: "female" },
      ],
      yearOptions: [],
      monthOptions: [],
      dateOptions: [],
    };
  },
  validations: {
    username: {
      required,
      maxLength: maxLength(10),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
    gender: {
      required,
    },
    year: {
      required,
    },
    month: {
      required,
    },
    date: {
      required,
    },
  },
  computed: {
    // currentStep() {
    //   return
    // }
  },
  methods: {
    signup() {
      // console.log('this.username:', this.username);
      // console.log('this.email:', this.email);
      // console.log('this.password:', this.password);
      // console.log('this.gender:', this.gender);
      // console.log("this.year:", this.year);
      // console.log("this.month:", this.month);
      // console.log("this.date:", this.date);
      // console.log("firebase.auth():", firebase.auth());
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          // await console.log("cred:", cred);
          cred.user.sendEmailVerification().then(() => {
            console.log("email sent:");
            const snackbar = {
              text:
                "ユーザ登録を完了しました！<br>続いて目標値を設定してください。",
              color: "green",
            };
            this.$store.commit("setSnackbar", snackbar);
            db.collection("users")
              .doc(cred.user.uid)
              .set(
                {
                  username: this.username,
                  email: this.email,
                  gender: this.gender,
                  birthYear: this.year,
                  birthMonth: this.month,
                  birthDate: this.date,
                  createdAt: new Date(),
                },
                { merge: true }
              )
              .then(() => {
                console.log("then after set :");
                this.$router.push({ name: "CompleteSignup" });
              });
          });
        })
        .catch((err) => {
          let text = "登録に失敗しました。";
          switch (err.code) {
            case "auth/email-already-in-use":
              text += "既に使われているEmailです。";
              break;
            case "auth/invalid-email":
              text += "不適切なEmailです。";
              break;
            case "auth/operation-not-allowed":
              text += "不適切な操作です。";
              break;
            case "auth/weak-password":
              text += "パスワードが脆弱です。";
              break;
          }
          const snackbar = {
            text,
            color: "red",
          };
          this.$store.commit("setSnackbar", snackbar);
        });
    },
    setDate() {
      if (this.year && this.month) {
        this.dateOptions = [];
        const lastDate = new Date(this.year, this.month, 0).getDate();
        // console.log("lastDate:", lastDate);
        for (let i = 1; i <= lastDate; i++) {
          const option = {
            label: "日",
            text: i,
            value: i,
          };
          this.dateOptions = [...this.dateOptions, option];
        }
      }
    },
  },
  created() {
    const year = new Date().getFullYear();
    //  console.log('year:', year);
    for (let i = year - 99; i <= year; i++) {
      const option = {
        label: "年",
        text: i,
        value: i,
      };
      this.yearOptions = [option, ...this.yearOptions];
    }
    for (let i = 1; i <= 12; i++) {
      const option = {
        label: "月",
        text: i,
        value: i,
      };
      this.monthOptions = [...this.monthOptions, option];
    }
  },
  watch: {
    year() {
      // console.log("watch this.year:", this.year);
      this.setDate();
    },
    month() {
      // console.log("watch this.month:", this.month);
      this.setDate();
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-up {
  @extend .fixed-page;
  // header {
  //   @extend .fixed-page-header;

  //   span {
  //     position: absolute;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     font-size: 30px;
  //     font-weight: 700;
  //   }
  // }
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