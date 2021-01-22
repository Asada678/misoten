<template>
  <div class="post-content">
    <div v-if="!myProfile" class="post-content__header">
      <div class="user-icon">
        <router-link :to="userIconLink">
          <img :src="userIcon" alt="" />
        </router-link>
      </div>
      <div class="right">
        <div class="username">
          <p>{{ username }}</p>
        </div>
        <div class="tag">
          <m-chip
            v-for="(tag, index) in post.postTags"
            :key="index"
            border
            @click="$emit('onTagClick', tag)"
            >{{ tag }}</m-chip
          >
        </div>
      </div>
    </div>
    <div class="post-content__main">
      <!-- <p>トレーニング日：{{ post.trainingDate }}</p> -->
      <p class="date">
        {{ post.formattedCreatedAt }}
      </p>
      <p class="workout">
        {{ post.workout }}
      </p>
      <div v-if="post.fileUrl" class="content-img">
        <img :src="`${post.fileUrl}`" alt="image" />
      </div>
      <details v-if="post.menus && post.menus.length" class="training-details">
        <summary>メニュー</summary>
        <div class="pl-5 pr-2">
          <div
            v-for="menu in post.menus"
            :key="menu.timestamp"
            class="pt-2 pb-1 px-1 border-b"
          >
            <h3 class="text-sm font-bold">{{ menu.menuName }}</h3>
            <p
              v-if="menu.menuType === 'weight'"
              class="pl-3 text-xs tracking-widest"
            >
              <span>{{ menu.weight }}</span>
              <span class="unit">kg</span>
              <span class="mx-1">x</span>
              <span>{{ menu.reps }}</span>
              <span class="unit">回</span>
              <span class="mx-1">x</span>
              <span>{{ menu.weightSets }}</span>
              <span class="unit">セット</span>
            </p>
            <p
              v-if="menu.menuType === 'duration'"
              class="pl-3 text-xs tracking-widest"
            >
              <span>{{ menu.duration }}</span>
              <span class="unit">分</span>
              <span class="mx-1">x</span>
              <span>{{ menu.durationSets }}</span>
              <span class="unit">セット</span>
            </p>
          </div>
        </div>
      </details>
      <!-- <p>投稿日：{{ post.formattedCreatedAt }}</p> -->
    </div>
    <div v-if="!myProfile" class="post-content__footer">
      <i class="fas fa-reply" @click="openReplyForm">
        <ReplyForm @edit="editContent(post.id)" @remove="removeContent(post)" />
      </i>
      <i class="far fa-heart"></i>
      <i class="far fa-edit" @click="openOptions">
        <Options @edit="editContent(post.id)" @remove="removeContent(post)" />
      </i>
    </div>
  </div>
</template>

