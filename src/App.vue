<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import FormComponent from './components/FormComponent.vue'
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>

  <header-component />

  <div class="nhsd-t-grid">
    <div class="nhsd-t-row nhsd-!t-margin-top-6">
      <div class="nhsd-t-col-12">
        <FormComponent />
      </div>
    </div>
  </div>

  <footer-component />

</template>
