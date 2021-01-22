<template>
  <div class="set-target">
    <div class="sign-up-container">
      <m-chip-radio v-model="purpose" name="purpose" :options="purposeOptions"></m-chip-radio>
      <button @click="check">check purpose</button>
      <!-- <m-header prev>
        <transition name="fade">
          <i
            v-if="currentPage > 0"
            class="fas fa-chevron-left prev"
            @click="prev"
          ></i> 
        </transition>
        <span class="current"> {{ Number(currentPage) + 1 }} / 4</span>
        <transition name="fade">
          <i
            v-if="currentPage < 3"
            class="fas fa-chevron-right next"
            @click="next"
          ></i>
        </transition>
      </m-header> -->
      <div class="progress-bar">
        <div class="step current">
          <p>ユーザ情報</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>1</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>体型</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>2</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>目標設定</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>3</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>確認</p>
          <div class="bullet">
            <span>4</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-container">
        <form action="#">
          <div class="page slide-page">
            <!-- <h2>Basic Info</h2> -->
            <m-form-group>
              <m-form
                v-model="username"
                label="username"
                @input="$v.username.$touch()"
              ></m-form>
              <m-error-message>
                <span v-if="!$v.username.maxLength">
                  ユーザ名は{{
                    $v.username.$params.maxLength.max
                  }}文字以下でなければいけません。
                </span>
                <span v-if="!$v.username.required && $v.username.$error">
                  必須項目です。
                </span>
              </m-error-message>
            </m-form-group>
            <m-form-group></m-form-group>
            <m-form v-model="email" label="email"></m-form>
            <m-form label="gender"></m-form>
            <m-form label="year" type="number"></m-form>
            <m-form label="month" type="number"></m-form>
            <m-form label="date" type="number"></m-form>
            <m-form label="email"></m-form>
          </div>
          <div class="page">
            <!-- <h2>Contact Info:</h2> -->
            <m-form label="height"></m-form>
            <m-form label="weight"></m-form>
            <m-form label="fat percentage"></m-form>
            <m-form label="muscle mass"></m-form>
          </div>
          <div class="page">
            <!-- <h2>Date of Birth Info</h2> -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <h3>痩せ型</h3>
                  <img src="/img/body-type-m1.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <h3>普通</h3>
                  <img src="/img/body-type-m2.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <h3>ガッシリ</h3>
                  <img src="/img/body-type-m3.png" alt="" />
                </div>
              </div>
            </div>
            <p>詳細設定</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              optio obcaecati reiciendis voluptates cumque? Error consectetur
              ratione molestiae praesentium hic amet, porro nihil illo veniam!
              Facere ipsum aliquam excepturi perspiciatis?
            </p>
          </div>
          <div class="page">
            <!-- <h2>User Details</h2> -->
            <m-button class="w-100">submit</m-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import firebase from "firebase";
import { db } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    options: Array,
  },
  props: {},
  data() {
    return {
      purpose: null,
      purposeOptions: [
        { label: "トレーニング", value: "male", color: "blue", icon: "male" },
        { label: "ダイエット", value: "female", color: "pink", icon: "female" },
      ],
      currentPage: 0,
      slidePage: null,
      steps: null,
      swiper: null,
      username: null,
      email: null,
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
    // currentStep() {
    //   return
    // }
  },
  methods: {
    check() {
      console.log('this.purpose:', this.purpose);
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
  mounted() {
    // console.log("firebase:", firebase);
    // console.log("$v:", this.$v);
    // console.log("$v.username.$invalid:", this.$v.username.$invalid);
    this.slidePage = document.querySelector(".slide-page");
    this.steps = document.querySelectorAll(".step");

    this.swiper = new Swiper(".swiper-container", {});
  },
};
</script>

<style lang="scss" scoped>
.set-target {
  text-align: center;

  header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1050px;
    height: 60px;
    margin: 0 auto;
    padding: 0 10px;
    background-color: rgba($blue, 0.9);
    color: $white;

    i {
      position: absolute;
      font-size: 30px;

      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }
    }

    span {
      position: absolute;
      z-index: -1;
      left: 50%;
      transform: translateX(-50%);
      font-size: 30px;
      font-weight: 700;
    }
  }

  .progress-bar {
    display: flex;
    margin-bottom: 10px;
    text-align: left;

    .step {
      position: relative;
      width: 100%;
      text-align: center;
      color: $grey;

      // 入力が完了したステップ
      &.done {
        color: $blue;
        .bar::after {
          background-color: $blue;
          // transform-origin: left;
          // animation: tonext 0.3s linear forwards;
          transform: scaleX(1);
          // transform: none;
          transition: transform 0.7s, transform-origin 0s;
        }
        .bullet {
          border-color: $blue;
          background-color: $blue;
          span {
            display: none;
            // color: white;
          }
        }
        .check {
          // display: block;
          opacity: 1;
          color: $white;
          transform: translate(-50%, -50%);
          transition: transform 0.3s, opacity 0.5s;
        }
      }

      // 入力中のステップ
      &.current {
        color: $black;
        p {
          font-weight: 700;
        }
        .bullet {
          border: 2px solid $black;
        }
      }

      p {
        margin-bottom: 8px;
      }

      .bar {
        position: absolute;
        top: 11px;
        left: 0;
        width: 100%;
        height: 100%;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          // bottom: 0;
          // right: 0;
          // right: -51px;
          height: 3px;
          width: 100%;
          background-color: rgba($grey, 0.7);
        }
        &::after {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.7s, transform-origin 0s,
            background-color 0.7s 1s;
          transition: all 0.7s;
        }
      }

      .bullet {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 25px;
        border: 2px solid $grey;
        border-radius: 50%;
        background-color: $white;
        transition: 0.3s;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          // transform: translateY(-50%);
          font-size: 17px;
          font-weight: 700;
          line-height: 25px;
        }
      }

      .check {
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -50%) rotate(-90deg);
        font-size: 15px;
        opacity: 0;
        transition: transform 0.3s, opacity 0s;
      }
    }
  }

  .form-container {
    width: 100%;
    overflow: hidden;
    form {
      display: flex;
      width: 400%;

      .page {
        width: 25%;
        transition: margin-left 0.3s ease-in-out;
      }
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