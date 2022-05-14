<template>
  <div>
    <b-modal
        id="modal-cancel"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Başvuru İptali"
        ok-variant="danger"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="cancel"
        :busy="showOverlay"
    >
      <p class="my-4 text-center">Başvuru ve başvuruya ait atamalar iptal edilecektir, emin misiniz?</p>
    </b-modal>
    <b-modal
        id="modal-confirm"
        centered
        title="Başvuru Kaydet"
        ok-title="Başvuruyu Kaydet"
        ok-variant="success"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok="saveApplication"
    >
      <p class="my-4 text-center">Başvuruyu kaydetmek istediğinize emin misiniz?</p>
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
      <p class="my-4 text-center">Başvurunuz kaydedilmiştir</p>
    </b-modal>
    <ModalResolve/>
    <ModalAddPhone/>
    <ModalAddEmail/>
    <div class="card-component">
      <div class="body">
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label>Adı Soyadı</label>
              <input type="text" class="form-control" :value="form.applicationOwner" disabled>
            </div>
          </div>
          <div class="col-9">
            <div class="form-group">
              <label>Bağlı Birim - Alt Birim - Birim Ünvan</label>
              <input type="text" class="form-control" disabled
                     value="BİLGİ TEKNOLOJİLERİ - İDARİ VE MALİ HİZMETLER DAİRE BAŞKANLIĞI - İDARİ VE MALİ İŞLER (DAİRE BAŞKANI)">
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
          <div class="col-5">
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
                <p class="text-danger" v-if="!$v.form.detail.required">{{ this.getMessage(3) }}</p>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
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
          <div class="col-5">
            <div class="row">
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
              <div class="col">
                <div class="form-group">
                  <label>Öncelik</label>
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
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div class="form-group"><label>Kayıt Tarihi</label><input type="text" :value="form.registerDate" disabled
                                                                      class="form-control"></div>
          </div>
          <div class="col-2">
            <div class="form-group"><label>Kayıt Durumu</label><input type="text" :value="form.registerState" disabled
                                                                      class="form-control"></div>
          </div>
          <div class="col-2">
            <div class="form-group"><label>Çözüm Durumu</label><input type="text" :value="form.solutionState" disabled
                                                                      class="form-control"></div>
          </div>
          <div class="col-2">
            <div class="form-group"><label>Çözüm SLA (Saat)</label><input type="text" disabled class="form-control"
                                                                          :value="form.sla">
            </div>
          </div>
          <div class="col-2">
            <div class="form-group"><label>Durum Tarihi</label><input type="text" disabled class="form-control"
                                                                      :value="form.stateDate"></div>
          </div>
          <div class="col-2">
            <div class="form-group"><label>Çözüm Süresi</label><input type="text" :value="form.resolutionTime" disabled
                                                                      class="form-control"></div>
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
                <div class="form-group d-flex align-items-center flex-row">
                  <label class="label_switch">
                    <input type="checkbox" v-model="form.phoneCheck"
                           :disabled="isOwnerDifferent||isApplicationCancelled">
                    <span class="mr-2"></span>
                  </label>
                  <label class="mb-0">SMS ile bilgi almak istiyorum</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group mb-0">
                  <select class="form-control" v-model="form.phone" :class="{ 'is-invalid': $v.form.phone.$error }"
                          :disabled="isOwnerDifferent||isApplicationCancelled">
                    <option :value="null">Seçiniz</option>
                    <option v-for="(item,index) in $store.state.application.phones" :key="index" :value="item.id">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <Can I="create" a="basvuruyonetimi/basvurular">
                <div class="col-sm-auto d-flex justify-content-center align-items-center">
                  <div class="form-group mb-0">
                    <img v-if="!isOwnerDifferent" :class="!form.phoneCheck?'disabled':''" class="cursor-pointer"
                         src="@/assets/img/icons/plus-circle.png" alt=""
                         @click="showPhoneAddModal">
                  </div>
                </div>
              </Can>
            </div>

            <template v-if="$v.form.phone.$error">
              <p class="text-danger" v-if="!$v.form.phone.required">{{ this.getMessage(8) }}</p>
            </template>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col">
                <div class="form-group d-flex align-items-center flex-row">
                  <label class="label_switch">
                    <input type="checkbox" v-model="form.emailCheck"
                           :disabled="isOwnerDifferent||isApplicationCancelled">
                    <span class="mr-2"></span>
                  </label>
                  <label class="mb-0">E-Posta ile bilgi almak istiyorum</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group mb-0">
                  <select class="form-control" v-model="form.email" :class="{ 'is-invalid': $v.form.email.$error }"
                          :disabled="isOwnerDifferent||isApplicationCancelled">
                    <option :value="null">Seçiniz</option>
                    <option v-for="(item,index) in $store.state.application.emails" :key="index" :value="item.id">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <Can I="create" a="basvuruyonetimi/basvurular">
                <div class="col-sm-auto d-flex justify-content-center align-items-center">
                  <div class="form-group mb-0">
                    <img v-if="!isOwnerDifferent" :class="!form.emailCheck?'disabled':''" class="cursor-pointer"
                         src="@/assets/img/icons/plus-circle.png" alt=""
                         @click="showEmailAddModal">
                  </div>
                </div>
              </Can>
            </div>

            <template v-if="$v.form.email.$error">
              <p class="text-danger" v-if="!$v.form.email.required">{{ this.getMessage(9) }}</p>
            </template>
          </div>
          <div class="col-4 d-flex">
            <div class="row file-icons flex-fill">
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(1)" :class="$store.state.application.applicationDetail.resimVarMi?'img-active':''">
                  <label>Resim</label>
                  <img src="@/assets/img/icons/picture-icon.png" alt="">
                </div>
              </div>
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(2)" :class="$store.state.application.applicationDetail.videoVarMi?'video-active':''">
                  <label>Video</label>
                  <img src="@/assets/img/icons/video-icon.png" alt="">
                </div>
              </div>
              <div class="col-4 d-flex">
                <div class="icon" @click="changeFileComponent(3)" :class="$store.state.application.applicationDetail.dosyaVarMi?'document-active':''">
                  <label>Dosya</label>
                  <img src="@/assets/img/icons/folder-icon.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-hover mt-4">
          <thead>
          <tr>
            <th class="fit">Asıl</th>
            <th class="fit">Personel</th>
            <th>Birim</th>
            <th class="fit">Atama Tarihi</th>
            <th class="fit">Durum</th>
            <th class="fit">SLA</th>
            <th class="fit">Durum Tarihi</th>
            <th class="fit">Personel Çözüm Süresi</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in $store.state.application.applicationAssignedList" :key="index">
            <td class="fit">
              <input type="checkbox" disabled :checked="item.asilCozucu">
            </td>
            <td class="fit">{{ item.personel }}</td>
            <td>{{ item.birim }}</td>
            <td class="fit">{{ item.atamaTarihi }}</td>
            <td class="fit">{{ item.durum }}</td>
            <td class="fit">{{ item.sla }}</td>
            <td class="fit">{{ item.durumTarihi }}</td>
            <td class="fit">{{ item.cozumSuresi }}</td>
          </tr>
          </tbody>
        </table>
        <div class="row mb-3">
          <div class="col d-flex justify-content-end">
            <button class="btn btn-outline-info" @click="changeDetailComponent('Form')">Bilgi Formu</button>
          </div>
        </div>
        <div class="accordion" role="tablist">
          <b-card no-body>
            <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
              <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold"
                        variant="null">
                Kontrol ve İnceleme Notları

                <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
                <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <ControlNotes/>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body>
            <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
              <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold"
                        variant="null">Durum
                ve Atama Bilgileri
                <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
                <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <component :is="$store.state.application.currentStatusAndAssignmentComponent"
                           v-bind="$store.state.application.currentStatusAndAssignmentComponentData"></component>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
      <div class="footer mt-5"
           v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled">
        <div class="row justify-content-end">
          <div class="col-6  d-flex justify-content-end">
            <Can I="create" a="basvuruyonetimi/basvurular">
              <button v-if="$store.state.application.applicationDetail.basvuruYonlendir"
                      class="btn btn-outline-secondary"
                      v-b-modal.modal-redirect>Yönlendir
              </button>
              <button v-if="$store.state.auth.user.personelKullaniciTipId==64" class="btn btn-secondary"
                      v-b-modal.modal-resolve>Başvuruyu Çözümle
              </button>
              <button v-if="$store.state.application.applicationDetail.atamaYap" class="btn btn-secondary"
                      v-b-modal.modal-assignment>Atama Yap
              </button>
            </Can>
            <Can I="delete" a="basvuruyonetimi/basvurular">
              <button v-if="$store.state.application.applicationDetail.basvuruIptal" class="btn btn-danger"
                      v-b-modal.modal-cancel>Başvuru İptali
              </button>
            </Can>
            <Can I="create" a="basvuruyonetimi/basvurular">
              <button class="btn btn-success" @click="submit">Kaydet</button>
            </Can>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {required, requiredIf} from "vuelidate/lib/validators";

