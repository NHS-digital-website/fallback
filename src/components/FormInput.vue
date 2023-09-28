<template>
  <div class="nhsd-t-form-group" :class="{ 'nhsd-t-form-group--error': hasError }">
    <div :class="{ 'nhsd-t-form-group__error': hasError }">
      <label class="nhsd-t-form-label-s" :for="id">{{ label }}</label>
      <span class="nhsd-t-form__hint">{{ hint }}</span>
      <span class="nhsd-t-form__error" v-if="hasError">{{ errorMessage }}</span>
      <input class="nhsd-t-form-input" type="text" :id="id" autocomplete="off" :value="value" @input="handleInput" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    label: String,
    id: String,
    hint: String,
    value: String,
    errorMessage: String,
    hasError: Boolean,
  },
  data() {
    return {
    };
  },
  methods: {
    handleInput($event) {
      this.$emit('input', $event);
    },
  },
};
</script>