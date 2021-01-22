<template>
  <div class="search-container" :class="{ active }">
    <m-form-group class="search-form">
      <i class="fas fa-chevron-up close" @click="$emit('close')"></i>
      <div class="flex items-center">
        <m-form v-model="searchWord" label="searchWord"></m-form>
        <m-button :disabled="disabled" class="t-black" @click="search"
          >検索</m-button
        >
      </div>
    </m-form-group>
    <div class="search-content">
      <div v-if="users.length" class="users">
        <h2 class="text-center font-black">ユーザー</h2>
        <ul class="users__ul">
          <li v-for="user in users" :key="user.id" class="users__li mx-2">
            <div>
              <img :src="user.userIcon" alt="" />
            </div>
            <div>
              {{ user.username }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bf from "@/libs/bodyfixer";
import { db } from "@/firebase/firebase";
import algolia from "@/algolia/algolia";
export default {
  components: {},
  props: {
    active: Boolean,
  },
  data() {
    return {
      searchWord: null,
      // usersResult: [],
      // postsResult: [],
      users: [],
    };
  },
  computed: {
    disabled() {
      if (this.searchWord) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    search() {
      this.users = [];
      algolia.search(this.searchWord).then((result) => {
        console.log("result.hits:", result.hits);
        result.hits.forEach((hit) => {
          if (hit.type === "user") {
            // this.usersResult = [...this.usersResult, hit];
            this.fetchUserInfo(hit);
          }
          if (hit.type === "post") {
            // this.postsResult = [...this.postsResult, hit];
          }
        });
      });
    },
    fetchUserInfo(hit) {
      console.log("hit:", hit);
      db.collection("users")
        .doc(hit.documentId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = { ...doc.data(), id: doc.id };
            console.log("user:", user);
            if(!this.users.find(u => u.id === user.id)){
              this.users = [...this.users, user];
            }
          }
        });
    },
    closeSearchContainer() {
      this.$el.classList.remove("active");
    },
  },
  mounted() {},
  watch: {
    active() {
      bf(this.active);
      if (this.active) {
        // console.log("focus :");
        setTimeout(() => {
          const form = this.$el.querySelector("input");
          form.focus();
        }, 200);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  position: fixed;
  z-index: 1500;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 100%;
  min-height: 100vh;
  padding: 20px 0;
  background-color: rgba($white, 0.8);
  transform: scaleY(0);
  // transform: translateY(-100%);
  transform-origin: top;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  color: $black;
  transition: all 0.5s;
  backdrop-filter: blur(2px);

  .search-form {
    padding: 0px 10px 0px 50px;
    margin: 0;
    i.close {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      font-size: 28px;
      color: rgba($black, 0.8);
    }
    .m-form input[type="text"] {
      color: $black;
    }
    button {
      color: $black;
    }
  }

  &.active {
    transform: scaleY(1);
    // transform: translateY(0);
    opacity: 1;
    visibility: visible;
    transition: all 0.5s;
  }

  &::before,
  &::after {
    content: "";
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
  }
  &::before {
    background-color: rgba($white, 0.6);
  }
  &::after {
    background: linear-gradient(
      100deg,
      rgba(219, 90, 58, 0.8) 34%,
      rgba(58, 210, 219, 0.8) 69%
    );
  }

  .search-content {
    position: relative;
    height: 100%;
    padding: 10px 10px 60vh;
    overflow: auto;

    .users {
      h2 {
        font-size: 18px;
      }
      &__ul {
        scroll-snap-type: x mandatory;
        white-space: nowrap;
        overflow: auto;

        padding: 30px 5px;
        background-color: rgba($black, 0.3);
        border-radius: 4px;
      }
      &__li {
        scroll-snap-align: center;
        display: inline-block;
        width: 20%;
        white-space: normal;

        padding: 5px 10px;
        border-radius: 4px;
        background-color: rgba($white, 0.9);
        text-align: center;
        @extend .bs-b-4;
      }
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