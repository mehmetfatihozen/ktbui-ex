<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>

    <div class="accordion" role="tablist">
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            ROL TİPLERİ

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
            <component :is="$store.state.informationTechnologies.settings.currentRoleTypes"
                       v-bind="$store.state.informationTechnologies.settings.currentRoleTypesData"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            ROL TİPLERİ ve YETKİLERİ

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
            <component :is="$store.state.informationTechnologies.settings.currentRoleTypePermissionComponent"
                       v-bind="$store.state.informationTechnologies.settings.currentRoleTypePermissionComponentData"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            ROL TİPLERİ ve KULLANICILAR

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
            <component :is="$store.state.informationTechnologies.settings.currentRoleTypeUserComponent"
                       v-bind="$store.state.informationTechnologies.settings.currentRoleTypeUserComponentData"
            />
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            KULLANICI ve ÖZEL YETKİLER

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
            <component :is="$store.state.informationTechnologies.settings.currentUserSpecialPermissionComponent"
                       v-bind="$store.state.informationTechnologies.settings.currentUserSpecialPermissionComponentData"
            />
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-5>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            SİSTEME GİRİŞ YETKİSİ ve BLOKE DURUMU

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <component :is="$store.state.informationTechnologies.settings.currentSystemLoginPermissionComponent"
                       v-bind="$store.state.informationTechnologies.settings.currentSystemLoginPermissionComponentData"
            />
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-6>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            SİSTEM MESAJLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <SystemMessages/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-7>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            SİSTEM GİRİŞ DENEMESİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <SystemLoginAttempt/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import SystemMessages from "@/components/information-technologies/settings/SystemMessages";
import SystemLoginAttempt from "@/components/information-technologies/settings/SystemLoginAttempt";

export default {
  components: {
    SystemLoginAttempt,
    SystemMessages
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('informationTechnologies', ['resetState']),
  },
  mounted() {
    this.$root.$on('bv::toggle::collapse', () => {
      this.resetState();
    })
  },
  created() {

  }
}
</script>