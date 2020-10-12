<template>
  <div class="timeline-content">
        <div class="user-icon">
          <i class="fab fa-accusoft"></i>
        </div>
        <div class="content">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, laborum.</p>
        </div>
      </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.timeline-content {
  display: flex;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 40px;
  background-color: rgba(255, 165, 0, 0.5);
  box-shadow: 0px 5px 20px -5px rgba(0,0,0,0.6);

  .user-icon {
    flex-basis: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
  }

  .content {
    flex-basis: 80%;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 960px) {
}

@media (min-width: 1200px) {
}
</style>