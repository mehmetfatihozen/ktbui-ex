<template>
  <div class="standart-page">
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">PERSONEL BİLGİLERİ</h3>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-secondary" @click="$router.go(-1)">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Listeye Geri Dön
        </button>
      </div>
    </div>
    <div class="row justify-content-center mb-4">
      <div class="col-5 d-flex justify-content-center">
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===0?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(0,'EmployeeGeneralInfo')">Genel
          Bilgiler
        </button>
        <button class="btn btn-block mr-2 mt-0" :class="activeTab===1?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(1,'EmployeeDocuments')">
          Dokümanlar
        </button>
        <button class="btn btn-block mt-0" :class="activeTab===2?'btn-secondary':'btn-outline-secondary'"
                @click="changeComponent(2,'EmployeeNotes')">Notlar
        </button>
      </div>
    </div>

    <component :is="$store.state.hr.detail.currentTab"/>


  </div>
</template>

<script>
/*import PersonalInfo from '@/components/human-resources/PersonalInfo';
import ContactInfo from '@/components/human-resources/ContactInfo';
import UserInfo from '@/components/human-resources/UserInfo';*/

import {required} from "vuelidate/lib/validators";
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
  validations: {
    staffType: {
      required
    }
  },
  methods: {
    ...mapActions('hr', ['changeDetailTab']),
    changeComponent(id, cmp) {
      this.activeTab = id;
      this.changeDetailTab(cmp);
    }
  },
  created() {
    this.changeComponent(0, 'EmployeeGeneralInfo');
    this.$store.state.hr.showNewEmployeeButton = false;
  }
}
</script>