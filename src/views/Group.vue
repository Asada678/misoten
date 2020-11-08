<template>
  <div class="group">
    <!-- tabs start -->
    <m-tabs>
      <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
        tab.text
      }}</m-tab>
    </m-tabs>
    <!-- tab-contents start -->
    <m-tab-contents>
      <m-tab-content class="active" id="group-list">

        <group-card
          v-for="group in belongingGroups"
          :key="group.id"
          :group="group"
        ></group-card>
        <p v-if="!belongingGroups.length">
          参加中のグループはありません。<br />グループを検索してみましょう。
        </p>
      </m-tab-content>
      <m-tab-content id="search">
        <m-form-group>
          <m-form v-model="searchWord" icon="search"></m-form>
        </m-form-group>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
          voluptates sapiente a doloremque, necessitatibus aliquam
          exercitationem soluta odio voluptatem eum ducimus optio eaque sequi
          fugit quos mollitia incidunt, maiores nam.
        </p>
      </m-tab-content>
    </m-tab-contents>
    <!-- dialog start -->
    <m-dialog
      :dialog="dialog"
      :disabled="$v.$invalid"
      color="indigo"
      header-text="グループ作成"
      button-text="作成"
      @action="createGroup"
      @close="dialog = false"
    >
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
      <!-- <m-form-group>
        <m-form
          v-model="groupLeaderName"
          label="group name"
          :class="{ error: $v.groupLeaderName.$error }"
          @input="$v.groupLeaderName.$touch()"
        ></m-form>
        <m-error-message v-if="$v.groupLeaderName.$error">
          <span v-if="!$v.groupLeaderName.maxLength">
            グループリーダー名は{{
              $v.groupLeaderName.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.groupLeaderName.required">必須項目です。</span>
        </m-error-message>
      </m-form-group> -->
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
    <!-- button start -->
    <transition name="fade">
      <float-button
        v-if="true"
        icon="plus"
        right="20"
        size="70"
        @click="dialog = true"
      />
    </transition>
  </div>
</template>

<script>
import GroupCard from "@/components/group/GroupCard";
import { required, maxLength } from "vuelidate/lib/validators";
import { db } from "@/firebase/firebase";
export default {
  components: {
    GroupCard,
  },
  props: {},
  data() {
    return {
      belongingGroups: [],
      groupName: null,
      // groupLeaderName: null,
      groupDescription: null,
      dialog: false,
      searchWord: null,
      tabs: [
        { text: "グループ一覧", target: "group-list" },
        { text: "検索", target: "search" },
      ],
    };
  },
  validations: {
    groupName: { required, maxLength: maxLength(20) },
    // groupLeaderName: { required, maxLength: maxLength(20) },
    groupDescription: { required, maxLength: maxLength(100) },
  },
  computed: {},
  methods: {
    createGroup() {
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
      db.collection("groups")
        .add(newGroup)
        .then(async (docRef) => {
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

          this.$router.push({ name: "GroupRoom", params: { id: docRef.id } });
        });
    },
    fetchBelongingGroups() {
      db.collection("groups")
        .where("userIds", "array-contains", this.$store.getters.user.uid)
        .orderBy("updatedAt", "desc")
        .get()
        .then((snapshot) => {
          // console.log("snapshot:", snapshot);
          snapshot.docChanges().forEach((change) => {
            console.log("change:", change);
            // const group = change.doc.data().fromUser;
            if (change.type === "added") {
              const group = {
                ...change.doc.data(),
                id: change.doc.id,
              };
              this.belongingGroups = [...this.belongingGroups, group];
            }
          });
        });
    },
  },

  created() {
    this.fetchBelongingGroups();
  },
};
</script>

<style lang="scss" scoped>
// .group {
//   position: fixed;
//   top: 100px;
//   left: 0;
//   width: 100%;
//   min-height: calc(100vh - 100px);
//   background-color: rgba($black, 0.9);
//   overflow-y: auto;
// }
// .group {
//   &::before {
//     content: "";
//     background-image: url(/img/gym.jpg);
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.3;
//   }
//   &::after {
//     content: "";
//     background: linear-gradient(
//       90deg,
//       rgba(0, 29, 48, 1) 0%,
//       rgba(74, 84, 102, 1) 33%,
//       rgba(0, 29, 48, 1) 100%
//     );
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.5;
//   }
// }
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>