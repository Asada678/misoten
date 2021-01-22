<template>
  <!-- <div class="user-menu-container"> -->
  <nav class="user-menu">
    <div class="user-menu-inner">
      <div class="head">
        <i class="fas fa-search" @click="toggleSeachContainer"></i>
        <!-- <m-form class="w-50 bg-white" icon="search"></m-form> -->
        <!-- <i v-if="backBtn" class="fas fa-chevron-left" @click="back"></i> -->
        <img class="logo" src="/img/logo.png" alt="logo" />
        <router-link v-if="userIcon" :to="{ name: 'MyProfile' }">
          <img class="user-icon" :src="userIcon" alt="" />
        </router-link>
        <router-link v-else :to="{ name: 'Login' }" exact>
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </div>
      <div class="user-icons">
        <router-link
          v-for="user in users"
          :key="user.id"
          :to="userIconLink(user.uid)"
        >
          <img :src="user.userIcon" alt="" class="user-icon" />
        </router-link>
      </div>
    </div>
  </nav>
  <!-- <div class="list-container">
      <div class="list-container-inner">
        <ul class="user-menu-list">
          <li v-for="link in commonLinks" :key="link.to">
            <router-link :to="`/user${link.to}`" exact>
              <i :class="`fas fa-${link.icon}`"></i>
              <span>{{ link.text }}</span>
            </router-link>
          </li>
          <li v-if="user.username" @click="dialog = true">
            <i class="fas fa-sign-out-alt"></i>
            <span>ログアウト</span>
          </li>
          <li v-if="!user.username">
            <router-link to="/login" exact>
              <i class="fas fa-sign-in-alt"></i>
              <span>ログイン</span>
            </router-link>
          </li>
          <li v-if="!user.username">
            <router-link to="/signup" exact>
              <i class="fas fa-user-plus"></i>
              <span>ユーザ登録</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <m-dialog
      :color="user.username ? 'red' : 'blue'"
      :dialog="dialog"
      :header-text="user.username ? 'ログアウト' : 'ログイン'"
      @close="dialog = false"
      @action="logout"
    >
      <p v-if="user.username">ログアウトしますか？</p>
      <div v-else>
        <Login />
      </div>
    </m-dialog> -->
  <!-- </div> -->
</template>

