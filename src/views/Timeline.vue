<template>
  <div>
    <TimelineContent v-for="i in 10" :key="i"/>
  </div>
</template>

<script>
import TimelineContent from '@/components/timeline/TimelineContent'
export default {
  components: {
    TimelineContent
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