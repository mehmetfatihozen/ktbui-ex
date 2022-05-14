<template>
  <div>
    <b-modal
        id="modal-add"
        size="lg"
        centered
        :title=this.modalTitle
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="saveState"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durum</label>
            <select class="form-control" v-model="form.stateId" :class="{ 'is-invalid': $v.form.stateId.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in $store.state.supplierManagement.statusTypes"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.stateId.$error">
              <small class="text-danger" v-if="!$v.form.stateId.required">Durum seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Karaliste</label>
            <label class="label_switch d-inline-block">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.blackList">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="d-flex justify-content-between">
          Açıklama
          <span
              class="text-secondary">Kalan Karakter : <span>{{ descriptionMaxLength - form.description.length }}</span>
          </span>
        </label>
        <textarea rows="5" class="form-control"
                  :maxlength="descriptionMaxLength"
                  v-model="form.description"></textarea>
      </div>
    </b-modal>
    <b-modal
        id="modal-get"
        size="lg"
        centered
        :title=this.modalTitle
        ok-title="Kapat"
        ok-variant="outline-secondary"
        ok-only
        @ok="$bvModal.hide('modal-get')"
        :busy="overlay"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durum</label>
            <select class="form-control" v-model="form.stateId" disabled>
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in $store.state.supplierManagement.statusTypes"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Karaliste</label>
            <label class="label_switch d-inline-block">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.blackList" disabled>
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="d-flex justify-content-between">
          Açıklama
        </label>
        <textarea rows="5" class="form-control"
                  :maxlength="descriptionMaxLength"
                  v-model="form.description" disabled></textarea>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete"
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
    <b-modal
        id="modal-alert"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Kapat"
        ok-variant="outline-secondary"
        ok-only
        @ok="$bvModal.hide('modal-alert')"
        :busy="overlay"
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Durum</th>
        <th class="fit">Kara Liste</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showAddModal"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.supplierManagement.statuses"
          :key="index" @click="showGetModal(item.id)">
        <td>{{ item.durum }}</td>
        <td class="fit text-center">
          <font-awesome-icon v-if="item.karaListe" icon='check' size="lg" class="text-danger"/>
        </td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit text-right">
          <button v-if="item.sonDurum" class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item.id)">
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
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      isEditing: false,
      errorMessage: '',
      descriptionMaxLength: 5000,
      overlay: false,
      modalTitle: 'Durum Bilgisi Girişi',
      form: {
        id: null,
        supplierId: this.$route.params.id,
        stateId: null,
        blackList: false,
        description: ""
      }
    }
  },
  validations: {
    form: {
      stateId: {
        required
      }
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['getStatusTypes', 'getStatuses', 'addStatus', 'getStatusById', 'deleteStatus']),
    showAddModal() {
      this.isEditing = false;
      this.form = Object.assign({}, {
        supplierId: this.$route.params.id,
        stateId: null,
        blackList: false,
        description: ""
      });
      this.$v.$reset();
      this.modalTitle = 'Durum Bilgisi Girişi';
      this.$bvModal.show('modal-add');
    },
    showGetModal(id) {
      this.isEditing = true;
      this.getStatusById(id).then(() => {
        let item = this.$store.state.supplierManagement.status;
        this.form = Object.assign({}, {
          id: item.id,
          supplierId: this.$route.params.id,
          stateId: item.durumId,
          blackList: item.karaListe,
          description: item.aciklama
        });
        this.$v.$reset();
        this.modalTitle = 'Durum Görüntüle';
        this.$bvModal.show('modal-get');
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
      this.deleteStatus(this.form.id).then(() => {
        this.overlay = false;
        this.$bvModal.hide('modal-delete');
      }).catch(err => {
        this.overlay = false;
        this.errorMessage = err;
        this.$bvModal.show('modal-alert');
      })
    },
    saveState() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.addStatus(this.form).then(() => {
          this.$bvModal.hide('modal-add');
        }).catch(err => {
          this.errorMessage = err;
          this.$bvModal.show('modal-alert');
        });
        this.overlay = false;
      }
    }
  },
  created() {
    this.getStatuses(this.$route.params.id);
    this.getStatusTypes();
  }
}
</script>