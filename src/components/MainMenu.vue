<template>
  <div class="main-menu" v-on-clickaway="away" :class="showMenu?'menu-open':'menu-close'">
    <div class="back">
      <font-awesome-icon icon="bars" @click="openMenu" v-if="$store.state.general.showMenu"/>
      <font-awesome-icon :icon="showMenu?'chevron-left':'chevron-right'" @click="toggleMenu"/>
    </div>
    <div class="menu-logo" v-if="showMenu">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="menu-title" v-if="showMenu">
      <h5 class="text-danger text-center">{{ $store.state.general.menuTitle || 'Menü' }}</h5>
    </div>
    <div class="menu-bottom">
      <component :is="$store.state.general.currentMenu"/>
    </div>
  </div>
</template>

<script>
import {mixin as clickaway} from "vue-clickaway";
import {mapState, mapActions} from "vuex";

export default {
  mixins: [clickaway],
  methods: {
    ...mapActions('general', ['toggleMenu']),
    away() {
      this.$store.state.general.showMenu = false;
    },
    openMenu() {
      this.$store.state.general.showMenu = true;
      this.$store.dispatch('general/changeMenu', 'Main');
    }
  },
  computed: {
    ...mapState('general', ['showMenu'])
  }
};
</script>