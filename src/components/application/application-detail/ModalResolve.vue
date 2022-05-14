<template>
  <div>
    <b-modal
        id="modal-resolve"
        centered
        title="Başvuruyu Çözümle"
        ok-title="Başvuruyu Çözümle"
        ok-variant="secondary"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="resolve"
        @hidden="clearForm"
        :busy="overlay"
        @shown="getResolveDetail"
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
            <input type="text" class="form-control" disabled :value="nameSurname">
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
                        :class="{ 'is-invalid': $v.form.stateId.$error }" disabled>
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
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      isEditing: false,
      options: {
        reverse: true
      },
      maxDescriptionLength: 5000,
      overlay: false,
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
      'getStateAndAssignInfoStateDetail',
      'getStateAndAssignInfo',
      'getEmployeeStates',
      'getEmployeeSubStates',
      'createApplicationAssign']),
    ...mapActions('parameter', [
      'getDepartments',
      'getEmployeeByDepartmentId']),
    ...mapActions('general', ['showModal']),
    resolve() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.createApplicationAssign(this.form).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-resolve');
            this.getStateAndAssignInfo(this.$route.params.id);
          }
        }).catch(err => {
          this.overlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    clearForm() {
      this.isEditing = false;
      this.$v.$reset();
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
    getResolveDetail() {
      this.getStateAndAssignInfoStateDetail(this.$route.params.id).then(res => {
        this.isEditing = true;
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
      });
    }
  },
  created() {
    this.getDepartments().then(res => {
      this.topDepartments = Object.assign([], res.data);
    });
    this.getEmployeeStates();
  },
  computed: {
    nameSurname() {
      return this.$store.state.auth.user.ad.trim() + ' ' + this.$store.state.auth.user.soyad.trim();
    },
    ...mapGetters('general',['getMessage'])
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