<template>
  <div>
    <b-modal
        id="modal-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="form-group">
        <label>Konu</label>
        <input type="text" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
        <template v-if="$v.form.title.$error">
          <small class="text-danger" v-if="!$v.form.title.required">Konu girilmelidir</small>
        </template>
      </div>
      <div class="form-group">
        <label class="d-flex justify-content-between">Not <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"
                  :class="{ 'is-invalid': $v.form.description.$error }"
        ></textarea>
        <template v-if="$v.form.description.$error">
          <small class="text-danger" v-if="!$v.form.description.required">Not girilmelidir</small>
        </template>
      </div>
      <div class="row">
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Hatırlatma</label>
            <label class="label_switch d-inline-block">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.remind">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
        <div class="col-3">
          <div class="form-group ">
            <label>Tarih / Saat</label>
            <date-picker v-model="form.dateTime"
                         format="DD.MM.YYYY HH:mm"
                         :disabled="!form.remind"
                         type="datetime"
                         :input-class="$v.form.dateTime.$error ?'is-invalid form-control':'form-control'"
                         valueType="format"
                         :disabled-date="disabledDate"
            ></date-picker>
            <template v-if="$v.form.dateTime.$error">
              <small class="text-danger" v-if="!$v.form.dateTime.requiredIf">Tarih / Saat seçilmelidir</small>
              <small class="text-danger" v-if="$v.form.dateTime.requiredIf&&!$v.form.dateTime.checkDate">Hatırlatma
                saati ileri saat olmalıdır</small>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Alıcı (TO)</label>
        <multiselect
            v-model="form.receiverTo"
            placeholder="Alıcı email adresi yazıp ENTER tuşuna basın"
            label="name"
            selectLabel="Eklemek için enter tuşuna basın" selectedLabel="Seçildi"
            deselectLabel="Silmek için enter tuşuna basın" track-by="name"
            tagPlaceholder="Eklemek için enter tuşuna basın"
            :options="optionsTo"
            :multiple="true"
            :taggable="true"
            @tag="addTagTo"
            :class="{ 'is-invalid': $v.form.receiverTo.$error }"
        >
          <template slot="noOptions">
            Henüz e-posta eklenmemiş
          </template>
          <template slot="caret" class="d-none">
          </template>
        </multiselect>
        <template v-if="$v.form.receiverTo.$error">
          <small class="text-danger" v-if="!$v.form.receiverTo.requiredIf">Alıcı (TO) girilmelidir</small>
        </template>
      </div>
      <div class="form-group">
        <label>Alıcı (CC)</label>
        <multiselect
            v-model="form.receiverCc"
            placeholder="Alıcı email adresi yazıp ENTER tuşuna basın"
            label="name"
            selectLabel="Eklemek için enter tuşuna basın" selectedLabel="Seçildi"
            deselectLabel="Silmek için enter tuşuna basın" track-by="name"
            tagPlaceholder="Eklemek için enter tuşuna basın"
            :options="optionsCc"
            :multiple="true"
            :taggable="true"
            @tag="addTagCc"
        >
          <template slot="noOptions">
            Henüz e-posta eklenmemiş
          </template>
        </multiselect>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete"
        centered
        title="Not Sil"
        ok-title="Sil"
        ok-variant="danger"
        header-bg-variant="danger"
        header-text-variant="light"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="remove"

    >
      Notu silmek istediğine emin misiniz?
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Konu</th>
        <th class="fit">Birim</th>
        <th class="fit">Hatırlatma Tarihi</th>
        <th class="fit">Kullanıcı Adı</th>
        <th class="fit">Kayıt Tarihi</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item.id)" v-for="(item,index) in monitoringNotes"
          :key="index">
        <td>{{ item.konu }}</td>
        <td class="fit">{{ item.birim }}</td>
        <td class="fit">{{ item.hatirlatmaTarihi }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit text-right">
          <Can I="delete" a="ik/personel">
            <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item.id)">
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
import {mapActions, mapState} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import {required, requiredIf, email} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon,
    DatePicker
  },
  data() {
    return {
      disabledDate: (date) => date < this.$moment(new Date()).add(-1, 'days'),
      modalTitle: 'Yeni Not Girişi',
      selectedId: null,
      overlay: false,
      optionsTo: [],
      optionsCc: [],
      maxDescriptionLength: 500,
      form: {
        id: null,
        planId: this.$route.params.id,
        title: '',
        description: '',
        remind: false,
        dateTime: '',
        receiverTo: [],
        receiverToString: '',
        receiverCc: [],
        receiverCcString: '',
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      description: {
        required
      },
      dateTime: {
        requiredIf: requiredIf(function (form) {
          return form.remind;
        }),
        checkDate(value, form) {
          if (!form.remind) return true;
          return this.$moment(value, 'DD.MM.YYYY HH:mm').toDate() > new Date()
        }
      },
      receiverTo: {
        requiredIf: requiredIf(function (form) {
          return form.remind;
        })
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['getMonitoringNotes', 'getMonitoringNoteDetail', 'addMonitoringNote', 'updateMonitoringNote', 'deleteMonitoringNote']),
    showEditModal(id) {
      this.isEditing = true;
      this.getMonitoringNoteDetail(id).then((res) => {
        this.modalTitle = 'Not Düzenle';
        const result = res.data;
        this.form.id = id;
        this.form.title = result.konu;
        this.form.description = result.not;
        this.form.remind = result.hatirlatma;
        this.form.dateTime = result.hatirlatmaTarihi;
        this.form.receiverToString = result.alici;
        this.form.receiverCcString = result.aliciCC;
        this.form.receiverTo = [];
        this.form.receiverToString = '';
        this.form.receiverCc = [];
        this.form.receiverCcString = '';
        this.optionsTo = [];
        this.optionsCc = [];
        result.alici.split(';').map(a => {
          if (a) {
            const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
            this.form.receiverTo.push(obj);
            this.optionsTo.push(obj);
          }
        });
        result.aliciCC.split(';').map(a => {
          if (a) {
            const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
            this.form.receiverCc.push(obj);
            this.optionsCc.push(obj);
          }
        });
        this.$bvModal.show('modal-add-edit');
      });
    },
    clear() {
      this.modalTitle = 'Yeni Not Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
            id: null,
            planId: this.$route.params.id,
            title: '',
            description: '',
            remind: false,
            dateTime: '',
            receiverTo: [],
            receiverToString: '',
            receiverCc: [],
            receiverCcString: '',
          }
      )
    },
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete');
    },
    remove() {
      this.overlay = true;
      this.deleteMonitoringNote(this.selectedId).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete');
        }
      }).catch(err => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.overlay = false;
      })
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.form.receiverToString = this.form.receiverTo.map(r => r.name).join(';');
        this.form.receiverCcString = this.form.receiverCc.map(r => r.name).join(';');
        if (this.isEditing) {
          this.updateMonitoringNote(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          this.addMonitoringNote(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        }
      }
    },
    addTagTo(newTag) {
      if (email(newTag)) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.optionsTo.push(tag)
        this.form.receiverTo.push(tag)
      } else {
        this.showModal({title: 'Hata!', message: 'Geçersiz e-posta formatı', type: 'danger'});
      }
    },
    addTagCc(newTag) {
      if (email(newTag)) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.optionsCc.push(tag)
        this.form.receiverCc.push(tag)
      } else {
        this.showModal({title: 'Hata!', message: 'Geçersiz e-posta formatı', type: 'danger'});
      }
    }
  },
  created() {
    this.getMonitoringNotes(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['monitoringNotes'])
  },
  watch: {
    'form.remind'() {
      if (!this.isEditing) {
        this.form.dateTime = '';
      }
    }
  }
}
</script>