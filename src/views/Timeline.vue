<template>
  <div>
    <TimelineContent v-for="i in 10" :key="i"/>
    <float-btn icon="pen" right="20" @click="openDialog" />
    <AddDialog />
  </div>
</template>

<script>
import TimelineContent from '@/components/timeline/TimelineContent'
import AddDialog from "@/components/timeline/AddDialog";
export default {
  components: {
    TimelineContent,
    // FloatAddBtn,
    AddDialog
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    openDialog() {
      console.log('open dialog:', );
      const app = document.querySelector("#app");
      app.classList.add("dialog-open");
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