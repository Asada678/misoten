<template>
  <div>
    <p>This is a Calendar page!</p>
    <!-- <form @submit="onSubmit">
      <input type="file" name="" id="" @change="onChange" />
      <input type="text" name="username" placeholder="NAME" />
      <input type="submit" name="" value="submit" />
    </form>
    <img id="preview" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" width="200" height="150">

    <div v-for="user in users" :key="user.name">
      <p>{{ user.name }}</p>
      <img :src="`${user.icon}`" alt="" width="300" height="200">
    </div> -->
    <m-select
      v-model="year"
      search
      :options="options"
      class="w-40"
      label="年"
      name="year"
    >
    </m-select>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        { text: "tom", value: "male", color: "indigo", icon: "male" },
        { text: "bob", value: "male11", color: "indigo", icon: "male" },
        { text: "asada", value: "male22", color: "indigo", icon: "male" },
        { text: "tomoya", value: "male222", color: "indigo", icon: "male" },
        { text: "あああ", value: "male111", color: "indigo", icon: "male" },
        { text: "dfarabr", value: "male22233", color: "indigo", icon: "male" },
        { text: "tebseroia", value: "maly4wehe", color: "indigo", icon: "male" },
        { text: "grbevaoi", value: "male1bfaf", color: "indigo", icon: "male" },
        { text: "agvironraeb", value: "male2fvae", color: "indigo", icon: "male" },
        { text: "nobj;stbkn;", value: "maleves", color: "indigo", icon: "male" },
        { text: "beionnte", value: "male1vava", color: "indigo", icon: "male" },
        { text: "fbesbeuiiimude", value: "malavae2", color: "indigo", icon: "male" },
      ],
      url: null,
      year: null,
    };
  },
  computed: {},
  methods: {
    onChange(event) {
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        document.querySelector("#preview").src = fileReader.result;
      };
      fileReader.readAsDataURL(this.file);
    },
    async onSubmit(event) {
      event.preventDefault();
      const username = event.target.username.value;
      if (!username) return;
      const storageRef = storage.ref();
      const fileRef = storageRef.child(this.file.name);
      await fileRef.put(this.file).then();
      this.url = await fileRef.getDownloadURL();
      await db.collection("users").doc(username).set({
        name: username,
        icon: this.url,
      });
    },
    fetchUsers() {
      db.collection("users").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.users = [change.doc.data(), ...this.users];
            // change.doc.data()
          }
        });
      });
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