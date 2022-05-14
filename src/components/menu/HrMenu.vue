<template>
  <div class="w-100">
    <ul class="list">
      <li v-for="(item,index) in $store.state.general.subMenu" :key="index"
          @click="$store.state.general.activeMenuId=item.id">
        <router-link :to="item.menuUrl" :exact="!(item.menuUrl.split('/').length > 2)">
          <img
              :src="require(`@/assets/img/icons/${item.menuIcon}${item.id===$store.state.general.activeMenuId?'-active':''}.png`)"   v-b-tooltip.right="!$store.state.general.showMenu?item.menuAdi:''"/>
          {{ $store.state.general.showMenu?item.menuAdi:'' }}
        </router-link>
      </li>
    </ul>
    <Can I="create" a="ik/personel">
      <button class="btn btn-danger btn-new-record mt-5"
              @click="$router.push('/human-resources/employee/new')"
              v-b-tooltip.right="!$store.state.general.showMenu?'Yeni Personel Girişi':''"
              v-if="$store.state.hr.showNewEmployeeButton">
        {{$store.state.general.showMenu?'Yeni Personel Girişi':''}}
        <font-awesome-icon icon="plus" size="lg" v-if="!$store.state.general.showMenu"></font-awesome-icon>
      </button>
    </Can>
  </div>
</template>

<script>
export default {}
</script>