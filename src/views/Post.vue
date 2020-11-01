<template>
  <div>
    <m-dialog
      :dialog="dialog"
      header-text="今日の頑張り"
      button-text="投稿"
      @action="postTodayWorkout"
      @close="dialog = false"
    >
      <datepicker
        v-model="trainingDate"
        :format="format"
        :language="languages[language]"
      ></datepicker>
      <m-form v-model="username" label="名前" />
      <m-textarea v-model="workout" label="内容" />
      <input type="file" name="" id="" @change="onFileChange" />
      <m-button class="grey" @click="file = null">選択なし</m-button>
      <!-- <i class="fas fa-image"></i> -->
    </m-dialog>
    <transition-group tag="div" name="post-content">
      <PostContent
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @edit="editPost"
        @remove="removePost"
      />
    </transition-group>
    <float-button
      class="red"
      icon="pen"
      top="100"
      right="20"
      @click="fetchNextPosts"
    />
    <float-button icon="pen" right="20" @click="openDialog" />
    <div id="scroll-observer"></div>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import PostContent from "@/components/post/PostContent";
import Datepicker from "vuejs-datepicker";
import * as languages from "vuejs-datepicker/src/locale";
import dayjs from "dayjs";

export default {
  components: {
    PostContent,
    Datepicker,
  },
  props: {},
  data() {
    return {
      posts: [],
      trainingDate: null,
      username: null,
      workout: null,
      file: null,
      dialog: false,
      lastPost: null,
      language: "ja",
      languages,
      format: "YYYY-MM-DD",
    };
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
    },
    removeFile() {
      // const fileReader = new FileReader();
      // this.file = null;
      // fileReader.readAsDataURL(this.file);
    },
    // 投稿
    async postTodayWorkout() {
      // snackbar の初期化
      const snackbar = {
        text: "",
        color: "",
      };

      // 入力チェック
      let isValid = true;
      if (!this.username) {
        isValid = false;
        snackbar.text += "ユーザ名";
      }
      if (!this.workout) {
        isValid = false;
        if (!this.username) {
          snackbar.text += "<br>";
        }
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
        const storageRef = storage.ref();
        const fileRef = storageRef.child(this.file.name);
        await fileRef.put(this.file).then();
        url = await fileRef.getDownloadURL();
      }

      // collection"posts"へ格納するデータ
      const data = {
        trainingDate: this.trainingDate,
        username: this.username,
        workout: this.workout,
        url,
        deleteFlg: false,
        createdAt: new Date(),
      };
      console.log("data:", data);
      // データの追加
      db.collection("posts")
        .add(data)
        .then(() => {
          snackbar.text += "今日の頑張りを投稿しました。";
          snackbar.color = "blue";
          this.$store.commit("setSnackbar", snackbar);
          this.username = null;
          this.workout = null;
          this.file = null;
          this.dialog = false;
        })
        .catch((err) => {
          console.log("err:", err);
          snackbar.text += "投稿に失敗しました。";
          snackbar.color = "blue";
          this.$store.commit("setSnackbar", snackbar);
        });
    },
    // 初回読み込み
    firstFetchPosts() {
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then(this.onGetSnapshot);
    },
    // スクロール時読み込み
    fetchNextPosts() {
      // lastPostが無いときリターン
      if (!this.lastPost) return;
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .startAfter(this.lastPost)
        .get()
        .then(this.onGetSnapshot);
    },
    // firestore getでsnapshotを取得したときのcallback
    onGetSnapshot(snapshot) {
      this.lastPost = snapshot.docs[snapshot.docs.length - 1];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // 日時をフォーマット通りに変換
          let t; // 一時変数
          let trainingDate;
          try {
            t = change.doc.data().trainingDate.toDate();
            trainingDate = dayjs(t).format("YYYY-MM-DD");
          } catch (err) {
            console.log("err:", err);
          }
          const post = {
            ...change.doc.data(),
            id: change.doc.id,
            trainingDate,
          };
          // 投稿を下に追加
          this.posts = [...this.posts, post];
        }
      });
    },
    // 新しい読み込みのリスナ
    listenNewPost() {
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const post = {
                ...change.doc.data(),
                id: change.doc.id,
              };
              if (
                this.posts.length > 0 &&
                post.createdAt > this.posts[0].createdAt
              ) {
                // 新規投稿時刻が現在表示中の先頭の投稿時刻より新しい場合
                // 新しい投稿が追加される場合
                this.posts = [post, ...this.posts];
              }
            }
          });
        });
    },
    editPost(postId) {
      console.log("edit postId from post:", postId);
    },
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
    scroll(entries) {
      console.log("entries:", entries);
    },
  },
  created() {
    this.firstFetchPosts();
    this.listenNewPost();
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: "500px 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(this.fetchNextPosts, options);
    const scrollObserver = document.querySelector("#scroll-observer");
    observer.observe(scrollObserver);
  },
};
</script>

<style lang="scss" scoped>
#scroll-observer {
  // height: 5px;
  // background-color: red;
}
.post-content-enter {
  opacity: 0;
  // transform: translateX(-100px);
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

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>