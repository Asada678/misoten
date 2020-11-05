<template>
  <m-form-group>
    <m-form
      v-model="smaple"
      label="smaple"
      :class="{ error: $v.smaple.$error }"
      @blur="$v.smaple.$touch()"
    ></m-form>
    <m-error-message v-if="$v.smaple.$error">
      <span v-if="!$v.smaple.maxLength">
        ユーザ名は{{
          $v.smaple.$params.maxLength.max
        }}文字以下でなければいけません。
      </span>
      <span v-if="!$v.smaple.required">必須項目です。</span>
    </m-error-message>
  </m-form-group>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
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