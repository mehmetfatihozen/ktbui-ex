<template>
  <div class="standart-page">
    <b-modal
        id="modal-success"
        centered
        title="Başarılı"
        header-bg-variant="success"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="outline-secondary"
        ok-only
        @ok.prevent="successModalClick"
        :busy="this.$store.state.general.showOverlay"
    >
      <p class="my-4 text-center">İşlem başarılı şekilde kaydedilmiştir.</p>
    </b-modal>
    <b-modal
        id="modal-exit"
        centered
        title="Uyarı"
        header-bg-variant="warning"
        header-text-variant="light"
        ok-title="Evet"
        ok-variant="outline-secondary"
        cancel-title="Hayır"
        cancel-variant="outline-secondary"
        @ok.prevent="exitModalClick"
        :busy="this.$store.state.general.showOverlay"
    >
      <p class="my-4 text-center">Bilgiler kayıt edilmeyecektir, emin misiniz?</p>
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
        @ok="okAlertClick"
        :busy="this.$store.state.general.showOverlay"
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ TEDARİKÇİ GİRİŞİ</h3>
    <div class="card-component new-employee-container">
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>Firma Tipi</label>
            <select class="form-control" v-model="form.companyId" :class="{ 'is-invalid': $v.form.companyId.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.supplierManagement.addParameters.firmaTipleri" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.companyId.$error">
              <small class="text-danger" v-if="!$v.form.companyId.required">Firma Tipi seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-8">
          <div class="form-group">
            <label>Firma Resmi Ünvanı</label>
            <input type="text" class="form-control" v-model="form.title"
                   :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Firma Resmi Unvanı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Kısa Ünvan</label>
            <input type="text" class="form-control" v-model="form.shortTitle"
                   :class="{ 'is-invalid': $v.form.shortTitle.$error }">
            <template v-if="$v.form.shortTitle.$error">
              <small class="text-danger" v-if="!$v.form.shortTitle.required">Firma Kısa Unvanı girilmelidir</small>
              <small class="text-danger" v-if="!$v.form.shortTitle.minLength">En az üç karakter olmalıdır</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>Vergi Dairesi İli</label>
            <select class="form-control" v-model="form.taxOfficeCity">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.supplierManagement.addParameters.sehirler" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.taxOfficeCity.$error">
              <small class="text-danger" v-if="!$v.form.taxOfficeCity.required">Vergi Dairesi İli seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-8">
          <div class="form-group">
            <label>Vergi Dairesi</label>
            <select class="form-control" v-model="form.taxOffice" :class="{ 'is-invalid': $v.form.taxOffice.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.parameter.taxOffices" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.taxOffice.$error">
              <small class="text-danger" v-if="!$v.form.taxOffice.requiredIf">Vergi Dairesi seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Vergi No</label>
            <input type="text" class="form-control"
                   v-model="form.taxNo"
                   :maxlength="taxNoLength"
                   @keypress="isNumber($event)"
                   :class="{ 'is-invalid': $v.form.taxNo.$error }">
            <template v-if="$v.form.taxNo.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.taxNo.requiredIf">Vergi No girilmelidir</small>
              </div>
            </template>
            <template v-if="$v.form.taxNo.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.taxNo.minLength">Vergi No {{ taxNoLength }} digit
                  olmalıdır</small>
              </div>
            </template>
            <template v-if="$v.form.taxNo.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.taxNo.taxNoCheck">{{ taxNoErrorMessage }}</small>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>Tel No</label>
            <input type="text" class="form-control" v-model="form.phone" :class="{ 'is-invalid': $v.form.phone.$error }"
                   v-mask="'(###) ### ## ##'">
            <template v-if="$v.form.phone.$error">
              <small class="text-danger" v-if="!$v.form.phone.minLength">Tel No bilgisi 10 haneli olmalıdır</small>
              <small class="text-danger"
                     v-if="!$v.form.phone.phoneCheck && $v.form.phone.minLength">Alan kodu 0,1,5 ile başlayamaz</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Faks No</label>
            <input type="text" class="form-control" v-model="form.fax" :class="{ 'is-invalid': $v.form.fax.$error }"
                   v-mask="'(###) ### ## ##'">
            <template v-if="$v.form.fax.$error">
              <small class="text-danger" v-if="!$v.form.fax.minLength">Faks No 10 haneli olmalıdır</small>
              <small class="text-danger"
                     v-if="!$v.form.fax.phoneCheck && $v.form.fax.minLength">Alan kodu 0,1,5 ile başlayamaz</small>
            </template>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Web Adresi</label>
            <input type="text" class="form-control" placeholder="www." v-model="form.webAddress">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="form.email"
                   :maxlength="emailMaxLength"
                   :class="{ 'is-invalid': $v.form.email.$error }">
            <template v-if="$v.form.email.$error">
              <small class="text-danger" v-if="!$v.form.email.email">Geçersiz email formatı</small>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Sektörler</label>
        <multiselect v-model="form.sectors" placeholder="Seçiniz" label="metin"
                     selectLabel="Seçmek için enter tuşuna basın" selectedLabel="Seçildi"
                     deselectLabel="Silmek için enter tuşuna basın" track-by="id"
                     :options="$store.state.supplierManagement.addParameters.sektorler" :multiple="true"
                     :taggable="true"></multiselect>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>İl</label>
            <select class="form-control" v-model="form.city">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.supplierManagement.addParameters.sehirler" :key="index">
                {{ item.metin }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>İlçe</label>
            <select class="form-control" v-model="form.district" :class="{ 'is-invalid': $v.form.district.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.parameter.districts" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.district.$error">
              <small class="text-danger" v-if="!$v.form.district.requiredIf">İlçe bilgisi seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label>Posta Kodu</label>
            <input type="text" class="form-control"
                   v-model="form.postCode"
                   @keypress="isNumber($event)"
                   :maxlength="postCodeMaxLength">
            <template v-if="$v.form.postCode.$error">
              <small class="text-danger" v-if="!$v.form.postCode.minLength">Posta Kodu 5 digit olmalıdır</small>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Adres</label>
        <input type="text" class="form-control" v-model="form.address"
               :class="{ 'is-invalid': $v.form.address.$error }" :maxlength="addressMaxLength">
        <template v-if="$v.form.address.$error">
          <small class="text-danger" v-if="!$v.form.address.requiredIf">Adres bilgisi girilmelidir</small>
          <small class="text-danger" v-if="!$v.form.address.minLength">Adres bilgisi en az 3 karakterden
            oluşabilir</small>
        </template>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-2 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-secondary btn-block mt-0 mr-2" @click="exitButtonClick()">
          Vazgeç
        </button>
        <button class="btn btn-success btn-block mt-0" @click="submit">Kaydet
        </button>
      </div>
    </div>
  </div>
</template>

<script>


import {email, minLength, required, requiredIf} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  components: {},
  data() {
    return {
      errorMessage: '',
      emailMaxLength: 50,
      addressMaxLength: 100,
      postCodeMaxLength: 5,
      taxNoErrorMessage: 'Geçersiz Vergi No',
      taxNoLength: 10,
      form: {
        id: null,
        companyId: null,
        title: '',
        shortTitle: '',
        taxOfficeCity: null,
        taxOffice: null,
        taxNo: '',
        phone: '',
        fax: '',
        webAddress: '',
        email: '',
        sectors: [],
        city: null,
        district: null,
        postCode: '',
        address: ''
      }
    }
  },
  validations: {
    form: {
      companyId: {
        required
      },
      title: {
        required
      },
      shortTitle: {
        required,
        minLength: minLength(3)
      },
      taxOfficeCity: {
        required,
      },
      taxOffice: {
        requiredIf: requiredIf(function (form) {
          return form.taxOfficeCity != null;
        })
      },
      taxNo: {
        minLength: function (value) {
          if (value.length !== 0)
            return value.length >= this.taxNoLength;
          else
            return true;
        },
        requiredIf: requiredIf(function (form) {
          return form.taxOffice != null;
        }),
        taxNoCheck: function (value) {
          if (value === "")
            return true;
          if (this.taxNoLength === 10) {
            if (value.length === 10) {
              let v = []
              let lastDigit = Number(value.charAt(9))
              for (let i = 0; i < 9; i++) {
                let tmp = (Number(value.charAt(i)) + (9 - i)) % 10
                v[i] = (tmp * 2 ** (9 - i)) % 9
                if (tmp !== 0 && v[i] === 0) v[i] = 9
              }
              let sum = v.reduce((a, b) => a + b, 0) % 10
              return (10 - (sum % 10)) % 10 === lastDigit
            }
            return false
          } else {
            value = value.toString();
            let isEleven = /^[0-9]{11}$/.test(value);
            let totalX = 0;
            for (let i = 0; i < 10; i++) {
              totalX += Number(value.substr(i, 1));
            }
            let isRuleX = totalX % 10 == value.substr(10, 1);
            let totalY1 = 0;
            let totalY2 = 0;
            for (let i = 0; i < 10; i += 2) {
              totalY1 += Number(value.substr(i, 1));
            }
            for (let i = 1; i < 10; i += 2) {
              totalY2 += Number(value.substr(i, 1));
            }
            let isRuleY = ((totalY1 * 7) - totalY2) % 10 == value.substr(9, 0);
            return isEleven && isRuleX && isRuleY;
          }
        }
      },
      district: {
        requiredIf: requiredIf(function (form) {
          return form.city != null;
        })
      },
      address: {
        requiredIf: requiredIf(function (form) {
          return form.city != null;
        }),
        minLength: minLength(3)
      },
      email: {
        email
      },
      phone: {
        minLength: minLength(15),
        phoneCheck: function (value) {
          const char = value.charAt(1);
          if (value !== '') {
            return char != 0 && char != 1 && char != 5;
          } else
            return true;
        }
      },
      fax: {
        minLength: minLength(15),
        phoneCheck: function (value) {
          const char = value.charAt(1);
          if (value !== '') {
            return char != 0 && char != 1 && char != 5;
          } else
            return true;
        }
      },
      postCode: {
        minLength: minLength(5)
      }
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['getAddParameters', 'addSupplier']),
    ...mapActions('parameter', ['getDistrictsByCityId', 'getTaxOfficeByCityId']),
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        const model = {...this.form};
        model.sectors = [];
        this.form.sectors.forEach(item => {
          model.sectors.push(parseInt(item.id));
        });
        this.addSupplier(model).then(res => {
          if (!res.hasError) {
            this.form.id = res.data.id
            this.$bvModal.show('modal-success');
          } else {
            this.errorMessage = res.errorMessage;
            this.$bvModal.show('modal-alert');
          }
          this.$store.state.general.showOverlay = false;
        }).catch(err => {
          alert(err);
          this.$store.state.general.showOverlay = false;
        })
      }
    },
    isNumber: function (event) {
      let charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
    },
    okAlertClick: function () {
      this.$bvModal.hide('modal-alert');
    },
    successModalClick: function () {
      this.$bvModal.hide('modal-success');
      this.$router.push('/supplier-management/detail/' + this.form.id);
    },
    exitButtonClick: function () {
      this.$bvModal.show('modal-exit');
    },
    exitModalClick: function () {
      this.$bvModal.hide('modal-exit');
      this.$router.push('/supplier-management');
    }
  },
  created() {
    this.$store.state.parameter.districts = Object.assign([]);
    this.$store.state.parameter.taxOffices = Object.assign([]);
    this.getAddParameters();
  },
  watch: {
    'form.city'(nw) {
      this.form.district = null;
      if (nw) {
        this.getDistrictsByCityId(nw);
      } else {
        this.$store.state.parameter.districts = Object.assign([]);
      }
    },
    'form.taxOfficeCity'(nw) {
      this.form.taxOffice = null;
      if (nw) {
        this.getTaxOfficeByCityId(nw);
      } else {
        this.$store.state.parameter.taxOffices = Object.assign([]);
      }
    },
    'form.companyId'(nw) {
      if (nw == 9 || nw == 10) {
        this.taxNoErrorMessage = 'Geçersiz TCKN Vergi No';
        this.taxNoLength = 11;
      } else {
        this.taxNoErrorMessage = 'Geçersiz Vergi No';
        this.taxNoLength = 10;
      }
    }
  }
}
</script>