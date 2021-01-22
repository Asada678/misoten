<template>
  <m-dialog
    :dialog="dialog"
    header-text="プラン確認"
    button-text="OK"
    @action="closeDialog"
    @close="closeDialog"
  >

  <div class="img-box">
    <img src="/img/developing.png" alt="">
  </div>

  <p>準備中</p>



  </m-dialog>
</template>

<script>
// import { db } from "@/firebase/firebase";
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
      newRoomName: null,
    };
  },
  validations: {
    newRoomName: { required, maxLength: maxLength(10) },
  },
  computed: {},
  methods: {
    closeDialog() {
      this.$store.commit("setPlanDialog", false);
    },
    async createRoom() {

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