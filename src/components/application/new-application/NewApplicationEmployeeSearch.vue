<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <div class="call-id" v-if="$store.state.application.applicationDetail.callId">
          Call ID : {{ $store.state.application.applicationDetail.callId }}
        </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">PERSONEL LİSTELEME</h3>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-secondary"
                @click="changeNewApplicationComponent({cmp:'NewApplicationMain',data:null})">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Başvuruya Geri Dön
        </button>
      </div>
    </div>
    <div class="card-component mb-4">
      <div class="body">
        <div class="alert alert-danger" v-if="showError">
          {{ errorMessage }}
        </div>
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group mb-0">
              <label>Sicil No</label>
              <input type="text" class="form-control" v-model="form.registrationNumber">
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group mb-0">
              <label>TC Kimlik No</label>
              <input type="text" class="form-control" v-model="form.identityNumber" v-mask="'###########'" maxlength="11">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group mb-0">
              <label>Adı Soyadı</label>
              <input type="text" class="form-control" v-model="form.nameSurname">
            </div>
          </div>
        </div>
      </div>
      <div class="footer  d-flex justify-content-end mt-3">
        <button class="btn btn-outline-secondary" @click="clear">Temizle</button>
        <button class="btn btn-secondary" @click="list">Listele</button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit"></th>
        <th class="fit">Sicil No</th>
        <th class="fit">Adı Soyadı</th>
        <th class="fit">Bağlı Birim</th>
        <th>Alt Birim</th>
        <th class="fit">Ünvan</th>
        <th class="fit">Personel Tipi</th>
        <th class="fit">Durumu</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.application.employeeListNewApplication" :key="index">
        <td class="fit">
          <input type="radio" v-model="item.id" @click="selectEmployee(item)" name="selectedEmployee">
        </td>
        <td class="fit">{{ item.sicilNo }}</td>
        <td class="fit">{{ item.adSoyad }}</td>
        <td class="fit">{{ item.bagliBirim }}</td>
        <td>{{ item.altBirim }}</td>
        <td class="fit">{{ item.unvan }}</td>
        <td class="fit">{{ item.personelTipi }}</td>
        <td class="fit">{{ item.durum }}</td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end">
      <button class="btn btn-success"
              @click="getEmployee">Personel Seç
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  components: {},
  data() {
    return {
      showError: false,
      errorMessage: '',
      form: {
        registrationNumber: '',
        identityNumber: '',
        nameSurname: ''
      },
      selectedEmployee: null
    };
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('application', ['changeNewApplicationComponent', 'employeeSearchForNewApplication']),
    getEmployee(){
      if (this.selectedEmployee){
        this.changeNewApplicationComponent({cmp:'NewApplicationMain',data:this.selectedEmployee})
      }else{
        this.showError = true;
        this.errorMessage = this.getMessage(216);
      }
    },
    clear() {
      this.showError=false;
      this.form = Object.assign({}, {
        registrationNumber: '',
        identityNumber: '',
        nameSurname: ''
      });
    },
    list() {
      if (!this.form.registrationNumber && !this.form.identityNumber && !this.form.nameSurname) {
        this.showError = true;
        this.errorMessage = this.getMessage(121);
      } else {
        this.showError = false;
        this.employeeSearchForNewApplication(this.form).then(res => {
          if (res.length === 0) {
            this.showError = true;
            this.errorMessage = this.getMessage(118);
          } else {
            this.showError = false;
          }
        });
      }
    },
    selectEmployee(item) {
      this.selectedEmployee = Object.assign({}, item);
    }
  },
  created() {
    this.$store.state.application.employeeListNewApplication = Object.assign([]);
  }
};
</script>