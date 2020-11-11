<template>
  <div class="m-video-card" @click="$emit('click')">
    <!-- <router-link :to="`/video/room/${videoRoom.id}`"> -->
    <div class="room-img">
      <img src="/img/kuma.png" alt="" />
    </div>
    <div class="room-text">
      <h2>{{ videoRoom.roomName }}</h2>
      <!-- <p>{{ video.description}}</p> -->
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
        laborum?
      </p>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    videoRoom: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.m-video-card {
  margin-bottom: 10px;
  box-shadow: 0px 5px 10px rgba($black, 0.3), 0px 0px 30px rgba($black, 0.3);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .room-img {
    width: 100%;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .room-text {
    padding: 10px;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>