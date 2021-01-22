<template>
  <div class="sign-up">
    <header class="heading">
      <i class="fas fa-chevron-left" @click="back"></i>
      <h1>ユーザー登録</h1>
    </header>
    <div class="form-box full placeholder-black">
      <!-- 1.username -->
      <div class="text-form m-bg">
        <input
          v-model="username"
          type="text"
          :class="{ 'is-input': !!username }"
          placeholder="username"
          @blur="$v.username.$touch()"
        />
        <m-error-message v-if="$v.username.$error">
          <span v-if="!$v.username.required">必須項目です。</span>
          <span v-if="!$v.username.maxLength">
            ユーザ名は{{
              $v.username.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
        </m-error-message>
        <i class="fas fa-user"></i>
      </div>
      <!-- 2.email -->
      <div class="text-form m-bg">
        <input
          v-model="email"
          type="Email"
          :class="{ 'is-input': !!email }"
          placeholder="email"
          @blur="$v.email.$touch()"
        />
        <m-error-message v-if="$v.email.$error">
          <span v-if="!$v.email.email"> 正しいEmailを入力して下さい。 </span>
          <span v-if="!$v.email.required">必須項目です。</span>
        </m-error-message>
        <i class="fas fa-envelope"></i>
      </div>
      <!-- 3.password -->
      <div class="text-form m-bg">
        <input
          v-model="password"
          type="password"
          :class="{ 'is-input': !!password }"
          placeholder="password"
          @keyup.enter="login"
          @blur="$v.password.$touch()"
        />
        <m-error-message v-if="$v.password.$error">
          <span v-if="!$v.password.maxLength || !$v.password.minLength">
            パスワードは{{ $v.password.$params.minLength.min }}文字以上{{
              $v.password.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.password.required">必須項目です。</span>
        </m-error-message>
        <i class="fas fa-unlock-alt"></i>
      </div>
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
      <!-- 6.button -->
      <m-form-group>
        <m-button :disabled="$v.$invalid" class="w-100" @click="signup"
          >登録</m-button
        >
      </m-form-group>
    </div>
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
        { label: "男性", value: "male", color: "blue", icon: "male" },
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
      maxLength: maxLength(20),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(18),
    },
    gender: {
      required,
    },
    // year: {
    //   required,
    // },
    // month: {
    //   required,
    // },
    // date: {
    //   required,
    // },
  },
  computed: {
    // currentStep() {
    //   return
    // }
  },
  methods: {
    async signup() {
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
      await firebase
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
                  postCounts: 0,
                  createdAt: new Date(),
                },
                { merge: true }
              )
              .then(() => {
                // console.log("then after set :");
                this.$router.push({ name: "Post" });
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
      // console.log("set date:");
      if (this.year && this.month) {
        this.dateOptions = [];
        const lastDate = new Date(this.year, this.month, 0).getDate();
        console.log("lastDate:", lastDate);
        for (let i = 1; i <= lastDate; i++) {
          const option = {
            label: "日",
            text: i,
            value: i,
          };
          this.dateOptions = [...this.dateOptions, option];
        }
        // console.log("this.dateOptions:", this.dateOptions);
      }
    },
    back() {
      this.$router.go(-1)
    }
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
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // height: 100%;
  // padding: 20px 0;
  // padding-top: 100px;
  text-align: center;
  background: linear-gradient(
    to bottom right,
    rgba($white, 0.9),
    rgba($white, 0.7)
  );
  backdrop-filter: blur(5px);
  border-radius: 8px;
  // overflow: hidden;
  @extend .bs-b-8;

  .heading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px 30px;
    background: linear-gradient(
      to bottom right,
      rgba($orange, 0.7),
      rgba($orange, 0.9)
    );
    // border-radius: 8px;
    box-shadow: 0 10px 15px rgba(#212121, 0.1), 0 0px 30px rgba(#212121, 0.1);

    i {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      font-size: 24px;
      color: rgba($black, 0.8);
    }
    h1 {
      font-weight: 900;
      font-size: 32px;
      letter-spacing: 5px;
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