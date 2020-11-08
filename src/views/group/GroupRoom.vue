<template>
  <div class="group-room">
    {{ $route.params.id }}
    <m-dialog
      class="p-0"
      :dialog="unsetExists"
      header-text="アイコンとタグ設定"
      button-text="設定"
      @action="setIconAndTags"
      @close="unsetExists = false"
    >
      <m-tabs>
        <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
          tab.text
        }}</m-tab>
      </m-tabs>
      <m-tab-contents>
        <!-- 1.icon -->
        <m-tab-content class="active" id="icon">
          <m-input-icon @result="fetchResult"></m-input-icon>
          <img
            v-if="cropped"
            :src="cropped"
            alt="cropped image"
            class="cropped"
          />
        </m-tab-content>
        <!-- 2.tag -->
        <m-tab-content id="tag"></m-tab-content>
      </m-tab-contents>
    </m-dialog>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      groupInfo: {},
      file: null,
      cropped: null,
      blob: null,
      unsetExists: false,
      tabs: [
        { text: "アイコン", target: "icon" },
        { text: "タグ", target: "tag" },
      ],
    };
  },
  computed: {},
  methods: {
    fetchResult(result) {
      // console.log("result:", result);
      this.cropped = result.cropped;
      this.blob = result.blob;
    },
    fetchRoomInfo() {
      db.collection("groups")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          console.log("doc:", doc);
          if (doc.exists) {
            console.log("doc.data():", doc.data());
            this.groupInfo = doc.data();
            console.log(
              "this.groupInfo.adminUserIds:",
              this.groupInfo.adminUserIds
            );
            if (
              this.groupInfo.adminUserIds.includes(
                this.$store.getters.user.uid
              ) &&
              !(this.groupInfo.groupIcon && this.groupInfo.groupTagIds)
            ) {
              const snackbar = {
                text: "未設定の項目があります。<br>設定してしまいましょう。",
                color: "blue",
              };
              this.$store.commit("setSnackbar", snackbar);
              console.log("un setted:");
              this.unsetExists = true;
            }
          }
        });
    },
    fetchMessages() {},
    setIconAndTags() {},
  },
  created() {
    this.fetchRoomInfo();
  },
};
</script>

<style lang="scss" scoped>
.cropped {
  width: 100px;
  height: 100px;
}
// .group-room {
//   position: fixed;
//   top: 100px;
//   left: 0;
//   height: calc(100vh - 100px);
//   width: 100%;
//   // background-color: $indigo;
//   overflow: scroll;
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