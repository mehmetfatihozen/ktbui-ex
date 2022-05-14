<template>
  <div>
    <Can I="create" a="ik/personel">
      <b-modal
          id="modal-add-user-info"
          size="lg"
          centered
          title="Yeni Birim Bilgileri Girişi"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="save"
          @hidden="clearAddForm"
      >
        <div class="form-group">
          <label>Üst Yönetim</label>
          <select class="form-control" v-model="form.topDepartmentId"
                  :class="{ 'is-invalid': $v.form.topDepartmentId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in $store.state.hr.userInfoParameters.ustYonetim" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.form.topDepartmentId.$error">
            <small class="text-danger" v-if="!$v.form.topDepartmentId.required">{{ this.getMessage(217) }}</small>
          </template>
        </div>
        <div class="form-group">
          <label>Bağlı Birim</label>
          <select class="form-control" v-model="form.linkedDepartmentId"
                  :class="{ 'is-invalid': $v.form.linkedDepartmentId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in linkedDepartments" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.form.linkedDepartmentId.$error">
            <small class="text-danger" v-if="!$v.form.linkedDepartmentId.required">{{ this.getMessage(46) }}</small>
          </template>
        </div>
        <div class="form-group">
          <label>Alt Birim</label>
          <select class="form-control" v-model="form.subDepartmentId"
                  :class="{ 'is-invalid': $v.form.subDepartmentId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in subDepartments" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.form.subDepartmentId.$error">
            <small class="text-danger" v-if="!$v.form.subDepartmentId.required">{{ this.getMessage(47) }}</small>
          </template>
        </div>
        <div class="form-group">
          <label>Birim</label>
          <select class="form-control" v-model="form.departmentId"
                  :class="{ 'is-invalid': $v.form.departmentId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in departments" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.form.departmentId.$error">
            <small class="text-danger" v-if="!$v.form.departmentId.required">{{ this.getMessage(48) }}</small>
          </template>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Ünvan</label>
              <select class="form-control" v-model="form.titleId" :class="{ 'is-invalid': $v.form.titleId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.hr.userInfoParameters.unvanlar"
                        :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.titleId.$error">
                <small class="text-danger" v-if="!$v.form.titleId.required">{{ this.getMessage(49) }}</small>
              </template>
            </div>
          </div>
          <div class="col-3">
            <div class="form group">
              <label>Başlama Tarihi</label>
              <date-picker v-model="form.startDate"
                           :input-class="$v.form.startDate.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
                           :disabled-date="disabledStartDate"
              ></date-picker>
              <template v-if="$v.form.startDate.$error">
                <small class="text-danger" v-if="!$v.form.startDate.required">{{ this.getMessage(40) }}</small>
                <small class="text-danger" v-if="!$v.form.startDate.checkStateDate">{{ this.getMessage(43) }}</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
          id="modal-edit-user-info"
          size="lg"
          centered
          title="Birim Bilgileri Güncelleme"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="update"
          @hidden="$v.$reset()"
      >
        <div class="form-group">
          <label>Üst Yönetim</label>
          <input type="text" class="form-control" disabled :value="userInfoDetailParameters.ustYonetim">
        </div>
        <div class="form-group">
          <label>Bağlı Birim</label>
          <input type="text" class="form-control" disabled :value="userInfoDetailParameters.bagliBirim">
        </div>
        <div class="form-group">
          <label>Alt Birim</label>
          <select class="form-control" v-model="userInfoDetailParameters.altBirimId"
                  :class="{ 'is-invalid': $v.userInfoDetailParameters.altBirimId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in userInfoDetailParameters.altBirimler" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.userInfoDetailParameters.altBirimId.$error">
            <small class="text-danger" v-if="!$v.userInfoDetailParameters.altBirimId.required">Alt Birim
              seçilmelidir</small>
          </template>
        </div>
        <div class="form-group">
          <label>Birim</label>
          <select class="form-control" v-model="userInfoDetailParameters.birimId"
                  :class="{ 'is-invalid': $v.userInfoDetailParameters.birimId.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item.id" v-for="(item,index) in userInfoDetailParameters.birimler" :key="index">
              {{ item.metin }}
            </option>
          </select>
          <template v-if="$v.userInfoDetailParameters.birimId.$error">
            <small class="text-danger" v-if="!$v.userInfoDetailParameters.birimId.required">Birim seçilmelidir</small>
          </template>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Unvan</label>
              <select class="form-control" v-model="userInfoDetailParameters.unvanId"
                      :class="{ 'is-invalid': $v.userInfoDetailParameters.unvanId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in userInfoDetailParameters.unvanlar" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.userInfoDetailParameters.unvanId.$error">
                <small class="text-danger" v-if="!$v.userInfoDetailParameters.unvanId.required">Unvan
                  seçilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col-3">
            <div class="form group">
              <label>Başlama Tarihi</label>
              <date-picker v-model="userInfoDetailParameters.baslamaTarihi"
                           :input-class="$v.userInfoDetailParameters.baslamaTarihi.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
                           disabled
              ></date-picker>
              <template v-if="$v.userInfoDetailParameters.baslamaTarihi.$error">
                <small class="text-danger" v-if="!$v.userInfoDetailParameters.baslamaTarihi.required">Unvan
                  seçilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col-3">
            <div class="form group">
              <label>Birim Ayrılma Nedeni</label>
              <select class="form-control" v-model="userInfoDetailParameters.ayrilmaNedeniId">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in userInfoDetailParameters.ayrilmaNedenleri" :key="index">
                  {{ item.metin }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Çıkış Tarihi</label>
              <date-picker v-model="userInfoDetailParameters.cikisTarihi"
                           :input-class="$v.userInfoDetailParameters.cikisTarihi.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
                           :disabled="!userInfoDetailParameters.ayrilmaNedeniId"
              ></date-picker>
              <template v-if="$v.userInfoDetailParameters.cikisTarihi.$error">
                <small class="text-danger" v-if="!$v.userInfoDetailParameters.cikisTarihi.requiredIf">Çıkış Tarihi
                  girilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col-9">
            <div class="form-group">
              <label>SGK İşten Çıkış Nedeni</label>
              <input type="text" class="form-control" :disabled="!userInfoDetailParameters.ayrilmaNedeniId"
                     v-model="userInfoDetailParameters.cikisNedeni"
                     :class="{ 'is-invalid': $v.userInfoDetailParameters.cikisNedeni.$error }">
              <template v-if="$v.userInfoDetailParameters.cikisNedeni.$error">
                <small class="text-danger" v-if="!$v.userInfoDetailParameters.cikisNedeni.requiredIf">Çıkış Nedeni
                  girilmelidir</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
    </Can>
    <table class="table table-hover" v-if="!showHistory">
      <thead>
      <tr>
        <th class="w-25">Bağlı Birim</th>
        <th class="w-50">Alt Birim</th>
        <th class="w-50">Birim</th>
        <th class="fit">Ünvan</th>
        <th class="fit">Başlama Tarihi</th>
        <th class="fit">Bitiş Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="ik/personel">
            <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-user-info
                            v-if="showPlus"/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal" v-for="(item,index) in $store.state.hr.employeeUserInfos"
          :key="index">
        <td class="w-25">{{ item.bagliBirim }}</td>
        <td class="w-50">{{ item.altBirim }}</td>
        <td class="w-50">{{ item.birim }}</td>
        <td class="fit">{{ item.unvan }}</td>
        <td class="fit">{{ item.baslamaTarihi }}</td>
        <td class="fit">{{ item.bitisTarihi }}</td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-sm" @click.stop="showDepartmentHistory">Tarihçe</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="showHistory">
      <div class="row mb-3 justify-content-between">
        <div class="col-10 d-flex align-items-center">
          <h5 class="mb-0">TARİHÇE</h5>
        </div>
        <div class="col-sm-auto d-flex justify-content-end">
          <button class="btn btn-outline-secondary" @click="showHistory=false">
            <font-awesome-icon icon="angle-double-left" class="mr-2"/>
            Geri Dön
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th class="w-25">Bağlı Birim</th>
          <th class="w-50">Alt Birim</th>
          <th class="w-50">Birim</th>
          <th class="fit">Unvan</th>
          <th class="fit">Başlama Tarihi</th>
          <th class="fit">Bitiş Tarihi</th>
          <th class="fit">
            Birim Ayrılma ve SGK Çıkış Nedeni
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.hr.departmentHistories" :key="index">
          <td class="w-25">{{ item.bagliBirim }}</td>
          <td class="w-50">{{ item.altBirim }}</td>
          <td class="w-50">{{ item.birim }}</td>
          <td class="fit">{{ item.unvan }}</td>
          <td class="fit">{{ item.baslamaTarihi }}</td>
          <td class="fit">{{ item.bitisTarihi }}</td>
          <td>
            {{ item.cikisNedeni }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters, mapState} from "vuex";
import {required, requiredIf} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon,
    DatePicker
  },
  data() {
    return {
      disabledStartDate: (date) => date > new Date(),
      overlay: false,
      topDepartments: [],
      linkedDepartments: [],
      subDepartments: [],
      departments: [],
      titles: [],
      showHistory: false,
      form: {
        employeeId: this.$route.params.id,
        topDepartmentId: null,
        linkedDepartmentId: null,
        subDepartmentId: null,
        departmentId: null,
        titleId: null,
        startDate: ''
      }
    }
  },
  validations: {
    form: {
      topDepartmentId: {
        required
      },
      linkedDepartmentId: {
        required
      },
      subDepartmentId: {
        required
      },
      departmentId: {
        required
      },
      titleId: {
        required
      },
      startDate: {
        required,
        checkStateDate: function (val) {
          if (!val) return true;
          if (this.$store.state.hr.employeeGeneralInfo.durumId != 2) return true;
          const date = this.$moment(val, "DD.MM.YYYY")
          const diff = date.diff(this.$moment(this.$store.state.hr.employeeGeneralInfo.durumTarihi, "DD.MM.YYYY"), 'days')
          return diff >= 0;
        }
      }
    },
    userInfoDetailParameters: {
      altBirimId: {
        required
      },
      birimId: {
        required
      },
      unvanId: {
        required
      },
      baslamaTarihi: {
        required
      },
      cikisTarihi: {
        requiredIf: requiredIf(function (form) {
          return form.ayrilmaNedeniId != null
        })
      },
      cikisNedeni: {
        requiredIf: requiredIf(function (form) {
          return form.ayrilmaNedeniId != null
        })
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['getDepartmentHistory', 'updateEmployeeUserInfo', 'getUserInfoDetailParameters', 'getUserInfoParameters', 'addEmployeeUserInfo', 'getEmployeeUserInfos']),
    ...mapActions('parameter', ['getDepartments']),
    showDepartmentHistory() {
      this.getDepartmentHistory(this.$route.params.id);
      this.showHistory = true
    },
    clearAddForm() {
      this.$v.$reset();
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        topDepartmentId: null,
        linkedDepartmentId: null,
        subDepartmentId: null,
        departmentId: null,
        titleId: null,
        startDate: ''
      });
    },
    showEditModal() {
      this.getUserInfoDetailParameters(this.$route.params.id).then(() => {
        this.$bvModal.show('modal-edit-user-info');
      });
    },
    save() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.overlay = true;
        this.addEmployeeUserInfo(this.form).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-add-user-info');
            this.showModal({title: 'İşlem Başarılı', message: this.getMessage(19), type: 'success'});
          }
        }).catch(err => {
          this.overlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    update() {
      this.$v.userInfoDetailParameters.$touch();
      if (!this.$v.userInfoDetailParameters.$invalid) {
        this.overlay = true;
        this.updateEmployeeUserInfo(this.userInfoDetailParameters).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-edit-user-info');
            this.showModal({title: 'İşlem Başarılı', message: this.getMessage(56), type: 'success'});
          }
        }).catch(err => {
          this.overlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    }
  },
  created() {
    this.getUserInfoParameters();
    this.getEmployeeUserInfos(this.$route.params.id);
  },
  computed: {
    ...mapState('hr', ['userInfoDetailParameters']),
    ...mapGetters('general',['getMessage']),
    showPlus() {
      return (this.$store.state.hr.employeeUserInfos.length === 1 && this.$store.state.hr.employeeUserInfos[0].bitisTarihi) || this.$store.state.hr.employeeUserInfos.length === 0;
    }
  },
  watch: {
    'form.topDepartmentId'(nw) {
      this.form.linkedDepartmentId = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.linkedDepartments = Object.assign([], res.data);
        });
      } else {
        this.linkedDepartments = Object.assign([]);
      }
    },
    'form.linkedDepartmentId'(nw) {
      this.form.subDepartmentId = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.subDepartments = Object.assign([], res.data);
        });
      } else {
        this.subDepartments = Object.assign([]);
      }
    },
    'form.subDepartmentId'(nw) {
      this.form.departmentId = null;
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.departments = Object.assign([], res.data);
        });
      } else {
        this.departments = Object.assign([]);
      }
    },
    /*'form.departmentId'(nw) {
        this.form.titleId = null;
    },*/
  }
}
</script>

<style scoped>

</style>