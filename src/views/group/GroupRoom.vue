<template>
  <div class="group-room">
    <header class="room-header">
      <i class="fas fa-chevron-left prev" @click="$router.go(-1)"></i>
      <div class="icon-and-name">
        <img :src="groupInfo.groupIcon" alt="" />
        <h2>{{ groupInfo.groupName }}</h2>
      </div>
      <i class="fas fa-bars" @click="groupConfigDialog = true"></i>
    </header>

    <div class="messages">
      <group-room-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      ></group-room-message>
    </div>

    <div class="message-form">
      <m-form-group class="flex">
        <m-form
          v-model="newMessage"
          label="newMessage"
          :class="{ error: $v.newMessage.$error }"
          @input="$v.newMessage.$touch()"
        ></m-form>
        <m-error-message v-if="$v.newMessage.$error">
          <span v-if="!$v.newMessage.maxLength">
            メッセージは{{
              $v.newMessage.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
        </m-error-message>
        <m-button
          :disabled="$v.$invalid || !newMessage"
          class="w-25 m-0"
          @click="sendMessage"
          >送信</m-button
        >
      </m-form-group>
    </div>
    <m-dialog
      class="p-0"
      :dialog="groupConfigDialog"
      header-text="グループ設定"
      button-text="設定"
      @action="updateConfig"
      @close="groupConfigDialog = false"
    >
      <m-tabs>
        <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
          tab.text
        }}</m-tab>
      </m-tabs>
      <m-tab-contents>
        <!-- 1.icon -->
        <m-tab-content class="active" id="icon">
          <div v-if="groupInfo.groupIcon" class="flex">
            <h2>設定中アイコン</h2>
            <img
              :src="groupInfo.groupIcon"
              alt="group icon"
              width="40"
              height="40"
            />
          </div>
          <m-input-icon @result="fetchResult"></m-input-icon>
          <img
            v-if="cropped"
            :src="cropped"
            alt="cropped image"
            class="cropped"
          />
        </m-tab-content>
        <!-- 2.tag -->
        <m-tab-content id="tag">
          <div>
            <transition-group
              tag="div"
              name="selected-tag"
              class="selected-tags"
            >
              <m-chip
                v-for="(tag, index) in selectedTags"
                :key="index"
                @remove="removeTag(index)"
                >{{ tag }}</m-chip
              >
            </transition-group>
          </div>
          <m-form-group class="flex">
            <m-form
              v-model="newTagName"
              label="new tag name"
              :class="{ error: $v.newTagName.$error }"
              @input="$v.newTagName.$touch()"
            ></m-form>
            <m-error-message v-if="$v.newTagName.$error">
              <span v-if="!$v.newTagName.maxLength">
                タグ名は{{
                  $v.newTagName.$params.maxLength.max
                }}文字以下でなければいけません。
              </span>
              <span v-if="!$v.newTagName.minLength">
                タグ名は{{
                  $v.newTagName.$params.minLength.min
                }}文字以上でなければいけません。
              </span>
            </m-error-message>
            <m-button
              class="m-0 blue t-white"
              :disabled="$v.$invalid || !newTagName"
              @click="addTag"
              >追加</m-button
            >
          </m-form-group>
          <!-- <m-form-group>
          </m-form-group> -->
          <m-form-group>
            <m-select
              :value="selectBoxTag"
              class="w-4"
              label="既存タグ"
              name="tag"
              search
              :options="groupTags"
              @input="onInput"
            >
            </m-select>
          </m-form-group>
        </m-tab-content>
        <!-- 3.detail -->
        <m-tab-content id="detail">
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
          <m-form-group>
            <m-form
              v-model="groupLeaderName"
              label="group leader name"
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
          </m-form-group>
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
        </m-tab-content>
      </m-tab-contents>
    </m-dialog>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import { required, maxLength } from "vuelidate/lib/validators";
