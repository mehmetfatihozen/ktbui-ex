<template>
  <div class="standart-page">
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
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ PERSONEL GİRİŞİ</h3>
    <div class="card-component new-employee-container">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col-4">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Personel Tipi</label>
                      <select class="form-control" v-model="form.staffType"
                              :class="{ 'is-invalid': $v.form.staffType.$error }">
                        <option :value="null">Seçiniz</option>
                        <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.personelTipleri"
                                :key="index">
                          {{ item.metin }}
                        </option>
                      </select>
                      <template v-if="$v.form.staffType.$error">
                        <small class="text-danger" v-if="!$v.form.staffType.required">{{ getMessage(29) }}</small>
                      </template>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>TC Kimlik No</label>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="form.tckn"
                               :class="{ 'is-invalid': $v.form.tckn.$error }" maxlength="11"
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
                      <template v-if="$v.form.tckn.$error">
                        <small class="text-danger" v-if="!$v.form.tckn.required">{{ getMessage(30) }}</small>
                        <small class="text-danger" v-if="!$v.form.tckn.minLength">{{ getMessage(179) }}</small>
                        <small class="text-danger" v-if="!$v.form.tckn.tcknCheck&&$v.form.tckn.minLength">{{ getMessage(179) }}</small>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label>Adı</label>
                  <input type="text" class="form-control" v-model="form.name"
                         :class="{ 'is-invalid': $v.form.name.$error }"
                         maxlength="25"
                         @keypress="isLetter"
                         disabled
                  >
                  <template v-if="$v.form.name.$error">
                    <small class="text-danger" v-if="!$v.form.name.required">{{ getMessage(33) }}</small>
                    <small class="text-danger" v-if="!$v.form.name.minLength">{{ getMessage(124) }}</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Soyadı</label>
                  <input type="text" class="form-control" v-model="form.surname"
                         :class="{ 'is-invalid': $v.form.surname.$error }"
                         maxlength="25"
                         @keypress="isLetter"
                         disabled
                  >
                  <template v-if="$v.form.surname.$error">
                    <small class="text-danger" v-if="!$v.form.surname.required">{{ getMessage(34) }}</small>
                    <small class="text-danger" v-if="!$v.form.name.minLength">{{ getMessage(125) }}</small>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <label>Uyruk</label>
                  <select class="form-control" v-model="form.nationality"
                          :class="{ 'is-invalid': $v.form.nationality.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.uyruk" :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.form.nationality.$error">
                    <small class="text-danger" v-if="!$v.form.nationality.required">{{ getMessage(31) }}</small>
                  </template>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Doğum Tarihi</label>

                      <date-picker v-model="form.birthDate"
                                   :input-class="$v.form.birthDate.$error?'is-invalid form-control':'form-control'"
                                   format="DD.MM.YYYY"
                                   valueType="format"
                      ></date-picker>
                      <template v-if="$v.form.birthDate.$error">
                        <small class="text-danger" v-if="!$v.form.birthDate.required">{{ getMessage(35) }}</small>
                        <small class="text-danger" v-if="!$v.form.birthDate.isLegalAge">{{ getMessage(178) }}</small>
                      </template>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Medeni Durum</label>
                      <select class="form-control" v-model="form.maritalStatus">
                        <option :value="null">Seçiniz</option>
                        <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.medeniDurum"
                                :key="index">
                          {{ item.metin }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label>Baba Adı</label>
                  <input type="text" class="form-control" v-model="form.fatherName" @keypress="isLetter">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Cinsiyet</label>
                  <select class="form-control" v-model="form.gender"
                          :class="{ 'is-invalid': $v.form.gender.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.cinsiyet"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.form.gender.$error">
                    <small class="text-danger" v-if="!$v.form.gender.required">{{ getMessage(36) }}</small>
                  </template>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Kan Grubu</label>
                  <select class="form-control" v-model="form.bloodGroup">
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
                  <label>Öğrenim Durumu</label>
                  <select class="form-control" v-model="form.educationStatus">
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
              <div class="col-4">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Askerlik Durumu</label>
                      <select class="form-control" v-model="form.militaryStatus"
                              :disabled="form.gender!=7||form.gender==null">
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
                      <date-picker v-model="form.registrationDate"
                                   :input-class="$v.form.registrationDate.$error?'is-invalid form-control':'form-control'"
                                   format="DD.MM.YYYY"
                                   :disabled="form.gender!=7 || form.militaryStatus!=12"
                                   :disabled-date="disabledRegistrationDate"
                      ></date-picker>
                      <template v-if="$v.form.registrationDate.$error">
                        <small class="text-danger" v-if="!$v.form.registrationDate.requiredIf">{{ getMessage(37) }}</small>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label>Engelli Durumu</label>
                  <select class="form-control" v-model="form.disabledStatus">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.engelliDurum"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label>Durumu</label>
                  <select class="form-control" v-model="form.state" :class="{ 'is-invalid': $v.form.state.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.durum" :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.form.state.$error">
                    <small class="text-danger" v-if="!$v.form.state.required">{{ getMessage(38) }}</small>
                  </template>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <label>Alt Durumu</label>
                  <select class="form-control" v-model="form.subState"
                          :class="{ 'is-invalid': $v.form.subState.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.altDurum" :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.form.subState.$error">
                    <small class="text-danger" v-if="!$v.form.subState.required">{{ getMessage(39) }}</small>
                  </template>
                </div>
              </div>
              <div class="col-2">
                <div class="form-group">
                  <label>Durum Tarihi</label>
                  <date-picker v-model="form.stateDate"
                               :input-class="$v.form.stateDate.$error?'is-invalid form-control':'form-control'"
                               format="DD.MM.YYYY"
                               :disabled-date="disabledStateDate"
                  ></date-picker>
                  <template v-if="$v.form.stateDate.$error">
                    <small class="text-danger" v-if="!$v.form.stateDate.required">{{ getMessage(40) }}</small>
                  </template>
                </div>
              </div>
              <div class="col-2">
                <div class="form-group">
                  <label>Sicil no</label>
                  <input type="text" class="form-control" v-model="form.registrationNumber" disabled>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label>Sisteme Giriş Tipi</label>
                  <select class="form-control" v-model="form.systemLoginType"
                          :class="{ 'is-invalid': $v.form.systemLoginType.$error }">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id" v-for="(item,index) in $store.state.hr.parameters.sistemeGirisTipleri"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                  <template v-if="$v.form.systemLoginType.$error">
                    <small class="text-danger" v-if="!$v.form.systemLoginType.required">{{ getMessage(41) }}</small>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <div class="user-avatar mt-4">
              <input type="file" ref="file" class="d-none" @change="onChangeFileUpload()">
              <img :src="url?url:require('@/assets/img/icons/user.png')"
                   alt=""
                   @click="$refs.file.click()">
              <font-awesome-icon icon="times" size="lg" class="text-danger remove-photo" @click.stop="removePhoto"
                                 v-if="url"/>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="row justify-content-end">
      <div class="col-2 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-secondary btn-block mt-0 mr-2" v-b-modal.modal-cancel-confirm>Vazgeç</button>
        <button class="btn btn-success btn-block mt-0" @click="submit">
          Kaydet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/*import PersonalInfo from '@/components/human-resources/PersonalInfo';
import ContactInfo from '@/components/human-resources/ContactInfo';
import UserInfo from '@/components/human-resources/UserInfo';*/
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import {required, requiredIf, minLength} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    /*PersonalInfo,
    ContactInfo,
    UserInfo,*/
    DatePicker
  },
  data() {
    return {
      disabledStateDate: (date) => date >new Date(),
      busy: false,
      disabledRegistrationDate: (date) => date < this.$moment(new Date()).add(-1, 'days'),
      file: null,
      url: '',
      form: {
        staffType: null,
        tckn: '',
        name: '',
        surname: '',
        gender: null,
        nationality: 6,
        birthDate: '',
        maritalStatus: null,
        fatherName: '',
        bloodGroup: null,
        militaryStatus: null,
        registrationDate: '',
        disabledStatus: null,
        educationStatus: null,
        state: null,
        subState: null,
        stateDate: '',
        registrationNumber: '',
        systemLoginType: null
      }
    }
  },
  validations: {
    form: {
      staffType: {
        required
      },
      name: {
        required,
        minLength: minLength(2)
      },
      surname: {
        required,
        minLength: minLength(2)
      },
      gender: {
        required
      },
      nationality: {
        required
      },
      tckn: {
        required,
        minLength: minLength(11),
        tcknCheck: function (val) {
          return val.charAt(0) != "0"
        }
      },
      birthDate: {
        required,
        isLegalAge(value, form) {
          if (!form.birthDate) return true;
          const today = this.$moment()
          const diff = today.diff(this.$moment(form.birthDate, 'DD.MM.YYYY'), 'years')
          return diff >= 18;
        }
      },
      registrationDate: {
        requiredIf: requiredIf(function (form) {
          return form.militaryStatus == 12;
        })
      },
      state: {
        required
      },
      subState: {
        required
      },
      stateDate: {
        required
      },
      systemLoginType: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['addProfilePhoto', 'getParameters', 'getSubStates', 'createEmployee', 'checkIdentity']),
    check() {
      this.$v.form.tckn.$touch();
      if (!this.$v.form.tckn.$invalid) {
        this.busy = true;
        this.checkIdentity(this.form.tckn).then(res => {
          this.busy = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.form.name = res.data.ad;
            this.form.surname = res.data.soyad;
            this.form.fatherName = res.data.babaAdi;
            this.form.birthDate = res.data.dogumTarihi;
            this.form.gender = res.data.cinsiyetId;
            this.form.maritalStatus = res.data.medeniHalId;
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
      this.file = null;
      this.url = '';
    },
    removePhoto() {
      this.$bvModal.show('modal-remove-photo');
    },
    onChangeFileUpload() {
      //size in mb
      const size = this.$refs.file.files[0].size / 1024 / 1024;
      if (size > 5) {
        this.showModal({title: 'Hata!', message: this.getMessage(290), type: 'danger'});
      } else {
        if (!this.$refs.file.files[0].name.match(/.(jpg|jpeg|png)$/i)) {
          this.showModal({title: 'Hata!', message: this.getMessage(79), type: 'danger'});
          this.file = null;
        } else {
          this.file = this.$refs.file.files[0];
          this.url = URL.createObjectURL(this.$refs.file.files[0]);
        }
      }
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        this.createEmployee(this.form).then((res) => {
          this.$store.state.general.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            if (this.file) {
              const formData = new FormData();
              formData.append('personelId', res.data.id);
              formData.append('file', this.file);
              this.addProfilePhoto(formData).then((p) => {
                if (p.hasError) {
                  this.showModal({title: 'Hata!', message: p.errorMessage, type: 'danger'});
                } else {
                  this.$router.push('/human-resources/employee/detail/' + res.data.id);
                }
              });
            } else {
              this.$router.push('/human-resources/employee/detail/' + res.data.id);
            }
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.$store.state.general.showOverlay = false;
        });
      }
    }
  },
  created() {
    this.getParameters();
    this.$store.state.hr.showNewEmployeeButton = false;
  },
  watch: {
    'form.militaryStatus'(nw) {
      if (nw != 12) {
        this.form.registrationDate = '';
      }
    },
    'form.state'(nw) {
      this.form.subState = null;
      if (nw) {
        this.getSubStates(nw);
      }
    },
    'form.gender'(nw) {
      if (nw != 7) {
        this.form.militaryStatus = null;
        this.form.registrationDate = '';
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  }
}
</script>