<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>

    <div class="accordion" role="tablist">

      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            ENVANTER DURUMU

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
            <component :is="$store.state.inventory.settings.currentInventoryStateComponent"></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            CİHAZ TİPİ

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
            <component :is="$store.state.inventory.settings.currentInventoryDeviceTypeComponent"></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            MARKA

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
            <component :is="$store.state.inventory.settings.currentInventoryBrandComponent"></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            FİRMALAR

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
            <component :is="$store.state.inventory.settings.currentInventoryStateComponent"></component>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  components:{

  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>