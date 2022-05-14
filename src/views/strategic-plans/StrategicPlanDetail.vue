<template>
  <div class="standart-page">
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">{{ $store.state.sp.plan.baslangicYil }} - {{ $store.state.sp.plan.bitisYil }}
        {{ $store.state.sp.plan.planAdi }}</h3>
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
                @click="changeComponent(0,'GeneralInfo')">Genel
          Bilgiler
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===1?'btn-secondary':'btn-outline-secondary'"
                :disabled="$store.state.sp.purposes.filter(p => p.pasif === false).length===0"
                @click="changeComponent(1,'Goals')">
          Hedefler
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===2?'btn-secondary':'btn-outline-secondary'"
                :disabled="!disableIndicator"
                @click="changeComponent(2,'Indicators')">Göstergeler
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===3?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(3,'StatusInfo')">Durum Bilgileri
        </button>
        <button class="btn btn-block  mr-2 mt-0" :class="activeTab===4?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(4,'Documents')">Dokümanlar
        </button>
        <button class="btn btn-block mt-0" :class="activeTab===5?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(5,'Notes')">Notlar
        </button>
      </div>
    </div>

    <component :is="$store.state.sp.detail.currentTab"/>


  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  components: {
    /*PersonalInfo,
    ContactInfo,
    UserInfo,*/
  },
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    ...mapActions('sp', ['changeDetailTab']),
    changeComponent(id, cmp) {
      this.$store.state.sp.openPurposeAccordionId = null;
      this.activeTab = id;
      this.changeDetailTab(cmp);
    }
  },
  created() {
    this.changeComponent(0, 'GeneralInfo');
    // this.$store.state.hr.showNewEmployeeButton = false;
  },
  computed: {
    disableIndicator() {
      return this.$store.state.sp.goals.filter(g => g.hedefler.filter(h => h.pasif === false).length > 0).length && this.$store.state.sp.purposes.filter(p => p.pasif === false).length > 0;
    }
  }
}
</script>