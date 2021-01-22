<template>
  <div class="login">
    <m-header prev>
      <span>ログイン</span>
    </m-header>
    <!-- 1.email -->
    <m-form-group>
      <m-form
        v-model="email"
        label="email"
        type="email"
        :class="{ error: $v.email.$error }"
        @blur="$v.email.$touch()"
      ></m-form>
      <m-error-message v-if="$v.email.$error">
        <span v-if="!$v.email.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
    <!-- 2.password -->
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
        <span v-if="!$v.password.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
    <!-- 3.button -->
    <m-form-group>
      <m-button class="w-100 blue" @click="login">ログイン</m-button>
    </m-form-group>
  </div>
</template>

<script>
import firebase from "firebase";
import { required } from "vuelidate/lib/validators";
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
    email: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {},
  methods: {
    login() {
      // console.log(this.email, this.password)
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          console.log(cred.user);
          const snackbar = {
            text: 'こんにちは！<br>今日も頑張って行きましょう！',
            color: "blue",
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

<style lang="scss" scoped>
.login {
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