import ModalAddPhone from "@/components/application/ModalAddPhone";
import ModalAddEmail from "@/components/application/ModalAddEmail";
import ControlNotes from "@/components/application/application-detail/ControlNotes";
import ModalResolve from "@/components/application/application-detail/ModalResolve";

export default {
  components: {
    ModalAddPhone,
    ModalAddEmail,
    ControlNotes,
    ModalResolve,
  },
  data() {
    return {
      showOverlay: false,
      maxTitleLength: 50,
      maxDescriptionLength: 5000,
      showFilterDetail: false,
      form: {
        id: this.$route.params.id,
        type: '',
        topic: '',
        detail: '',
        title: '',
        location: '',
        description: '',
        phoneCheck: false,
        phone: null,
        emailCheck: false,
        email: null,
        priority: '',
        registerDate: '',
        sla: '',
        stateDate: '',
        resolutionTime: '',
        applicationOwner: '',
        registerState: '',
        solutionState: ''
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
    ...mapActions('application', ['getAssignedApplicationList', 'cancelApplication', 'getDetail', 'editApplication', 'getApplicationParameters', 'getApplicationTopicDetailDd', 'getPhones', 'getEmails', 'changeDetailComponent']),
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
    changeFileComponent(id) {
      this.$store.state.application.selectedFileComponentId = id;
      this.changeDetailComponent('ApplicationDetailFileManagement');
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
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    topicChanged() {
      this.form.detail = null;
      this.getApplicationTopicDetailDd(this.form.topic).then(() => {
        this.form.detail = this.$store.state.application.applicationDetail.basvuruDetayId;
      });
    },
    setForm() {
      this.form = Object.assign({}, {
        id: parseInt(this.$route.params.id),
        type: this.$store.state.application.applicationDetail.basvuruTipId,
        topic: this.$store.state.application.applicationDetail.basvuruKonuId,
        title: this.$store.state.application.applicationDetail.konuBasligi,
        location: this.$store.state.application.applicationDetail.lokasyonId,
        description: this.$store.state.application.applicationDetail.aciklama,
        phoneCheck: this.$store.state.application.applicationDetail.smsBilgi,
        phone: this.$store.state.application.applicationDetail.personelAdresTelefonId,
        emailCheck: this.$store.state.application.applicationDetail.emailBilgi,
        email: this.$store.state.application.applicationDetail.personelAdresEpostaId,
        priority: this.$store.state.application.applicationDetail.oncelikId,
        registerDate: this.$store.state.application.applicationDetail.kayitTarihi,
        sla: this.$store.state.application.applicationDetail.sla,
        stateDate: this.$store.state.application.applicationDetail.durumTarihi,
        resolutionTime: this.$store.state.application.applicationDetail.cozumSuresi,
        applicationOwner: this.$store.state.application.applicationDetail.basvuruSahibi,
        registerState: this.$store.state.application.applicationDetail.durum,
        solutionState: this.$store.state.application.applicationDetail.altDurum,
      });
    },
    cancel() {
      this.showOverlay = true;
      this.cancelApplication(this.$route.params.id).then((res) => {
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
    this.$store.state.application.isNext = false;
    this.getAssignedApplicationList(this.$route.params.id);
    this.getDetail(this.$route.params.id).then((res) => {
      this.setForm();
      this.getPhones(res.data.basvuruSahibiId);
      this.getEmails(res.data.basvuruSahibiId);
    });
    this.getApplicationParameters()
  },
  mounted() {
  },
  computed: {
    ...mapGetters('application', ['isApplicationCancelled']),
    ...mapGetters('general',['getMessage']),
    isOwnerDifferent() {
      return this.$store.state.application.applicationDetail.basvuruSahibiId !== this.$store.state.auth.user.id;
    }
  },
  watch: {
    'form.topic'() {
      this.topicChanged();
    },
    'form.phoneCheck'(nw) {
      if (!nw) {
        this.form.phone = '';
      }
    },
    'form.emailCheck'(nw) {
      if (!nw) {
        this.form.email = '';
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
}
</script>