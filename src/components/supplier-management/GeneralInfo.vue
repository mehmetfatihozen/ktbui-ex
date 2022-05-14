<template>
  <div>
    <b-modal
        id="modal-success"
        centered
        title="Başarılı"
        header-bg-variant="success"
        header-text-variant="light"
        ok-title="Tamam"
        ok-variant="outline-secondary"
        ok-only
        @ok="successModalClick"
        :busy="overlay"
    >
      <p class="my-4 text-center">{{ this.getMessage(19) }}</p>
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
        :busy="overlay"
    >
      <p class="my-4 text-center">{{ this.getMessage(112) }}</p>
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
        :busy="overlay"
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
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
              <small class="text-danger" v-if="!$v.form.companyId.required">{{ this.getMessage(142) }}</small>
            </template>
          </div>
        </div>
        <div class="col-8">
          <div class="form-group">
            <label>Firma Resmi Ünvanı</label>
            <input type="text" class="form-control" v-model="form.title"
                   :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">{{ this.getMessage(143) }}</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Kısa Ünvan</label>
            <input type="text" class="form-control" v-model="form.shortTitle"
                   :class="{ 'is-invalid': $v.form.shortTitle.$error }">
            <template v-if="$v.form.shortTitle.$error">
              <small class="text-danger" v-if="!$v.form.shortTitle.required">{{ this.getMessage(144) }}</small>
              <small class="text-danger" v-if="!$v.form.shortTitle.minLength">{{ this.getMessage(145) }}</small>
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
              <small class="text-danger" v-if="!$v.form.taxOfficeCity.requiredIf">{{ this.getMessage(238) }}</small>
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
              <small class="text-danger" v-if="!$v.form.taxOffice.requiredIf">{{ this.getMessage(235) }}</small>
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
                <small class="text-danger" v-if="!$v.form.taxNo.requiredIf">{{ this.getMessage(236) }}</small>
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
              <small class="text-danger" v-if="!$v.form.phone.minLength">{{ this.getMessage(147) }}</small>
              <small class="text-danger"
                     v-if="!$v.form.phone.phoneCheck && $v.form.phone.minLength">{{ this.getMessage(141) }}</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Faks No</label>
            <input type="text" class="form-control" v-model="form.fax" :class="{ 'is-invalid': $v.form.fax.$error }"
                   v-mask="'(###) ### ## ##'">
            <template v-if="$v.form.fax.$error">
              <small class="text-danger" v-if="!$v.form.fax.minLength">{{ this.getMessage(146) }}</small>
              <small class="text-danger"
                     v-if="!$v.form.fax.phoneCheck && $v.form.fax.minLength">{{ this.getMessage(141) }}</small>
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
            <input type="text" class="form-control"
                   v-model="form.email"
                   :maxlength="emailMaxLength"
                   :class="{ 'is-invalid': $v.form.email.$error }">
            <template v-if="$v.form.email.$error">
              <small class="text-danger" v-if="!$v.form.email.email">{{ this.getMessage(169) }}</small>
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
              <small class="text-danger" v-if="!$v.form.district.requiredIf">{{ this.getMessage(149) }}</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label>Posta Kodu</label>
            <input type="text" class="form-control"
                   @keypress="isNumber($event)"
                   :maxlength="postCodeMaxLength"
                   v-model="form.postCode">
            <template v-if="$v.form.postCode.$error">
              <small class="text-danger" v-if="!$v.form.postCode.minLength">{{ this.getMessage(148) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Adres</label>
        <input type="text" class="form-control" v-model="form.address"
               :class="{ 'is-invalid': $v.form.address.$error }" :maxlength="addressMaxLength">
        <template v-if="$v.form.address.$error">
          <small class="text-danger" v-if="!$v.form.address.requiredIf">{{ this.getMessage(74) }}</small>
          <small class="text-danger" v-if="!$v.form.address.minLength">{{ this.getMessage(123) }}</small>
        </template>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-2 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-secondary btn-block mt-0 mr-2" @click="exitButtonClick()">
          Vazgeç
        </button>
        <button class="btn btn-success btn-block mt-0" @click="submit">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {email, minLength, required, requiredIf} from "vuelidate/lib/validators";

export default {
  components: {},
  data() {
    return {
      errorMessage: '',
      emailMaxLength: 50,
      addressMaxLength: 100,
      postCodeMaxLength: 5,
      taxNoErrorMessage: '',
      taxNoLength: 10,
      overlay: false,
      form: {
        id: this.$route.params.id,
        companyId: null,
        companyState: false,
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
  computed:{
    ...mapGetters('general',['getMessage'])
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
        requiredIf: requiredIf(function (form) {
          return form.companyState;
        })
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
    ...mapActions('supplierManagement', ['getAddParameters', 'getSupplierById', 'updateSupplier']),
    ...mapActions('parameter', ['getDistrictsByCityId', 'getTaxOfficeByCityId']),
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.overlay = true;
        const model = {...this.form};
        model.sectors = [];
        this.form.sectors.forEach(item => {
          model.sectors.push(parseInt(item.id));
        });
        this.updateSupplier(model).then(res => {
          if (!res.hasError) {
            this.form.id = res.data.id
            this.$bvModal.show('modal-success');
          } else {
            this.errorMessage = res.errorMessage;
            this.$bvModal.show('modal-alert');
          }
          this.overlay = false;
        }).catch(err => {
          alert(err);
          this.overlay = false;
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
    successModalClick: function () {
      this.$bvModal.hide('modal-success');
    },
    okAlertClick: function () {
      this.$bvModal.hide('modal-alert');
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
    this.taxNoErrorMessage = this.getMessage(241);
    this.getAddParameters();
    let supplier = {};
    this.getSupplierById(this.$route.params.id).then(res => {
      supplier = Object.assign({}, res);
      this.form = {
        id: this.$route.params.id,
        companyId: supplier.firmaTipiId,
        companyState: supplier.firmaDurumu,
        title: supplier.unvan,
        shortTitle: supplier.kisaUnvan,
        taxOfficeCity: supplier.vergiDaireIlId,
        taxOffice: supplier.vergiDaireId,
        taxNo: supplier.vergiNo,
        phone: supplier.telNo,
        fax: supplier.faksNo,
        webAddress: supplier.webAdres,
        email: supplier.email,
        sectors: supplier.sektor,
        city: supplier.sehirId,
        district: supplier.ilceId,
        postCode: supplier.postaKodu,
        address: supplier.adres
      };
      if (this.form.companyId === 9 || this.form.companyId === 10) {
        this.taxNoErrorMessage = this.getMessage(239);
        this.taxNoLength = 11;
      } else {
        this.taxNoErrorMessage = this.getMessage(241);
        this.taxNoLength = 10;
      }
    });
  },
  watch: {
    'form.city'(nw) {
      if (nw) {
        this.getDistrictsByCityId(nw);
      } else {
        this.$store.state.parameter.districts = Object.assign([]);
      }
    },
    'form.taxOfficeCity'(nw) {
      if (nw) {
        this.getTaxOfficeByCityId(nw);
      } else {
        this.$store.state.parameter.taxOffices = Object.assign([]);
      }
    },
    'form.companyId'(nw) {
      if (nw == 9 || nw == 10) {
        this.taxNoErrorMessage = this.getMessage(239);
        this.taxNoLength = 11;
      } else {
        this.taxNoErrorMessage = this.getMessage(241);
        this.taxNoLength = 10;
      }
    }
  }
}
</script>