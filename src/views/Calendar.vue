<template>
  <div>
    <p>This is a Calendar page!</p>
    <m-select
      :value="year"
      class="w-4"
      label="既存タグ"
      name="tag"
      no-selected
      :options="groupTags"
      @input="onInput"
    >
    </m-select>
  </div>
</template>

<script>
// import { db, storage } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      url: null,
      year: null,
      groupTags: [
        { value: "aaaa", text: "aaaa" },
        { value: "aa2", text: "aa2" },
        { value: "aa3a", text: "aa3a" },
        { value: "aa2222aa", text: "aa2222aa" },
      ],
    };
  },
  computed: {},
  methods: {
    onInput(event) {
      console.log('event:', event);
    },
    fetchUsers() {
    },
  },
  created() {
    // this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>