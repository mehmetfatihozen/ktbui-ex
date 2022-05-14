<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : {{ kategoriAdi }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeInstitutionCategoryComponent({cmp:'InstitutionCategoriesMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Kategori Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.hrSettings.departmentCategoryHistories" :key="index">
        <td>{{ item.kategoriAdi }}</td>
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
  props: ['id', 'kategoriAdi'],
  methods: {
    ...mapActions('hr', ['changeInstitutionCategoryComponent']),
    ...mapActions('hrSettings', ['getDepartmentCategoryHistory']),
  },
  created() {
    this.getDepartmentCategoryHistory(this.id);
  }
}
</script>