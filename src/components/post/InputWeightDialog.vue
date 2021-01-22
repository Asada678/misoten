<template>
  <m-dialog
    :dialog="dialog"
    :disabled="$v.$invalid"
    :loading="loading"
    header-text="体重記録"
    button-text="記録"
    @action="addWeight"
    @close="$emit('close')"
  >
    <m-form-group>
      <p class="pb-2 font-bold text-sm leading-relaxed">
        現在の体重を記録しましょう。<br />
        ２～４桁の数値を入力してください。
      </p>
      <div class="w-60 m-auto pb-4 flex justify-center font-bld text-xs">
        <p>例）</p>
        <ul class="text-center">
          <li class="grid grid-cols-3">
            <span>「62」</span>
            <span>→</span>
            <span>62.0kg</span>
          </li>
          <li class="grid grid-cols-3">
            <span>「785」</span>
            <span>→</span>
            <span>78.5kg</span>
          </li>
          <li class="grid grid-cols-3">
            <span>「1014」</span>
            <span>→</span>
            <span>101.4kg</span>
          </li>
        </ul>
      </div>
      <m-form
        v-model="inputWeight"
        type="number"
        label="現在体重"
        :class="{ error: $v.inputWeight.$error }"
        numeric
        ref="form"
        @blur="$v.inputWeight.$touch()"
      ></m-form>
      <m-error-message v-if="$v.inputWeight.$error">
        <span v-if="!$v.inputWeight.minLength">
          入力値は{{
            $v.inputWeight.$params.minLength.min
          }}桁以上の数値でなければいけません。
        </span>
        <span v-if="!$v.inputWeight.maxLength">
          入力値は{{
            $v.inputWeight.$params.maxLength.max
          }}桁以下の数値でなければいけません。
        </span>
        <span v-if="!$v.inputWeight.required">必須項目です。</span>
        <span v-if="!$v.inputWeight.integer">数字のみ入力してください。</span>
      </m-error-message>
    </m-form-group>

    <p class="latest-weight h-20 py-4 text-5xl">{{ latestWeight }}</p>
  </m-dialog>
</template>

<script>
import { db } from "@/firebase/firebase";
import {
  required,
  maxLength,
  minLength,
  integer,
} from "vuelidate/lib/validators";
export default {
  components: {},
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputWeight: null,
      loading: false,
    };
  },
  validations: {
    inputWeight: {
      required,
      maxLength: maxLength(4),
      minLength: minLength(1),
      integer,
    },
  },
  computed: {
    user() {
      return this.$store.getters.user ? this.$store.getters.user : null;
    },
    latestWeight() {
      if (this.inputWeight === null) return;
      let num;
      if (0 < this.inputWeight && this.inputWeight < 100) {
        num = `${this.inputWeight.toString()}.0`;
      } else if (this.inputWeight < 1000) {
        num = this.inputWeight / 10;
        if (num.toString().length === 2) {
          num = `${num}.0`;
        }
      } else {
        num = this.inputWeight / 10;
        if (num.toString().length === 3) {
          num = `${num}.0`;
        }
      }
      return num;
    },
  },
  methods: {
    // 体重の記録
    async addWeight() {
      console.log("this.latestWeight:", this.latestWeight);
      this.$v.$touch();
      if (this.$v.$invalid) {
        const snackbar = {
          text: "入力値が無効です。",
          color: "red",
        };
        this.$store.commit("setSnackbar", snackbar);
        return;
      }
      this.loading = true;
      const data = {
        weight: Number(this.latestWeight),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        createdAt: new Date(),
      };
      // console.log("data:", data);
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("weight-records")
        .doc(`${data.year}-${data.month}-${data.date}`)
        .set(data, { merge: true });

      const updatedData = { latestWeight: Number(this.latestWeight) };
      await db.collection("users").doc(this.user.uid).update(updatedData);

      this.inputWeight = null;
      this.$v.$reset();
      this.$emit('close');
      this.loading = false;

      const snackbar = {
        text: "体重を記録しました。",
        color: "green",
      };
      this.$store.commit("setSnackbar", snackbar);
      this.$store.commit("updateUser", updatedData);
    },
  },
  created() {},
  mounted() {},
  watch: {
    inputWeight() {
      if (this.inputWeight >= 10000) {
        this.inputWeight = this.inputWeight.toString().substring(0, 4);
        const el = this.$refs.form.$el.querySelector("input");
        el.value = this.inputWeight;
      }
    },
    inputWeightDialog() {
      if (!this.inputWeightDialog) {
        this.$v.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.latest-weight {
  &::after {
    content: "kg";
    margin-left: 16px;
    font-size: 30px;
    font-weight: 900;
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