<script>
import firebase from "firebase";
// import Login from "@/views/auth/Login";
import so from "@/libs/scroll";
import { db } from "@/firebase/firebase";
export default {
  components: {
    // Login,
  },
  props: {},
  data() {
    return {
      dialog: false,
      height: 40,
      offset: 0,
      lastPosition: 0,
      ticking: false,
      users: [],
      commonLinks: [
        { text: "プロフィール", icon: "id-card", to: "/profile" },
        { text: "アイコン設定", icon: "portrait", to: "/set-icon" },
        { text: "目標設定", icon: "signal", to: "/set-target" },
        { text: "AIコーチ", icon: "user-graduate", to: "/coach" },
        { text: "称号", icon: "trophy", to: "/title" },
        { text: "カラー", icon: "palette", to: "/color" },
        // { text: "設定", icon: "cog", to: "/config" },
        // { text: "言語", icon: "globe", to: "/language" },
      ],
      authLinks: [
        { text: "ログアウト", icon: "sign-out-alt", to: "/language" },
      ],
      noauthLinks: [
        { text: "ログイン", icon: "sign-in-alt", to: "/login" },
        { text: "ユーザ登録", icon: "user-plus", to: "/signup" },
      ],
      // backBtn: false,
    };
  },
  computed: {
    backBtn() {
      return this.$route.path.includes("/user");
    },
    user() {
      return this.$store.getters.user;
    },
    userIcon() {
      if (this.user.username) {
        return this.user.userIcon ? this.user.userIcon : "/img/kuma.png";
      } else {
        return false;
      }
    },
  },
  methods: {
    userIconLink(userId) {
      return userId === this.$store.getters.user.uid
        ? { name: "MyProfile" }
        : { name: "FriendProfile", params: { id: userId } };
    },
    back() {
      // while(this.$route.path.includes('/user')) {
      //   this.$router.go(-1);
      // }
    },
    toggleMenu() {
      const userMenuList = document.querySelector(".user-menu-list");
      userMenuList.classList.toggle("user-menu-open");
    },
    toggleSeachContainer() {
      // const searchContainer = document.querySelector(".search-container");
      // searchContainer.classList.toggle("active");
      this.$emit("toggle");
    },
    logout() {
      console.log("this.user.username:", this.user.username);
      if (this.user.username) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push({ name: "Login" });
          });
        // logout 処理
      } else {
        // login 処理
      }
    },
    userMenuAnimation(el, value) {
      // console.log("el, value:", el, value);
      // const userMenu = this.$el.querySelector(".user-menu");
      if (value) {
        this.$el.classList.remove("active");
        this.$el.classList.remove("stretch");
      } else {
        this.$el.classList.add("active");
      }
    },
    onScroll(el) {
      // console.log('this.lastPosition:', this.lastPosition);
      // console.log('this.offset:', this.offset);
      if (this.lastPosition > this.height) {
        if (this.lastPosition >= this.offset) {
          el.classList.remove("stretch");
        } else {
          // if(!document.querySelector('body').classList.contains('fixed')) return;
          el.classList.add("stretch");
        }
        this.offset = this.lastPosition;
      }
    },
    fetchUsers() {
      db.collection("users")
        // .where("deleteFlg", "==", false)
        .orderBy("createdAt", "desc")
        // .limit(10)
        // .startAfter(this.lastPost)
        .get()
        .then((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const user = {
                ...change.doc.data(),
                uid: change.doc.id,
              };

              this.users = [user, ...this.users];
            }
          });
        });
    },
  },
  created() {
    this.fetchUsers();
  },
  mounted() {
    new so("#observer", this.userMenuAnimation, { once: false });

    window.addEventListener("scroll", () => {
      this.lastPosition = window.scrollY;
      // console.log('this.lastPosition:', this.lastPosition);
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.onScroll(this.$el);
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.user-menu {
  // stickyだとstretchが上手く効かない。
  position: fixed;
  z-index: 1200;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: $appMaxWidth;
  height: $userMenuHeight;
  backdrop-filter: blur(1px);
  transition: 0.5s;

  &.active {
    .user-menu-inner {
      @extend .bs-b-4;
    }
    &.stretch {
      .user-menu-inner {
        height: $userMenuHeight * 2 + 30px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        // height: 80px;
      }

      .user-icons {
        transform: none;
        opacity: 1;
        visibility: visible;
        transition: 0.5s;
      }
    }
  }

  &-inner {
    position: relative;
    width: 100%;
    max-width: $appMaxWidth;
    height: $userMenuHeight;
    background-color: rgba($white, 0.9);
    transition: 0.5s;

    i {
      // color: rgba($white, 0.9);
      font-size: 24px;
    }

    a {
      display: flex;
    }

    .head {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      height: $userMenuHeight;
      padding: 0 10px;
    }
  }
  .user-icons {
    position: absolute;
    z-index: 5;
    top: $userMenuHeight;
    left: 5%;
    transform: translateY(-100%);
    transform-origin: left;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 90%;
    height: $userMenuHeight + 30px;
    opacity: 0;
    visibility: hidden;
    // background-color: red;
    overflow-x: auto;
    transition: 0s;

    .user-icon {
      // width: 100px;
      margin: 0 20px;
    }
  }
  .logo,
  .user-icon {
    width: $userMenuHeight * 0.9;
    height: $userMenuHeight * 0.9;
    border-radius: 50%;
    cursor: pointer;
  }
}

.blue {
  .user-menu-inner {
    color: $white;
    background-color: rgba($blue, 0.9);
  }
}
.pink {
  .user-menu-inner {
    color: $white;
    background-color: rgba($pink, 0.9);
  }
}
.green {
  .user-menu-inner {
    color: $white;
    background-color: rgba($green, 0.9);
  }
}
.orange {
  .user-menu-inner {
    color: $white;
    background-color: rgba($orange, 0.9);
  }
}
.white {
  .user-menu-inner {
    // background-color: rgba($white, .9);
  }
}
.black {
  .user-menu-inner {
    color: $white;
    background-color: rgba($black, 0.9);
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .user-menu-inner {
    position: absolute;
    left: 250px;
    width: calc(100% - 250px);
    // left: 0;
    // box-shadow: 0 1px 1px rgba($black, 0.1), 0 2px 2px rgba($black, 0.1),
    //   0 4px 4px rgba($black, 0.1), 0 0px 4px rgba($black, 0.1);
  }
  // .list-container-inner {
  //   right: 210px;
  // }
}

@media (min-width: 1200px) {
  .user-menu {
    &-inner {
      .user-icon {
        right: 0%;
      }
    }
  }
}
</style>