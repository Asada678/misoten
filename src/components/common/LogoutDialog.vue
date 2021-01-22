<template>
  <m-dialog
    color="red"
    :dialog="dialog"
    header-text="ログアウト"
    @close="$emit('close')"
    @action="logout"
  >
    <p v-if="$store.getters.user.username">ログアウトしますか？</p>
    <div v-else>
      <Login />
    </div>
  </m-dialog>
</template>

<script>
import firebase from "firebase";
export default {
  components: {},
  props: {
    dialog: Boolean
  },
  data() {
    return {
      logoutDialog: false,
    };
  },
  computed: {},
  methods: {
    logout() {
      // console.log("this.user.username:", this.user.username);
      if (this.$store.getters.user.username) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push({ name: "Login" });
          });
        // logout 処理
      } else {
        // login 処理
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>