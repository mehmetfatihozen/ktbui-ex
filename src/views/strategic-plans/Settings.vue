<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>

    <div class="accordion" role="tablist">
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            STRATEJİK PLAN DOKÜMANLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Documents/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            STRATEJİK PLAN ALT DURUMLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <SubStates/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            STRATEJİK PLAN DURUM VE ALT DURUM GEÇİŞLERİ VE KULLANICI DURUM ATAMA YETKİLERİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <component :is="$store.state.spSettings.currentStateComponent"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            STRATEJİK PLAN GÖSTERGE HESAPLAMA TÜRLERİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <CalculateTypes/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Documents from "@/components/strategic-plans/settings/Documents";
import SubStates from "@/components/strategic-plans/settings/SubStates";
import CalculateTypes from "@/components/strategic-plans/settings/CalculateTypes";
import StatePermission from "@/components/strategic-plans/settings/StatePermission";

export default {
  components: {
    SubStates,
    Documents,
    CalculateTypes,
    StatePermission,
  },
  data() {
    return {}
  },
  methods: {},
  created() {
  }
}
</script>