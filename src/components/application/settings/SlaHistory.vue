<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : SLA - {{ history }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeTopicComponent({cmp:'Sla',data:{id,metin}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-4">
      <thead>
      <tr>
        <th>SLA (Saat)</th>
        <th class="fit">Aktif / Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit text-right">Tarih</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.applicationSettings.slaHistoryList" :key="index">
        <td>{{ item.sla }} Saat</td>
        <td class="fit">{{ item.durum }}</td>
        <td class="fit">{{ item.personel }}</td>
        <td class="fit">{{ item.tarih }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  props: ['id', 'metin','historyId','history'],
  components: {},
  data() {
    return {}
  },
  methods: {
    ...mapActions('applicationSettings', ['changeTopicComponent', 'getSlaHistory'])
  },
  created() {
    this.getSlaHistory(this.historyId);
  }
}
</script>