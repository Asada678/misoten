<template>
  <div>
    <m-dialog header-text="今日の頑張り" button-text="投稿" @action="postTodayWorkout">
      <text-form v-model="username" label="名前"/>
      <m-textarea v-model="workout" label="内容"/>
      <i class="fas fa-image"></i>
    </m-dialog>
    <PostContent v-for="i in 10" :key="i"/>
    <float-button icon="pen" right="20" @click="openDialog" />
    <Options />
  </div>
</template>

<script>
import PostContent from '@/components/post/PostContent'
import Options from '@/components/post/Options'

export default {
  components: {
    PostContent,
    Options
  },
  props: {},
  data() {
    return {
      username: null,
      workout: null,
    };
  },
  computed: {},
  methods: {
    openDialog() {
      const dialogContainer = document.querySelector('.dialog-container');
      dialogContainer.classList.add('dialog-open');
    },
    postTodayWorkout() {
      console.log('this.username:', this.username);
    }
  },
  created() {
    },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>


@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {

}

@media (min-width: 1200px) {
}

</style>