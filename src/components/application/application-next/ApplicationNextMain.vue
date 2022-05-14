<template>
  <div>
    <b-modal
        id="modal-delete"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Başvuruyu Sil"
        ok-variant="danger"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="deleteApplication"
        :busy="showOverlay"
    >
      <p class="my-4 text-center">{{ this.getMessage(10) }}</p>
    </b-modal>
    <b-modal
        id="modal-confirm"
        centered
        title="Başvuru Gönder"
        ok-title="Başvuruyu Gönder"
        ok-variant="success"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="saveApplication"
        :busy="showOverlay"
    >
      <p class="my-4 text-center">{{ this.getMessage(11) }}</p>
    </b-modal>
    <b-modal
        id="modal-success"
        centered
        title="Bilgi"
        ok-title="Kapat"
        ok-variant="secondary"
        ok-only
        no-close-on-backdrop
        hide-header-close
        @ok="$router.push('/application-management/applications')"
    >
      <p class="my-4 text-center">Başvurunuz <b>{{ $route.params.id }}</b> başvuru numarası ile kayda alınmıştır</p>
    </b-modal>
    <ModalAddPhone/>
    <ModalAddEmail/>
    <div class="card-component">
      <div class="body">
        <div class="row">
          <div class="col-4">
            <div class="row">
              <div class="col-sm-auto">
                <div class="form-group d-flex flex-column">
                  <label>Başvuru Sahibi</label>
                  <button class="btn btn-danger" :disabled="$store.state.auth.user.personelKullaniciTipId===57">
                    Sorgula
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Adı Soyadı</label>
                  <input type="text" class="form-control" :value="form.applicationOwner" disabled>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="form-group">
              <label>Bağlı Birim - Alt Birim - Birim Ünvan</label>
              <input type="text" class="form-control" disabled
                     :value="form.department">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label>Başvuru Tipi</label>
              <select class="form-control" v-model="form.type" :class="{ 'is-invalid': $v.form.type.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" :key="item.id"
                        v-for="item in $store.state.application.applicationParameters.basvuruTipleri">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.type.$error">
                <p class="text-danger" v-if="!$v.form.type.required">{{ this.getMessage(1) }}</p>
              </template>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Başvuru Konusu</label>
              <select class="form-control" v-model="form.topic" :class="{ 'is-invalid': $v.form.topic.$error }"
                      @change="topicChanged">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" :key="item.id"
                        v-for="item in $store.state.application.applicationParameters.basvuruKonulari">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.topic.$error">
                <p class="text-danger" v-if="!$v.form.topic.required">{{ this.getMessage(2) }}</p>
              </template>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Başvuru Detayı</label>
              <select class="form-control" v-model="form.detail" :class="{ 'is-invalid': $v.form.detail.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" :key="item.id"
                        v-for="item in $store.state.application.applicationParameters.basvuruDetaylari">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.detail.$error">
                <p class="text-danger" v-if="!$v.form.detail.required">{{ this.getMessage(3) }}</p>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="d-flex justify-content-between">Başvuru Konu Başlığı <span
                  class="text-secondary">Kalan Karakter : <span
                  :class="{'text-danger':(maxTitleLength - form.title.length)<5}">{{
                  maxTitleLength - form.title.length
                }}</span></span></label>
              <input type="text" class="form-control" :maxlength="maxTitleLength"
                     :class="{ 'is-invalid': $v.form.title.$error }" v-model.trim="form.title"
                     placeholder="50 Karakter">
              <template v-if="$v.form.title.$error">
                <p class="text-danger" v-if="!$v.form.title.required">{{ this.getMessage(4) }}</p>
              </template>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Lokasyon</label>
              <select class="form-control" v-model="form.location" :class="{ 'is-invalid': $v.form.location.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" :key="item.id"
                        v-for="item in $store.state.application.applicationParameters.lokasyonlar">
                  {{ item.metin.toLocaleUpperCase() }}
                </option>
              </select>
              <template v-if="$v.form.location.$error">
                <small class="text-danger" v-if="!$v.form.location.required">{{ this.getMessage(5) }}</small>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="d-flex justify-content-between">Açıklama <span
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
                <p class="text-danger" v-if="!$v.form.description.required">{{ this.getMessage(6) }}</p>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="row">
              <div class="col">
                <div class="form-group d-flex align-items-center">
                  <label class="label_switch">
                    <input type="checkbox" :false-value="false" :true-value="true" v-model="form.phoneCheck">
                    <span class="mr-2"></span>
                  </label>
                  <label class="mb-0">SMS ile bilgi almak istiyorum</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col">
                <div class="form-group d-flex align-items-center">
                  <label class="label_switch">
                    <input type="checkbox" :false-value="false" :true-value="true" v-model="form.emailCheck">
                    <span class="mr-2"></span>
                  </label>
                  <label class="mb-0">E-Posta ile bilgi almak istiyorum</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 d-flex align-items-center">
            <div class="row">
              <div class="col">
                <div class="form-group mb-0">
                  <label>Öncelik</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <select class="form-control" v-model="form.phone" :class="{ 'is-invalid': $v.form.phone.$error }"
                          :disabled="!form.phoneCheck">
                    <option :value="null">Telefon</option>
                    <option v-for="(item,index) in $store.state.application.phones" :key="index" :value="item.id">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-auto d-flex justify-content-center align-items-center">
                <div class="form-group">
                  <img class="cursor-pointer" :class="!form.phoneCheck?'disabled':''"
                       src="@/assets/img/icons/plus-circle.png" alt=""
                       @click="showPhoneAddModal">
                </div>
              </div>
            </div>
            <template v-if="$v.form.phone.$error">
              <p class="text-danger" v-if="!$v.form.phone.required">{{ this.getMessage(8) }}</p>
            </template>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <select class="form-control" v-model="form.email" :class="{ 'is-invalid': $v.form.email.$error }"
                          :disabled="!form.emailCheck">
                    <option :value="null">E-Posta</option>
                    <option v-for="(item,index) in $store.state.application.emails" :key="index" :value="item.id">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-auto d-flex justify-content-center align-items-center">
                <div class="form-group">
                  <img class="cursor-pointer" :class="!form.emailCheck?'disabled':''"
                       src="@/assets/img/icons/plus-circle.png" alt=""
                       @click="showEmailAddModal">
                </div>
              </div>
            </div>
            <template v-if="$v.form.email.$error">
              <p class="text-danger" v-if="!$v.form.email.required">{{ this.getMessage(10) }}</p>
            </template>
          </div>
          <div class="col-3">
            <select class="form-control" v-model="form.priority"
                    :class="{ 'is-invalid': $v.form.priority.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" :key="item.id"
                      v-for="item in $store.state.application.applicationParameters.oncelik">{{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.priority.$error">
              <p class="text-danger" v-if="!$v.form.priority.required">{{ this.getMessage(7) }}</p>
            </template>
          </div>
        </div>
        <div class="row mt-5">
          <div class="mx-auto col-3 d-flex flex-column">
            <div class="row">
              <div class="col text-center">
                <p class="font-weight-bold">Başvurunuza eklemek için</p>
              </div>
            </div>
            <div class="row file-icons flex-fill">
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(1)">
                  <label>Resim</label>
                  <img src="@/assets/img/icons/picture-icon.png" alt="">
                </div>
              </div>
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(2)">
                  <label>Video</label>
                  <img src="@/assets/img/icons/video-icon.png" alt="">
                </div>
              </div>
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(3)">
                  <label>Dosya</label>
                  <img src="@/assets/img/icons/folder-icon.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer mt-3">
        <div class="row d-flex justify-content-end">
          <div class="col-3 d-flex justify-content-around">
            <button class="btn btn-danger btn-block mt-0" v-b-modal.modal-delete>Başvuruyu Sil</button>
            <button class="btn btn-success btn-block mt-0" @click="submit">Başvuruyu Gönder</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalAddPhone from "@/components/application/ModalAddPhone";
import ModalAddEmail from "@/components/application/ModalAddEmail";
import {required, requiredIf} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    ModalAddPhone,
    ModalAddEmail,
  },
  data() {
    return {
      showOverlay: false,
      maxTitleLength: 50,
      maxDescriptionLength: 5000,
      showFilterDetail: false,
      form: {
        id: parseInt(this.$route.params.id),
        applicationOwner: '',
        department: '',
        type: null,
        topic: null,
        detail: null,
        title: '',
        location: null,
        description: '',
        phoneCheck: false,
        phone: null,
        emailCheck: false,
        email: null,
        priority: null,
      }
    };
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      type: {
        required
      },
      topic: {
        required
      },
      detail: {
        required
      },
      title: {
        required
      },
      location: {
        required
      },
      description: {
        required
      },
      phone: {
        required: requiredIf(function (form) {
          return form.phoneCheck
        })
      },
      email: {
        required: requiredIf(function (form) {
          return form.emailCheck
        })
      },
      priority: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('application', [
      'editApplication',
      'sendApplication',
      'removeApplication',
      'getApplicationParameters',
      'getApplicationTopicDetailDd',
      'getPhones',
      'getEmails',
      'getDetail',
      'changeNextComponent']),
    changeFileComponent(id) {
      this.$store.state.application.selectedFileComponentId = id;
      this.changeNextComponent('ApplicationNextFileManagement');
    },
    showPhoneAddModal() {
      if (this.form.phoneCheck) {
        this.$bvModal.show('modal-phone-add');
      }
    },
    showEmailAddModal() {
      if (this.form.emailCheck) {
        this.$bvModal.show('modal-email-add');
      }
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$bvModal.show('modal-confirm');
      }
    },
    saveApplication() {
      this.showOverlay = true;
      this.editApplication(this.form).then((res) => {
        this.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.show('modal-success');
        }
      }).catch(err => {
        this.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    topicChanged() {
      this.form.detail = '';
      this.getApplicationTopicDetailDd(this.form.topic).then(() => {
        this.form.detail = this.$store.state.application.applicationDetail.basvuruDetayId;
      });
    },
    setForm() {
      this.form = Object.assign({}, {
        id: parseInt(this.$route.params.id),
        type: this.$store.state.application.applicationDetail.basvuruTipId,
        applicationOwner: this.$store.state.application.applicationDetail.basvuruSahibi,
        department: this.$store.state.application.applicationDetail.birim,
        topic: this.$store.state.application.applicationDetail.basvuruKonuId,
        detail: this.$store.state.application.applicationDetail.basvuruDetayId,
        title: this.$store.state.application.applicationDetail.konuBasligi,
        location: this.$store.state.application.applicationDetail.lokasyonId,
        description: this.$store.state.application.applicationDetail.aciklama,
        phoneCheck: this.$store.state.application.applicationDetail.smsBilgi,
        phone: this.$store.state.application.applicationDetail.personelAdresTelefonId,
        emailCheck: this.$store.state.application.applicationDetail.emailBilgi,
        email: this.$store.state.application.applicationDetail.personelAdresEpostaId,
        priority: this.$store.state.application.applicationDetail.oncelikId,
      });
    },
    deleteApplication() {
      this.showOverlay = true;
      this.removeApplication(this.$route.params.id).then((res) => {
        this.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$router.push('/application-management/applications');
        }
      }).catch(err => {
        this.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  created() {
    this.$store.state.application.isNext = true;
    this.getDetail(this.$route.params.id).then(() => {
      this.setForm();
    });
    this.getPhones(this.$store.state.auth.user.id);
    this.getEmails(this.$store.state.auth.user.id);
    this.getApplicationParameters();
  },
  mounted() {
  },
  watch: {
    'form.topic'() {
      this.topicChanged();
    },
    'form.phoneCheck'(nw) {
      if (!nw) {
        this.form.phone = null;
      }
    },
    'form.emailCheck'(nw) {
      if (!nw) {
        this.form.email = null;
      }
    },
    '$store.state.application.savedEmail'(nw) {
      this.form.emailCheck = true;
      this.form.email = nw;
    },
    '$store.state.application.savedPhone'(nw) {
      this.form.phoneCheck = true;
      this.form.phone = nw;
    }
  }
};
</script>