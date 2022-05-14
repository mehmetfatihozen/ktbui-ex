<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">TARİHÇE : {{ this.$store.state.supplierManagement.settings.currentDocumentComponentsData.dokumanTipi }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeDocumentComponent({cmp:'DocumentsMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-75">Doküman Tipi</th>
        <th class="w-auto">Pasif</th>
        <th class="w-auto">Kullanıcı</th>
        <th class="w-auto">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.supplierManagement.documentParameterHistory" :key="index">
        <td>{{ item.dokumanTipi }}</td>
        <td>{{ item.pasif }}</td>
        <td>{{ item.kullanici }}</td>
        <td>{{ item.kayitTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['getDocumentParameterHistory', 'changeDocumentComponent']),
  },
  created() {
    this.getDocumentParameterHistory(this.$store.state.supplierManagement.settings.currentDocumentComponentsData.id);
  }
}
</script>