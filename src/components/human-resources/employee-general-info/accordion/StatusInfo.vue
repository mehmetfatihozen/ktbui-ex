<template>
  <div>
    <Can I="create" a="ik/personel">
      <b-modal
          id="modal-add-edit-status-info"
          size="lg"
          centered
          :title="modalTitle"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="save"
          @hidden="clearForm"
      >
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Durum</label>
              <select class="form-control" :disabled="isEditing" v-model="form.state"
                      :class="{ 'is-invalid': $v.form.state.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.hr.states" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.state.$error">
                <small class="text-danger" v-if="!$v.form.state.required">{{getMessage(38)}}</small>
              </template>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Alt Durum</label>
              <select class="form-control" v-model="form.subState" :class="{ 'is-invalid': $v.form.subState.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in subStates" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.subState.$error">
                <small class="text-danger" v-if="!$v.form.subState.required">{{getMessage(39)}}</small>
              </template>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label>Durum Tarihi</label>
              <date-picker v-model="form.stateDate"
                           :input-class="$v.form.stateDate.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
              ></date-picker>
              <template v-if="$v.form.stateDate.$error">
                <small class="text-danger" v-if="!$v.form.stateDate.required">{{getMessage(40)}}</small>
                <small class="text-danger" v-if="!$v.form.stateDate.checkStateDate">{{getMessage(43)}}</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
    </Can>
    <Can I="delete" a="ik/personel">
      <b-modal
          id="modal-delete-state"
          centered
          title="Durum Sil"
          ok-title="Sil"
          ok-variant="danger"
          header-bg-variant="danger"
          header-text-variant="white"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          @ok.prevent="remove"
          :busy="overlay"
      >
        <p>Durum bilgisi silinecektir, emin misiniz?</p>
      </b-modal>
    </Can>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-25">Durum</th>
        <th class="w-75">Alt Durum</th>
        <th class="fit">Durum Tarihi</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="ik/personel">
            <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-edit-status-info/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr :class="index===0?'cursor-pointer':''" v-for="(item,index) in $store.state.hr.employeeStates" :key="index"
          v-on="index===0?{click:()=>showEditModal(item)}:{}">
        <td class="w-25">{{ item.durum }}</td>
        <td class="w-75">{{ item.altDurum }}</td>
        <td class="fit">{{ item.durumTarihi }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
        <td class="fit text-right">
          <Can I="delete" a="ik/personel">
            <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item.id)" v-if="index===0">
              <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
            </button>
          </Can>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';

export default {
  components: {
    PlusCircleIcon,
    DatePicker
  },
  data() {
    return {
      modalTitle: 'Yeni Durum Girişi',
      isEditing: false,
      overlay: false,
      subStates: [],
      selectedId: null,
      form: {
        employeeId: this.$route.params.id,
        id: null,
        state: null,
        subState: null,
        stateDate: ''
      }
    }
  },
  validations: {
    form: {
      state: {
        required
      },
      subState: {
        required
      },
      stateDate: {
        required,
        checkStateDate: function (val) {
          if (!val) return true;
          if (this.$store.state.hr.employeeGeneralInfo.durumTarihi) {
            const date = this.$moment(val, "DD.MM.YYYY")
            const diff = date.diff(this.$moment(this.$store.state.hr.employeeGeneralInfo.durumTarihi, "DD.MM.YYYY"), 'days')
            return diff >= 0;
          }
          return true;
        }
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['getEmployeeStates', 'removeEmployeeState', 'getStates', 'getSubStates', 'updateEmployeeState', 'addEmployeeState', 'getEmployeeGeneralInfo']),
    showEditModal(item) {
      this.modalTitle = 'Durum Düzenle';
      this.isEditing = true;
      this.form.id = item.id;
      this.form.state = item.durumId;
      this.form.subState = item.altDurumId;
      this.form.stateDate = item.durumTarihi;
      this.$bvModal.show('modal-add-edit-status-info');
    },
    clearForm() {
      this.isEditing = false;
      this.modalTitle = 'Yeni Durum Girişi';
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        id: null,
        state: null,
        subState: null,
        stateDate: ''
      });
      this.$v.$reset();
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateEmployeeState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(56), type: 'success'});
              this.$bvModal.hide('modal-add-edit-status-info');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addEmployeeState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
              this.$bvModal.hide('modal-add-edit-status-info');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    },
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-state');
    },
    remove() {
      this.overlay = true;
      this.removeEmployeeState(this.selectedId).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-state');
          this.selectedId = null;
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      })
    }
  },
  created() {
    this.getStates();
    this.getEmployeeStates(this.$route.params.id);
  },
  watch: {
    'form.state'(nw) {
      if (!this.isEditing)
        this.form.subState = null;
      if (nw) {
        this.getSubStates(nw).then(res => {
          this.subStates = res.data;
        });
      } else {
        this.subStates = [];
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  }
}
</script>