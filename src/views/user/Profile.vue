<template>
  <div class="profile">
    <!-- <nav class="profile__nav">
      <i class="fas fa-chevron-left" @click="$router.go(-1)"></i>
      <i class="fas fa-bars"></i>
    </nav> -->
    <div class="profile__header">
      <div class="user-info">
        <router-link :to="{ name: 'SetIcon' }">
          <img :src="user.userIcon" alt="" />
        </router-link>
        <div class="username">
          <p>{{ user.username }}</p>
        </div>
      </div>
      <div class="user-activity">
        <div class="item">
          <p class="count">{{ user.postCounts }}</p>
          <p class="description">投稿数</p>
        </div>
        <div class="item">
          <p class="count">107</p>
          <p class="description">称号</p>
        </div>
        <div class="item">
          <p class="count">15k</p>
          <p class="description">いいね!</p>
        </div>
      </div>
    </div>
    <div class="profile__config">
      <div class="card">
        <div v-if="isMyProfile" class="item">
          <router-link :to="{ name: 'SetTarget' }">
            <img src="/img/icon-target.png" alt="target" id="img-target" />
            <p>目標設定</p>
          </router-link>
        </div>
        <div v-else class="item">
          <img src="/img/logo-mini.png" alt="color" />
          <p>運動履歴</p>
        </div>
        <div v-if="isMyProfile" class="item" @click="openColorOptions">
          <img src="/img/icon-color.png" alt="color" />
          <p>カラー</p>
        </div>
        <div v-else class="item">
          <img src="/img/logo-mini.png" alt="color" />
          <p>フォロー</p>
        </div>
        <div class="item" @click="openTitleOptions">
          <img src="/img/icon-title.png" alt="title" />
          <p>称号</p>
        </div>
      </div>
      <div class="color-options-container">
        <Color />
      </div>
      <div class="title-options-container">
        <Title />
      </div>
    </div>
    <div class="profile__content">
      <div class="chips">
        <m-chip class="small active" border>投稿</m-chip>
        <m-chip class="small" border>プラン</m-chip>
      </div>

      <transition-group tag="div" name="post-content">
        <PostContent
          v-for="post in posts"
          :my-profile="isMyProfile"
          :key="post.id"
          :post="post"
          @edit="editPost"
          @remove="removePost"
        />
      </transition-group>
      <div id="scroll-observer"></div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import Color from "@/components/my-profile/Color";
import PostContent from "@/components/post/PostContent";
import Title from "@/components/my-profile/Title";
import dayjs from "dayjs";

