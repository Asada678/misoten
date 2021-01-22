<template>
  <div class="group">
    <group-card
      v-for="group in belongingGroups"
      :key="group.id"
      :group="group"
    ></group-card>
    <p v-if="!belongingGroups.length">
      参加中のグループはありません。<br />グループを検索してみましょう。
    </p>
  </div>
</template>

<script>
import GroupCard from "@/components/group/GroupCard";
import { db } from "@/firebase/firebase";
import algolia from "@/algolia/algolia";

export default {
  components: {
    GroupCard,
  },
  props: {},
  data() {
    return {
      belongingGroups: [],
      // groupLeaderName: null,
      searchWord: "",
      noSearchableWord: "",
      isSearchable: true,
      searchResult: [],
      tabs: [
        { text: "グループ一覧", target: "list" },
        { text: "検索", target: "search" },
      ],
    };
  },

  computed: {},
  methods: {
    searchGroup() {
      // console.log("this.searchWord:", this.searchWord);
      // console.log("this.searchWord.length:", this.searchWord.length);
      if (!this.searchWord) {
        this.searchResult = [];
        this.noSearchableWord = null;
        return;
      }
      if (this.searchWord.length < 2) {
        this.noSearchableWord = null;
        return;
      }
      console.log("this.noSearchableWord:", this.noSearchableWord);
      if (this.searchWord.includes(this.noSearchableWord)) return;
      algolia.search(this.searchWord).then((result) => {
        console.log("execute search:", this.searchWord);
        console.log("result.hits:", result.hits);
        if (!result.hits.length) {
          this.noSearchableWord = this.searchWord;
        }
        console.log("this.noSearchableWord:", this.noSearchableWord);
        this.searchResult = result.hits;
      });
    },
    fetchBelongingGroups() {
      db.collection("groups")
        .where("userIds", "array-contains", this.$store.getters.user.uid)
        .orderBy("updatedAt", "desc")
        .get()
        .then((snapshot) => {
          // console.log("snapshot:", snapshot);
          snapshot.docChanges().forEach((change) => {
            // console.log("change.doc.data():", change.doc.data());
            // const group = change.doc.data().fromUser;
            if (change.type === "added") {
              const group = {
                ...change.doc.data(),
                id: change.doc.id,
              };
              this.belongingGroups = [...this.belongingGroups, group];
            }
          });
        });
    },
  },
  created() {
    this.fetchBelongingGroups();
    // console.log('algolia:', algolia);
  },
};
</script>

<style lang="scss" scoped>
.group {
}
// .group {
//   position: fixed;
//   top: 100px;
//   left: 0;
//   width: 100%;
//   min-height: calc(100vh - 100px);
//   background-color: rgba($black, 0.9);
//   overflow-y: auto;
// }
// .group {
//   &::before {
//     content: "";
//     background-image: url(/img/gym.jpg);
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.3;
//   }
//   &::after {
//     content: "";
//     background: linear-gradient(
//       90deg,
//       rgba(0, 29, 48, 1) 0%,
//       rgba(74, 84, 102, 1) 33%,
//       rgba(0, 29, 48, 1) 100%
//     );
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     display: block;
//     width: 100%;
//     height: 100vh;
//     opacity: 0.5;
//   }
// }
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .group {
  }
}

@media (min-width: 1200px) {
}
</style>