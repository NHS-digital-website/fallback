<template>
  <div class="nhsd-m-card nhsd-m-card--with-icon" style="position: fixed; top: 10px; left: 10px; right: 10px; bottom: 10px; z-index: 200" @click="handleClick">
    <div class="nhsd-a-box nhsd-a-box--bg-light-grey">
      <div class="nhsd-m-card__content_container">
        <div class="nhsd-m-card__content-box">
          <span class="nhsd-t-heading-s">Outcome</span>
          <textarea @click="preventClick" class="nhsd-t-form-textarea" style="resize: none; width: 100%; height: 100%">{{ outcome }}</textarea>
        </div>
        <div class="nhsd-m-card__icon-container">
          <span class="nhsd-a-icon nhsd-a-icon--col-black nhsd-m-card__icon nhsd-a-icon--size-xl">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" focusable="false" viewBox="0 0 16 16"><polygon
                points="13.9,1 8,6.9 2.1,1 1,2.1 6.9,8 1,13.9 2.1,15 8,9.1 13.9,15 15,13.9 9.1,8 15,2.1 "/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogueComponent",
  props: {
    outcome: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleClick($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.$emit('click', $event);
    },
    preventClick($event) {
      $event.preventDefault();
      $event.stopPropagation();
    },
  },
}
</script>

<style scoped>
textarea:focus {
  outline: none;
  box-shadow: none !important;
}
</style>