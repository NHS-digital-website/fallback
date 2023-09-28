<template>
  <div class="nhsd-t-form-group" :class="{ 'nhsd-t-form-group--error': hasError }">
    <div :class="{ 'nhsd-t-form-group__error': hasError }">
      <label class="nhsd-t-form-label" :for="id">{{ label }}</label>
      <span class="nhsd-t-form-hint">{{ hint }}</span>
      <span class="nhsd-t-form__error" v-if="hasError">{{ errorMessage }}</span>
      <div class="nhsd-t-form-control">
        <select class="nhsd-t-form-select" :id="id" :value="value" @change="handleUpdate">
          <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <span class="nhsd-t-form-control__icon">
          <span class="nhsd-a-icon nhsd-a-icon--size-s">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true"
                 focusable="false" viewBox="0 0 16 16" width="100%" height="100%">
              <path d="M8,12L1,5.5L2.5,4L8,9.2L13.5,4L15,5.5L8,12z"></path>
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    label: String,
    id: String,
    hint: String,
    items: Array,
    value: String,
    errorMessage: String,
    hasError: Boolean,
  },
  handleInput($event) {
    this.$emit('input', $event);
  },
  methods: {
    handleUpdate($event) {
      this.$emit('update', $event);
    },
  },
}
</script>