import GroupRoomMessage from "@/components/group/GroupRoomMessage";
import dayjs from "dayjs";

export default {
  components: {
    GroupRoomMessage,
  },
  props: {},
  data() {
    return {
      lastMessage: null,
      groupInfo: {},
      file: null,
      cropped: null,
      blob: null,
      newTagName: null,
      selectBoxTag: null,
      selectedTags: [],
      groupTags: [
        { value: "aaaa", text: "aaaa" },
        { value: "aa2", text: "aa2" },
        { value: "aa3a", text: "aa3a" },
        { value: "aa2222aa", text: "aa2222aa" },
      ],
      newMessage: null,
      messages: [],
      groupConfigDialog: false,
      groupName: null,
      groupLeaderName: null,
      groupDescription: null,
      tabs: [
        { text: "アイコン", target: "icon" },
        { text: "タグ", target: "tag" },
        { text: "詳細", target: "detail" },
      ],
    };
  },
  validations: {
    newTagName: { maxLength: maxLength(10) },
    newMessage: { maxLength: maxLength(100) },
    groupName: { required, maxLength: maxLength(20) },
    groupLeaderName: { required, maxLength: maxLength(20) },
    groupDescription: { required, maxLength: maxLength(100) },
  },
  computed: {},
  methods: {
    async sendMessage() {
      if (!this.newMessage) {
        const snackbar = {
          text: "メッセージを入力してください。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }

      const message = {
        content: this.newMessage,
        fromUserId: this.$store.getters.user.uid,
        fromUserRef: db.doc(`users/${this.$store.getters.user.uid}`),
        createdAt: new Date(),
      };

      await db
        .collection("groups")
        .doc(this.$route.params.id)
        .collection("messages")
        .add(message);
      this.newMessage = null;
    },
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
          // console.log("doc:", doc);
          if (doc.exists) {
            // console.log("doc.data():", doc.data());
            // console.log("doc.id:", doc.id);
            this.groupInfo = {
              ...doc.data(),
              id: doc.id,
            };
            this.groupName = this.groupInfo.groupName;
            this.groupLeaderName = this.groupInfo.groupLeaderName;
            this.groupDescription = this.groupInfo.groupDescription;

            if (this.groupInfo.groupTagNames) {
              this.selectedTags = this.groupInfo.groupTagNames;
            }
            if (
              this.groupInfo.adminUserIds.includes(
                this.$store.getters.user.uid
              ) &&
              !(this.groupInfo.groupIcon && this.groupInfo.groupTagNames)
            ) {
              const snackbar = {
                text: "未設定の項目があります。",
                color: "blue",
              };
              this.$store.commit("setSnackbar", snackbar);
              this.groupConfigDialog = true;
            }
          }
        });
    },
    async firstFetchMessages() {
      await db
        .collection("groups")
        .doc(this.$route.params.id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then(this.onGetSnapshot);
    },
    // スクロール時読み込み
    fetchNextMessages() {
      // console.log("next fetch:");
      // lastMessageが無いときリターン
      if (!this.lastMessage) return;
      db.collection("groups")
        .doc(this.$route.params.id)
        .collection("messages")
        // .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .startAfter(this.lastMessage)
        .get()
        .then(this.onGetSnapshot);
    },
    // firestore getでsnapshotを取得したときのcallback
    onGetSnapshot(snapshot, newMessage = false) {
      this.lastMessage = snapshot.docs[snapshot.docs.length - 1];
      // console.log('this.lastMessage:', this.lastMessage);
      snapshot.docChanges().forEach((change) => {
        // console.log("change:", change);
        // console.log("index:", index);
        // const fromUser = change.doc.data().fromUser;
        if (change.type === "added") {
          const message = {
            ...change.doc.data(),
            id: change.doc.id,
            // snapshotIndex: index,
            // fromUser,
          };
          // 日時をフォーマット通りに変換
          try {
            // データ追加日時の取得
            let t = change.doc.data().createdAt;
            message.formattedCreatedAt = this.fromTimestampToFormattedDate(t);
          } catch {
            message.formattedCreatedAt = "";
          }

          if (newMessage) {
            // 投稿を上に追加
            if (
              this.messages.length > 0 &&
              message.createdAt >
                this.messages[this.messages.length - 1].createdAt
            )
              this.messages = [...this.messages, message];
          } else {
            // 投稿を下に追加
            this.messages = [message, ...this.messages];
          }
        }
      });
    },
    // 新しい読み込みのリスナ
    async listenNewMessage() {
      console.log("listen:");
      await db
        .collection("groups")
        .doc(this.$route.params.id)
        .collection("messages")
        // .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          this.onGetSnapshot(snapshot, true);
        });
    },
    // 時刻のフォーマット
    fromTimestampToFormattedDate(timestamp) {
      return dayjs(timestamp.toDate()).format("MM-DD hh:mm");
    },
    fetchGroupTags() {},
    addTag() {
      console.log("this.newTagName:", this.newTagName);
      let trimmed = this.newTagName.replace(/\s+/g, "");
      this.newTagName = null;
      if (this.selectedTags.includes(trimmed)) return;
      this.selectedTags = [...this.selectedTags, trimmed];
    },
    removeTag(index) {
      console.log("index:", index);
      this.selectedTags = this.selectedTags.filter((tag, i) => i !== index);
    },
    onInput(tagName) {
      if (this.selectedTags.includes(tagName)) return;
      this.selectedTags = [...this.selectedTags, tagName];
    },
    async updateConfig() {
      if (this.$v.$invalid) {
        const snackbar = {
          text: "エラーが発生しました。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      const data = {
        ...this.groupInfo,
        groupName: this.groupName,
        groupLeaderName: this.groupLeaderName,
        groupDescription: this.groupDescription,
        groupTagNames: this.selectedTags,
        updatedAt: new Date(),
      };
      if (this.blob) {
        console.log("this.blob:", this.blob);
        console.log("this.cropped:", this.cropped);
        const storageRef = storage.ref();
        const fileRef = storageRef.child(
          `group-icons/${this.$route.params.id}-icon.png`
        );
        await fileRef.put(this.blob).then();
        const url = await fileRef.getDownloadURL();
        data.groupIcon = url;
      }

      db.collection("groups")
        .doc(this.$route.params.id)
        .update(data)
        .then(() => {
          this.groupInfo = data;
          const snackbar = {
            text: "設定を更新しました。",
            color: "blue",
          };
          this.$store.commit("setSnackbar", snackbar);
          this.groupConfigDialog = false;
        })
        .catch((err) => {
          console.log("err:", err);
          const snackbar = {
            text: "設定に失敗しました。",
            color: "red",
          };
          this.$store.commit("setSnackbar", snackbar);
        });
    },
  },
  async created() {
    this.fetchRoomInfo();
    await this.firstFetchMessages();
    await this.listenNewMessage();
  },
};
</script>

<style lang="scss" scoped>
.cropped {
  width: 100px;
  height: 100px;
}
.group-room {
  position: relative;
  width: 100%;

  .room-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    background-color: rgba($indigo, 0.7);
    color: $white;

    .icon-and-name {
      display: flex;
      img {
        height: 40px;
        margin-right: 20px;
      }
    }

    i {
      font-size: 20px;
    }
  }
  .selected-tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .message-form {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 10px 0 10px;
    background-color: rgba($white, 1);
    @extend .box-shadow-1;

    input {
      // background-color: $white;
    }
  }
}

.selected-tag-enter-active {
  transition: all 0.5s ease-out;
}
.selected-tag-enter,
.selected-tag-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.selected-tag-leave-active {
  position: absolute;
  transition: all 0.5s ease-in;
}
.selected-tag-move {
  transition: transform 0.8s ease;
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