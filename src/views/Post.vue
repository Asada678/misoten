<template>
  <div class="post">
    <div class="target-card">
      <!-- <div class="username">
        {{ $store.getters.user.username }}
      </div> -->
      <div class="content">
        <div
          v-if="target"
          class="item input-weight"
          @click="openinputWeightDialog"
        >
          <p class="label">現在</p>
          <p class="value kg">{{ user.latestWeight }}</p>
          <i class="fas fa-hand-point-up absolute"></i>
          <!-- <div class="input-latest-weight">
            <div class="input-latest-weight-inner">
              <m-form class="bg-white"></m-form>
              <m-button class="w-100">設定</m-button>
            </div>
          </div> -->
        </div>
        <div v-if="target" class="item">
          <p class="label">目標</p>
          <p class="value kg">{{ target.targetWeight }}</p>
        </div>
        <div v-if="target" class="item">
          <p class="label">カテゴリー</p>
          <p class="category">{{ target.purposeLabel }}</p>
        </div>
        <router-link class="item row set-target" :to="{ name: 'SetTarget' }">
          <p class="value">目標<br />設定</p>
          <i class="fas fa-angle-right"></i>
        </router-link>
      </div>
    </div>
    <!-- <div class="grid grid-cols-8"> -->
    <div class="col-span-7 grid grid-cols-2 md:grid-cols-4 text-center">
      <m-chip class="small active" border>ALL</m-chip>
      <m-chip class="small" border @click="onTagClick('トレーニング')"
        >トレーニング</m-chip
      >
      <m-chip class="small" border @click="onTagClick('ダイエット')"
        >ダイエット</m-chip
      >
      <m-chip class="small" border @click="onTagClick('雑談')">雑談</m-chip>
    </div>
    <!-- <div class="col-span-1 flex justify-center items-center">
        <i class="fas fa-cog text-3xl"></i>
      </div> -->
    <!-- </div> -->
    <transition-group tag="div" name="post-content">
      <PostContent
        v-for="post in posts"
        :data-snapshot-index="post.snapshotIndex"
        :key="post.id"
        :post="post"
        @edit="editPost"
        @remove="removePost"
        @onTagClick="onTagClick"
      />
    </transition-group>
    <div id="scroll-observer"></div>

    <div class="search-result-container">
      <aside @click="closeSearchResultContainer">
        <i class="fas fa-chevron-right"></i>
      </aside>
      <main class="w-full">
        <div class="search-word sticky w-full top-0 left-0 py-1">
          <p class="text-center font-bold">
            {{ searchTag }}
          </p>
        </div>
        <transition name="searching" mode="out-in">
          <div
            v-if="searching"
            class="searching flex flex-col justify-center items-center py-20"
          >
            <i class="fas fa-search text-7xl"></i>
            <div class="py-8 font-black dots">
              <span class="mx-2"></span>
              <span class="mx-2"></span>
              <span class="mx-2"></span>
            </div>
          </div>
          <div
            v-else-if="postsByTag.length"
            key="hits"
            class="p-3 overflow-y-auto"
          >
            <PostContent
              v-for="post in postsByTag"
              :key="post.id"
              :post="post"
              @edit="editPost"
              @remove="removePost"
              @onTagClick="onTagClick"
            />
          </div>
          <div v-else key="search-error">error</div>
        </transition>
      </main>
    </div>

    <InputWeightDialog :dialog="inputWeightDialog" @close="inputWeightDialog = false" />

    <!-- <m-dialog
      :dialog="inputWeightDialog"
      :disabled="$v.$invalid"
      :loading="loading"
      header-text="体重記録"
      button-text="記録"
      @action="addWeight"
      @close="inputWeightDialog = false"
    >
      <m-form-group>
        <p class="pb-2 font-bold text-sm leading-relaxed">
          現在の体重を記録しましょう。<br />
          ２～４桁の数値を入力してください。
        </p>
        <div class="w-60 m-auto pb-4 flex justify-center font-bld text-xs">
          <p>例）</p>
          <ul class="text-center">
            <li class="grid grid-cols-3">
              <span>「62」</span>
              <span>→</span>
              <span>62.0kg</span>
            </li>
            <li class="grid grid-cols-3">
              <span>「785」</span>
              <span>→</span>
              <span>78.5kg</span>
            </li>
            <li class="grid grid-cols-3">
              <span>「1014」</span>
              <span>→</span>
              <span>101.4kg</span>
            </li>
          </ul>
        </div>
        <m-form
          v-model="inputWeight"
          type="number"
          label="現在体重"
          :class="{ error: $v.inputWeight.$error }"
          numeric
          ref="form"
          @blur="$v.inputWeight.$touch()"
        ></m-form>
        <m-error-message v-if="$v.inputWeight.$error">
          <span v-if="!$v.inputWeight.minLength">
            入力値は{{
              $v.inputWeight.$params.minLength.min
            }}桁以上の数値でなければいけません。
          </span>
          <span v-if="!$v.inputWeight.maxLength">
            入力値は{{
              $v.inputWeight.$params.maxLength.max
            }}桁以下の数値でなければいけません。
          </span>
          <span v-if="!$v.inputWeight.required">必須項目です。</span>
          <span v-if="!$v.inputWeight.integer">数字のみ入力してください。</span>
        </m-error-message>
      </m-form-group>

      <p class="latest-weight h-20 py-4 text-5xl">{{ latestWeight }}</p>
    </m-dialog> -->

    <!-- <float-button icon="pen" right="20" @click="openDialog" /> -->
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import PostContent from "@/components/post/PostContent";
import InputWeightDialog from "@/components/post/InputWeightDialog";
import bf from "@/libs/bodyfixer";
import dayjs from "dayjs";
// import {
//   required,
//   maxLength,
//   minLength,
//   integer,
// } from "vuelidate/lib/validators";

