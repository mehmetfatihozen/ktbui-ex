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
                   @keypress="isNumber($event)"
                   :class="{ 'is-invalid': $v.form.taxNo.$error }">
            <template v-if="$v.form.taxNo.$error">
              <small class="text-danger" v-if="!$v.form.taxNo.requiredIf">Vergi No girilmelidir</small>
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
              <p class="text-danger" v-if="!$v.form.phone.minLength">İş tel bilgisi 10 haneli olmalıdır</p>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Faks No</label>
            <input type="text" class="form-control" v-model="form.fax" :class="{ 'is-invalid': $v.form.fax.$error }"
                   v-mask="'(###) ### ## ##'">
            <template v-if="$v.form.fax.$error">
              <p class="text-danger" v-if="!$v.form.fax.minLength">Faks No 10 haneli olmalıdır</p>
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
              <p class="text-danger" v-if="!$v.form.email.email">Geçersiz email formatı</p>
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
               :class="{ 'is-invalid': $v.form.address.$error }">
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
      emailMaxLength: 50,
      postCodeMaxLength: 5,
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
      taxOffice: {
        requiredIf: requiredIf(function (form) {
          return form.taxOfficeCity != null;
        })
      },
      taxNo: {
        requiredIf: requiredIf(function (form) {
          return form.taxOffice != null;
        })
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
        minLength: minLength(15)
      },
      fax: {
        minLength: minLength(15)
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
            alert(res.errorMessage);
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
    successModalClick: function (){
      this.$bvModal.hide('modal-success');
      this.$router.push('/supplier-management/detail/' + this.form.id);
    },
    exitButtonClick: function (){
      this.$bvModal.show('modal-exit');
    },
    exitModalClick: function (){
      this.$bvModal.hide('modal-exit');
      this.$router.push('/supplier-management');
    }
  },
  created() {
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
    }
  }
}
</script>