<template>
  <div>
    <b-modal
        id="modal-attempt-add-edit"
        size="lg"
        centered
        title="Sistem Giriş Denemesi Düzenle"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Sistem Giriş Denemesi</label>
            <input type="text" class="form-control" v-model="attempt"
                   :class="{ 'is-invalid': $v.attempt.$error }"
                   v-mask="'##'"
            >
            <template v-if="$v.attempt.$error">
              <small class="text-danger" v-if="!$v.attempt.required">Sistem Giriş Denemesi girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table table-hover" v-if="!showHistory">
      <thead>
      <tr>
        <th>Sistem Giriş Denemesi</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="attempt=$store.state.informationTechnologies.systemLoginCount" v-b-modal.modal-attempt-add-edit
          v-if="$store.state.informationTechnologies.systemLoginCount">
        <td>{{ $store.state.informationTechnologies.systemLoginCount }}</td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary" @click="showHistory=true">Tarihçe</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="showHistory">
      <div class="row mb-3">
        <div class="col"><h5 class="mb-0">Tarihçe : Sistem Giriş Denemesi</h5></div>
        <div class="col text-right">
          <button class="btn btn-outline-secondary btn-sm"
                  @click="showHistory=false">
            <font-awesome-icon icon="angle-left"/>
            Geri Dön
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th>Sistem Giriş Denemesi</th>
          <th class="fit">Kullanıcı</th>
          <th class="fit">İşlem Tarihi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.informationTechnologies.systemLoginHistories" :key="index">
          <td>{{ item.denemeSayisi }}</td>
          <td class="fit">{{ item.kullanici }}</td>
          <td class="fit">{{ item.islemTarihi }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {},
  data() {
    return {
      overlay: false,
      attempt: null,
      showHistory: false
    }
  },
  validations: {
    attempt: {
      required
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['getSystemLoginCount', 'updateSystemLoginCount', 'getSystemLoginHistory']),
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.updateSystemLoginCount(this.attempt).then(res => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
            this.$bvModal.hide('modal-attempt-add-edit');
          }
        }).catch(err => {
          this.overlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    }
  },
  created() {
    this.getSystemLoginCount().then(res => {
      this.attempt = res.data;
    });
  },
  watch: {
    showHistory(nw) {
      if (nw)
        this.getSystemLoginHistory();
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  }
}
</script>