<template>
  <div>
    <!-- <input type="file" @change="croppie" />
    <vue-croppie
      ref="croppieRef"
      :boundary="{ width: 450, height: 300 }"
      :viewport="{ width: 200, height: 200, type: 'circle' }"
    ></vue-croppie>

    <img :src="cropped" alt="" />
    <m-button @click="crop">Crop</m-button>

   <m-form icon="search"></m-form> -->

  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      croppieImage: null,
      cropped: null,
    };
  },
  computed: {},
  methods: {
    croppie(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('event.target.result:', event.target.result);
        this.$refs.croppieRef.bind({
          url: event.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      const options = {
        type: 'base64',
        size: {width: 200, height: 200},
        format: 'png',
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
        console.log('this.croppieImage:', this.croppieImage);
      })
    }
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