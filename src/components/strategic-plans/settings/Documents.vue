<template>
  <div>
    <b-modal
        id="modal-document-add-edit"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="save"
        @hidden="clear"
        :busy="overlay"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Doküman Adı</label>
            <input type="text" class="form-control" v-model="form.title"
                   :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Doküman Adı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table v-if="!showHistory" class="table table-hover">
      <thead>
      <tr>
        <th>Doküman</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-document-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.spSettings.documents"
          :key="index">
        <td>{{ item.dokumanTipi }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary" @click.stop="history(item)">Tarihçe</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="row mb-3">
        <div class="col"><h3 class="mb-0">Tarihçe : {{ selectedItem.dokumanTipi }}</h3></div>
        <div class="col text-right">
          <button class="btn btn-outline-secondary btn-sm"
                  @click="showHistory=false">
            <font-awesome-icon icon="angle-left"/>
            Geri Dön
          </button>
        </div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>Doküman</th>
          <th class="fit">Pasif</th>
          <th class="fit">Kullanıcı</th>
          <th class="fit">Kayıt Tarihi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.spSettings.documentHistories" :key="index">
          <td>{{ item.dokuman }}</td>
          <td class="fit">{{ item.pasif }}</td>
          <td class="fit">{{ item.kullaniciAdi }}</td>
          <td class="fit">{{ item.kayitTarihi }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      showHistory: false,
      selectedItem: null,
      overlay: false,
      isEditing: false,
      modalTitle: 'Yeni Doküman Girişi',
      form: {
        title: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('spSettings', ['getDocuments', 'addDocument', 'updateDocument', 'getDocumentHistory']),
    history(item) {
      this.$store.state.spSettings.documentHistories=Object.assign([]);
      this.getDocumentHistory(item.id);
      this.selectedItem = item;
      this.showHistory = true;
    },
    clear() {
      this.modalTitle='Yeni Doküman Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
        title: '',
        passive: false
      })
    },
    showEditModal(item) {
      this.modalTitle='Doküman Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.dokumanTipi;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-document-add-edit');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateDocument(this.form).then((res) => {
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
          this.addDocument(this.form).then((res) => {
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
    }
  },
  created() {
    this.getDocuments();
  }
}
</script>