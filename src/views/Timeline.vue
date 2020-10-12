<template>
  <div>
    <TimelineContent v-for="i in 10" :key="i"/>
    <FloatAddBtn />
    <AddDialog />
  </div>
</template>

<script>
import TimelineContent from '@/components/timeline/TimelineContent'
import FloatAddBtn from "@/components/timeline/FloatAddBtn";
import AddDialog from "@/components/timeline/AddDialog";
export default {
  components: {
    TimelineContent,
    FloatAddBtn,
    AddDialog
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
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