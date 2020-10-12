<template>
  <div id="app">
    <UserMenu />
    <MainMenu />
    <div id="global-container">
      <div id="container">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/common/UserMenu";
import MainMenu from "@/components/common/MainMenu";
export default {
  components: {
    UserMenu,
    MainMenu,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

#global-container {
  /* position: relative;
  z-index: auto; */
}
#container {
  position: relative;
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 100px 0;
}

.user-page {
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 100px 30px;
  background-color: #eee;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
  #container {
    position: absolute;
    right: 0;
    width: calc(100% - 300px);
    padding: 100px 30px;
  }
  .user-page {
    position: absolute;
    right: 0;
  }
}

@media (min-width: 1200px) {
}
</style>
