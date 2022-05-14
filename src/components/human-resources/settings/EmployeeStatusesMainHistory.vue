<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : Çalışan</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeEmployeeStatusComponent({cmp:'EmployeeStatusesMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Durum Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.hrSettings.employeeStateHistories" :key="index">
        <td>{{ item.durum }}</td>
        <td class="fit">{{ item.pasif }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td class="fit">{{ item.olusturulmaTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['id'],
  methods: {
    ...mapActions('hr', ['changeEmployeeStatusComponent']),
    ...mapActions('hrSettings', ['getEmployeeStateHistory']),
  },
  created() {
    this.$store.state.hrSettings.employeeStateHistories = Object.assign([]);
    this.getEmployeeStateHistory(this.id);
  }
}
</script>