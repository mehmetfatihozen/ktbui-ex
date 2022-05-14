<template>
  <div>
    <b-modal
        id="modal-confirm-assignment"
        centered
        title="Uyarı"
        ok-title="Atama Yap"
        ok-variant="success"
        header-bg-variant="warning"
        header-text-variant="light"
        cancel-title="Vazgeç"
        @ok="saveConfirm"
    >
      {{ getMessage(306) }}
    </b-modal>
    <b-modal
        id="modal-assignment"
        centered
        :title="$store.state.auth.user.personelKullaniciTipId==57?'Durum Bilgisi':'Atama Yap'"
        :ok-title="$store.state.auth.user.personelKullaniciTipId==57?'Kaydet':'Atama Yap'"
        :ok-variant="$store.state.auth.user.personelKullaniciTipId==57?'success':'secondary'"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="save"
        @hidden="clearForm"
        :busy="showOverlay"
    >
      <div class="form-group">
        <label>Üst Birim</label>
        <select class="form-control" v-model="form.topDepartment"
                :class="{ 'is-invalid': $v.form.topDepartment.$error }"
                :disabled="isEditing"
        >
          <option :value="null">Seçiniz</option>
          <option :value="item.id" v-for="(item,index) in topDepartments" :key="index">
            {{ item.metin }}
          </option>
        </select>
        <template v-if="$v.form.topDepartment.$error">
          <small class="text-danger" v-if="!$v.form.topDepartment.required">{{ this.getMessage(217) }}</small>
        </template>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>Bağlı Birim</label>
            <select class="form-control" v-model="form.linkedDepartment"
                    :class="{ 'is-invalid': $v.form.linkedDepartment.$error }"
                    :disabled="isEditing">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in linkedDepartments" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.linkedDepartment.$error">
              <small class="text-danger" v-if="!$v.form.linkedDepartment.required">{{ this.getMessage(46) }}</small>
            </template>
          </div>
        </div>
        <div class="col-9">
          <div class="form-group">
            <label>Alt Birim</label>
            <select class="form-control" v-model="form.subDepartment"
                    :class="{ 'is-invalid': $v.form.subDepartment.$error }"
                    :disabled="isEditing">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in subDepartments" :key="index">
                {{ item.metin }}
              </option>
            </select>

            <template v-if="$v.form.subDepartment.$error">
              <small class="text-danger" v-if="!$v.form.subDepartment.required">{{ this.getMessage(47) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="form-group">
            <label>Birim</label>
            <select class="form-control" v-model="form.department"
                    :class="{ 'is-invalid': $v.form.department.$error }"
                    :disabled="isEditing">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in departments" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.department.$error">
              <small class="text-danger" v-if="!$v.form.department.required">{{ this.getMessage(48) }}</small>
            </template>
          </div>
        </div>
        <div class="col-5">
          <div class="form-group">
            <label>Personel</label>
            <select class="form-control" v-model="form.employee"
                    :class="{ 'is-invalid': $v.form.employee.$error }"
                    :disabled="isEditing">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in employees" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.employee.$error">
              <small class="text-danger" v-if="!$v.form.employee.required">{{ this.getMessage(216) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-auto">
          <div class="form-group">
            <label>Personel SLA (Saat)</label>
            <vue-mask
                class="form-control  w-auto"
                v-model="form.sla"
                mask="000,00"
                maxlength="6"
                :raw="false"
                :options="options"
                :disabled="$store.state.auth.user.personelKullaniciTipId==57"
            >
            </vue-mask>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Asıl Çözücü</label>
            <label class="label_switch">
              <input type="checkbox" :disabled="$store.state.auth.user.personelKullaniciTipId==57"
                     v-model="form.solvent">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Durum</label>
                <input type="text" class="form-control" disabled
                       :value="form.state">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Alt Durum</label>
                <input type="text" class="form-control" disabled
                       :value="form.subState">
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="row">
            <div class="col-5">
              <div class="form-group">
                <label>Yeni Durum</label>
                <select class="form-control" v-model="form.stateId"
                        :class="{ 'is-invalid': $v.form.stateId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.application.states" :key="index">
                    {{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.stateId.$error">
                  <small class="text-danger" v-if="!$v.form.stateId.required">{{ this.getMessage(38) }}</small>
                </template>
              </div>
            </div>
            <div class="col-7">
              <div class="form-group">
                <label>Yeni Alt Durum</label>
                <select class="form-control" v-model="form.subStateId"
                        :class="{ 'is-invalid': $v.form.subStateId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.application.subStates"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.subStateId.$error">
                  <small class="text-danger" v-if="!$v.form.subStateId.required">{{ this.getMessage(39) }}</small>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="d-flex justify-content-between">Açıklama <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"
        ></textarea>
      </div>
    </b-modal>
    <b-modal
        id="modal-redirect"
        centered
        title="Yönlendir"
        ok-title="Yönlendir"
        ok-variant="secondary"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="redirect"
        @hidden="clearForm"
        :busy="showOverlay"
        @shown="getRedirectDetail"
    >
      <div class="form-group">
        <label>Üst Birim</label>
        <select class="form-control" v-model="form.topDepartment"
                :class="{ 'is-invalid': $v.form.topDepartment.$error }"
                disabled
        >
          <option :value="null">Seçiniz</option>
          <option :value="item.id" v-for="(item,index) in topDepartments" :key="index">
            {{ item.metin }}
          </option>
        </select>
        <template v-if="$v.form.topDepartment.$error">
          <small class="text-danger" v-if="!$v.form.topDepartment.required">{{ this.getMessage(217) }}</small>
        </template>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>Bağlı Birim</label>
            <select class="form-control" v-model="form.linkedDepartment"
                    :class="{ 'is-invalid': $v.form.linkedDepartment.$error }"
                    disabled>
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in linkedDepartments" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.linkedDepartment.$error">
              <small class="text-danger" v-if="!$v.form.linkedDepartment.required">{{ this.getMessage(46) }}</small>
            </template>
          </div>
        </div>
        <div class="col-9">
          <div class="form-group">
            <label>Alt Birim</label>
            <select class="form-control" v-model="form.subDepartment"
                    :class="{ 'is-invalid': $v.form.subDepartment.$error }"
                    disabled>
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in subDepartments" :key="index">
                {{ item.metin }}
              </option>
            </select>

            <template v-if="$v.form.subDepartment.$error">
              <small class="text-danger" v-if="!$v.form.subDepartment.required">{{ this.getMessage(47) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="form-group">
            <label>Birim</label>
            <select class="form-control" v-model="form.department"
                    :class="{ 'is-invalid': $v.form.department.$error }"
                    disabled>
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in departments" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.department.$error">
              <small class="text-danger" v-if="!$v.form.department.required">{{ this.getMessage(48) }}</small>
            </template>
          </div>
        </div>
        <div class="col-5">
          <div class="form-group">
            <label>Personel</label>
            <select class="form-control" v-model="form.employee"
                    :class="{ 'is-invalid': $v.form.employee.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in employees" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.employee.$error">
              <small class="text-danger" v-if="!$v.form.employee.required">{{ this.getMessage(216) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-auto">
          <div class="form-group">
            <label>Personel SLA (Saat)</label>
            <vue-mask
                class="form-control  w-auto"
                v-model="form.sla"
                mask="000,00"
                maxlength="6"
                :raw="false"
                :options="options">
            </vue-mask>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Asıl Çözücü</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.solvent">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Durum</label>
                <input type="text" class="form-control" disabled
                       :value="form.state">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Alt Durum</label>
                <input type="text" class="form-control" disabled
                       :value="form.subState">
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="row">
            <div class="col-5">
              <div class="form-group">
                <label>Yeni Durum</label>
                <select class="form-control" v-model="form.stateId"
                        :class="{ 'is-invalid': $v.form.stateId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.application.states" :key="index">
                    {{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.stateId.$error">
                  <small class="text-danger" v-if="!$v.form.stateId.required">{{ this.getMessage(38) }}</small>
                </template>
              </div>
            </div>
            <div class="col-7">
              <div class="form-group">
                <label>Yeni Alt Durum</label>
                <select class="form-control" v-model="form.subStateId"
                        :class="{ 'is-invalid': $v.form.subStateId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.application.subStates"
                          :key="index">
                    {{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.subStateId.$error">
                  <small class="text-danger" v-if="!$v.form.subStateId.required">{{ this.getMessage(39) }}</small>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="d-flex justify-content-between">Açıklama <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"
        ></textarea>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Durum</th>
        <th class="fit">Alt Durum</th>
        <th class="fit">Personel</th>
        <th>Birim</th>
        <th class="fit">SLA</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="basvuruyonetimi/basvurular">
            <img
                v-if="$store.state.auth.user.personelKullaniciTipId===64 && !$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled"
                src="@/assets/img/icons/plus-circle.png"
                alt="" class="cursor-pointer"
                @click="showAddModal">
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr :class="item.atananPersonelId===$store.state.auth.user.id&&!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled?'cursor-pointer':''"
          v-for="(item,index) in $store.state.application.applicationStateAndAssignInfo" :key="index"
          v-on="item.atananPersonelId===$store.state.auth.user.id?{click:()=>showEditModal(item.basvuruDurumId)}:{}"
      >
        <td class="fit">{{ item.durum }}</td>
        <td class="fit">{{ item.altDurum }}</td>
        <td class="fit">{{ item.personel }}</td>
        <td>{{ item.birim }}</td>
        <td class="fit">{{ item.sla }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
        <td class="fit">
          <button v-if="item.atama" class="btn btn-sm btn-outline-secondary"
                  @click="changeStatusAssignmentComponent({cmp:'StatusAssignmentHistory',data:item})">Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      options: {
        reverse: true
      },
      isEditing: false,
      maxDescriptionLength: 5000,
      showOverlay: false,
      topDepartments: [],
      linkedDepartments: [],
      subDepartments: [],
      departments: [],
      employees: [],
      form: {
        applicationStateId: null,
        id: this.$route.params.id,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null,
        employee: null,
        sla: '',
        solvent: false,
        stateId: null,
        state: '',
        subStateId: null,
        subState: '',
        description: ''
      }
    }
  },
  validations: {
    form: {
      topDepartment: {
        required,
      },
      linkedDepartment: {
        required
      },
      subDepartment: {
        required
      },
      department: {
        required
      },
      employee: {
        required
      },
      stateId: {
        required
      },
      subStateId: {
        required
      }
    }
  },
  methods: {
    ...mapActions('application', [
      'redirectApplication',
      'getStateAndAssignInfoStateDetail',
      'getStateAndAssignInfoDetail',
      'changeStatusAssignmentComponent',
      'getStateAndAssignInfo',
      'createApplicationAssign',
      'getEmployeeStates',
      'getEmployeeSubStates']),
    ...mapActions('parameter', [
      'getDepartments',
      'getEmployeeByDepartmentId']),
    ...mapActions('general', ['showModal']),
    redirect() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.redirectApplication(this.form).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
            this.$bvModal.hide('modal-redirect');
            this.getStateAndAssignInfo(this.$route.params.id);
          }
        }).catch(err => {
          this.showOverlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    saveConfirm() {
      this.showOverlay = true;
      this.createApplicationAssign(this.form).then((res) => {
        this.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
          this.$bvModal.hide('modal-assignment');
          this.getStateAndAssignInfo(this.$route.params.id);
        }
      }).catch(err => {
        this.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$bvModal.show('modal-confirm-assignment');
      }
    },
    clearForm() {
      this.$v.$reset();
      this.isEditing = false;
      this.form = Object.assign({}, {
        applicationStateId: null,
        id: this.$route.params.id,
        topDepartment: null,
        linkedDepartment: null,
        subDepartment: null,
        department: null,
        employee: null,
        sla: '',
        solvent: false,
        stateId: null,
        state: '',
        subStateId: null,
        subState: '',
        description: ''
      });
    },
    showAddModal() {
      this.$bvModal.show('modal-assignment');
    },
    showEditModal(id) {
      if (!this.$store.state.application.applicationDetail.basvuruKapali && !this.isApplicationCancelled) {
        this.isEditing = true;
        this.getStateAndAssignInfoDetail(id).then(res => {
          this.form = Object.assign({}, {
            applicationStateId: id,
            id: this.$route.params.id,
            topDepartment: res.data.ustBirimId,
            linkedDepartment: res.data.bagliBirimId,
            subDepartment: res.data.altBirimId,
            department: res.data.birimId,
            employee: res.data.atananPersonelId,
            sla: res.data.sla,
            solvent: res.data.asilCozucu,
            state: res.data.durum,
            stateId: res.data.durumId,
            subState: res.data.altDurum,
            subStateId: res.data.altDurumId,
            description: res.data.aciklama
          });
          this.$bvModal.show('modal-assignment');
        });
      }
    },
    getRedirectDetail() {
      this.isEditing = true;
      this.getStateAndAssignInfoStateDetail(this.$route.params.id).then(res => {
        this.form = Object.assign({}, {
          id: this.$route.params.id,
          topDepartment: res.data.ustBirimId,
          linkedDepartment: res.data.bagliBirimId,
          subDepartment: res.data.altBirimId,
          department: res.data.birimId,
          employee: res.data.atananPersonelId,
          sla: res.data.sla,
          solvent: res.data.asilCozucu,
          state: res.data.durum,
          stateId: res.data.durumId,
          subState: res.data.altDurum,
          subStateId: res.data.altDurumId,
          description: res.data.aciklama ? res.data.aciklama : ''
        });
        this.$bvModal.show('modal-redirect');
      });
    }
  },
  created() {
    this.getDepartments().then(res => {
      this.topDepartments = Object.assign([], res.data);
    });
    this.getEmployeeStates();
    this.getStateAndAssignInfo(this.$route.params.id);
  },
  computed: {
    ...mapGetters('application', ['isApplicationCancelled']),
    isOwnerDifferent() {
      return this.$store.state.application.applicationDetail.basvuruSahibiId !== this.$store.state.auth.user.id;
    }
  },
  watch: {
    'form.topDepartment'(nw) {
      if (!this.isEditing) {
        this.form.linkedDepartment = null;
      }
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.linkedDepartments = Object.assign([], res.data);
        });
      } else {
        this.linkedDepartments = Object.assign([]);
      }
    },
    'form.linkedDepartment'(nw) {
      if (!this.isEditing) {
        this.form.subDepartment = null;
      }
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.subDepartments = Object.assign([], res.data);
        });
      } else {
        this.subDepartments = Object.assign([]);
      }
    },
    'form.subDepartment'(nw) {
      if (!this.isEditing) {
        this.form.department = null;
      }
      if (nw) {
        this.getDepartments(nw).then(res => {
          this.departments = Object.assign([], res.data);
        });
      } else {
        this.departments = Object.assign([]);
      }
    },
    'form.department'(nw) {
      if (!this.isEditing) {
        this.form.employee = null;
      }
      if (nw) {
        this.getEmployeeByDepartmentId(nw).then(res => {
          this.employees = Object.assign([], res.data);
        });
      } else {
        this.employees = Object.assign([]);
      }
    },
    'form.stateId'(nw) {
      if (!this.isEditing) {
        this.form.subStateId = null;
      }
      if (nw) {
        this.getEmployeeSubStates(nw);
      } else {
        this.$store.state.application.subStates = Object.assign([]);
      }
    }
  }
}
</script>