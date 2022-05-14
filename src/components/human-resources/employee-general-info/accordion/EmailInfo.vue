<template>
  <div>
    <Can I="create" a="ik/personel">
      <b-modal
          id="modal-add-edit-email"
          size="lg"
          centered
          :title="modalTitle"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          @ok.prevent="save"
          @hidden="clearForm"
      >
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Email Tipi</label>
              <select class="form-control" v-model="form.emailType" :class="{ 'is-invalid': $v.form.emailType.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.emailTypes" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.emailType.$error">
                <small class="text-danger" v-if="!$v.form.emailType.required">{{  this.getMessage(64) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" v-model="form.email"
                     :class="{ 'is-invalid': $v.form.email.$error }"
                     maxlength="50"
              >
              <template v-if="$v.form.email.$error">
                <small class="text-danger" v-if="!$v.form.email.required">{{ getMessage(65) }}</small>
                <small class="text-danger" v-if="!$v.form.email.email">{{ getMessage(169) }}</small>
              </template>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">İletişim</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true" v-model="form.default">
                <span class="mr-2"></span>
              </label>
              <template v-if="$v.form.default.$error">
                <small class="text-danger d-block" v-if="!$v.form.default.checked">{{ getMessage(62) }}</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
          id="modal-warning-email"
          centered
          title="Uyarı"
          ok-title="Tamam"
          ok-variant="success"
          header-bg-variant="warning"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok="confirmEmail"
      >
        Bir önceki emaildeki iletişim bilgisi kaldırılacaktır, emin misiniz?
      </b-modal>
    </Can>
    <Can I="delete" a="ik/personel">
      <b-modal
          id="modal-delete-email"
          centered
          title="E-Posta Sil"
          ok-title="Sil"
          ok-variant="danger"
          header-bg-variant="danger"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="remove"
      >
        E-Posta adresini silmek istediğinize emin misiniz?
      </b-modal>
    </Can>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-25">Email Tipi</th>
        <th class="w-75">Email</th>
        <th class="fit text-center">İletişim</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="ik/personel">
            <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-edit-email/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in employeeEmails" :key="index" @click="showEditModal(item)">
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
import {required, email} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      modalTitle: 'Yeni Email Girişi',
      isEditing: false,
      overlay: false,
      form: {
        employeeId: this.$route.params.id,
        id: null,
        emailType: null,
        email: '',
        default: false
      }
    }
  },
  validations: {
    form: {
      emailType: {
        required
      },
      email: {
        required,
        email
      },
      default: {
        checked: function (val) {
          if (this.employeeEmails.length === 0 && val === false) {
            return false;
          } else if (this.employeeEmails.length === 1 && val === false && this.isEditing) {
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
    ...mapActions('hr', ['removeEmail', 'updateEmail', 'addEmail', 'getEmployeeEmails']),
    ...mapActions('parameter', ['getEmailTypes']),
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Email Düzenle';
      this.form.id = item.id;
      this.form.emailType = item.iletisimTipId;
      this.form.email = item.adres;
      this.form.default = item.varsayilan;
      this.$bvModal.show('modal-add-edit-email');
    },
    confirmEmail() {
      this.actualSave();
    },
    openConfirmModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-email');
    },
    remove() {
      this.removeEmail(this.selectedId).then((res) => {
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-email');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    actualSave() {
      this.overlay = true;
      this.addEmail(this.form).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-add-edit-email');
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
          this.updateEmail(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit-email');
              this.showModal({title: 'İşlem Başarılı', message: this.getMessage(56), type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          if (this.employeeEmails.length > 0 && this.form.default) {
            this.$bvModal.show('modal-warning-email');
          } else {
            this.actualSave();
            this.showModal({title: 'İşlem Başarılı', message: this.getMessage(19), type: 'success'});
          }
        }
      }
    },
    clearForm() {
      this.isEditing=false;
      this.modalTitle = 'Yeni Email Girişi'
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        id: null,
        emailType: null,
        email: '',
        default: false
      });
      this.$v.$reset();
    }
  },
  created() {
    this.getEmailTypes();
    this.getEmployeeEmails(this.$route.params.id);
  },
  computed: {
    ...mapState('hr', ['employeeEmails']),
    ...mapGetters('general',['getMessage'])
  }
}
</script>