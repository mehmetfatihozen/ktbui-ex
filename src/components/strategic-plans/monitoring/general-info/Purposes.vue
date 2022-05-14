<template>
  <div>
    <h4 class="mb-4">AMAÇLAR</h4>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Amaç</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in planMonitoringDetail.amaclar" :key="index">
        <td class="fit">{{ item.amacKisaAd }}</td>
        <td>{{item.amacAdi}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed:{
    ...mapState('sp',['planMonitoringDetail'])
  }
}
</script>