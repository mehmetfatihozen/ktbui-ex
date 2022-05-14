<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>
    <div class="accordion" role="tablist">
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BÜTÇE YÖNETİMİ - TERTİP GRUPLARI
            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel"
                    @show="showCompositionGroupsComponent()">
          <b-card-body>
            <component :is="$store.state.budgetManagement.settings.currentCompositionGroupsComponent"
                       v-bind="$store.state.budgetManagement.settings.currentCompositionGroupsComponentData"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body v-for="(item,index) in components" :key="index">
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle="'accordion-' + item.typeId">
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            {{ item.title }}
            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + item.typeId" accordion="my-accordion" role="tabpanel"
                    @show="changeBudgetBasicParameterComponentData(item)">
          <b-card-body>
            <BasicParameterComponent :parameterTypeId="item.typeId"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            YILLIK BÜTÇE - BÜTÇE YILLARI
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
            <annualBudgetBudgetYears/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            YILLIK BÜTÇE - DURUM - DURUM GEÇİŞLERİ VE KULLANICI DURUM ATAMA YETKİLERİ
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
            <annualBudgetStateTransitionsUserAssignment/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>
<script>

import BasicParameterComponent from "@/components/budget-management/settings/BasicParameterComponent";
import annualBudgetStateTransitionsUserAssignment from "@/components/budget-management/settings/annualBudgetStateTransitionsUserAssignment";
import annualBudgetBudgetYears from "@/components/budget-management/settings/annualBudgetBudgetYears";
import {mapActions} from "vuex";
import CompositionGroupsMain from "@/components/budget-management/settings/CompositionGroupsMain";

export default {
  components: {
    BasicParameterComponent,
    annualBudgetStateTransitionsUserAssignment,
    annualBudgetBudgetYears
  },
  data() {
    return {
      components: [
        {
          title: 'BÜTÇE ALIM TÜRLERİ',
          text: 'Bütçe Alım Türü',
          typeId: 1007
        },
        {
          title: 'BÜTÇE GİDER TİPLERİ',
          text: 'Bütçe Gider Tipi',
          typeId: 1008
        },
        {
          title: 'BÜTÇE HARCAMA TİPLERİ',
          text: 'Bütçe Harcama Tipi',
          typeId: 1009
        },
        {
          title: 'BÜTÇE DESTEKLENEN FİRMA TÜRLERİ',
          text: 'Bütçe Desteklenen Firma Türü',
          typeId: 1010
        },
        {
          title: 'BÜTÇE HAKEDİŞ DÖNEMLERİ',
          text: 'Bütçe Hakediş Dönemi',
          typeId: 1011
        },
        {
          title: 'BÜTÇE HAKEDİŞ DURUMLARI',
          text: 'Bütçe Hakediş Durumu',
          typeId: 1012
        },
        {
          title: 'KDV ORANLARI',
          text: 'KDV Oranı',
          typeId: 1013
        },
        {
          title: 'BÜTÇE DURUMLARI',
          text: 'Bütçe Durumu',
          typeId: 1014
        },
        {
          title: 'BÜTÇE SATIN ALMA ALIM BİRİMLERİ',
          text: 'Bütçe Satın Alma Alım Birimi',
          typeId: 1015
        },
        {
          title: 'BÜTÇE TEKLİF TİPLERİ',
          text: 'Bütçe Teklif Tipi',
          typeId: 1016
        },
        {
          title: 'KAMU ZARARI ZARAR TÜRLERİ',
          text: 'Kamu Zararı Zarar Türü',
          typeId: 1017
        },
        {
          title: 'KAMU ZARARI MUHATAP TİPLERİ',
          text: 'Kamu Zararı Muhatap Tipi',
          typeId: 1018
        },
        {
          title: 'KAMU ZARARI FAİZ ORANLARI',
          text: 'Kamu Zararı Faiz Oranı',
          typeId: 1019
        },
        {
          title: 'KAMU ZARARI HESAPLAMA TÜRLERİ',
          text: 'Kamu Zararı Hesaplama Türü',
          typeId: 1020
        },
        {
          title: 'BÜTÇE REVİZYON REVİZYON TİPLERİ',
          text: 'Bütçe Revizyon Revizyon Tipi',
          typeId: 1021
        },
        {
          title: 'YILLIK BÜTÇE YATIRIM BÜTÇELERİ',
          text: 'Yıllık Bütçe Yatırım Bütçesi',
          typeId: 1023
        },
        {
          title: 'YILLIK BÜTÇE BÜTÇE TÜRLERİ',
          text: 'Yıllık Bütçe Bütçe Türü',
          typeId: 1024
        },
        {
          title: 'BÜTÇE SATIN ALMA ALIM TİPLERİ',
          text: 'Bütçe Satın Alma Alım Tipi',
          typeId: 1025
        },
        {
          title: 'TAŞINMAZ SÖZLEŞME DURUMLARI',
          text: 'Taşınmaz Sözleşme Durumu',
          typeId: 1026
        },
        {
          title: 'TAŞINMAZ DOKÜMAN TÜKETİM TİPLERİ',
          text: 'Taşınmaz Doküman Tüketim Tipi',
          typeId: 1027
        },
        {
          title: 'PROJE KARAKTERİSTİKLERİ',
          text: 'Proje Karakteristiği',
          typeId: 1030
        },
        {
          title: 'PROJE KARAKTERİSTİKLERİ TAŞIT TİPLERİ',
          text: 'Proje Karakteristikleri Taşıt Tipi',
          typeId: 1031
        },
      ],
    }
  },
  methods: {
    ...mapActions('budgetManagement', ['getBudgetBasicParameters', "getCompositionGroups"]),
    changeBudgetBasicParameterComponentData(data) {
      this.$store.state.budgetManagement.budgetBasicParameters = null;
      this.$store.state.budgetManagement.settings.currentBasicParameterComponentData = null;
      this.getBudgetBasicParameters(data.typeId);
      this.$store.state.budgetManagement.settings.currentBasicParameterComponentData = data;
    },
    showCompositionGroupsComponent() {
      this.getCompositionGroups();
      this.$store.state.budgetManagement.settings.currentCompositionGroupsComponent = CompositionGroupsMain;
    }
  }
}
</script>