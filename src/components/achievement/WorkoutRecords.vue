<template>
  <transition-group
    tag="div"
    class="flex flex-col justify-end items-center w-full"
  >
    <div
      v-for="(rec, index) in workoutRecords"
      :key="index"
      class="record"
      :class="{
        'w-100': rec.menus.length >= 4,
        'w-75': rec.menus.length === 3,
        'w-50': rec.menus.length === 2,
        'w-25': rec.menus.length === 1,
        sunday: rec.day === 0,
        monday: rec.day === 1,
        tuesday: rec.day === 2,
        wednesday: rec.day === 3,
        thursday: rec.day === 4,
        friday: rec.day === 5,
        saturday: rec.day === 6,
      }"
      :data-index="index"
      :data-day="rec.day"
      :data-menus="JSON.stringify(rec.menus)"
    >
      <p class="font-bold text-center">
        {{ rec.formattedDate }}
      </p>
    </div>
  </transition-group>
</template>

<script>
export default {
  components: {},
  props: {
    workoutRecords: Array
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
 .record {
    position: relative;
    padding: 10px;
    border-radius: 6px;
    transition: 0.3s;
    @extend .bs-b-4;

    &:hover {
      transform: scale(1.1);
    }

    // &::before {
    //   content: "";
    //   position: absolute;
    //   z-index: -1;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   border-radius: 16px;
    //   background-color: rgba($white, 0.8);
    // }

    &.w-25 {
      width: 25%;
    }
    &.w-50 {
      width: 50%;
    }
    &.w-75 {
      width: 75%;
    }
    &.w-100 {
      width: 100%;
    }
    &.sunday {
      background: linear-gradient(
        to right,
        rgba($purple, 0.8),
        rgba($purple, 0.9),
        rgba($purple, 1)
      );
    }
    &.monday {
      background: linear-gradient(
        to right,
        rgba($orange, 0.8),
        rgba($orange, 0.9),
        rgba($orange, 1)
      );
    }
    &.tuesday {
      background: linear-gradient(
        to right,
        rgba($pink, 0.8),
        rgba($pink, 0.9),
        rgba($pink, 1)
      );
    }
    &.wednesday {
      background: linear-gradient(
        to right,
        rgba($red, 0.8),
        rgba($red, 0.9),
        rgba($red, 1)
      );
    }
    &.thursday {
      background: linear-gradient(
        to right,
        rgba($green, 0.8),
        rgba($green, 0.9),
        rgba($green, 1)
      );
    }
    &.friday {
      background: linear-gradient(
        to right,
        rgba($indigo, 0.8),
        rgba($indigo, 0.9),
        rgba($indigo, 1)
      );
    }
    &.saturday {
      background: linear-gradient(
        to right,
        rgba($blue, 0.8),
        rgba($blue, 0.9),
        rgba($blue, 1)
      );
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