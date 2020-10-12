<template>
  <div class="dialog-container">
    <div class="dialog">
      <div class="dialog__header">
        <i class="fas fa-times" @click="closeDialog"></i>
      </div>
      <div class="dialog__content">
        <div v-for="i in 100" :key="i">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div class="dialog__footer">
        <button @click="submit">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeDialog() {
      const app = document.querySelector("#app");
      app.classList.remove("dialog-open");
    },
    submit() {
      console.log('db:', db);
      db.collection('test').add({
        text: 'sample text'
      }).catch(err => {
        console.log('err:', err);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog-open {
  .dialog-container {
    z-index: 1100;
    background-color: rgba(20, 20, 20, 0.4);
    opacity: 1;
    visibility: visible;
  }

  .dialog {
    // transform: translateY(0);
  transform: translate( -50%, -50%);
  }
}
.dialog-container {
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s;
  // background-color: rgba(20, 20, 20, 0);
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  width: 80%;
  height: 400px;
  margin: auto;
  background-color: rgba($color: #eee, $alpha: 1);
  transform: translate( -50%, -80%);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;

  &__header {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: rgba($color: orange, $alpha: .9);

    i {
      font-size: 24px;
    }
  }
  
  &__content {
    height: 280px;
    padding: 20px 0;
    overflow-y: auto;
    text-align: center;
  }

  &__footer {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: rgba($color: orange, $alpha: .2);

    button {
      width: 40px;
      height: 24px;
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
}

@media (min-width: 1200px) {
}
</style>