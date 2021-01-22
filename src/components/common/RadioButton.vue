<template>
  <div class="m-radio">
    <span v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="option.value"
        :name="name"
        :value="option.value"
        @change="onChange"
      />
      <label :for="option.value" :class="option.color">
        <i :class="`fas fa-${option.icon}`"></i>
        <p class="text">
          {{ option.label }}
        </p>
      </label>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: Array,
    name: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onChange(event) {
      // console.log("event:", event);
      this.$emit("input", event.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.black {
  .m-radio {
    color: $white;
  }
}
.m-radio {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  color: rgba($black, 0.9);

  .title {
    position: absolute;
    top: -18px;
    left: 0px;
    font-size: 12px;
    font-weight: 700;
    color: $grey;
  }
  span {
    display: flex;
    width: 48%;
    max-width: 250px;
    // margin: 1%;

    &.w-30 {
      width: 32%;
      max-width: 150px;
    }

    label {
      // display: inline-block;
      display: flex;
      justify-content: center;
      // flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 10px 20px;
      border: 2px solid $grey;
      border-radius: 5px;
      font-size: 14px;
      // font-weight: 400;
      opacity: 0.7;
      cursor: pointer;
      transition: 0.4s;

      &:hover {
        background-color: rgba($black-2, 0.3);
        border: 2px solid rgba($black-2, 0.4);
        @extend .bs-b-2;
      }

      &.p-3 {
        padding: 3px;
      }

      img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }

      i {
        position: relative;
        font-size: 30px;
        left: -10px;
        color: $black;
      }

      .text {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: $black;
      }
    }
  }
  input {
    display: none;
    &[type="radio"]:checked {
      & ~ label {
        background-color: rgba($orange, 0.8);
        border: 2px solid rgba($orange, 1);
        // color: rgba($black, 0.9);
        font-weight: 700;
        opacity: 1;
        @extend .bs-b-8;
        i {
          color: $white;
        }
        .text {
          color: $white;
        }
        &.blue {
          background-color: rgba($blue, 0.7);
          border: 2px solid rgba($blue, 0.9);
          color: $blue;
        }
        &.red {
          background-color: rgba($red, 0.4);
          border: 2px solid rgba($red, 0.7);
          color: $red;
        }
        &.pink {
          background-color: rgba($pink, 0.7);
          border: 2px solid rgba($pink, 0.9);
          color: $pink;
        }
        &.indigo {
          background-color: rgba($indigo, 0.4);
          border: 2px solid rgba($indigo, 0.7);
          color: $indigo;
        }
      }
    }
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