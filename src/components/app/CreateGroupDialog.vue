<template>
  <!-- dialog start -->
  <m-dialog
    :dialog="dialog"
    :loading="loading"
    :disabled="$v.$invalid"
    header-text="グループ作成"
    button-text="作成"
    @action="createGroup"
    @close="closeDialog"
  >
    <!-- 1.group name -->
    <m-form-group>
      <m-form
        v-model="groupName"
        label="group name"
        :class="{ error: $v.groupName.$error }"
        @input="$v.groupName.$touch()"
      ></m-form>
      <m-error-message v-if="$v.groupName.$error">
        <span v-if="!$v.groupName.maxLength">
          グループ名は{{
            $v.groupName.$params.maxLength.max
          }}文字以下でなければいけません。
        </span>
        <span v-if="!$v.groupName.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
    <!-- 2.group description -->
    <m-form-group>
      <m-textarea
        v-model="groupDescription"
        label="group description"
        :class="{ error: $v.groupDescription.$error }"
        @input="$v.groupDescription.$touch()"
      ></m-textarea>
      <m-error-message v-if="$v.groupDescription.$error">
        <span v-if="!$v.groupDescription.maxLength">
          グループ説明は{{
            $v.groupDescription.$params.maxLength.max
          }}文字以下でなければいけません。
        </span>
        <span v-if="!$v.groupDescription.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
  </m-dialog>
</template>

<script>
import { db } from "@/firebase/firebase";
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
      groupName: null,
      groupDescription: null,
      loading: false,
    };
  },
  validations: {
    groupName: { required, maxLength: maxLength(20) },
    // groupLeaderName: { required, maxLength: maxLength(20) },
    groupDescription: { required, maxLength: maxLength(100) },
  },
  computed: {},
  methods: {
    closeDialog() {
      this.$store.commit("setGroupDialog", false);
    },
    async createGroup() {
      this.$v.$touch();
      this.$store.commit("isAuthenticated");
      if (this.$v.$invalid) return;
      const newGroup = {
        groupName: this.groupName,
        groupLeaderName: this.$store.getters.user.username,
        groupDescription: this.groupDescription,
        adminUserIds: [this.$store.getters.user.uid],
        userIds: [this.$store.getters.user.uid],
        userCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.loading = true;
      await db
        .collection("groups")
        .add(newGroup)
        .then(async (docRef) => {
          this.closeDialog();
          console.log("docRef:", docRef);
          await docRef
            .collection("groupUsers")
            .doc(this.$store.getters.user.uid)
            .set({
              usernameInGroup: this.$store.getters.user.username,
              userId: this.$store.getters.user.uid,
              userRef: docRef
                .collection("groupUsers")
                .doc(this.$store.getters.user.uid),
              isAdmin: true,
              createdAt: new Date(),
            })
            .then(() => {
              const snackbar = {
                text: "グループを作成しました！",
                color: "green",
              };
              this.$store.commit("setSnackbar", snackbar);
            });
          console.log("1:");
          await docRef
            .collection("messages")
            .add({
              fromUserRef: db.doc(`users/Ever Fit Up`),
              fromUserId: "Ever Fit Up",
              fromUserName: "Ever Fit Up",
              content: "こんにちは！",
              createdAt: new Date(),
            })
            .then(() => {});
          console.log("2:");

          this.loading = false;

          this.$router.push({ name: "GroupRoom", params: { id: docRef.id } });
        });
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