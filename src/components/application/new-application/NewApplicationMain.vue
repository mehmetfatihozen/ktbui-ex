<template>
  <div>
    <b-modal
        id="modal-cancel-confirm"
        centered
        title="Uyarı"
        header-bg-variant="warning"
        header-text-variant="light"
        ok-variant="success"
        ok-title="Tamam"
        cancel-variant="outline-secondary"
        cancel-title="Vazgeç"
        @ok.prevent="$router.go(-1)"
    >
      Güncellemeler kayıt edilmeyecektir, emin misiniz?
    </b-modal>
    <ModalAddPhone/>
    <ModalAddEmail/>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <div class="call-id" v-if="$store.state.application.applicationDetail.callId">
          Call ID : {{ $store.state.application.applicationDetail.callId }}
        </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">YENİ BAŞVURU GİRİŞİ</h3>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-secondary" @click="$router.push('/application-management/applications')">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Listeye Geri Dön
        </button>
      </div>
    </div>
    <div class="new-application-container">
      <b-overlay :show="showOverlay" rounded="sm" class="d-flex flex-fill">
        <div class="card-component with-head-body">
          <div class="body">
            <div class="row" v-if="$route.query.callcenter">
              <div class="col-sm-auto">
                <div class="form-group">
                  <label>Başvuru Sahibi</label>
                  <button class="btn btn-danger btn-block"
                          @click="changeNewApplicationComponent({cmp:'NewApplicationEmployeeSearch',data:null})">
                    Sorgula
                  </button>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="form-group">
                  <label>Adı Soyadı</label>
                  <input type="text" class="form-control" disabled :value="adSoyad">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Bağlı Birim - Alt Birim - Birim - Ünvan</label>
                  <input type="text" class="form-control" disabled
                         :value="getName">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
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
                    <small class="text-danger" v-if="!$v.form.type.required">Başvuru Tipi seçilmelidir</small>
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
                    <small class="text-danger" v-if="!$v.form.topic.required">{{ this.getMessage(2) }}</small>
                  </template>
                </div>
              </div>
              <div class="col-5">
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
                    <small class="text-danger" v-if="!$v.form.detail.required">{{ this.getMessage(3) }}</small>
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
                    <small class="text-danger" v-if="!$v.form.title.required">{{ this.getMessage(4) }}</small>
                  </template>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="form-group">
                  <label>Lokasyon</label>
                  <select class="form-control" v-model="form.location"
                          :class="{ 'is-invalid': $v.form.location.$error }">
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
                    <small class="text-danger" v-if="!$v.form.description.required">{{ this.getMessage(6) }}</small>
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
                    <div class="form-group mb-0">
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
                    <div class="form-group mb-0">
                      <img class="cursor-pointer" :class="!form.phoneCheck?'disabled':''"
                           src="@/assets/img/icons/plus-circle.png" alt=""
                           @click="showPhoneAddModal">
                    </div>
                  </div>
                </div>

                <template v-if="$v.form.phone.$error">
                  <small class="text-danger" v-if="!$v.form.phone.required">{{ this.getMessage(60) }}</small>
                </template>
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-0">
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
                    <div class="form-group mb-0">
                      <img class="cursor-pointer" :class="!form.emailCheck?'disabled':''"
                           src="@/assets/img/icons/plus-circle.png" alt=""
                           @click="showEmailAddModal">
                    </div>
                  </div>
                </div>

                <template v-if="$v.form.email.$error">
                  <small class="text-danger" v-if="!$v.form.email.required">{{ this.getMessage(65) }}</small>
                </template>
              </div>
              <div class="col-3">
                <select class="form-control" v-model="form.priority" :class="{ 'is-invalid': $v.form.priority.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" :key="item.id"
                          v-for="item in $store.state.application.applicationParameters.oncelik">{{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.priority.$error">
                  <small class="text-danger" v-if="!$v.form.priority.required">{{ this.getMessage(7) }}</small>
                </template>
              </div>
            </div>
          </div>
          <div class="footer mt-3">
            <div class="row">
              <div class="col d-flex justify-content-end align-items-center">
                <button class="btn btn-outline-secondary" v-b-modal.modal-cancel-confirm>Vazgeç</button>
                <button class="btn btn-success" @click="submit">Devam Et</button>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import ModalAddPhone from "@/components/application/ModalAddPhone";
import ModalAddEmail from "@/components/application/ModalAddEmail";
import {required, requiredIf} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['adSoyad', 'bagliBirim', 'altBirim', 'unvan', 'id'],
  components: {
    ModalAddPhone,
    ModalAddEmail,
  },
  data() {
    return {
      maxTitleLength: 50,
      maxDescriptionLength: 5000,
      showOverlay: false,
      form: {
        callId: this.$route.query.callId,
        applicationOwnerId: this.$store.state.auth.user.id,
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
        priority: null
      }
    };
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
    ...mapActions('application', ['changeNewApplicationComponent', 'createApplication', 'getApplicationParameters', 'getApplicationTopicDetailDd', 'getPhones', 'getEmails']),
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
        this.showOverlay = true;
        if (this.id) {
          this.form.applicationOwnerId = this.id;
        }
        this.createApplication(this.form).then(res => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$router.push('/application-management/applications/next/' + res.data.id);
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    topicChanged() {
      this.form.detail = null;
      this.getApplicationTopicDetailDd(this.form.topic);
    }
  },
  created() {
    this.getPhones(this.id ? this.id : this.$store.state.auth.user.id);
    this.getEmails(this.id ? this.id : this.$store.state.auth.user.id);
    this.getApplicationParameters();
    this.$store.state.application.showNewApplicationButton = false;
  },
  watch: {
    'form.phoneCheck'(nw) {
      if (!nw) {
        this.form.phone = null;
      } else {
        const find = this.$store.state.application.phones.find(i => i.iletisim);
        if (find)
          this.form.phone = find.id;
      }
    },
    'form.emailCheck'(nw) {
      if (!nw) {
        this.form.email = null;
      } else {
        const find = this.$store.state.application.emails.find(i => i.iletisim);
        if (find)
          this.form.email = find.id;
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
  },
  computed: {
    getName() {
      if (this.bagliBirim) {
        return `${this.bagliBirim} - ${this.altBirim} - ${this.unvan}`
      }
      return '';
    },
    ...mapGetters('general',['getMessage'])
  }
};
</script>