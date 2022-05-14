<template>
  <div>
    <b-modal
        id="modal-add"
        size="lg"
        centered
        title="Yeni Doküman Ekle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Doküman</label>
            <b-form-select
                v-model="form.documentTypeId"
                :options="$store.state.sp.documentTypes"
                value-field="id"
                text-field="metin"
                plain
                :class="{ 'is-invalid': $v.form.documentTypeId.$error }"
            >
              <template v-slot:first>
                <b-form-select-option :value="null">Seçiniz</b-form-select-option>
              </template>
            </b-form-select>
            <template v-if="$v.form.documentTypeId.$error">
              <small class="text-danger" v-if="!$v.form.documentTypeId.required">Doküman Tipi seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>EBYS Var mı?</label>
            <select class="form-control" v-model="form.ebys" :class="{ 'is-invalid': $v.form.ebys.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="true">EVET</option>
              <option :value="false">HAYIR</option>
            </select>
            <template v-if="$v.form.ebys.$error">
              <small class="text-danger" v-if="!$v.form.ebys.required">EBYS seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div v-if="form.ebys">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Başlangıç Tarihi</label>
              <date-picker v-model="form.startDate"
                           :input-class="$v.form.startDate.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
              ></date-picker>
              <template v-if="$v.form.startDate.$error">
                <small class="text-danger" v-if="!$v.form.startDate.requiredIf">Başlangıç Tarihi girilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Bitiş Tarihi</label>
              <date-picker v-model="form.endDate"
                           :input-class="$v.form.endDate.$error?'is-invalid form-control':'form-control'"
                           format="DD.MM.YYYY"
                           valueType="format"
              ></date-picker>
              <template v-if="$v.form.endDate.$error">
                <small class="text-danger" v-if="!$v.form.endDate.requiredIf">Bitiş Tarihi girilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>EBYS No</label>
              <div class="input-group">
                <input type="text" class="form-control" :disabled="!form.ebys" v-model="form.ebysNo"
                       :class="{ 'is-invalid': $v.form.ebysNo.$error }"
                       maxlength="10"
                >
                <b-overlay
                    :show="overlay"
                    spinner-small
                    spinner-variant="primary"
                    class="input-group-prepend"
                >
                  <button class="btn btn-primary" type="button" @click="searchEbys">
                    <font-awesome-icon icon="search"/>
                  </button>
                </b-overlay>
              </div>
              <template v-if="$v.form.ebysNo.$error">
                <small class="text-danger" v-if="!$v.form.ebysNo.requiredIf">EBYS No girilmelidir</small>
              </template>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Doküman</label>
          <select class="form-control" v-model="form.document" :class="{ 'is-invalid': $v.form.document.$error }">
            <option :value="null">Seçiniz</option>
            <option :value="item" v-for="(item,index) in documents" :key="index">{{ item.evrakAdi }}</option>
          </select>
          <template v-if="$v.form.document.$error">
            <small class="text-danger" v-if="!$v.form.document.requiredIf">Doküman seçilmelidir</small>
          </template>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-10">
          <div class="form-group">
            <input type="text" class="form-control" disabled v-model="form.fileName"
                   :class="{ 'is-invalid': $v.form.fileName.$error }">
            <template v-if="$v.form.fileName.$error">
              <small class="text-danger" v-if="!$v.form.fileName.requiredIf">Dosya seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <input type="file" ref="file" class="d-none" @change="onChangeFileUpload()">
          <button class="btn btn-secondary w-100" @click="$refs.file.click()">Dosya Seç</button>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete"
        centered
        title="Doküman Sil"
        ok-title="Sil"
        ok-variant="danger"
        header-bg-variant="danger"
        header-text-variant="light"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="remove"

    >
      Dokümanı silmek istediğine emin misiniz?
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-25">Doküman Tipi</th>
        <th class="fit">EBYS ID</th>
        <th class="w-75">Doküman Adı</th>
        <th class="fit">Birim</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-add/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.sp.documents" :key="index">
        <td class="w-25">{{ item.dokumanTipi }}</td>
        <td class="fit">{{ item.ebys }}</td>
        <td class="w-75">{{ item.dokumanAdi }}</td>
        <td class="fit">{{ item.birim }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit text-right">
          <a class="btn btn-sm mr-2 btn-outline-secondary" target="_blank" :href="item.dokumanYolu">Görüntüle</a>
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
import {mapActions} from "vuex";
import {required, requiredIf} from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: {
    PlusCircleIcon,
    DatePicker
  },
  data() {
    return {
      overlay: false,
      selectedId: null,
      documents: [],
      form: {
        employeeId: this.$route.params.id,
        documentTypeId: null,
        ebys: null,
        startDate: '',
        endDate: '',
        ebysNo: '',
        fileName: '',
        file: '',
        document: null
      }
    }
  },
  validations: {
    form: {
      documentTypeId: {
        required
      },
      ebys: {
        required
      },
      startDate: {
        requiredIf: requiredIf(function (form) {
          return form.ebys;
        })
      },
      endDate: {
        requiredIf: requiredIf(function (form) {
          return form.ebys;
        })
      },
      ebysNo: {
        requiredIf: requiredIf(function (form) {
          return form.ebys;
        })
      },
      fileName: {
        requiredIf: requiredIf(function (form) {
          return !form.ebys;
        })
      },
      document: {
        requiredIf: requiredIf(function (form) {
          return form.ebys;
        })
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal','checkEbysDocuments']),
    ...mapActions('sp', ['deleteDocument', 'addDocument', 'getDocumentParameters', 'getDocuments']),
    searchEbys() {
      this.$v.form.startDate.$touch();
      this.$v.form.endDate.$touch();
      this.$v.form.ebysNo.$touch();
      if (!this.$v.form.startDate.$invalid && !this.$v.form.endDate.$invalid && !this.$v.form.ebysNo.$invalid) {
        this.overlay = true;
        this.checkEbysDocuments(this.form).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.documents = res.data;
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.overlay = false;
        })
      }
    },
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete')
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        const formData = new FormData();
        formData.append('personelId', this.form.employeeId);
        formData.append('dokumanTipId', this.form.documentTypeId);
        formData.append('ebys', this.form.ebys);
        formData.append('ebysno', this.form.ebysNo);
        formData.append('evrakId', this.form.document.evrakId);
        formData.append('evrakAdi', this.form.document.evrakAdi);
        if (!this.form.ebys){
          formData.append('file', this.form.file);
        }
        this.addDocument(formData).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-add');
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.overlay = false;
        })
      }
    },
    onChangeFileUpload() {
      if (!this.$refs.file.files[0].name.match(/.(jpg|jpeg|png|doc|docx|xls|xlsx|pdf|txt)$/i)) {
        this.showModal({title: 'Hata!', message: 'Geçersiz dosya formatı', type: 'danger'});
        this.file = null;
      } else {
        this.form.file = this.$refs.file.files[0];
        this.form.fileName = this.$refs.file.files[0].name;
      }
    },
    clear() {
      this.$v.$reset();
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        documentTypeId: null,
        ebys: null,
        startDate: '',
        endDate: '',
        ebysNo: '',
        fileName: '',
        file: '',
        document: null
      });
    },
    remove() {
      this.overlay = true;
      this.deleteDocument(this.selectedId).then((res) => {
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
    }
  },
  created() {
    this.getDocumentParameters();
    this.getDocuments(this.$route.params.id);
  },
  watch: {
    'form.ebys'(nw) {
      if (!nw) {
        this.form.ebysNo = '';
      }
    }
  }
}
</script>