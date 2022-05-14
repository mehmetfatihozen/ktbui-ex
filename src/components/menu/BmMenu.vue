<template>
  <div class="w-100">
    <ul class="list">
      <li v-for="(item,index) in $store.state.general.subMenu" :key="index"
          @click="$store.state.general.activeMenuId=item.id">
        <router-link :to="item.menuUrl" :exact="!(item.menuUrl.split('/').length > 2)">
          <img :src="require(`@/assets/img/icons/${item.menuIcon}${item.id===$store.state.general.activeMenuId?'-active':''}.png`)"   v-b-tooltip.right="!$store.state.general.showMenu?item.menuAdi:''"/>
          {{ $store.state.general.showMenu?item.menuAdi:'' }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>