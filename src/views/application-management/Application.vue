<template>
  <div class="pools standart-page">
    <h3 class="title">BAŞVURULAR</h3>
    <div class="card-component mb-4">
      <div class="body">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label>Başvuru No</label>
                  <input type="text" class="form-control" v-model="form.applicationNo">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label>Durum</label>
                  <select class="form-control" v-model="form.state">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in $store.state.application.filterParameters.basvuruDurum"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Alt Durum</label>
                  <select class="form-control" v-model="form.subState">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in subStates"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Öncelik</label>
                  <select class="form-control" v-model="form.priority">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.application.filterParameters.oncelik"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Başvuru Konusu</label>
              <input type="text" class="form-control" v-model="form.topic">
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label>Başvuru Sahibi</label>
              <input type="text" class="form-control" v-model="form.applicationOwner">
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Baş. Tarihi</label>
                      <date-picker v-model="form.startDate"
                                   input-class="form-control"
                                   format="DD.MM.YYYY"
                      ></date-picker>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Bitiş Tarihi</label>
                      <date-picker v-model="form.endDate"
                                   :input-class="$v.form.endDate.$error?'is-invalid form-control':'form-control'"
                                   format="DD.MM.YYYY"
                      ></date-picker>

                      <template v-if="$v.form.endDate.$error">
                        <small class="text-danger" v-if="!$v.form.endDate.requiredIf">{{ this.getMessage(150) }}</small>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Başvuru Tipi</label>
                  <select class="form-control" v-model="form.applicationType">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in $store.state.application.filterParameters.basvuruTipleri"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="filter-detail" v-if="showFilterDetail">
          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <label>Üst Birim</label>
                <select class="form-control" v-model="form.topDepartment">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in $store.state.application.filterParameters.ustBirim"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label>Bağlı Birim</label>
                <select class="form-control" v-model="form.linkedDepartment">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in linkedDepartments"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label>Alt Birim</label>
                <select class="form-control" v-model="form.subDepartment">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in subDepartments"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Birim</label>
                <select class="form-control" v-model="form.department">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in departments"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <div class="form-group">
                <label>Atanan Personel</label>
                <select class="form-control" v-model="form.employee">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in employees"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-3">
              <div class="form-group">
                <label>Başvuru Konusu</label>
                <select class="form-control" v-model="form.topicId">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in $store.state.application.filterParameters.basvuruKonulari"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Başvuru Detayı</label>
                <select class="form-control" v-model="form.topicDetailId">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id"
                          v-for="(item,index) in topicDetails"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer d-flex justify-content-end">
        <button class="btn btn-outline-primary" @click.prevent="showFilterDetail=!showFilterDetail">{{
            showFilterDetail ? 'Özet Arama' : 'Detaylı Arama'
          }}
        </button>
        <button class="btn btn-outline-secondary" @click="clear">Temizle</button>
        <button class="btn btn-secondary" @click="listApplications">Listele</button>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-8 d-flex">
          <button v-if="$store.state.auth.user.personelKullaniciTipId!=57" class="btn font-weight-bold mr-3"
                  :class="form.activeListType===0?'btn-secondary btn-block btn-sm mt-0':'btn-outline-secondary btn-block btn-sm mt-0'"
                  @click="changeActiveListType(0)">Atama
            Bekleyenler
          </button>
          <button v-if="$store.state.auth.user.personelKullaniciTipId!=57" class="btn font-weight-bold mr-3"
                  :class="form.activeListType===1?'btn-secondary btn-block btn-sm mt-0':'btn-outline-secondary btn-block btn-sm mt-0'"
                  @click="changeActiveListType(1)">
            Atananlar
          </button>
          <button class="btn font-weight-bold mr-3"
                  :class="form.activeListType===2?'btn-secondary btn-block btn-sm mt-0':'btn-outline-secondary btn-block btn-sm mt-0'"
                  @click="changeActiveListType(2)">Bana
            Atananlar
          </button>
          <button class="btn font-weight-bold mr-3"
                  :class="form.activeListType===3?'btn-secondary btn-block btn-sm mt-0':'btn-outline-secondary btn-block btn-sm mt-0'"
                  @click="changeActiveListType(3)">
            Başvurularım
          </button>
          <button class="btn font-weight-bold"
                  :class="form.activeListType===4?'btn-secondary btn-block btn-sm mt-0':'btn-outline-secondary btn-block btn-sm mt-0'"
                  @click="changeActiveListType(4)">
            Hepsi
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mt-3 mb-3">
          <thead>
          <tr>
            <th class="text-nowrap">Başvuru No</th>
            <th class="text-nowrap">Başvuru Sahibi</th>
            <th class="text-nowrap">Başvuru Konusu / Detayı</th>
            <th class="text-nowrap">Öncelik</th>
            <th class="text-nowrap">Başvuru Tarihi</th>
            <th class="text-nowrap">Durum</th>
            <th class="text-nowrap">Atanan Personel</th>
            <th class="text-nowrap">Çözüm</th>
            <th class="text-nowrap">Durum Tarihi</th>
            <th class="text-nowrap">Süre</th>
          </tr>
          </thead>
          <tbody>
          <tr class="cursor-pointer"
              @click="item.basvuruDurumId?$router.push('/application-management/applications/detail/'+item.basvuruId):$router.push('/application-management/applications/next/'+item.basvuruId)"
              v-for="item in $store.state.application.applications.liste"
              :key="item.id"
          >
            <td class="text-nowrap">{{ item.basvuruId }}</td>
            <td class="text-nowrap">{{ item.basvuruSahibi }}</td>
            <td class="col">
              {{ item.konuBasligi }}
            </td>
            <td class="text-nowrap">{{ item.oncelik }}</td>
            <td class="text-nowrap">{{ item.basvuruTarihi }}</td>
            <td class="text-nowrap">{{ item.basvuruDurumu }}</td>
            <td class="text-nowrap">
              <span class="d-block" v-for="(assigned,assignedIndex) in item.atanan" :key="assignedIndex">
                {{ assigned.atananPersonel }}
              </span>
            </td>
            <td class="text-nowrap">
              <span class="d-block" v-for="(assigned,assignedIndex) in item.atanan" :key="assignedIndex">
                {{ assigned.cozum }}
              </span>
            </td>
            <td class="text-nowrap">
               <span class="d-block" v-for="(assigned,assignedIndex) in item.atanan" :key="assignedIndex">
                {{ assigned.basvuruTarihi }}
              </span>
            </td>
            <td class="text-nowrap">
              <span class="d-block" v-for="(assigned,assignedIndex) in item.atanan" :key="assignedIndex">
                {{ assigned.sure }}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="alert alert-danger text-center" v-if="showError">
        {{ errorMessage }}
      </div>
      <div class="row" v-if="$store.state.application.applications.liste.length>0">
        <div class="col">
          <i class="text-secondary">{{ $store.state.application.applications.sayfalama.totalItems }} kayıttan {{
              ((form.currentPage - 1) * form.pageSize) + 1
            }} - {{ form.currentPage * form.pageSize }} arası gösterilmektedir</i>
        </div>
        <div class="col">
          <div class="row">
            <div class="col d-flex justify-content-end">
              <nav>
                <paginate v-if="$store.state.application.applications.liste.length"
                          :page-count="$store.state.application.applications.sayfalama.totalPages"
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
              <select class="form-control" v-model="form.pageSize" @change="changeSize">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import {requiredIf} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      prevRoute:null,
      errorMessage: 'Listeleme için uygun kayıt bulunamadı',
      showError: false,
      showFilterDetail: false,
      subStates: [],
      linkedDepartments: [],
      subDepartments: [],
      departments: [],
      employees: [],
      topicDetails: [],
      form: {
        activeListType: null,
        applicationNo: '',
        state: null,
        subState: null,
        priority: null,
        topic: '',
        applicationOwner: '',
        startDate: '',
        endDate: '',
        applicationType: null,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null,
        employee: null,
        topicId: null,
        topicDetailId: null,
        currentPage: 1,
        pageSize: 25
      }
    };
  },
  components: {
    DatePicker
  },
  validations: {
    form: {
      endDate: {
        requiredIf: requiredIf(function (form) {
          return form.startDate != '';
        })
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('parameter', ['getDepartments', 'getEmployeeByDepartmentId']),
    ...mapActions('application', ['getApplications', 'getFilterParameters', 'getEmployeeSubStates', 'getApplicationTopicDetailDd']),
    clear() {
      this.form = Object.assign({}, {
        activeListType: null,
        applicationNo: '',
        state: null,
        subState: null,
        priority: null,
        topic: '',
        applicationOwner: '',
        startDate: '',
        endDate: '',
        applicationType: null,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null,
        employee: null,
        topicId: null,
        topicDetailId: null,
        currentPage: 1,
        pageSize: 25
      })
      this.$store.state.application.showNewApplicationButton = false;
      this.$store.state.application.applications = Object.assign({}, {
        liste: [],
        sayfalama: {}
      });
    },
    changeSize() {
      this.getApplications(this.form);
    },
    changePage(pageNumber) {
      this.form.currentPage = pageNumber;
      this.getApplications(this.form);
    },
    changeActiveListType(id) {
      this.form.activeListType = id;
      this.$store.state.application.duplicateForm = Object.assign({}, this.form);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.getApplications(this.form).then(res => {
          if (res.data && res.data.liste.length > 0) {
            this.showError = false;
          } else {
            this.showError = true;
          }
        });
      }
    },
    listApplications() {
      this.form.activeListType = this.$store.state.auth.user.personelKullaniciTipId != 57 ? 0 : 2;
      this.$store.state.application.duplicateForm = Object.assign({}, this.form);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.getApplications(this.form).then(res => {
          if (res.data && res.data.liste.length > 0) {
            this.showError = false;
          } else {
            this.showError = true;
          }
        });
        this.$store.state.application.showNewApplicationButton = true;
      }
    },
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  created() {
    if (Object.keys(this.$store.state.application.duplicateForm).length > 0) {
      this.form = Object.assign({}, this.$store.state.application.duplicateForm);
    }
    this.getFilterParameters();
  },
  watch: {
    prevRoute(nw) {
      if (nw.name === 'application-management/application-detail') {
        if (Object.keys(this.$store.state.application.duplicateForm).length > 0) {
          this.form = Object.assign({}, this.$store.state.application.duplicateForm);
        }
      } else {
        this.clear();
      }
    },
    'form.state'(nw) {
      this.form.subState = null;
      if (nw) {
        this.getEmployeeSubStates(nw).then(res => {
          this.subStates = Object.assign([], res.data);
        });
      } else {
        this.subStates = Object.assign([]);
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
    'form.department'(nw) {
      this.form.employee = null;
      if (nw) {
        this.getEmployeeByDepartmentId(nw).then(res => {
          this.employees = Object.assign([], res.data);
        });
      } else {
        this.employees = Object.assign([]);
      }
    },
    'form.topicId'(nw) {
      this.form.topicDetailId = null;
      if (nw) {
        this.getApplicationTopicDetailDd(nw).then(res => {
          this.topicDetails = Object.assign([], res.data);
        });
      } else {
        this.topicDetails = Object.assign([]);
      }
    }
  }
};
</script>