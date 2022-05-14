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
      Personel bilgisi kayıt edilmeyecektir, emin misiniz?
    </b-modal>
    <b-modal
        id="modal-remove-photo"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="danger"
        cancel-title="Vazgeç"
        @ok="removePhotoConfirm"
    >
      Profil fotoğrafını silmek istediğinize emin misiniz?
    </b-modal>
    <b-modal
        id="modal-alert"
        centered
        title="Uyarı"
        header-bg-variant="warning"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="secondary"
        ok-only
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
    <b-modal
        id="modal-success"
        centered
        title="Başarılı"
        header-bg-variant="success"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="secondary"
        ok-only
    >
      <p class="my-4 text-center">{{ getMessage(81) }}</p>
    </b-modal>
    <div class="card-component new-employee-container">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Personel Tipi</label>
                  <select class="form-control" v-model="employeeGeneralInfo.personelTipId"
                          :class="{ 'is-invalid': $v.employeeGeneralInfo.personelTipId.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.personelTipleri"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.employeeGeneralInfo.personelTipId.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.personelTipId.required">Personel Tipi
                      seçilmelidir</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>TC Kimlik No</label>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="employeeGeneralInfo.tcKimlikNo"
                           :class="{ 'is-invalid': $v.employeeGeneralInfo.tcKimlikNo.$error }" maxlength="11"
                           v-mask="'###########'"
                    >
                    <div class="input-group-append">
                      <b-overlay
                          :show="busy"
                          rounded
                          opacity="0.6"
                          spinner-small
                          spinner-variant="primary"
                          class="d-inline-block"
                      >
                        <button class="btn btn-danger" type="button" @click="check">
                          <font-awesome-icon icon="search"/>
                        </button>
                      </b-overlay>
                    </div>
                  </div>
                  <template v-if="$v.employeeGeneralInfo.tcKimlikNo.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.tcKimlikNo.required">TC Kimlik No
                      girilmelidir</small>
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.tcKimlikNo.minLength">Geçersiz TC Kimlik
                      No</small>
                    <small class="text-danger"
                           v-if="!$v.employeeGeneralInfo.tcKimlikNo.tcknCheck&&$v.employeeGeneralInfo.tcKimlikNo.minLength">Geçersiz
                      TC Kimlik No</small>
                  </template>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label>Adı</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.ad"
                         :class="{ 'is-invalid': $v.employeeGeneralInfo.ad.$error }"
                         maxlength="25"
                         @keypress="isLetter"
                  >
                  <template v-if="$v.employeeGeneralInfo.ad.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.ad.required">Ad girilmelidir</small>
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.ad.minLength">Ad bilgisi en az iki karakter
                      olmalıdır</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Soyadı</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.soyad"
                         :class="{ 'is-invalid': $v.employeeGeneralInfo.soyad.$error }"
                         maxlength="25"
                         @keypress="isLetter"
                  >
                  <template v-if="$v.employeeGeneralInfo.soyad.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.soyad.required">Soyad
                      girilmelidir</small>
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.soyad.minLength">Soyad bilgisi en az iki
                      karakter olmalıdır</small>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Uyruk</label>
                  <select class="form-control" v-model="employeeGeneralInfo.uyrukId"
                          :class="{ 'is-invalid': $v.employeeGeneralInfo.uyrukId.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.uyruk" :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.employeeGeneralInfo.uyrukId.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.uyrukId.required">Uyruk
                      seçilmelidir</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Doğum Tarihi</label>
                  <date-picker v-model="employeeGeneralInfo.dogumTarihi"
                               :input-class="$v.employeeGeneralInfo.dogumTarihi.$error?'is-invalid form-control':'form-control'"
                               format="DD.MM.YYYY"
                               valueType="format"
                  ></date-picker>
                  <template v-if="$v.employeeGeneralInfo.dogumTarihi.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.dogumTarihi.required">Doğum Tarihi
                      girilmelidir</small>
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.dogumTarihi.isLegalAge">Personel 18
                      yaşından küçük
                      olamaz</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Medeni Durum</label>
                  <select class="form-control" v-model="employeeGeneralInfo.medeniDurumId">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.medeniDurum"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Baba Adı</label>
                  <input type="text" class="form-control" v-model="employeeGeneralInfo.babaAdi" @keypress="isLetter">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Askerlik Durumu</label>
                  <select class="form-control" v-model="employeeGeneralInfo.askerlikDurumuId"
                          :disabled="employeeGeneralInfo.cinsiyetId!=7">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.askerlikDurumu"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Tecil Tarihi</label>
                  <date-picker v-model="employeeGeneralInfo.tecilTarihi"
                               :input-class="$v.employeeGeneralInfo.tecilTarihi.$error?'is-invalid form-control':'form-control'"
                               format="DD.MM.YYYY"
                               valueType="format"
                               :disabled="employeeGeneralInfo.cinsiyetId!=7 || employeeGeneralInfo.askerlikDurumuId!=12"
                               :disabled-date="disabledRegistrationDate"
                  ></date-picker>
                  <template v-if="$v.employeeGeneralInfo.tecilTarihi.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.tecilTarihi.requiredIf">Tecil Tarihi
                      girilmelidir</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Engelli Durumu</label>
                  <select class="form-control" v-model="employeeGeneralInfo.engelliDurumuId">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.engelliDurum"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Öğrenim Durumu</label>
                  <select class="form-control" v-model="employeeGeneralInfo.ogrenimDurumuId">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.ogrenimDurumu"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Cinsiyet</label>
                  <select class="form-control" v-model="employeeGeneralInfo.cinsiyetId"
                          :class="{ 'is-invalid': $v.employeeGeneralInfo.cinsiyetId.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.cinsiyet"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.employeeGeneralInfo.cinsiyetId.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.cinsiyetId.required">Cinsiyet
                      seçilmelidir</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Kan Grubu</label>
                  <select class="form-control" v-model="employeeGeneralInfo.kanGrubuId">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.kanGrubu"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Kullanıcı Adı</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.kullaniciAdi">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Sicil No</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.sicilNo">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Durumu</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.durum">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Alt Durumu</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.altDurum">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Durum Tarihi</label>
                  <span class="datepicker">
                        <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.durumTarihi">
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Çıkış Tarihi</label>
                  <span class="datepicker">
                        <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.cikisTarihi">
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Çalışma Süresi</label>
                  <input type="text" class="form-control" disabled v-model="employeeGeneralInfo.calismaSuresi">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="form-group">
                  <label>Sisteme Giriş Tipi</label>
                  <select class="form-control" v-model="employeeGeneralInfo.personelKullaniciTipId"
                          :class="{ 'is-invalid': $v.employeeGeneralInfo.personelKullaniciTipId.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.sistemeGirisTipleri"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.employeeGeneralInfo.personelKullaniciTipId.$error">
                    <small class="text-danger" v-if="!$v.employeeGeneralInfo.personelKullaniciTipId.required">Sisteme
                      Giriş Tipi
                      seçilmelidir</small>
                  </template>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="form-group">
                  <label class="d-block">LDAP</label>
                  <label class="label_switch">
                    <input type="checkbox" :false-value="false" :true-value="true"
                           v-model="employeeGeneralInfo.ldapAktif">
                    <span class="mr-2"></span>
                  </label>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="form-group">
                  <label class="d-block">SMS</label>
                  <label class="label_switch">
                    <input type="checkbox" :false-value="false" :true-value="true"
                           v-model="employeeGeneralInfo.smsAktif">
                    <span class="mr-2"></span>
                  </label>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="form-group">
                  <label class="d-block">E-Posta</label>
                  <label class="label_switch">
                    <input type="checkbox" :false-value="false" :true-value="true"
                           v-model="employeeGeneralInfo.emailAktif">
                    <span class="mr-2"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center ">
            <div class="user-avatar mt-4">
              <input type="file" ref="file" class="d-none" @change="onChangeFileUpload()">
              <img
                  :src="employeeGeneralInfo.profilResmi?employeeGeneralInfo.profilResmi:require('@/assets/img/icons/user.png')"
                  alt=""
                  @click="$refs.file.click()"
              >

              <font-awesome-icon icon="times" size="lg" class="text-danger remove-photo" @click.stop="removePhoto"
                                 v-if="employeeGeneralInfo.resimEklendi"/>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="row justify-content-end">
      <div class="col-2 d-flex justify-content-end mt-4">
        <Can I="create" a="ik/personel">
          <button class="btn btn-outline-secondary btn-block mt-0 mr-2" v-b-modal.modal-cancel-confirm>Vazgeç</button>
          <button class="btn btn-success btn-block mt-0" @click="submit">Kaydet</button>
        </Can>
      </div>
    </div>
    <AccordionMain/>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {minLength, required, requiredIf} from "vuelidate/lib/validators";
