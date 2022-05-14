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
    <button class="btn btn-danger btn-new-record mt-5"
            v-b-tooltip.right="!$store.state.general.showMenu?'Yeni Plan Giriş':''"
            @click="$router.push('/strategic-plans/new')"
            v-if="$store.state.sp.showNewPlan">
      {{$store.state.general.showMenu?'Yeni Plan Giriş':''}}
      <font-awesome-icon icon="plus" size="lg" v-if="!$store.state.general.showMenu"></font-awesome-icon>
    </button>
    <button class="btn btn-danger btn-new-record mt-5"
            v-b-tooltip.right="!$store.state.general.showMenu?'Yeni Plan Dönem Açılışı':''"
            @click="$router.push('/strategic-plans/monitoring/new')"
            v-if="$store.state.sp.showNewPlanMonitoring">
      {{$store.state.general.showMenu?'Yeni Plan Dönem Açılışı':''}}
      <font-awesome-icon icon="plus" size="lg" v-if="!$store.state.general.showMenu"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>