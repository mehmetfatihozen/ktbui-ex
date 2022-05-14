<template>
  <div class="standart-page">
    <h3 class="title">PERSONEL YÖNETİMİ</h3>
    <div class="card-component mb-5">
      <div class="body">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Sicil No</label>
                  <input type="text" class="form-control" v-model="form.registrationNumber">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>TC Kimlik No</label>
                  <input type="text" class="form-control" v-model="form.identityNumber"
                         maxlength="11"
                         v-mask="'###########'"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Adı Soyadı</label>
                  <input type="text" class="form-control" v-model="form.nameSurname" @keypress="isLetter"
                         maxlength="50">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Kan Grubu</label>
                  <select class="form-control" v-model="form.bloodGroup">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.filterParameters.kanGruplari"
                            :key="index">{{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Durumu</label>
              <select class="form-control" v-model="form.state">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.hr.filterParameters.durumlar" :key="index">
                  {{ item.metin }}
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Alt Durumu</label>
              <select class="form-control" v-model="form.subState">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.subStates" :key="index">
                  {{ item.metin }}
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Personel Tipi</label>
              <select class="form-control" v-model="form.employeeType">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.hr.filterParameters.personelTipleri"
                        :key="index">{{ item.metin }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Üst Birim</label>
              <select class="form-control" v-model="form.topDepartment">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.hr.filterParameters.ustBirimler"
                        :key="index">{{ item.metin }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Bağlı Birim</label>
              <select class="form-control" v-model="form.linkedDepartment">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in linkedDepartments" :key="index">{{
                    item.metin
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Alt Birim</label>
              <select class="form-control" v-model="form.subDepartment">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in subDepartments" :key="index">{{ item.metin }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="row">
          <div class="col-5">
            <div class="form-group mb-0">
              <label>Birim</label>
              <select class="form-control" v-model="form.department">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in departments" :key="index">{{ item.metin }}</option>
              </select>
            </div>
          </div>
          <div class="col-7 d-flex justify-content-end align-items-end">
            <Can I="create" a="ik/personel">
              <button class="btn btn-outline-primary" v-if="showPcSaveButton">PC Kaydet</button>
            </Can>
            <button class="btn btn-outline-secondary" @click="clear">Temizle</button>
            <button class="btn btn-secondary" @click="list">Listele</button>
          </div>
        </div>
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
      <tr v-for="(item,index) in $store.state.hr.employees.personeller" :key="index" class="cursor-pointer"
          @click="$router.push('/human-resources/employee/detail/'+item.id)">
        <td class="fit">
          <img :src="item.profilResmi" alt="" height="30" width="30" class="rounded-circle">
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
    <div class="alert alert-danger text-center" v-if="showError">
      {{ errorMessage }}
    </div>
    <div class="row" v-if="$store.state.hr.employees.personeller.length>0">
      <div class="col">
        <i class="text-secondary">{{ $store.state.hr.employees.sayfalama.totalItems }} kayıttan {{
            ((currentPage - 1) * pageSize) + 1
          }} - {{ currentPage * pageSize }} arası gösterilmektedir</i>
      </div>
      <div class="col">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <nav>
              <paginate v-if="$store.state.hr.employees.personeller.length"
                        :page-count="$store.state.hr.employees.sayfalama.totalPages"
                        :click-handler="changePage"
                        :prev-text="'Önceki'"
                        :next-text="'Sonraki'"
                        :active-class="'active'"
                        :container-class="'pagination'"

                        v-model="$store.state.application.applications.sayfalama.currentPage">
              </paginate>
            </nav>
          </div>
          <div class="col-2">
            <select class="form-control" v-model="pageSize" @change="changeSize">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      prevRoute: null,
      showError: false,
      errorMessage: '',
      linkedDepartments: [],
      subDepartments: [],
      departments: [],
      showPcSaveButton: false,
      form: {
        registrationNumber: '',
        identityNumber: '',
        nameSurname: '',
        bloodGroup: null,
        state: null,
        subState: null,
        employeeType: null,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null
      },
      currentPage: 1,
      pageSize: 25
    }
  },
  methods: {
    ...mapActions('hr', ['getEmployeeFilterParameters', 'getAllEmployee']),
    ...mapActions('parameter', ['getSubStates', 'getDepartments']),
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-zığüşöçİĞÜŞÖÇ ]+$/.test(char)) return true; // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    clear() {
      this.$store.state.hr.employees = Object.assign({}, {
        personeller: [],
        sayfalama: {}
      });
      this.showPcSaveButton = false;
      this.form = Object.assign({}, {
        registrationNumber: '',
        identityNumber: '',
        nameSurname: '',
        bloodGroup: null,
        state: null,
        subState: null,
        employeeType: null,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null
      });
      this.currentPage = 1;
      this.pageSize = 25;
    },
    changeSize() {
      this.list();
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.list();
    },
    list() {
      this.$store.state.hr.duplicateForm = Object.assign({}, this.form);
      this.$store.state.hr.showNewEmployeeButton = true;
      const isEmpty = !Object.values(this.form).some(val => val);
      if (isEmpty) {
        this.showError = true;
        this.errorMessage = this.getMessage(140);
        this.clear();
      } else {
        this.showError = false;
        this.showPcSaveButton = true;
        this.getAllEmployee({
          data: this.form,
          paging: {pageSize: this.pageSize, currentPage: this.currentPage}
        }).then(res => {
          if ((res.data && res.data.personeller.length === 0) || !res.data) {
            this.showError = true;
            this.errorMessage = this.getMessage(118);
          } else {
            this.showError = false;
          }
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  created() {
    this.getEmployeeFilterParameters();
  },
  watch: {
    prevRoute(nw) {
      if (nw.name === 'human-resources/employee-detail') {
        if (Object.keys(this.$store.state.hr.duplicateForm).length > 0) {
          this.form = Object.assign({}, this.$store.state.hr.duplicateForm);
        }
      } else {
        this.clear();
      }
    },
    'form.topDepartment'(nw) {
      this.form.linkedDepartment = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.linkedDepartments = Object.assign([], res.data);
        });
      } else {
        this.linkedDepartments = Object.assign([]);
      }
    },
    'form.linkedDepartment'(nw) {
      this.form.subDepartment = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.subDepartments = Object.assign([], res.data);
        });
      } else {
        this.subDepartments = Object.assign([]);
      }
    },
    'form.subDepartment'(nw) {
      this.form.department = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.departments = Object.assign([], res.data);
        });
      } else {
        this.departments = Object.assign([]);
      }
    },
    'form.state'(nw) {
      this.form.subState = null;
      if (nw) {
        this.getSubStates(nw);
      } else {
        this.$store.state.parameter.subStates = Object.assign([]);
      }
    }
  },
  computed: {
    ...mapGetters('general', ['getMessage'])
  }
};
</script>