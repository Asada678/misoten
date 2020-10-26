<template>
  <div>
    <m-dialog
      :dialog="dialog"
      header-text="今日の頑張り"
      button-text="投稿"
      @action="postTodayWorkout"
      @close="dialog = false"
    >
      <m-form v-model="username" label="名前" />
      <m-textarea v-model="workout" label="内容" />
      <i class="fas fa-image"></i>
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
    <float-button icon="pen" right="20" @click="openDialog" />
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import PostContent from "@/components/post/PostContent";

export default {
  components: {
    PostContent,
  },
  props: {},
  data() {
    return {
      posts: [],
      username: null,
      workout: null,
      dialog: false,
    };
  },
  computed: {},
  methods: {
    openDialog() {
      this.dialog = true;
    },
    postTodayWorkout() {
      const snackbar = {
        text: "",
        color: "",
      };
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
      const data = {
        username: this.username,
        workout: this.workout,
        deleteFlg: false,
        createdAt: new Date(),
      };
      db.collection("posts").add(data).then(() => {
        snackbar.text += "今日の頑張りを投稿しました。";
        snackbar.color = "blue";
        this.$store.commit("setSnackbar", snackbar);
        this.username = null;
        this.workout = null;
        this.dialog = false;
      }).catch(err => {
        console.log('err:', err);
        snackbar.text += "投稿に失敗しました。";
        snackbar.color = "blue";
        this.$store.commit("setSnackbar", snackbar);
      });
    },
    fetchPosts() {
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const post = {
                ...change.doc.data(),
                id: change.doc.id,
              };
              this.posts = [post, ...this.posts];
            }
            if (change.type === "modified") {
              console.log('modified:', change.doc.id);
            }
            if (change.type === "removed") {
              this.posts = this.posts.filter(
                (post) => post.id !== change.doc.id
              );
            }
          });
        });
    },
    editPost(postId) {
      console.log("edit postId from post:", postId);
    },
    removePost(postId) {
      // console.log("remove: postId from post", postId);
      db.collection("posts").doc(postId).update({
        deleteFlg: true,
      });
    },
  },
  created() {
    this.fetchPosts();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
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