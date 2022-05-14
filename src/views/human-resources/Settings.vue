<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>

    <div class="accordion" role="tablist">
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BİRİM / KURUMLAR

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
            <component
                :is="$store.state.hr.settings.currentInstitutionComponent"
                v-bind="$store.state.hr.settings.currentInstitutionComponentData"
            ></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BİRİM / KURUM KATEGORİLERİ

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
            <component :is="$store.state.hr.settings.currentInstitutionCategoryComponent"
                       v-bind="$store.state.hr.settings.currentInstitutionCategoryComponentData"
            ></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BİRİM / KURUM STATÜLERİ

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
            <component :is="$store.state.hr.settings.currentInstitutionStatusComponent"
                       v-bind="$store.state.hr.settings.currentInstitutionStatusComponentData"
            ></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL DOKÜMANLARI

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
            <EmployeeDocuments/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-5>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL DURUMLARI

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
            <component :is="$store.state.hr.settings.currentEmployeeStatusComponent"
                       v-bind="$store.state.hr.settings.currentEmployeeStatusComponentData"></component>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-6>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL TİPLERİ

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
            <EmployeeTypes/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-7>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL UNVANLARI

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
            <EmployeeTitles/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-8>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL İLİŞKİ TİPLERİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <EmployeeRelationTypes/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-9>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL MAAŞ/ÜCRET TİPLERİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <EmployeeSalaryTypes/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-10>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            PERSONEL SGK İŞTEN ÇIKIŞ NEDENLERİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <EmployeeLeavingReason/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Instutions from "@/components/human-resources/settings/InstitutionMain";
import EmployeeDocuments from "@/components/human-resources/settings/EmployeeDocuments";
import {mapActions} from "vuex";
import EmployeeTypes from "@/components/human-resources/settings/EmployeeTypes";
import EmployeeRelationTypes from "@/components/human-resources/settings/EmployeeRelationTypes";
import EmployeeSalaryTypes from "@/components/human-resources/settings/EmployeeSalaryTypes";
import EmployeeLeavingReason from "@/components/human-resources/settings/EmployeeLeavingReason";
import EmployeeTitles from "@/components/human-resources/settings/EmployeeTitles";

export default {
  components: {
    EmployeeTitles,
    EmployeeLeavingReason,
    EmployeeSalaryTypes,
    EmployeeRelationTypes,
    EmployeeTypes,
    EmployeeDocuments,
    Instutions,
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('hrSettings', ['getParameterTypes']),
  },
  created() {
    this.getParameterTypes();
  }
}
</script>