export default {
  components: {
    PostContent,
    InputWeightDialog,
  },
  props: {},
  data() {
    return {
      posts: [],
      lastPost: null,
      inputWeight: null,
      inputWeightDialog: false,
      loading: false,
      searching: true,
      searchTag: null,
      postsByTag: [],
    };
  },

  computed: {
    user() {
      return this.$store.getters.user ? this.$store.getters.user : null;
    },
    target() {
      return this.$store.getters.user.target
        ? this.$store.getters.user.target
        : null;
    },
    // latestWeight() {
    //   if (this.inputWeight === null) return;
    //   let num;
    //   if (0 < this.inputWeight && this.inputWeight < 100) {
    //     num = `${this.inputWeight.toString()}.0`;
    //   } else if (this.inputWeight < 1000) {
    //     num = this.inputWeight / 10;
    //     if (num.toString().length === 2) {
    //       num = `${num}.0`;
    //     }
    //   } else {
    //     num = this.inputWeight / 10;
    //     if (num.toString().length === 3) {
    //       num = `${num}.0`;
    //     }
    //   }
    //   return num;
    // },
  },
  methods: {
    openinputWeightDialog() {
      this.inputWeightDialog = true;
    },
    // 体重の記録
    async addWeight() {
      // console.log("this.latestWeight:", this.latestWeight);
      this.$v.$touch();
      if (this.$v.$invalid) {
        const snackbar = {
          text: "入力値が無効です。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      this.loading = true;
      const data = {
        weight: Number(this.latestWeight),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        createdAt: new Date(),
      };
      // console.log("data:", data);
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("weight-records")
        .doc(`${data.year}-${data.month}-${data.date}`)
        .set(data, { merge: true });

      const updatedData = { latestWeight: Number(this.latestWeight) };
      await db.collection("users").doc(this.user.uid).update(updatedData);

      this.inputWeight = null;
      this.$v.$reset();
      this.inputWeightDialog = false;
      this.loading = false;

      const snackbar = {
        text: "体重を記録しました。",
        color: "green",
      };
      this.$store.commit("setSnackbar", snackbar);
      this.$store.commit("updateUser", updatedData);
    },
    // 初回読み込み
    firstFetchPosts() {
      // console.log("first fetch:");
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then(this.onGetSnapshot);
    },
    // スクロール時読み込み
    fetchNextPosts() {
      // console.log("next fetch:");
      // console.log('this.lastPost:', this.lastPost);
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
    onGetSnapshot(snapshot, newPost = false) {
      // console.log('snapshot.docs:', snapshot.docs);
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
      // console.log("this.posts:", this.posts);
    },
    // 新しい読み込みのリスナ
    listenNewPost() {
      db.collection("posts")
        .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          this.onGetSnapshot(snapshot, true);
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

          const updatedData = {
            postCounts: this.$store.getters.user.postCounts - 1,
          };
          this.$store.commit("updateUser", updatedData);
        });
    },
    // タグのクリック
    async onTagClick(tag) {
      // console.log("tag:", tag);
      this.searchTag = tag;
      this.postsByTag = [];
      const searchResultContainer = this.$el.querySelector(
        ".search-result-container"
      );
      searchResultContainer.classList.add("open");
      // console.log('window.innerWidth:', window.innerWidth);
      if (window.innerWidth < 768) {
        bf(searchResultContainer.classList.contains("open"));
      }
      await this.searchByTag(tag);
    },
    async searchByTag(tag) {
      this.searching = true;
      await db
        .collection("posts")
        .where("deleteFlg", "==", false)
        .where("postTags", "array-contains", tag)
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // console.log("change:", change);
            if (change.type === "added") {
              const post = {
                ...change.doc.data(),
                id: change.doc.id,
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

              this.postsByTag = [...this.postsByTag, post];
              // console.log('post:', post);
            }
          });
        });

      setTimeout(() => {
        this.searching = false;
      }, 500);
    },
    closeSearchResultContainer() {
      const searchResultContainer = this.$el.querySelector(
        ".search-result-container"
      );
      searchResultContainer.classList.remove("open");
      if (window.innerWidth < 768) {
        bf(searchResultContainer.classList.contains("open"));
      }
      this.searching = true;
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
    // createScrollObserver () {
    //   const newEl = document.createElement('div');
    //   newEl.id = 'scroll-observer';
    //   this.$el.appendChild(newEl);
    // }
  },
  created() {
    // console.log("created this.posts:", this.posts);
    this.firstFetchPosts();
    this.listenNewPost();
  },
  mounted() {
    // this.createScrollObserver();
    this.initScrollObserver();
  },
  // watch: {
  //   inputWeight() {
  //     if (this.inputWeight >= 10000) {
  //       this.inputWeight = this.inputWeight.toString().substring(0, 4);
  //       const el = this.$refs.form.$el.querySelector("input");
  //       el.value = this.inputWeight;
  //     }
  //   },
  //   inputWeightDialog() {
  //     if (!this.inputWeightDialog) {
  //       this.$v.$reset();
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.post {
  padding-bottom: 60vh;
  // background-color: rgba($black, .8);
  // background-color: rgba(royalblue, .8);

  .target-card {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 5px 10px;
    background-color: rgba($white, 0.15);
    border-radius: 10px;
    // color: $white;
    @extend .bs-b-8;

    .username {
      padding: 0px 10px;
      font-size: 20px;
      font-weight: 700;
    }

    .content {
      display: grid;
      grid-template-columns: 3fr 3fr 4fr 3fr;
      text-align: center;

      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.3s;

        &.input-weight,
        &.set-target {
          cursor: pointer;
          &:hover {
            background-color: rgba($grey, 0.5);
          }
        }

        &.row {
          flex-direction: row;
        }
        .label {
          font-size: 10px;
        }
        .value {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          line-height: 24px;

          &.kg::after {
            content: "kg";
            font-size: 12px;
          }
        }
        .category {
          font-weight: 700;
        }
        i {
          margin-left: 5px;
          font-size: 40px;

          &.fa-hand-point-up {
            position: absolute;
            top: 0;
            left: calc(50% - 30px);
            transform: translateX(-50%) rotate(135deg);
            font-size: 20px;
            color: $orange;
          }
          // color: $white;
        }
        // .input-latest-weight {
        //   position: absolute;
        //   z-index: 1;
        //   top: calc(100% + 30%);
        //   left: 0;
        //   width: 100%;
        //   // width: 90vw;

        //   &::before {
        //     content: "";
        //     z-index: 1;
        //     position: absolute;
        //     top: -30px;
        //     left: 10px;
        //     left: 50%;
        //     width: 30px;
        //     height: 30px;
        //     margin-left: -15px;
        //     border: 15px solid transparent;
        //     border-bottom: 15px solid rgba($grey, 0.95);
        //   }

        //   &-inner {
        //     position: relative;
        //     width: 90vw;
        //     padding: 10px;
        //     border-radius: 10px;
        //     background-color: rgba($grey, 0.95);
        //     @extend .bs-b-8;
        //   }
        // }
      }
    }
  }

  .categories {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
  }


}
.black {
  .search-result-container {
    background-color: rgba($black, 0.9);
  }
}
.search-result-container {
  position: fixed;
  z-index: 1600;
  top: 0;
  right: 0;
  transform: translateX(100%);
  display: flex;
  width: 100%;
  max-width: 550px;
  height: 100vh;
  background-color: rgba($grey, 0.9);
  backdrop-filter: blur(2px);
  transition: 0.4s;

  &.open {
    transform: none;
    transition: 0.2s;
    box-shadow: -3px 0 3px rgba($black, 0.2), -5px 0 5px rgba($black, 0.2);

    main {
      opacity: 1;
    }
  }

  aside {
    position: relative;
    display: flex;
    align-items: center;
    // width: 60px;
    padding: 5px;
    font-size: 40px;
    // background-color: rgba($black, 0.8);
    box-shadow: 3px 0 3px rgba($black, 0.2);
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      filter: brightness(10%);
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($black, 0.2);
    }

    i {
      // color: rgba($white, 0.8);
    }
  }

  main {
    // padding: 10px;
    opacity: 0;
    overflow-y: auto;
    transition: 0.2s;

    .search-word {
      z-index: 2000;
      background-color: rgba($orange, 0.9);
      letter-spacing: 2px;
      @extend .bs-b-8;
    }
  }
}
.searching {
  i {
    color: $orange;
  }
  .dots {
    span {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: $orange;
      animation-name: loading;
      animation-duration: 1.4s;
      animation-timing-function: ease-in;
      animation-iteration-count: infinite;
      // animation: pop 1.5s ease-in infinite;

      &:nth-child(1) {
        animation-delay: 0.15s;
      }
      &:nth-child(2) {
        animation-delay: 0.3s;
      }
      &:nth-child(3) {
        animation-delay: 0.45s;
      }
    }
  }
}
@keyframes loading {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    // transform: translateY(-5px);
    transform: scale(0);
    opacity: 0;
  }
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
.searching-enter-active,
.searching-leave-active {
  transition: all 0.3s;
}
.searching-enter,
.searching-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .post {
  }
  .search-result-container {
    top: $userMenuHeight;
  }
}

@media (min-width: 1200px) {
}
</style>