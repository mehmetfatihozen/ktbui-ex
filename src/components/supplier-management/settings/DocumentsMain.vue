<template>
  <div>
    <b-modal
        id="modal-document-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Doküman Tipi</label>
            <input type="text" class="form-control"
                   v-model="form.text"
                   @keypress="isAlphabeticCharacter($event)"
                   @keydown="rejectCopyPaste($event)"
                   :class="{ 'is-invalid': $v.form.text.$error }"
                   :maxlength="documentTypeMaxLength">
            <template v-if="$v.form.text.$error">
              <small class="text-danger" v-if="!$v.form.text.required">Doküman Tipi girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Doküman Tipleri</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-document-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.supplierManagement.documentParameters" :key="index">
        <td>{{ item.dokumanTipi }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeDocumentComponent({cmp:'DocumentsMainHistory',data:item})">
            Tarihçe
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
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      documentTypeMaxLength: 50,
      modalTitle: 'Yeni Doküman Ekle',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        text: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      text: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('supplierManagement', ['updateDocumentParameter', 'addDocumentParameter', 'getDocumentParameters', 'changeDocumentComponent']),
    clear() {
      this.modalTitle = 'Yeni Doküman Ekle';
      this.$v.$reset();
      this.isEditing = false;
      this.form = Object.assign({}, {
        id: null,
        text: '',
        passive: false
      })
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateDocumentParameter(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-document-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addDocumentParameter(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-document-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    },
    showEditModal(item) {
      this.form = Object.assign({}, {
        id: item.id,
        text: item.dokumanTipi,
        passive: item.pasif
      })
      this.isEditing = true;
      this.modalTitle = 'Dokuman Tipi Güncelleme';
      this.$bvModal.show('modal-document-add-edit');
    },
    rejectCopyPaste(event){
      let charCode = (event.which) ? event.which : event.keyCode;
      if (event.ctrlKey === true && (charCode == 118 || charCode == 86)) {
        event.preventDefault();
        return true;
      }
    },
    isAlphabeticCharacter: function (event) {
      let charCode = (event.which) ? event.which : event.keyCode;
      if (((charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 122)) ||
          charCode == 8 || charCode == 32 || charCode == 350 || charCode == 351 ||
          charCode == 304 || charCode == 286 || charCode == 287 || charCode == 231 ||
          charCode == 199 || charCode == 305 || charCode == 214 || charCode == 246 ||
          charCode == 220 || charCode == 252) {
        return true;
      }
      event.preventDefault();
    },
  },
  created() {
    this.getDocumentParameters();
  }
}
</script>