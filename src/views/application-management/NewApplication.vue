<template>
  <div class="new-application standart-page">
    <component :is="$store.state.application.newApplicationCurrentComponent"
               v-bind="$store.state.application.newApplicationCurrentComponentData"></component>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('general/changeMenu', 'ApplicationMenu');
    this.$store.state.application.newApplicationCurrentComponentData = null;
  }
}
</script>