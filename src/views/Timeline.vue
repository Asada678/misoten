<template>
  <div>
    <TimelineContent v-for="i in 10" :key="i"/>
    <float-button icon="pen" right="20" @click="openDialog" />
    <normal-dialog>
      <text-form v-model="username" label="名前"/>
      <button @click="clickbtn">aaaaa</button>
    </normal-dialog>
  </div>
</template>

<script>
import TimelineContent from '@/components/timeline/TimelineContent'

export default {
  components: {
    TimelineContent,
  },
  props: {},
  data() {
    return {
      username: null
    };
  },
  computed: {},
  methods: {
    openDialog() {
      const dialogContainer = document.querySelector('.dialog-container');
      dialogContainer.classList.add('dialog-open');
    },
    clickbtn() {
      console.log('this.username:', this.username);
    }
  },
};
</script>

<style lang="scss" scoped>


@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {

}

@media (min-width: 1200px) {
}

</style>