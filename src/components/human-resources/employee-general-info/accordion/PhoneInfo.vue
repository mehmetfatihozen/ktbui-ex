<template>
  <div>
    <Can I="create" a="ik/personel">
      <b-modal
          id="modal-add-edit-phone"
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
          <div class="col">
            <div class="form-group">
              <label>Telefon Tipi</label>
              <select class="form-control" v-model="form.phoneType" :class="{ 'is-invalid': $v.form.phoneType.$error }"
                      @change="form.phone=''">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.phoneTypes" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.phoneType.$error">
                <small class="text-danger" v-if="!$v.form.phoneType.required">Telefon Tipi seçilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Tel No</label>
              <input type="text" class="form-control" v-mask="'(###) ### ## ##'" v-model="form.phone"
                     :class="{ 'is-invalid': $v.form.phone.$error }">
              <template v-if="$v.form.phone.$error">
                <small class="text-danger" v-if="!$v.form.phone.required">{{this.getMessage(60)}}</small>
                <small class="text-danger"
                       v-if="!$v.form.phone.phoneCheck&&$v.form.phone.minLength&&$v.form.phone.required">{{this.getMessage(63)}}</small>
                <small class="text-danger" v-if="!$v.form.phone.minLength">{{this.getMessage(225)}}</small>
              </template>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Dahili</label>
              <input type="text" class="form-control" :disabled="form.phoneType!=60" v-model="form.internal"
                     v-mask="'#####'">
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">İletişim</label>
              <label class="label_switch">
                <input type="checkbox" v-model="form.default">
                <span class="mr-2"></span>
              </label>
              <template v-if="$v.form.default.$error">
                <small class="text-danger d-block" v-if="!$v.form.default.checked">{{this.getMessage(62)}}</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
          id="modal-warning-phone"
          centered
          title="Uyarı"
          ok-title="Tamam"
          ok-variant="success"
          header-bg-variant="warning"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok="confirmPhone"
      >
        Bir önceki numaradaki iletişim bilgisi kaldırılacaktır, emin misiniz?
      </b-modal>
    </Can>
    <Can I="delete" a="ik/personel">
      <b-modal
          id="modal-delete-phone"
          centered
          title="Telefon Sil"
          ok-title="Sil"
          ok-variant="danger"
          header-bg-variant="danger"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="remove"
      >
        Telefonu silmek istediğinize emin misiniz?
      </b-modal>
    </Can>

    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-25">Tel Tipi</th>
        <th class="w-75">Telefon</th>
        <th class="fit text-center">İletişim</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="ik/personel">
            <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-edit-phone/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in employeePhones" :key="index" @click="showEditModal(item)">
        <td class="w-25">{{ item.iletisimTip }}</td>
        <td class="w-75">{{ item.adres }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.varsayilan"/>
        </td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
        <td class="fit text-right">
          <Can I="delete" a="ik/personel">
            <button class="btn btn-sm btn-outline-secondary" @click.stop="openConfirmModal(item.id)">
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
import {required, minLength} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      modalTitle: 'Yeni Tel Girişi',
      overlay: false,
      form: {
        employeeId: this.$route.params.id,
        id: null,
        phoneType: null,
        phone: '',
        internal: '',
        default: false
      }
    }
  },
  validations: {
    form: {
      phoneType: {
        required
      },
      phone: {
        required,
        minLength: minLength(15),
        phoneCheck: function (value, form) {
          const char = value.charAt(1);
          if (form.phoneType == 59) {//Cep
            return char == 5;
          } else if (form.phoneType == 60) {//İş
            return char != 0 && char != 1 && char != 5
          }
          return true;
        }
      },
      default: {
        checked: function (val) {
          if (this.employeePhones.length === 0 && val === false) {
            return false;
          } else if (this.employeePhones.length === 1 && val === false && this.isEditing) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['removePhone', 'updatePhone', 'addPhone', 'getEmployeePhones']),
    ...mapActions('parameter', ['getPhoneTypes']),
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Tel Düzenle';
      this.form.id = item.id;
      this.form.phoneType = item.iletisimTipId;
      this.form.phone = item.adres;
      this.form.internal = item.dahili;
      this.form.default = item.varsayilan;
      this.$bvModal.show('modal-add-edit-phone');
    },
    confirmPhone() {
      this.actualSave();
    },
    openConfirmModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-phone');
    },
    remove() {
      this.removePhone(this.selectedId).then((res) => {
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-phone');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    actualSave() {
      this.overlay = true;
      this.addPhone(this.form).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-add-edit-phone');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.isEditing) {
          this.overlay = true;
          this.updatePhone(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit-phone');
              this.showModal({title: 'İşlem Başarılı', message: this.getMessage(56), type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          if (this.employeePhones.filter(ep => ep.varsayilan == true).length > 0 && this.form.default) {
            this.$bvModal.show('modal-warning-phone');
          } else {
            this.actualSave();
            this.showModal({title: 'İşlem Başarılı', message: this.getMessage(19), type: 'success'});
          }
        }
      }
    },
    clearForm() {
      this.isEditing = false;
      this.modalTitle = 'Yeni Tel Girişi';
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        phoneType: null,
        phone: '',
        internal: '',
        default: false
      });
      this.$v.$reset();
    }
  },
  created() {
    this.getEmployeePhones(this.$route.params.id);
    this.getPhoneTypes();
  },
  computed: {
    ...mapState('hr', ['employeePhones']),
    ...mapGetters('general',['getMessage'])
  },
  watch: {
    'form.phoneType'() {
      this.form.internal = '';
    }
  }
}
</script>