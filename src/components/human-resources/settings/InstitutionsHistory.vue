<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : {{ birimAd }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeInstitutionComponent({cmp:'Institutions',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Birim Adı</th>
        <th class="fit">Kategori</th>
        <th class="fit">Statü</th>
        <th class="fit">K. Kod</th>
        <th class="fit">DETSİS No</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.hrSettings.departmentHistories" :key="index">
        <td>{{ item.adi }}</td>
        <td class="fit">{{ item.kategori }}</td>
        <td class="fit">{{ item.statu }}</td>
        <td class="fit">{{ item.kurumKodu }}</td>
        <td class="fit">{{ item.detsisNo }}</td>
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
  props: ['id', 'birimAd'],
  methods: {
    ...mapActions('hr', ['changeInstitutionComponent']),
    ...mapActions('hrSettings', ['getDepartmentHistory']),
  },
  created() {
    this.getDepartmentHistory(this.id);
  }
}
</script>