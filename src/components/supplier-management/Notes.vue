<template>
  <div>
    <b-modal
        id="modal-add"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="saveNote">

      <div class="form-group">
        <label>Konu</label>
        <input type="text" class="form-control"
               :maxlength="maxSubjectLength" v-model="form.subject"
               :class="{ 'is-invalid': $v.form.subject.$error }">
        <template v-if="$v.form.subject.$error">
          <small class="text-danger" v-if="!$v.form.subject.required">{{ this.getMessage(165) }}</small>
          <small class="text-danger" v-if="!$v.form.subject.minLength">{{ this.getMessage(166) }}</small>
        </template>
      </div>

      <div class="form-group">
        <label class="d-flex justify-content-between">Not <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control"
                  :class="{ 'is-invalid': $v.form.description.$error }"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"></textarea>
        <template v-if="$v.form.description.$error">
          <small class="text-danger" v-if="!$v.form.description.required">{{ this.getMessage(88) }}</small>
          <small class="text-danger" v-if="!$v.form.description.minLength">{{ this.getMessage(167) }}</small>
        </template>
      </div>

      <div class="row">
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Hatırlatma</label>
            <label class="label_switch d-inline-block">
              <input type="checkbox"
                     :false-value="false"
                     :true-value="true"
                     v-model="form.reminding">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group ">
            <label class="d-block h-21-px"></label>
            <date-picker :disabled="!this.form.reminding"
                         v-model="form.remindingDate"
                         placeholder="Tarih / Saat"
                         format="DD.MM.YYYY HH:mm"
                         valueType="format"
                         type="datetime"
                         :input-class="$v.form.remindingDate.$error && this.form.reminding ?'is-invalid form-control':'form-control'">
            </date-picker>
            <template v-if="$v.form.remindingDate.$error && this.form.reminding">
              <small class="text-danger" v-if="!$v.form.remindingDate.required">{{ this.getMessage(168) }}</small>
            </template>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Alıcı (TO)</label>
        <multiselect
            v-model="form.recipient"
            placeholder="Alıcı email adresi yazıp ENTER tuşuna basın"
            label="name"
            selectLabel="Eklemek için enter tuşuna basın" selectedLabel="Seçildi"
            deselectLabel="Silmek için enter tuşuna basın" track-by="name"
            tagPlaceholder="Eklemek için enter tuşuna basın"
            :options="optionsTo"
            :multiple="true"
            :taggable="true"
            @tag="addTagTo"
        >
          <template slot="noOptions">
            Henüz e-posta eklenmemiş
          </template>
        </multiselect>
      </div>

      <div class="form-group">
        <label>Alıcı (CC)</label>
        <multiselect
            v-model="form.recipientCC"
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
        header-text-variant="white"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="remove"
        :busy="overlay"
    >
      <p>Not silinecektir, emin misiniz?</p>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Konu</th>
        <th class="fit">Hatırlatma Tarihi</th>
        <th class="fit">Birim Adı</th>
        <th class="fit">Kullanıcı Adı</th>
        <th class="fit">Kayıt Tarihi</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showAddModal"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in $store.state.supplierManagement.notes"
          :key="index" @click="showUpdateModal(item.id)">
        <td>{{ item.konu }}</td>
        <td class="fit">{{ item.hatirlatmaTarihi }}</td>
        <td class="fit">{{ item.birim }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item.id)">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import {mapActions, mapGetters} from "vuex";
import {minLength, maxLength, required, requiredIf, email} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon,
    DatePicker
  },
  data() {
    return {
      maxDescriptionLength: 500,
      maxSubjectLength: 50,
      overlay: false,
      modalTitle: "Yeni Not Girişi",
      optionsTo: [],
      optionsCc: [],
      form: {
        id: null,
        supplierId: this.$route.params.id,
        subject: "",
        reminding: false,
        remindingDate: "",
        description: "",
        recipient: [],
        recipientString: '',
        recipientCC: [],
        recipientCCString: ''
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      subject: {
        required,
        maxLength: maxLength(50),
        minLength: minLength(5)
      },
      description: {
        required,
        maxLength: maxLength(500),
        minLength: minLength(5)
      },
      remindingDate: {
        requiredIf: requiredIf(function (form) {
          return form.reminding;
        })
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('supplierManagement', ['addNote', 'updateNote', 'getNotes', 'deleteNote', 'getNoteById']),
    showAddModal() {
      this.form = Object.assign({}, {
        id: null,
        supplierId: this.$route.params.id,
        subject: "",
        reminding: false,
        remindingDate: "",
        description: "",
        recipient: [],
        recipientString: '',
        recipientCC: [],
        recipientCCString: ''
      });
      this.$v.$reset();
      this.modalTitle = 'Yeni Not Girişi';
      this.$bvModal.show('modal-add');
    },
    showUpdateModal(id) {
      this.getNoteById(id).then(() => {
        let item = this.$store.state.supplierManagement.note;
        this.form.id = item.id;
        this.form.supplierId = this.$route.params.id;
        this.form.subject = item.konu ?? "";
        this.form.reminding = item.hatirlatma;
        this.form.remindingDate = item.hatirlatmaTarihi;
        this.form.description = item.not ?? "";
        this.form.recipientString = item.alici;
        this.form.recipientCCString = item.aliciCC;
        this.form.recipient = [];
        this.form.recipientCC = [];
        this.optionsTo = [];
        this.optionsCc = [];
        item.alici.split(';').map(a => {
          if (a) {
            const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
            this.form.recipient.push(obj);
            this.optionsTo.push(obj);
          }
        });
        item.aliciCC.split(';').map(a => {
          if (a) {
            const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
            this.form.recipientCC.push(obj);
            this.optionsCc.push(obj);
          }
        });
        this.$v.$reset();
        this.modalTitle = 'Not Güncelle';
        this.$bvModal.show('modal-add');
      }).catch(err => {
        alert(err);
      });
    },
    showDeleteModal(id) {
      this.form.id = id;
      this.$bvModal.show('modal-delete');
    },
    remove() {
      this.overlay = true;
      this.deleteNote(this.form.id).then(() => {
        this.overlay = false;
        this.$bvModal.hide('modal-delete');
      }).catch(err => {
        this.overlay = false;
        alert(err);
      })
    },
    saveNote() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.form.recipientString = this.form.recipient.map(r => r.name).join(';');
        this.form.recipientCCString = this.form.recipientCC.map(r => r.name).join(';');
        if (this.form.id) {
          this.updateNote(this.form).then(() => {
            this.$bvModal.hide('modal-add');
          }).catch(err => {
            alert(err);
          });
        } else {
          this.addNote(this.form).then(() => {
            this.$bvModal.hide('modal-add');
          }).catch(err => {
            alert(err);
          });
        }
        this.overlay = false;
      }
    },
    addTagTo(newTag) {
      if (email(newTag)) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.optionsTo.push(tag)
        this.form.recipient.push(tag)
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
        this.form.recipientCC.push(tag)
      } else {
        this.showModal({title: 'Hata!', message: this.getMessage(169), type: 'danger'});
      }
    }
  },
  created() {
    this.getNotes(this.$route.params.id);
  }
}
</script>