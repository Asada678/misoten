<template>
  <div class="login">
    <div class="img-box">
      <img src="/img/logo.png" alt="logo" />
    </div>
    <div class="form-box">
      <div class="text-form">
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
        <i class="far fa-envelope"></i>
      </div>
      <div class="text-form">
        <input
          v-model="password"
          type="password"
          :class="{ 'is-input': !!password }"
          placeholder="password"
          @keyup.enter="login"
          @blur="$v.password.$touch()"
        />
        <m-error-message v-if="$v.password.$error">
          <span v-if="!$v.password.required">必須項目です。</span>
        </m-error-message>
        <i class="fas fa-unlock-alt"></i>
      </div>
      <div class="login-button">
        <button class="login-button" @click="login">ログイン</button>
      </div>
      <div class="sns-buttons">
        <a href="#"><i class="fab fa-google"></i></a>
        <a href="#"><i class="fab fa-facebook-square"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>
      <div class="link">
        <router-link :to="{ name: 'Signup' }" class="signup"
          >アカウント作成</router-link
        >
        <router-link to="/">ゲストとして利用</router-link>
        <!-- <a href="#" class="signup">アカウント作成</a> -->
        <!-- <a href="#">パスワードを忘れた方</a> -->
        <!-- <router-link to="/">トップ</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import firebase from "firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      email: null,
      password: null,
    };
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  computed: {},
  methods: {
    login() {
      const snackbar = {
        text: "",
        color: "",
      };
      // 入力チェック
      let isValid = true;
      if (!this.email) {
        isValid = false;
        snackbar.text += "Email";
      }
      if (!this.password) {
        if (!isValid) {
          snackbar.text += "<br>";
        }
        isValid = false;
        snackbar.text += "パスワード";
      }
      if (!isValid) {
        snackbar.text += "<br>を入力してください。";
        snackbar.color = "red";
        this.$store.commit("setSnackbar", snackbar);
        return;
      }

      // console.log(this.email, this.password);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // console.log(cred.user);
          const snackbar = {
            text: "こんにちは！<br>今日も頑張って行きましょう！",
            color: "orange",
          };
          this.$store.commit("setSnackbar", snackbar);
          this.$router.push({ name: "Post" });
        })
        .catch((err) => {
          const snackbar = {
            text: err.message,
            color: "red",
          };
          this.$store.commit("setSnackbar", snackbar);
        });
    },
  },
};
</script>

<style lang="scss">
// $white: #f0f0f0;
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // min-height: 100vh;
  margin: auto;
}

.img-box {
  display: flex;
  justify-content: center;
  img {
    width: 85%;
    max-width: 600px;
    height: 100%;
    max-height: 80vh;
    min-height: 300px;
    object-fit: contain;
    filter: drop-shadow(0 5px 5px rgba($black-1, 0.8));
    // drop-shadow(0 0px 30px rgba($black-1, 0.3));
  }
}

.form-box {
  width: 80%;
  // padding: 20px 0;
  padding-top: 40px;

  &.full {
    width: 100%;
  }
  &.placeholder-black {
    ::placeholder {
      color: rgba($black, 0.6);
    }
  }

  input {
    width: 100%;
    // padding: 10px 10px 10px 35px;
    padding: 6px 10px;
    border: 2px solid transparent;
    border-radius: 25px;
    border-radius: 5px;
    outline: none;
    background: none;
    font-size: 20px;
    background-color: rgba($white, 0.4);
    // backdrop-filter: blur(5px);
    color: #323232;
    box-shadow: 0 10px 15px rgba(#212121, 0.1), 0 0px 30px rgba(#212121, 0.1);
    -webkit-appearance: none;
    transition: all 0.5s;

    &:focus {
      border: 2px solid $authOrange;
      padding: 6px 10px 6px 35px;
      &::placeholder {
        opacity: 0;
      }
      & ~ i {
        color: $authOrange;
      }
    }

    &.is-input {
      padding: 6px 10px 6px 35px;
    }
  }

  ::placeholder {
    font-weight: 900;
    color: $white;
    text-align: center;
    font-size: 22px;
    transition: 0.5s;
  }

  .text-form {
    position: relative;
    display: flex;
    align-items: center;
    // margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 20px;
    // padding-top: 10px;
    border-radius: 5px;

    &.m-bg {
      margin-bottom: 42px;
    }

    i {
      position: absolute;
      top: 50%;
      left: 10px + 20px;
      transform: translateY(-50%);
      font-size: 22px;
      color: $black-1;
      transition: 0.5s;
    }
  }
}

.login-button {
  margin-top: 10px;
  button {
    width: 100%;
    margin-bottom: 20px;
    padding: 5px;
    border-radius: 30px;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    border: 1px solid rgba($authOrange, 0.8);
    background-color: rgba($authOrange, 0.7);
    box-shadow: 0 10px 15px rgba(#212121, 0.1), 0 0px 30px rgba(#212121, 0.1);
    transition: 0.5s;

    &:hover {
      background-color: rgba($authOrange, 0.9);
    }
  }
}
.sns-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  // padding: 10px 0;

  a {
    margin: 0 10px;
    i {
      font-size: 26px;
      color: $white;
      // box-shadow: , 0 0px 30px rgba(#212121, 0.3);
      filter: drop-shadow(0 10px 15px rgba(#212121, 0.5));
    }
  }
}
.link {
  // padding: 10px;
  text-align: center;
  a {
    // display: block;
    margin: 0 10px;
    text-decoration: none;
    color: #aaa;
    font-size: 14px;

    &.signup {
      font-weight: 700;
      color: $authOrange;
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