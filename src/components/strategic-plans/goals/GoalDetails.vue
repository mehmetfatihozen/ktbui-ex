<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <h4 class="mb-0">HEDEF DETAY BİLGİLERİ</h4>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary"
                @click="changeGoalsComponent('GoalsMain')">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Hedeflere Geri Dön
        </button>
      </div>
    </div>
    <h5>{{ $store.state.sp.selectedGoal.hedefKisaAd }} {{ $store.state.sp.selectedGoal.hedefAciklama }}</h5>
    <div class="accordion" role="tablist">
      <b-card no-body v-for="(item,index) in $store.state.sp.goalDetail.detaylar" :key="index">
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle="'accordion-'+item.detayyParametreId">
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            {{ item.detayParametreAdi }}

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+item.detayyParametreId" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <component :is="components[item.detayyParametreId-1]" :data="item" :list="item.hedefDetaylar"/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Risks from "@/components/strategic-plans/goals/goal-details/Risks";
import Strategies from "@/components/strategic-plans/goals/goal-details/Strategies";
import CostEstimate from "@/components/strategic-plans/goals/goal-details/CostEstimate";
import Detections from "@/components/strategic-plans/goals/goal-details/Detections";
import Requirements from "@/components/strategic-plans/goals/goal-details/Requirements";

export default {
  components: {},
  data() {
    return {
      components: [Risks, Strategies, CostEstimate, Detections, Requirements]
    }
  },
  methods: {
    ...mapActions('sp', ['changeGoalsComponent', 'getGoalDetail'])
  },
  created() {
    this.getGoalDetail(this.$store.state.sp.selectedGoal.id);
  }
}
</script>