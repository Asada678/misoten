<template>
  <div>
    <p>This is a Group page!</p>
    <float-button icon="user" size="70" right="40" color="#E53935" />
    <m-button @click="dialog1 = true">test 1</m-button>
    <m-button @click="dialog2 = true">test 2</m-button>

    <m-dialog
      :dialog="dialog1"
      header-text="今日の頑張り 1"
      button-text="投稿"
      @close="dialog1 = false"
    >
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit culpa ut architecto aperiam illo neque adipisci laborum? Nostrum consectetur dolores dolorem in. Cumque eaque ipsa ratione rem nesciunt natus, reiciendis odit veniam facilis possimus quas veritatis voluptas ullam ea mollitia velit delectus accusamus eum? Vel repellendus fugit maiores provident aperiam alias molestiae saepe dolor porro modi labore maxime soluta suscipit minus delectus, cupiditate fugiat ad aliquam! Perferendis quisquam vero aliquid laboriosam nisi, labore molestiae? Quis, culpa! Illum pariatur nostrum soluta, eum, doloremque ipsa corrupti ipsam facere veritatis dicta ipsum, fugit quaerat. Ipsa ipsum fugiat fuga voluptatem, ab neque repellat quia error tempore eveniet iste? Inventore ducimus voluptatum temporibus dolores, non asperiores similique ab enim illum ad error dolor, esse, consectetur maxime necessitatibus! Beatae cumque atque expedita, maiores laborum pariatur explicabo nemo, ea voluptate amet quas vero perferendis itaque commodi modi, consequuntur sequi quam numquam soluta doloribus eveniet consectetur ab! Dolores unde nulla non iure maiores aspernatur esse consequatur beatae, illum quaerat similique ut quam accusamus dolore alias nemo? Veritatis harum laborum molestias voluptate nesciunt quidem, vero, sit temporibus eum suscipit animi officia quibusdam labore aperiam perferendis nulla nemo recusandae blanditiis? Reprehenderit tempore amet voluptates voluptatibus omnis dolores sunt possimus. Nostrum ex eaque impedit quasi, iste consectetur id placeat quia voluptas. Incidunt, suscipit dicta. Dolorem veritatis, ducimus excepturi dolorum esse maiores ex, voluptas expedita accusamus aliquam tenetur eos fugiat voluptatum odit quibusdam cum, commodi reiciendis perspiciatis doloremque vero. Placeat enim, dolor sequi quibusdam suscipit numquam dolorem atque inventore, necessitatibus ut quisquam quidem debitis nemo aperiam nostrum molestiae, ratione natus aut. Maiores vero ipsam soluta nisi similique aliquam dignissimos, voluptates repellendus esse sint tenetur, unde, temporibus praesentium? Sed delectus asperiores vero eius eos quisquam modi officia eum quos. Ipsum ducimus dolores qui quod nesciunt aliquam asperiores ullam soluta magni nobis vel sequi doloribus, porro consectetur dolorem. Aliquam natus molestias sint et tempore laudantium quas cum ut quasi error alias dolores fuga, dolore possimus, in recusandae explicabo magnam optio eveniet, nesciunt eos veniam! Nulla quidem dolores quisquam quo, facilis odit, error nihil, nisi maxime ducimus recusandae provident odio? At blanditiis eum nostrum pariatur possimus autem ad eligendi vel nobis? Inventore, assumenda est! Labore neque eligendi magni mollitia earum recusandae eum velit placeat. Cupiditate unde quo dolorem voluptates quasi vero eligendi beatae, veniam aut voluptatem cumque rerum repudiandae ipsam repellendus atque nam optio ab maxime nesciunt voluptatum debitis? Expedita facere ratione et nemo? 1</p>
    </m-dialog>
    <m-dialog
      :dialog="dialog2"
      header-text="今日の頑張り 2"
      button-text="投稿"
      @close="dialog2 = false"
    >
    <p>dialog 2</p>
    </m-dialog>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {},
  data() {
    return {
      dialog1: false,
      dialog2: false,
    };
  },
  computed: {},
  methods: {
    test() {
      console.log('this.name, this.area:', this.name, this.area);
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