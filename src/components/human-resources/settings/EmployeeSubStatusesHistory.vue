<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : {{ durum }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeEmployeeStatusComponent({cmp:'EmployeeSubStatuses',data:{id:ustPersonelDurumParametreId}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Alt Durum Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.hrSettings.employeeSubStateHistories" :key="index">
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
  props: ['id', 'durum','ustPersonelDurumParametreId'],
  methods: {
    ...mapActions('hr', ['changeEmployeeStatusComponent']),
    ...mapActions('hrSettings', ['getEmployeeSubStateHistory']),
  },
  created() {
    this.$store.state.hrSettings.employeeSubStateHistories = Object.assign([]);
    this.getEmployeeSubStateHistory(this.id)
  }
}
</script>