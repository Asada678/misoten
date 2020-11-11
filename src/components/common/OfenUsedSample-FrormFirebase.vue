<template>
  <div>
    <!-- 1.form -->
    <m-form-group>
      <m-form
        v-model="sample"
        label="sample"
        :class="{ error: $v.sample.$error }"
        @input="$v.sample.$touch()"
      ></m-form>
      <m-error-message v-if="$v.sample.$error">
        <span v-if="!$v.sample.maxLength">
          ユーザ名は{{
            $v.sample.$params.maxLength.max
          }}文字以下でなければいけません。
        </span>
        <span v-if="!$v.sample.required">必須項目です。</span>
      </m-error-message>
    </m-form-group>
    <!-- 2.select -->
    <m-select
      :value="selectBoxTag"
      label="既存タグから選択"
      name="tag"
      search
      no-selected
      :options="groupTags"
      @input="onSelectBoxInput"
    >
    </m-select>
    <!-- 3.tabs tab-contents -->
    <m-tabs>
      <m-tab v-for="tab in tabs" :key="tab.target" :target="tab.target">{{
        tab.text
      }}</m-tab>
    </m-tabs>
    <m-tab-contents>
      <m-tab-content class="active" id=""> </m-tab-content>
      <m-tab-content id=""> </m-tab-content>
      <m-tab-content id=""> </m-tab-content>
    </m-tab-contents>
    <!-- 4.dialog -->
    <m-dialog
      :dialog="dialog"
      :disabled="$v.$invalid"
      header-text=""
      button-text=""
      @action="postTodayWorkout"
      @close="dialog = false"
    ></m-dialog>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
// import { db, storage } from "@/firebase/firebase";
export default {
  data() {
    return {
      options: [],
      tabs: [
        { text: "アイコン", target: "icon" },
        { text: "タグ", target: "tag" },
        { text: "詳細", target: "detail" },
      ],
    }
  },
  validations: {
    sample: { required, maxLength: maxLength(10) },
  },
  methods: {
    // セレクトボックスの値受け取り
    onSelectBoxInput(value) {
      console.log("value:", value);
    },
    // データの追加
    addData() {
      db.collection("")
        .add(data)
        .then(() => {})
        .catch(() => {});
    },
    // データ一覧の取得
    fetchData() {
      db.collection("")
        // .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        // .startAfter(this.lastPost)
        .get()
        .then(this.onGetSnapshot);
    },
    // データ一件の取得
    fetchRoomInfo() {
      db.collection("groups")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log('doc.id:', doc.id);
            console.log("doc.data():", doc.data());
          }
        })
        .catch((doc) => {});
    },
    // データの更新
    updateDate() {
      db.collection("")
        .doc(this.$route.params.id)
        .update(data)
        .then(() => {})
        .catch(() => {});
    },
    // storageへのアップロード
    async upload() {
      const filename = ``;
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`some-folder/${filename}.png`);
      // console.log("fileRef:", fileRef);
      await fileRef.put(this.blob).then();
      const fileUrl = await fileRef.getDownloadURL();

      const updatedData = { fileUrl: fileUrl };

      await db
        .collection("users")
        .doc(this.$store.getters.user.uid)
        .update(updatedData)
        .then(() => {})
        .catch(() => {});
    },
    // firestore getでsnapshotを取得したときのcallback
    onGetSnapshot(snapshot, newPost = false) {
      this.lastPost = snapshot.docs[snapshot.docs.length - 1];
      snapshot.docChanges().forEach((change) => {
        // ドキュメント参照の追加
        const someRef = change.doc.data().someRef;
        if (change.type === "added") {
          const post = {
            ...change.doc.data(),
            id: change.doc.id,
            someRef,
          };
          // 日時をフォーマット通りに変換
          try {
            // データ追加日時の取得
            let t = change.doc.data().createdAt;
            post.formattedCreatedAt = this.fromTimestampToFormattedDate(t);
          } catch {
            post.formattedCreatedAt = "";
          }

          if (newPost) {
            // 投稿を上に追加
            if (
              this.posts.length > 0 &&
              post.createdAt > this.posts[0].createdAt
            )
              this.posts = [post, ...this.posts];
          } else {
            // 投稿を下に追加
            this.posts = [...this.posts, post];
          }
        }
      });
    },
    // 時刻のフォーマット
    fromTimestampToFormattedDate(timestamp) {
      return dayjs(timestamp.toDate()).format("YYYY-MM-DD");
    },
    // snackbarの設定
    setSnackbar() {
      const snackbar = {
        text: "アイコンを設定しました。",
        color: "green",
      };
      this.$store.commit("setSnackbar", snackbar);
    },
  },
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