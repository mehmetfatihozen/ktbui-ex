<template>
  <div>
    <b-modal
        id="modal-success"
        centered
        title="Başarılı"
        header-bg-variant="success"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="outline-secondary"
        ok-only
        @ok="successModalClick()"
        :busy="overlay"
    >
      <p class="my-4 text-center">{{this.getMessage(19)}}</p>
    </b-modal>
    <b-modal
        id="modal-document-type-add"
        size="lg"
        centered
        title="Yeni Doküman Tipi Ekle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="saveDocumentType"
    >
      <div class="form-group">
        <label>Doküman Tipi</label>
        <select class="form-control"
                :class="{ 'is-invalid': $v.documentTypeAddForm.documentTypeId.$error }"
                v-model="documentTypeAddForm.documentTypeId">
          <option :value="null">Seçiniz</option>
          <option v-for="(item,index) in $store.state.supplierManagement.documentTypes"
                  :key="index" :value="item.id">
            {{ item.metin }}
          </option>
        </select>
        <template v-if="$v.documentTypeAddForm.documentTypeId.$error">
          <small class="text-danger" v-if="!$v.documentTypeAddForm.documentTypeId.required">Doküman Tipi bilgisi
            seçilmelidir</small>
        </template>
      </div>
    </b-modal>
    <b-modal
        id="modal-document-add"
        size="lg"
        centered
        title="Yeni Doküman Ekle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="saveDocument"
    >
      <div class="form-group">
        <label>Doküman Adı</label>
        <input type="text" class="form-control" disabled v-model="documentAddForm.documentTypeName">
      </div>
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <input type="text" class="form-control" disabled v-model="documentAddForm.fileName"
                   :class="{ 'is-invalid': $v.documentAddForm.fileName.$error }">
            <template v-if="$v.documentAddForm.fileName.$error">
              <small class="text-danger" v-if="!$v.documentAddForm.fileName.required">{{ this.getMessage(162) }}</small>
            </template>
            <template v-if="$v.documentAddForm.fileName.$error">
              <small class="text-danger" v-if="!$v.documentAddForm.fileName.isValid">{{this.getMessage(163)}}</small>
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
        @ok.prevent="removeDocument()"
    >
      {{this.getMessage(164)}}
    </b-modal>
    <b-modal
        id="modal-alert"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Kapat"
        ok-variant="outline-secondary"
        ok-only
        @ok="okAlertClick"
        :busy="overlay"
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
    <table class="table">
      <thead>
      <tr>
        <th class="fit"></th>
        <th>Doküman Tipi</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showDocumentTypeAddModal()"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(dokuman,index) in $store.state.supplierManagement.documents">
        <tr :key="index">
          <td class="fit text-center">
            <img v-if="dokuman.adet > 0"
                 :src="require(`@/assets/img/icons/${selectedRowId === dokuman.id && showDetail?'open':'close'}-tr.png`)"
                 class="cursor-pointer"
                 @click="showDocumentDetailClick(dokuman.id)">
          </td>
          <td>{{ dokuman.dokumanTipi }}</td>
          <td class="fit text-right">
            <button class="btn btn-sm mr-2 btn-outline-secondary" @click="showDocumentAddModal(dokuman)">Yükle</button>
            <div class="btn btn-sm btn-secondary" :style="{width:'30px', backgroundColor: 'black'}">
              {{ dokuman.adet }}
            </div>
          </td>
        </tr>
        <tr v-if="selectedRowId === dokuman.id && showDetail" :key="'s'+index">
          <td class="fit"></td>
          <td colspan="2">
            <div class="card-component">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Doküman Adı</th>
                  <th class="fit">Kullanıcı</th>
                  <th class="fit">Kayıt Tarihi</th>
                  <th class="fit"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(dosya,index) in dokuman.dosyalar" :key="index">
                  <td>{{ dosya.dokumanAdi }}</td>
                  <td class="fit">{{ dosya.kullanici }}</td>
                  <td class="fit">{{ dosya.kayitTarihi }}</td>
                  <td class="fit text-right">
                    <a class="btn btn-sm mr-2 btn-outline-secondary" target="_blank"
                       :href="dosya.dokumanYolu">Görüntüle</a>
                    <button class="btn btn-sm btn-outline-secondary" @click="showDeleteModal(dosya.id)">
                      <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      errorMessage: '',
      overlay: false,
      showDetail: false,
      selectedRowId: null,
      selectedDocId: null,
      documentAddForm: {
        documentTypeId: null,
        documentTypeName: '',
        fileName: '',
        file: ''
      },
      documentTypeAddForm: {
        supplierId: this.$route.params.id,
        documentTypeId: null
      },
      validDocTypes: ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'jpeg', 'png']
    }
  },
  validations: {
    documentAddForm: {
      fileName: {
        required,
        isValid: function (value) {
          if (value !== '')
            return this.validDocTypes.includes(this.documentAddForm.file.name.split('.').pop());
          else
            return true;
        }
      }
    },
    documentTypeAddForm: {
      documentTypeId: {
        required
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions("supplierManagement", ["getDocumentTypes", "getDocuments", "addDocument", "deleteDocument", "addDocumentType"]),
    saveDocumentType() {
      this.$v.documentTypeAddForm.$touch();
      if (!this.$v.documentTypeAddForm.$invalid) {
        this.overlay = true;
        this.addDocumentType(this.documentTypeAddForm).then(() => {
          this.overlay = false;
          this.$bvModal.hide('modal-document-type-add');
          this.$bvModal.show('modal-success');
        }).catch(err => {
          this.errorMessage = err;
          this.$bvModal.show('modal-alert');
        });
        this.overlay = false;
      }
    },
    onChangeFileUpload() {
      this.documentAddForm.file = this.$refs.file.files[0];
      this.documentAddForm.fileName = this.$refs.file.files[0].name;
    },
    saveDocument() {
      this.$v.documentAddForm.$touch();
      if (!this.$v.documentAddForm.$invalid) {
        this.overlay = true;
        const formData = new FormData();
        formData.append('tedarikciDokumanId', this.documentAddForm.documentTypeId);
        formData.append('file', this.documentAddForm.file);
        this.addDocument(formData).then(() => {
          this.overlay = false;
          this.$bvModal.hide('modal-document-add');
          this.$bvModal.show('modal-success');
        }).catch(err => {
          this.errorMessage = err;
          this.$bvModal.show('modal-alert');
          this.overlay = false;
        })
      }
    },
    findDocument(document) {
      return document.id === this.selectedRowId;
    },
    removeDocument() {
      this.overlay = true;
      this.deleteDocument(this.selectedDocId).then(res => {
        this.overlay = false;
        this.$bvModal.hide('modal-delete');
        let documents = res.data.dokumanlar;
        if (documents.find(this.findDocument).adet === 0) this.selectedRowId = null;
      }).catch(err => {
        this.errorMessage = err;
        this.$bvModal.show('modal-alert');
        this.overlay = false;
      })
    },
    successModalClick() {
      this.$bvModal.hide('modal-success');
    },
    okAlertClick: function () {
      this.$bvModal.hide('modal-alert');
    },
    showDocumentTypeAddModal() {
      this.overlay = false;
      this.errorMessage = '';
      this.documentTypeAddForm = Object.assign({}, {
        supplierId: this.$route.params.id,
        documentTypeId: null
      });
      this.$v.$reset();
      this.$bvModal.show('modal-document-type-add');
    },
    showDocumentAddModal(item) {
      this.overlay = false;
      this.errorMessage = '';
      this.documentAddForm = Object.assign({}, {
        documentTypeId: item.id,
        documentTypeName: item.dokumanTipi,
        fileName: '',
        file: ''
      });
      this.$v.$reset();
      this.$bvModal.show('modal-document-add');
    },
    showDocumentDetailClick(id) {
      this.selectedRowId = id;
      this.showDetail = !this.showDetail
    },
    showDeleteModal(id) {
      this.selectedDocId = id;
      this.$bvModal.show('modal-delete')
    },
    clear() {
      this.form = Object.assign({}, {
        overlay: false,
        showDetail: false,
        selectedRowId: null,
        selectedDocId: null,
        documentAddForm: {
          documentTypeId: null,
          documentTypeName: '',
          fileName: '',
          file: ''
        },
        documentTypeAddForm: {
          supplierId: this.$route.params.id,
          documentTypeId: null
        }
      });
    }
  },
  created() {
    this.getDocumentTypes();
    this.getDocuments(this.$route.params.id);
  }
}
</script>