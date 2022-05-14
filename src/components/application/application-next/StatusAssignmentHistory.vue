<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <h4 class="mb-0">TARİHÇE : {{ personel }}</h4>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary"
                @click="changeStatusAssignmentComponent({cmp:'StatusAssignment',data:null})">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Durum</th>
        <th>Alt Durum</th>
        <th class="fit">Asıl Çözücü</th>
        <th class="fit">SLA</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in applicationStateAndAssignInfoHistory" :key="index">
        <td class="fit">{{ item.durum }}</td>
        <td>{{ item.altDurum }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.asilCozucu"/>
        </td>
        <td class="fit">{{ item.sla }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  props: ['basvuruDurumId','personel'],
  methods: {
    ...mapActions('application', ['changeStatusAssignmentComponent', 'getStateAndAssignInfoHistory'])
  },
  created() {
    this.getStateAndAssignInfoHistory(this.basvuruDurumId);
  },
  computed:{
    ...mapState('application',['applicationStateAndAssignInfoHistory'])
  }
}
</script>