<template>
  <div class="d-flex flex-column w-100">
    <navbar/>
    <main-menu/>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>
<script>
import mainMenu from "../components/MainMenu";
import navbar from "../layouts/Navbar";

export default {
  components: {
    mainMenu,
    navbar
  }
};
</script>