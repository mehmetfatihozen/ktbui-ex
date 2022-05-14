<template>
  <div>
    <b-modal
        id="modal-delete-note"
        centered
        title="Not Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeNote"
        :busy="showOverlay"
    >
      Not silinecektir emin misiniz?
    </b-modal>
    <b-modal
        id="modal-new-note"
        centered
        title="Yeni Not Ekle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="submit"
        :busy="showOverlay"
        @hidden="clear"
    >
      <div class="form-group">
        <label class="d-flex justify-content-between">Açıklama <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control" :class="{ 'is-invalid': $v.form.description.$error }"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"></textarea>

        <template v-if="$v.form.description.$error">
          <small class="text-danger" v-if="!$v.form.description.required">{{ this.getMessage(6) }}</small>
        </template>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durum</label>
            <input type="text" class="form-control" disabled
                   :value="$store.state.application.applicationDetail.durum">
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Alt Durum</label>
            <input type="text" class="form-control" disabled
                   :value="$store.state.application.applicationDetail.altDurum">
          </div>
        </div>
      </div>

      <div class="form-group"
           v-if="$store.state.application.applicationDetail.basvuruSahibiId!==$store.state.auth.user.id">
        <label class="d-block">Başvuru Sahibi Açıklamayı Görsün mü?</label>
        <label class="label_switch">
          <input type="checkbox" :false-value="false" :true-value="true" v-model="form.canSeeOwner">
          <span class="mr-2"></span>
        </label>
      </div>
    </b-modal>
    <b-modal
        id="modal-edit-note"
        centered
        title="Not Düzenle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        size="lg"
        @ok.prevent="edit"
        :busy="showOverlay"
        @hidden="clear"
    >
      <div class="form-group">
        <label class="d-flex justify-content-between">Açıklama <span
            class="text-secondary">Kalan Karakter : <span
            :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
        <textarea rows="5" class="form-control" :class="{ 'is-invalid': $v.form.description.$error }"
                  :maxlength="maxDescriptionLength"
                  v-model="form.description"></textarea>

        <template v-if="$v.form.description.$error">
          <p class="text-danger" v-if="!$v.form.description.required">{{ this.getMessage(6) }}</p>
        </template>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durum</label>
            <input type="text" class="form-control" disabled
                   :value="$store.state.application.applicationDetail.durum">
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Alt Durum</label>
            <input type="text" class="form-control" disabled
                   :value="$store.state.application.applicationDetail.altDurum">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="d-block">Başvuru Sahibi Açıklamayı Görsün mü?</label>
        <label class="label_switch">
          <input type="checkbox" :false-value="false" :true-value="true" v-model="form.canSeeOwner">
          <span class="mr-2"></span>
        </label>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Not</th>
        <th class="fit">Baş. Sahibi</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit">
          <Can I="create" a="basvuruyonetimi/basvurular">
            <img
                v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled"
                src="@/assets/img/icons/plus-circle.png" alt="" class="cursor-pointer"
                v-b-modal.modal-new-note>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.application.notes" :key="index">
        <td :class="item.personelId==$store.state.auth.user.id&& !$store.state.application.applicationDetail.basvuruKapali && !isApplicationCancelled?'cursor-pointer':''"
            v-on="$can('create','basvuruyonetimi/basvurular') ? { click: () => populateForm(item) } : {}">
          {{ item.aciklama }}
        </td>
        <td class="text-center">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.basvuruSahibiGorebilir"/>
        </td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
        <td class="fit">
          <Can I="delete" a="basvuruyonetimi/basvurular">
            <button v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled" class="btn btn-sm btn-outline-secondary"
                    @click.stop="showDeleteModal(item.id)">
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
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      selectedId: null,
      showOverlay: false,
      maxDescriptionLength: 5000,
      form: {
        id: this.$route.params.id,
        description: '',
        canSeeOwner: false,
        userId: ''
      }
    }
  },
  validations: {
    form: {
      description: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('application', ['getNotes', 'addNote', 'deleteNote', 'editNote']),
    clear() {
      this.form = Object.assign({}, {
        id: this.$route.params.id,
        description: '',
        canSeeOwner: false,
        userId: ''
      });
      this.$v.$reset();
    },
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-note');
    },
    removeNote() {
      this.showOverlay = true;
      this.deleteNote(this.selectedId).then((res) => {
        this.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.getNotes(this.$route.params.id);
          this.$bvModal.hide('modal-delete-note');
        }
      }).catch(err => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.showOverlay = false;
      });
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.addNote(this.form).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-new-note');
            this.form = Object.assign({}, {
              id: this.$route.params.id,
              description: '',
              canSeeOwner: false
            });
            this.$v.$reset();
            this.getNotes(this.$route.params.id);
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.showOverlay = false;
        });
      }
    },
    populateForm(item) {
      if (item.personelId === this.$store.state.auth.user.id && !this.$store.state.application.applicationDetail.basvuruKapali && !this.isApplicationCancelled) {
        this.form.id = item.id;
        this.form.description = item.aciklama;
        this.form.canSeeOwner = item.basvuruSahibiGorebilir;
        this.form.userId = item.personelId;
        this.$bvModal.show('modal-edit-note');
      }
    },
    edit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.editNote(this.form).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-edit-note');
            this.form = Object.assign({}, {
              id: this.$route.params.id,
              description: '',
              canSeeOwner: false
            });
            this.$v.$reset();
            this.getNotes(this.$route.params.id);
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.showOverlay = false;
        });
      }
    }
  },
  created() {
    this.getNotes(this.$route.params.id);
  },
  computed: {
    ...mapGetters('application', ['isApplicationCancelled']),
    ...mapGetters('general',['getMessage'])
  }
}
</script>