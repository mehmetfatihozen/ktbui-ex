<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th class="fit">No</th>
      <th>Hedefler</th>
      <th class="fit">6 Aylık %</th>
      <th class="fit">Yıllık %</th>
      <th class="fit">Sorumlu Birim</th>
      <th class="fit"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(i,index) in list" :key="index">
      <td class="fit">{{ i.hedefKisaAd }}</td>
      <td>
        {{ i.hedefAciklama }}
      </td>
      <td class="fit text-right">{{ i.altiAylik }}</td>
      <td class="fit text-right">{{ i.yillik }}</td>
      <td class="fit">
        {{ i.sorumluBirim }}
      </td>
      <td class="fit">
        <button class="btn btn-outline-secondary btn-sm" @click="goToDetail(i)">Hedef Detayları
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props:['list'],
  methods:{
    ...mapActions('sp', ['changeMonitoringGoalsComponent','updateSelectedGoal']),
    goToDetail(item) {
      this.updateSelectedGoal(item);
      this.changeMonitoringGoalsComponent('MonitoringGoalDetails');
    },
  }
}
</script>