import AccordionMain from "@/components/human-resources/employee-general-info/AccordionMain";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  components: {
    AccordionMain,
    DatePicker
  },
  data() {
    return {
      busy: false,
      disabledRegistrationDate: (date) => date < this.$moment(new Date()).add(-1, 'days'),
      file: null,
      errorMessage: '',
    }
  },
  validations: {
    employeeGeneralInfo: {
      personelTipId: {
        required
      },
      ad: {
        required,
        minLength: minLength(2)
      },
      soyad: {
        required,
        minLength: minLength(2)
      },
      cinsiyetId: {
        required
      },
      uyrukId: {
        required
      },
      tcKimlikNo: {
        required,
        minLength: minLength(11),
        tcknCheck: function (val) {
          return val.charAt(0) != "0"
        }
      },
      dogumTarihi: {
        required,
        isLegalAge(value, form) {
          if (!form.birthDate) return true;
          const today = this.$moment()
          const diff = today.diff(this.$moment(form.birthDate, 'DD.MM.YYYY'), 'years')
          return diff >= 18;
        }
      },
      tecilTarihi: {
        requiredIf: requiredIf(function (form) {
          return form.askerlikDurumuId == 12;
        })
      },
      personelKullaniciTipId: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['removeProfilePhoto', 'addProfilePhoto', 'updateEmployee', 'getParameters', 'getSubStates', 'getEmployeeGeneralInfo', 'checkIdentity']),
    check() {
      this.$v.employeeGeneralInfo.tcKimlikNo.$touch();
      if (!this.$v.employeeGeneralInfo.tcKimlikNo.$invalid) {
        this.busy = true;
        this.checkIdentity(this.employeeGeneralInfo.tcKimlikNo).then(res => {
          this.busy = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.employeeGeneralInfo.ad = res.data.ad;
            this.employeeGeneralInfo.soyad = res.data.soyad;
            this.employeeGeneralInfo.babaAdi = res.data.babaAdi;
            this.employeeGeneralInfo.dogumTarihi = res.data.dogumTarihi;
            this.employeeGeneralInfo.cinsiyetId = res.data.cinsiyetId;
            this.employeeGeneralInfo.medeniDurumId = res.data.medeniHalId;
          }
        }).catch((err) => {
          this.busy = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-zığüşöçİĞÜŞÖÇ ]+$/.test(char)) return true; // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    removePhotoConfirm() {
      this.removeProfilePhoto(this.$route.params.id).then(res => {
        if (this.$route.params.id == this.$store.state.auth.user.id) {
          this.$store.state.auth.user.profilResmi = res.data;
          localStorage.setItem('user', JSON.stringify(this.$store.state.auth.user));
        }
        this.file = null;
        this.employeeGeneralInfo.profilResmi = res.data;
        this.employeeGeneralInfo.resimEklendi = false;
      });
    },
    removePhoto() {
      this.$bvModal.show('modal-remove-photo');
    },
    onChangeFileUpload() {
      //size in mb
      const size = this.$refs.file.files[0].size / 1024 / 1024;
      if (size > 5) {
        this.showModal({title: 'Hata!', message: 'Resim boyutu maksimum 5MB olabilir', type: 'danger'});
      } else {
        if (!this.$refs.file.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          this.showModal({title: 'Hata!', message: 'Geçersiz dosya formatı', type: 'danger'});
          this.file = null;
        } else {
          this.file = this.$refs.file.files[0];
          this.employeeGeneralInfo.profilResmi = URL.createObjectURL(this.$refs.file.files[0]);
        }
      }
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (!this.employeeGeneralInfo.smsAktif && !this.employeeGeneralInfo.emailAktif) {
          this.errorMessage = this.getMessage(28);
          this.$bvModal.show('modal-alert');
        } else if (this.$store.state.hr.employeePhones.length > 0 && this.$store.state.hr.employeePhones.filter(i => i.varsayilan).length === 0) {
          this.errorMessage = this.getMessage(176);
          this.$bvModal.show('modal-alert');
        } else if (this.$store.state.hr.employeeEmails.length > 0 && this.$store.state.hr.employeeEmails.filter(i => i.varsayilan).length === 0) {
          this.errorMessage = this.getMessage(80);
          this.$bvModal.show('modal-alert');
        } else if (this.$store.state.hr.addresses.length > 0 && this.$store.state.hr.addresses.filter(i => i.varsayilan).length === 0) {
          this.errorMessage = this.getMessage(291);
          this.$bvModal.show('modal-alert');
        } else {
          this.$store.state.general.showOverlay = true;
          this.updateEmployee(this.employeeGeneralInfo).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.show('modal-success');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
          if (this.file) {
            const formData = new FormData();
            formData.append('personelId', this.$route.params.id);
            formData.append('file', this.file);
            this.addProfilePhoto(formData).then(p => {
              if (p.hasError) {
                this.showModal({title: 'Hata!', message: p.errorMessage, type: 'danger'});
              } else {
                this.employeeGeneralInfo.profilResmi = p.data.profilResmi;
                this.employeeGeneralInfo.resimEklendi = true;
                if (this.$route.params.id == this.$store.state.auth.user.id) {
                  this.$store.state.auth.user.profilResmi = p.data.profilResmi;
                  localStorage.setItem('user', JSON.stringify(this.$store.state.auth.user));
                }
              }
            });
          }
        }
      }
    }
  },
  created() {
    this.getParameters();
    this.getEmployeeGeneralInfo(this.$route.params.id);
  },
  computed: {
    ...mapState('hr', ['employeeGeneralInfo']),
    ...mapGetters('general', ['getMessage']),
  },
  watch: {
    'employeeGeneralInfo.askerlikDurumuId'(nw) {
      if (nw != 12) {
        this.employeeGeneralInfo.tecilTarihi = '';
      }
    },
    'employeeGeneralInfo.cinsiyetId'(nw) {
      if (nw != 7) {
        this.employeeGeneralInfo.askerlikDurumuId = null;
        this.employeeGeneralInfo.tecilTarihi = '';
      }
    }
  }
}
</script>