export default {
  components: {
    Color,
    PostContent,
    Title,
  },
  props: {},
  data() {
    return {
      user: {},
      posts: [],
    };
  },
  computed: {
    // user() {
    //   return this.$store.getters.user;
    // },
    isMyProfile() {
      return this.$store.getters.user.uid === this.user.uid;
    },
  },
  methods: {
    closeOpeningOptions() {
      const opening = this.$el.querySelector(".open");
      if (opening) {
        opening.classList.remove("open");
      }
    },
    openColorOptions() {
      const colorOptionsContainer = this.$el.querySelector(
        ".color-options-container"
      );
      if (colorOptionsContainer.classList.contains("open")) {
        this.closeOpeningOptions();
        return;
      } else {
        this.closeOpeningOptions();
        colorOptionsContainer.classList.add("open");
      }
    },
    openTitleOptions() {
      const titleOptionsContainer = this.$el.querySelector(
        ".title-options-container"
      );
      if (titleOptionsContainer.classList.contains("open")) {
        this.closeOpeningOptions();
        return;
      } else {
        this.closeOpeningOptions();
        titleOptionsContainer.classList.add("open");
      }
    },
    // 初回読み込み
    async firstFetchPosts() {
      // console.log("this.user:", this.user);
      await db
        .collection("posts")
        .where("deleteFlg", "==", false)
        .where("fromUserId", "==", this.user.uid)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then(this.onGetSnapshot);
    },
    // スクロール時読み込み
    async fetchNextPosts() {
      // console.log("next fetch:");
      // lastPostが無いときリターン
      if (!this.lastPost) return;
      await db
        .collection("posts")
        .where("deleteFlg", "==", false)
        .where("fromUserId", "==", this.user.uid)
        .orderBy("createdAt", "desc")
        .limit(10)
        .startAfter(this.lastPost)
        .get()
        .then(this.onGetSnapshot);
    },
    // firestore getでsnapshotを取得したときのcallback
    onGetSnapshot(snapshot, newPost = false) {
      // 新規投稿の時はlastPostを更新しない。
      if (!newPost) {
        this.lastPost = snapshot.docs[snapshot.docs.length - 1];
      }
      // console.log('this.lastPost:', this.lastPost);
      snapshot.docChanges().forEach((change, index) => {
        if (change.type === "added") {
          const post = {
            ...change.doc.data(),
            id: change.doc.id,
            snapshotIndex: index,
          };
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
          // console.log('this.posts:', this.posts);
        }
      });
    },
    // 投稿の編集
    editPost(postId) {
      console.log("edit postId from post:", postId);
    },
    // 投稿の削除
    removePost(post) {
      // console.log("remove: post from post", post);
      if (
        !(
          post.fromUserId === "guest-user" ||
          post.fromUserId === this.$store.getters.user.uid
        )
      ) {
        const snackbar = {
          text: "削除する権限がありません。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      db.collection("posts")
        .doc(post.id)
        .update({
          deleteFlg: true,
        })
        .then(() => {
          this.posts = this.posts.filter((p) => p.id !== post.id);
        });
    },
    // 新しい読み込みのリスナ
    async listenNewPost() {
      await db
        .collection("posts")
        .where("deleteFlg", "==", false)
        .where("fromUserId", "==", this.user.uid)
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          this.onGetSnapshot(snapshot, true);
        });
    },
    // 時刻のフォーマット
    fromTimestampToFormattedDate(timestamp) {
      // console.log('timestamp:', timestamp);
      const year = dayjs(timestamp.toDate()).year();
      if (year < new Date().getFullYear()) {
        return dayjs(timestamp.toDate()).format("YYYY/MM/DD");
      } else {
        return dayjs(timestamp.toDate()).format("MM/DD");
      }
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
    async fetchUserInfo(uid) {
      await db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          // console.log("doc:", doc);
          // console.log("doc.data():", doc.data());
          const user = {
            ...doc.data(),
            uid: doc.id,
          };
          this.user = user;
          return user;
        });
      // console.log("this.user:", this.user);
      // console.log("this.user.uid:", this.user.uid);
    },
  },
  async created() {
    // console.log("this.$route.params.id:", this.$route.params.id);
    if (this.$route.params.id) {
      await this.fetchUserInfo(this.$route.params.id);
    } else {
      this.user = this.$store.getters.user;
    }
    // console.log('this.user:', this.user);
    // console.log("created this.posts:", this.posts);
    await this.firstFetchPosts();
    await this.listenNewPost();
  },
  mounted() {
    this.initScrollObserver();
  },
};
</script>

<style lang="scss" scoped>
.black {
  .profile {
    &__config {
      .card {
        background-color: rgba($charcoal, 1);
        color: $white;
      }
    }
  }
}
.profile {
  position: relative;

  &__header {
    position: relative;
    margin: 0px 0 -70px;
    padding: 20px 20px 70px;
    background-color: $orange;
    color: $black;

    .user-info {
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        border-radius: 50%;
      }
      .username {
        p {
          font-size: 28px;
          font-weight: 700;
        }
      }
    }
    .user-activity {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 10px 0px;

      .item {
        position: relative;
        text-align: center;

        &:last-child::before {
          display: none;
        }

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          height: 70%;
          width: 2px;
          background-color: rgba($grey, 0.3);
        }

        .count {
          font-size: 20px;
          font-weight: 900;
        }
        .description {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }

  &__config {
    position: relative;
    padding: 10px;

    .card {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 5px 10px;
      border-radius: 20px;
      background-color: rgba($charcoal, 1);
      color: $white;
      background-color: $white;
      color: rgba($black, 0.9);
      transition: 0.3s;
      @extend .bs-b-8;

      .item, a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        transition: .3s;

        &:hover {
          background-color: rgba($grey, 0.5);
        }

        img {
          width: 80px;
          height: 80px;

          &#img-target {
            width: 75px;
            height: 75px;
          }
        }
        p {
          text-align: center;
        }
      }
    }
    .color-options-container,
    .title-options-container {
      position: absolute;
      z-index: 10;
      top: 100%;
      left: 0;
      // display: none;
      width: 100%;
      padding: 0px 10px;
      opacity: 0;
      visibility: hidden;
      transform: scaleY(0);
      transform-origin: top;
      transition: 0.3s;

      &.open {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
      }
    }
  }
  &__content {
    position: relative;
    // background-color: $black;
    padding: 10px;

    .chips {
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
    }
  }
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