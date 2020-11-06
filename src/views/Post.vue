<template>
  <div>
    <m-dialog
      :dialog="dialog"
      header-text="今日の頑張り"
      button-text="投稿"
      @action="postTodayWorkout"
      @close="dialog = false"
    >
      <!-- 1.trainingDate -->
      <m-form-group>
        <m-datepicker
          v-model="trainingDate"
          label="トレーニング日"
        ></m-datepicker>
        <m-error-message v-if="$v.trainingDate.$error">
          <span v-if="!$v.trainingDate.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
      <!-- 2.username -->
      <m-form-group>
        <m-form v-model="username" label="名前" />
      </m-form-group>
      <!-- 3.workout -->
      <m-form-group>
        <m-textarea
          v-model="workout"
          label="内容"
          :class="{ error: $v.workout.$error }"
          @blur="$v.workout.$touch()"
        ></m-textarea>
        <m-error-message v-if="$v.workout.$error">
          <span v-if="!$v.workout.maxLength">
            トレーニング内容は{{
              $v.workout.$params.maxLength.max
            }}文字以下でなければいけません。
          </span>
          <span v-if="!$v.workout.required">必須項目です。</span>
        </m-error-message>
      </m-form-group>
      <!-- 4.file -->
      <m-form-group>
        <input
          type="file"
          name=""
          id=""
          @change="onFileChange"
          class="input-file"
        />
        <m-button class="grey" @click="file = null">選択なし</m-button>
      </m-form-group>
      <!-- <i class="fas fa-image"></i> -->
    </m-dialog>
    <transition-group tag="div" name="post-content">
      <PostContent
        v-for="post in posts"
        :data-snapshot-index="post.snapshotIndex"
        :key="post.id"
        :post="post"
        @edit="editPost"
        @remove="removePost"
      />
    </transition-group>
    <float-button icon="pen" right="20" @click="openDialog" />
    <div id="scroll-observer"></div>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import PostContent from "@/components/post/PostContent";
