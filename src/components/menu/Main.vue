<template>
  <ul class="list">
    <li v-for="(item,index) in $store.state.general.menu" :key="index"
        @click="$store.state.general.activeMenuId=item.id">
      <a class="cursor-pointer" @click="changeMenu(item.menuBilesen,item.menuUrl)"
         :class="$route.path===item.menuUrl?'router-link-exact-active':''">
        <img
            :src="require(`@/assets/img/icons/${item.menuIcon}${item.id===$store.state.general.activeMenuId?'-active':''}.png`)"   v-b-tooltip.right="!$store.state.general.showMenu?item.menuAdi:''"/>
        {{ $store.state.general.showMenu?item.menuAdi:'' }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    changeMenu(menu, url) {
      if (menu) {
        if (this.$route.path != '/')
          this.$router.push('/');
        this.$store.dispatch('general/changeMenu', menu);
      } else {
        this.$router.push(url);
      }
    }
  }
}
</script>