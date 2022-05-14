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
        <div class="col-8">
          <div class="form-group">
            <label>Doküman</label>
            <b-form-select
                v-model="form.documentTypeId"
                :options="$store.state.ss.documentTypes"
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
        <div class="col-2">
          <div class="form-group">
            <label>EBYS No</label>
            <input type="text" class="form-control" :disabled="!form.ebys" v-model="form.ebysNo"
                   :class="{ 'is-invalid': $v.form.ebysNo.$error }"
                   maxlength="10"
            >
            <template v-if="$v.form.ebysNo.$error">
              <small class="text-danger" v-if="!$v.form.ebysNo.requiredIf">EBYS No girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <input type="text" class="form-control" disabled v-model="form.fileName"
                   :class="{ 'is-invalid': $v.form.fileName.$error }">
            <template v-if="$v.form.fileName.$error">
              <small class="text-danger" v-if="!$v.form.fileName.required">Dosya seçilmelidir</small>
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
          <Can I="create" a="ik/personel">
            <PlusCircleIcon v-b-modal.modal-add/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.ss.documents" :key="index">
        <td class="w-25">{{ item.dokumanTipi }}</td>
        <td class="fit">{{ item.ebys }}</td>
        <td class="w-75">{{ item.dokumanAdi }}</td>
        <td class="fit">{{ item.birim }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit text-right">
          <a class="btn btn-sm mr-2 btn-outline-secondary" target="_blank" :href="item.dokumanYolu">Görüntüle</a>
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
import {mapActions} from "vuex";
import {required, requiredIf} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      overlay: false,
      selectedId: null,
      form: {
        employeeId: this.$route.params.id,
        documentTypeId: null,
        ebys: null,
        ebysNo: '',
        fileName: '',
        file: ''
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
      ebysNo: {
        requiredIf: requiredIf(function (form) {
          return form.ebys;
        })
      },
      fileName: {
        required
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['deleteDocument', 'addDocument', 'getDocumentParameters', 'getDocuments']),
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete')
    },
    save() {
      this.$v.$touch();

      this.$bvModal.hide('modal-add');
    },
    onChangeFileUpload() {
      this.form.file = this.$refs.file.files[0];
      this.form.fileName = this.$refs.file.files[0].name;
    },
    clear() {
      this.$v.$reset();
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        documentTypeId: null,
        ebys: null,
        ebysNo: '',
        fileName: '',
        file: ''
      });
    },
    remove() {
      this.overlay = true;

      this.$bvModal.hide('modal-delete');
    }
  },
  created() {
    //this.getDocumentParameters();
    //this.getDocuments(this.$route.params.id);
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
