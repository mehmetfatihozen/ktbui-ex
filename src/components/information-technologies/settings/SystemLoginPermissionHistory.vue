<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Bloke Durum Tarihçesi : {{ adSoyad }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeSystemLoginPermissionComponent({cmp:'SystemLoginPermission',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th class="fit">Bloke</th>
        <th>Giriş</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Tarih</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.blockedUserHistories" :key="index">
        <td class="fit">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.bloke"/>
        </td>
        <td>
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.sistemeGiris"/>
        </td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.tarih }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  props:['id','adSoyad'],
  methods: {
    ...mapActions('informationTechnologies', ['blockedUserHistory', 'changeSystemLoginPermissionComponent'])
  },
  created() {
    this.blockedUserHistory(this.id);
  }
}
</script>