<script>
import Options from "@/components/post/Options";
import ReplyForm from "@/components/post/ReplyForm";
import bf from "@/libs/bodyfixer";
export default {
  components: { Options, ReplyForm },
  props: {
    post: Object,
    myProfile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userIcon: "/img/kuma.png",
      username: "ゲスト",
      contentImg: null,
      isGuest: true,
    };
  },
  computed: {
    userIconLink() {
      if (this.isGuest) {
        return {};
      } else {
        return this.$store.getters.user.uid === this.post.fromUserId
          ? { name: "MyProfile" }
          : { name: "FriendProfile", params: { id: this.post.fromUserId } };
      }
    },
  },
  methods: {
    openOptions(event) {
      const options = event.target.querySelector(".options");
      if (!options) return;
      options.classList.remove("open");
      setTimeout(() => {
        options.classList.add("open");
        // (post-contentを基準に見たタッチされた相対位置 - アイコン内の相対位置 - オプションのwidth + アイコンのwidth)px
        // options.style.left = `${event.layerX - event.offsetX - 120 + 16}px`;
        // (post-contentを基準に見たタッチされた相対位置 - アイコン内の相対位置 - オプションのheight + アイコンのheight/4)px
        // options.style.top = `${event.layerY - event.offsetY - 120 + 4}px`;
      }, 100);
    },
    openReplyForm(event) {
      const replyForm = event.target.querySelector(".reply-form");
      if (!replyForm) return;
      replyForm.classList.remove("open");
      setTimeout(() => {
        replyForm.classList.add("open");
        // (post-contentを基準に見たタッチされた相対位置 - アイコン内の相対位置 - オプションのwidth + アイコンのwidth)px
        // options.style.left = `${event.layerX - event.offsetX - 120 + 16}px`;
        // (post-contentを基準に見たタッチされた相対位置 - アイコン内の相対位置 - オプションのheight + アイコンのheight/4)px
        // options.style.top = `${event.layerY - event.offsetY - 120 + 4}px`;
      }, 100);
    },
    editContent(post) {
      console.log("post content edit post.id:", post.id);
      this.$emit("edit", post);
    },
    removeContent(post) {
      // console.log("remove: post", post);
      this.$emit("remove", post);
    },
    onClick() {
      this.contentImg.classList.toggle("active");
      bf(this.contentImg.classList.contains("active"));
    },
  },
  created() {
    if (this.post.fromUserRef) {
      // 認証済みユーザのとき、ユーザ情報を取得
      this.isGuest = false;
      this.post.fromUserRef.get().then((userRef) => {
        // console.log('userRef.data().username:', userRef.data().username);
        // console.log('userRef.data().userIcon :', userRef.data().userIcon);
        // console.log("userRef.data():", userRef.data());
        if (userRef.data()) {
          // const userIcon = userRef.data().userIcon;
          this.userIcon = userRef.data().userIcon;
          this.username = userRef.data().username;
        }
      });
    }
  },
  mounted() {
    this.contentImg = this.$el.querySelector(".content-img");
    // console.log("contentImg:", contentImg);
    if (this.contentImg) {
      this.contentImg.addEventListener(
        this.$store.getters.eventType,
        this.onClick
      );
    }
  },
  destroyed() {
    if (this.contentImg) {
      this.contentImg.removeEventListener(
        this.$store.getters.eventType,
        this.onClick
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  // display: flex;
  margin: 10px 0;
  padding: 0 10px 8px;
  border-radius: 10px;
  // background-color: rgba($orange, 0.2);
  background-color: rgba($white, 0.15);
  // color: $white;
  @extend .bs-b-8;

  &__header {
    display: flex;
    .user-icon {
      width: 70px;
      margin-right: 10px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: contain;
      }
    }
    .right {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;

      .username {
        position: relative;
        padding-top: 8px;
        // padding-bottom: 10px;
        p {
          font-size: 20px;
          font-weight: 700;
        }
      }
      .tag {
        position: relative;

        .m-chip {
          margin: 2px 5px;
          font-size: 10px;
        }
      }
    }
  }
  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    .date {
      // font-size: 20px;
      font-weight: 900;
      font-style: italic;
    }
    .workout {
      padding: 5px 10px;
      font-size: 14px;
      white-space: pre-line;
    }

    .content-img {
      position: relative;
      transition: 0.3s;

      &.active {
        position: fixed;
        z-index: 1400;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba($black, 0.9);

        img {
          width: auto;
          max-width: 90%;
          // position: absolute;
          // top: 50%;
          // transform: translateY(-50%);
          max-height: 100vh;
          object-fit: contain;
          transition: 0.8s;
        }
      }
      img {
        width: 100%;
        max-height: 180px;
        object-fit: cover;
      }
    }

    .training-details {
      &[open] {
        summary {
          border-bottom: 2px solid $orange;
        }
      }
      summary {
        font-size: 14px;
        font-weight: 700;
        color: $orange;
        outline: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: rgba($orange, 0.1);
        }
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 30px;

    i {
      position: relative;
      transition: 0.3s;

      &:hover {
        color: $black;
      }
    }
  }
}

.unit {
  font-size: 0.5rem;
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .post-content {
    &__main {
      .content-img {
        &.active {
          img {
            max-height: 85%;
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
}
</style>