import dayjs from "dayjs";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    PostContent,
  },
  props: {},
  data() {
    return {
      posts: [],
      trainingDate: new Date(),
      username: null,
      workout: null,
      file: null,
      dialog: false,
      lastPost: null,
    };
  },
  validations: {
    trainingDate: { required },
    workout: { required, maxLength: maxLength(8) },
  },
  computed: {},
  methods: {
    openDialog() {
      this.dialog = true;
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      // fileReader.onload = () => {
      //   document.querySelector("#preview").src = fileReader.result;
      // };
      fileReader.readAsDataURL(this.file);
      console.log("this.file:", this.file);
    },
    removeFile() {
      // const fileReader = new FileReader();
      // this.file = null;
      // fileReader.readAsDataURL(this.file);
    },
    // 投稿
    async postTodayWorkout() {
      // console.log('this.trainingDate:', this.trainingDate);
      // snackbar の初期化
      const snackbar = {
        text: "",
        color: "",
      };

      // 入力チェック
      let isValid = true;
      if (!this.trainingDate) {
        isValid = false;
        snackbar.text += "トレーニング日";
      }
      if (!this.username) {
        if (!isValid) {
          snackbar.text += "<br>";
        }
        isValid = false;
        snackbar.text += "ユーザ名";
      }
      if (!this.workout) {
        if (!isValid) {
          snackbar.text += "<br>";
        }
        isValid = false;
        snackbar.text += "内容";
      }
      if (!isValid) {
        snackbar.text += "<br>を入力してください。";
        snackbar.color = "red";
        this.$store.commit("setSnackbar", snackbar);
        return;
      }

      // 添付ファイルの有無のチェックとファイルアップロード
      // アップロードしたファイルのURLの取得
      let url = "";
      if (this.file) {
        // console.log('this.file:', this.file);
        const storageRef = storage.ref();
        const fileRef = storageRef.child(this.file.name);
        await fileRef.put(this.file).then();
        url = await fileRef.getDownloadURL();
      }

      // collection"posts"へ格納するデータ
      console.log(
        "db.doc(`users/${this.$store.getters.user.uid}`):",
        db.doc(`users/${this.$store.getters.user.uid}`)
      );
      const data = {
        trainingDate: this.trainingDate,
        username: this.username,
        workout: this.workout,
        url,
        deleteFlg: false,
        createdAt: new Date(),
        user: db.doc(`users/${this.$store.getters.user.uid}`),
      };
      // console.log("data:", data);
      // データの追加
      db.collection("posts")
        .add(data)
        .then(() => {
          // 追加に成功
          snackbar.text += "今日の頑張りを投稿しました。";
          snackbar.color = "blue";
          this.$store.commit("setSnackbar", snackbar);
          this.trainingDate = null;
          this.username = null;
          this.workout = null;
          this.file = null;
          this.dialog = false;
        })
        .catch((err) => {
          // 追加に失敗
          console.log("err:", err);
          snackbar.text += "投稿に失敗しました。";
          snackbar.color = "blue";
          this.$store.commit("setSnackbar", snackbar);
        });
    },
    // 初回読み込み
    async firstFetchPosts() {
      console.log('first fetch:', );
     await  db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then(this.onGetSnapshot);
    },
    // スクロール時読み込み
    async fetchNextPosts() {
      console.log('next fetch:', );
      // lastPostが無いときリターン
      if (!this.lastPost) return;
      await db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .startAfter(this.lastPost)
        .get()
        .then(this.onGetSnapshot);
    },
    // firestore getでsnapshotを取得したときのcallback
    async onGetSnapshot(snapshot, newPost = false) {
      this.lastPost = snapshot.docs[snapshot.docs.length - 1];
      await snapshot.docChanges().forEach(async (change, index) => {
        // console.log("index:", index);
        if (change.type === "added") {
          let post = {
            ...change.doc.data(),
            id: change.doc.id,
            snapshotIndex: index,
          };
          const postedUser = change.doc.data().user;
          if (postedUser) {
            // 認証済みユーザのとき、ユーザ情報を取得
          await change.doc
              .data()
              .user.get()
              .then((userRef) => {
                // console.log('userRef:', userRef);
                // console.log('userRef.data():', userRef.data());
                post.userIcon = userRef.data().userIcon;
              });
          }
          // 日時をフォーマット通りに変換
          try {
            // データ追加日時の取得
            let t = change.doc.data().createdAt;
            post.formattedCreatedAt = this.fromTimestampToFormattedDate(t);

            // トレーニング日時の取得
            t = change.doc.data().trainingDate;
            post.trainingDate = this.fromTimestampToFormattedDate(t);
          } catch {
            post.trainingDate = "";
            post.formattedCreatedAt = "";
          }
          console.log('post.userIcon:', post.userIcon);
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
          console.log("posted!:");
        }
      });
    },
    // 新しい読み込みのリスナ
    async listenNewPost() {
      console.log('listen post:', );
      await db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot(async (snapshot) => {
          await this.onGetSnapshot(snapshot, true);
        });
    },
    // 投稿の編集
    editPost(postId) {
      console.log("edit postId from post:", postId);
    },
    // 投稿の削除
    removePost(postId) {
      // console.log("remove: postId from post", postId);
      db.collection("posts")
        .doc(postId)
        .update({
          deleteFlg: true,
        })
        .then(() => {
          this.posts = this.posts.filter((post) => post.id !== postId);
        });
    },
    // 時刻のフォーマット
    fromTimestampToFormattedDate(timestamp) {
      return dayjs(timestamp.toDate()).format("YYYY-MM-DD");
    },
    // スクロールの検知
    initScrollObserver() {
      const options = {
        root: null,
        rootMargin: "500px 0px",
        threshold: 0,
      };
      const observer = new IntersectionObserver(this.fetchNextPosts, options);
      const scrollObserver = document.querySelector("#scroll-observer");
      observer.observe(scrollObserver);
    },
    // enter(el, done) {
    //   // console.log("el:", el);
    //   console.log("done:", done);
    //   const delay = el.dataset.snapshotIndex * 150;
    //   el.style.transitionDelay = `${delay}ms`;
    //   // setTimeout(() => {
    //   //   Velocity(
    //   //     el,
    //   //     {
    //   //       opacity: 1
    //   //     }
    //   //   )
    //   // })
    // },
    // leave() {},
  },
  async created() {
    await this.firstFetchPosts();
    // await console.log('first fetch:', );
    await this.listenNewPost();
    // console.log('listen post:', );
  },
  mounted() {
    // this.initScrollObserver();
  },
};
</script>

<style lang="scss" scoped>
.input-file {
  // width: 100%;
  // height: 10px;
  background-color: $grey;
}
#scroll-observer {
  // height: 5px;
  // background-color: red;
}
.post-content-enter {
  opacity: 0;
  // transform: translateY(30px);
}
.post-content-enter-active {
  transition: all 0.5s ease-out;
}
.post-content-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.post-content-leave-active {
  position: absolute;
  transition: all 0.5s ease-in;
}
.post-content-move {
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