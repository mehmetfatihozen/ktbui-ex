<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.push('/supplier-management')">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">{{ $store.state.supplierManagement.supplier.unvan }}</h3>
    <div class="row justify-content-center mb-4">
      <div class="col-10 d-flex justify-content-center">
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===0?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(0,'GeneralInfo')">Genel
          Bilgiler
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===1?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(1,'Relations')">
          İlişkiler
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===2?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(2,'BankInfo')">
          Banka Bilgileri
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===3?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(3,'StatusInfo')">
          Durum Bilgileri
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===4?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(4,'Documents')">
          Dokümanlar
        </button>
        <button class="btn btn-block mt-0" :class="activeTab===5?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(5,'Notes')">Notlar
        </button>
      </div>
    </div>

    <component :is="$store.state.supplierManagement.detail.currentTab"/>

  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  components: {},
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['changeDetailTab', 'getSupplierById']),
    changeComponent(id, cmp) {
      this.activeTab = id;
      this.changeDetailTab(cmp);
    }
  },
  created() {
    this.changeComponent(0, 'GeneralInfo');
  }
}
</script>