<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : {{ statuAdi }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeInstitutionStatusComponent({cmp:'InstitutionStatusesMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Statü Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.hrSettings.departmentStatusHistories" :key="index">
        <td>{{ item.statuAdi }}</td>
        <td class="fit">{{ item.pasif }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['id', 'statuAdi'],
  methods: {
    ...mapActions('hr', ['changeInstitutionStatusComponent']),
    ...mapActions('hrSettings', ['getDepartmentStatusHistory']),
  },
  created() {
    this.getDepartmentStatusHistory(this.id);
  }
}
</script>