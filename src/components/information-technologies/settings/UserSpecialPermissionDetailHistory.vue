<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Tarihçe : {{ nameSurname }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionDetail',data:{id}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th>Durum</th>
        <th class="fit">Rol Adı</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Tarih</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.specialPermissionDetailHistories" :key="index">
        <td>{{ item.durum }}</td>
        <td class="fit">{{ item.rolAdi }}</td>
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
  props: ['id','nameSurname','personelRolId'],
  methods: {
    ...mapActions('informationTechnologies', ['getSpecialPermissionDetailHistory', 'changeUserSpecialPermissionComponent'])
  },
  created() {
    this.getSpecialPermissionDetailHistory(this.personelRolId);
  }
}
</script>