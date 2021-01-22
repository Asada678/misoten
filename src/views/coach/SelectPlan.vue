<template>
  <div class="select-plan">
    <p class="text-center text-sm font-bold pt-10">
      ようこそ<br />
      こちらのトレーニングプランからご選択ください
    </p>

    <div class="plans py-12 px-4">
      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <input
            v-model="selectedPlan"
            type="radio"
            name="plan"
            id="plan-a"
            value="Plan A"
          />
          <label
            for="plan-a"
            class="plan block py-10 text-center font-bold text-2xl border-2 border-gray-300 rounded-lg"
          >
            <h2>Plan A</h2>
          </label>
        </div>
        <div>
          <input
            v-model="selectedPlan"
            type="radio"
            name="plan"
            id="plan-b"
            value="Plan B"
          />
          <label
            for="plan-b"
            class="plan block py-10 text-center font-bold text-2xl border-2 border-gray-300 rounded-lg"
          >
            <h2>Plan B</h2>
          </label>
        </div>
      </div>
      <div class="grid pt-4">
        <input
          v-model="selectedPlan"
          type="radio"
          name="plan"
          id="customize"
          value="Customize"
        />
        <label
          for="customize"
          class="plan block py-10 text-center font-bold text-2xl border-2 border-gray-300 rounded-lg"
        >
          <h2>カスタマイズ</h2>
        </label>
      </div>
    </div>

    <div>
      <m-button
        class="w-100"
        :disabled="!selectedPlan"
        :to="{ name: 'PlanDetail', params: { planName: selectedPlan } }"
        >選択</m-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      planA: false,
      planB: false,
      customize: false,
      selectedPlan: null,
    };
  },
  computed: {},
  methods: {
    push() {
      // console.log("this.selectedPlan:", this.selectedPlan);
      this.$router.push();
    },
    check() {
      console.log("this.planA:", this.planA);
      console.log("this.planB:", this.planB);
      console.log("this.customize:", this.customize);
      console.log("this.selectedPlan:", this.selectedPlan);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.select-plan {
  input[type="radio"] {
    display: none;

    &:checked {
      & ~ .plan {
        border-color: $orange;
        background-color: rgba($orange, 0.9);
        color: $white;
        transition: 0.3s;
        @extend .bs-b-8;
      }
    }
  }

  .plan {
    border-color: $grey;
    cursor: pointer;
    font-style: italic;
    transition: 0.5s;

    &:hover {
      background-color: rgba($orange, 0.4);
      border-color: rgba($orange, 0.6);
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