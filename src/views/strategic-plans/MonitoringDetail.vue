<template>
  <div class="standart-page">
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">{{ planMonitoringDetail.planAdi }}</h3>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-secondary" @click="$router.go(-1)">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Listeye Geri Dön
        </button>
      </div>
    </div>
    <div class="row justify-content-center mb-4">
      <div class="col d-flex justify-content-center">
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===0?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(0,'MonitoringGeneralInfo')">Genel
          Bilgiler
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===1?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(1,'MonitoringGoals')">
          Hedefler
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===2?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(2,'MonitoringIndicators')">Göstergeler
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===3?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(3,'MonitoringStatusInfo')">Durum Bilgileri
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===4?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(4,'MonitoringDocuments')">Dokümanlar
        </button>
        <button class="btn btn-block mt-0" :class="activeTab===5?'btn-secondary':'btn-outline-secondary'"
                @click="changeMonitoringComponent(5,'MonitoringNotes')">Notlar
        </button>
      </div>
    </div>

    <component :is="$store.state.sp.monitoring.currentTab"/>


  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  components: {},
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    ...mapActions('sp', ['changeMonitoringTab', 'getPlanMonitoringDetail']),
    changeMonitoringComponent(id, cmp) {
      this.$store.state.sp.openPurposeAccordionId = null;
      this.activeTab = id;
      this.changeMonitoringTab(cmp);
    }
  },
  created() {
    this.getPlanMonitoringDetail(this.$route.params.id);
    this.changeMonitoringComponent(0, 'GeneralInfo');
  },
  computed:{
    ...mapState('sp',['planMonitoringDetail'])
  }
}
</script>