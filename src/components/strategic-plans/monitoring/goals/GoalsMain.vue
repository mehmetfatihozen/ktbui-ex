<template>
  <div class="accordion" role="tablist">
    <b-card no-body v-for="(item,index) in monitoringPurposes" :key="index">
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle="'main-accordion-'+item.id">
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
          {{ item.amacKisaAd }} {{ item.amacAdi }}

          <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
          <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
        </b-button>
      </b-card-header>
      <b-collapse :id="'main-accordion-'+item.id" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <TableDetail :list="item.hedefler"/>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import TableDetail from "@/components/strategic-plans/monitoring/goals/TableDetail";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    TableDetail
  },
  data() {
    return {
      activeDetailId: null
    }
  },
  methods: {
    ...mapActions('sp', ['getMonitoringPurposes'])
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, shown) => {
      if (collapseId.includes('main') && shown) {
        this.$store.state.sp.openPurposeAccordionId = collapseId;
      }
    });
    if (this.$store.state.sp.openPurposeAccordionId) {
      this.$root.$emit('bv::toggle::collapse', this.$store.state.sp.openPurposeAccordionId)
    }
  },
  created() {
    this.getMonitoringPurposes(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['monitoringPurposes'])
  }
}
</script>