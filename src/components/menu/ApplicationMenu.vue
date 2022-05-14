<template>
  <div class="w-100">
    <ul class="list">
      <li v-for="(item,index) in $store.state.general.subMenu" :key="index"
          @click="$store.state.general.activeMenuId=item.id">
        <router-link :to="item.menuUrl" :exact="!(item.menuUrl.split('/').length > 2)">
          <img
              :src="require(`@/assets/img/icons/${item.menuIcon}${item.id===$store.state.general.activeMenuId?'-active':''}.png`)"  v-b-tooltip.right="!$store.state.general.showMenu?item.menuAdi:''"/>
          {{ $store.state.general.showMenu?item.menuAdi:'' }}
        </router-link>
      </li>
    </ul>
    <Can I="create" a="basvuruyonetimi/basvurular">
      <button class="btn btn-danger btn-new-record mt-5"
              v-b-tooltip.right="!$store.state.general.showMenu?'Yeni Başvuru Giriş':''"
              @click="newApplication"
              v-if="$store.state.application.showNewApplicationButton&&$store.state.auth.user.personelKullaniciTipId==57">
        {{$store.state.general.showMenu?'Yeni Başvuru Giriş':''}}
        <font-awesome-icon icon="plus" size="lg" v-if="!$store.state.general.showMenu"></font-awesome-icon>
      </button>
      <button class="btn btn-danger btn-new-record mt-5"
              v-b-tooltip.right="!$store.state.general.showMenu?'Çağrı Merkezi Girişi':''"
              @click="newApplicationCallcenter"
              v-if="$store.state.application.showNewApplicationButton&&$store.state.auth.user.personelKullaniciTipId==64">
        {{$store.state.general.showMenu?'Çağrı Merkezi Girişi':''}}
        <font-awesome-icon icon="plus" size="lg" v-if="!$store.state.general.showMenu"></font-awesome-icon>
      </button>
    </Can>
  </div>
</template>

<script>
export default {
  methods: {
    newApplication() {
      const path = "/application-management/applications/new";
      if (this.$route.path !== path) this.$router.push(path);
    },
    newApplicationCallcenter() {
      const path = "/application-management/applications/new?callcenter=true";
      if (this.$route.path !== path) this.$router.push(path);
    }
  }
}
</script>