<template>
  <div
    class="m-group-room-message"
    :class="{ mine: message.fromUserId === $store.getters.user.uid }"
  >
    <img :src="message.fromUserIcon" alt="" />
    <p class="content">
      {{ message.content }}
    </p>
    <p>{{ message.formattedCreatedAt }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    message: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.m-group-room-message {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;

  &.mine {
    flex-direction: row-reverse;

    .content {
      background-color: rgba($orange, 0.4);
    }
  }

  img {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    border: 1px solid $black;
    border-radius: 50%;
    object-fit: cover;
  }

  .content {
    width: 60%;
    padding: 5px 20px;
    border: 1px solid rgba($orange, 0.8);
    border-radius: 20px;
    background-color: rgba($white, 0.9);
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