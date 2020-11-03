<template>
  <div class="post-content">
    <div class="user-icon">
      <img src="/img/kuma.png" alt="" />
    </div>
    <div class="content-wrapper">
      <div class="username">
        <p>{{ post.username }}</p>
      </div>
      <div class="content">
        <p>トレーニング日：{{ post.trainingDate }}</p>
        <p>
          {{ post.workout }}
        </p>
        <img v-if="post.url" :src="`${post.url}`" alt="image" />
        <p>投稿日：{{ post.formattedCreatedAt }}</p>
      </div>
      <div class="actions">
        <i class="fas fa-reply"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-ellipsis-h" @click="openOption">
          <Options
            @edit="editContent(post.id)"
            @remove="removeContent(post.id)"
          />
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import Options from "@/components/post/Options";
export default {
  components: { Options },
  props: {
    post: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    openOption(event) {
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
    editContent(postId) {
      // console.log("edit postId:", postId);
      this.$emit("edit", postId);
    },
    removeContent(postId) {
      // console.log("remove: postId", postId);
      this.$emit("remove", postId);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  display: flex;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba($orange, 0.2);
  @extend .box-shadow-2;

  .user-icon {
    display: flex;
    justify-content: center;
    // align-items: center;
    margin-right: 10px;
    font-size: 35px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .content-wrapper {
    width: 100%;
  }
  .username {
    border-bottom: 1px solid $orange;
    p {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .content {
    padding: 5px;
    border-bottom: 1px solid $orange;
    // flex-basis: 80%;

    img {
      width: 100%;
      max-height: 180px;
      object-fit: contain;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 10px;

    i {
      position: relative;
      color: grey;
      transition: 0.3s;

      &:hover {
        color: black;
      }
    }
  }
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