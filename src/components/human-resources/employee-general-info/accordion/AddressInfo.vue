<template>
  <div>
    <Can I="create" a="ik/personel">
      <b-modal
          id="modal-add-address"
          size="lg"
          centered
          title="Yeni Adres Girişi"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="save"
          @hidden="clearForm"
      >
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Adres Tipi</label>
              <select class="form-control" v-model="form.addressTypeId"
                      :class="{ 'is-invalid': $v.form.addressTypeId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.addressTypes" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.addressTypeId.$error">
                <small class="text-danger" v-if="!$v.form.addressTypeId.required">{{ getMessage(70) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Ülke</label>
              <select class="form-control" v-model="form.countryId" :class="{ 'is-invalid': $v.form.countryId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.countries" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.countryId.$error">
                <small class="text-danger" v-if="!$v.form.countryId.required">{{ getMessage(71) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Şehir</label>
              <select class="form-control" v-model="form.cityId" :class="{ 'is-invalid': $v.form.cityId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.cities" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.cityId.$error">
                <small class="text-danger" v-if="!$v.form.cityId.required">{{ getMessage(72) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>İlçe</label>
              <select class="form-control" v-model="form.districtId"
                      :class="{ 'is-invalid': $v.form.districtId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.districts" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.form.districtId.$error">
                <small class="text-danger" v-if="!$v.form.districtId.required">{{ getMessage(73) }}</small>
              </template>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Adres</label>
          <input type="text" class="form-control" v-model="form.address"
                 :class="{ 'is-invalid': $v.form.address.$error }"
                 maxlength="100"
          >
          <template v-if="$v.form.address.$error">
            <small class="text-danger" v-if="!$v.form.address.required">{{ getMessage(74) }}</small>
            <small class="text-danger" v-if="!$v.form.address.minLength">{{ getMessage(123) }}</small>
          </template>
        </div>
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Posta Kodu</label>
              <input type="text" class="form-control" v-model="form.postCode"
                     :class="{ 'is-invalid': $v.form.postCode.$error }"
                     maxlength="5"
                     v-mask="'#####'"
              >
              <template v-if="$v.form.postCode.$error">
                <small class="text-danger" v-if="!$v.form.postCode.minLength">{{ getMessage(76) }}</small>
              </template>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">İletişim</label>
              <label class="label_switch">
                <input type="checkbox" v-model="form.default">
                <span class="mr-2"></span>
              </label>
              <template v-if="$v.form.default.$error">
                <small class="text-danger d-block" v-if="!$v.form.default.checked">{{ getMessage(62) }}</small>
              </template>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
          id="modal-edit-address"
          size="lg"
          centered
          title="Adres Güncelle"
          ok-title="Kaydet"
          ok-variant="success"
          cancel-title="İptal"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="update"
      >
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Adres Tipi</label>
              <select class="form-control" v-model="addressParameters.iletisimTipId"
                      :class="{ 'is-invalid': $v.addressParameters.iletisimTipId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.addressTypes" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.addressParameters.iletisimTipId.$error">
                <small class="text-danger" v-if="!$v.addressParameters.iletisimTipId.required">{{getMessage(70)}}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Ülke</label>
              <select class="form-control" v-model="addressParameters.ulkeId"
                      :class="{ 'is-invalid': $v.addressParameters.ulkeId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.countries" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.addressParameters.ulkeId.$error">
                <small class="text-danger" v-if="!$v.addressParameters.ulkeId.required">{{ getMessage(71) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Şehir</label>
              <select class="form-control" v-model="addressParameters.sehirId"
                      :class="{ 'is-invalid': $v.addressParameters.sehirId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.cities" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.addressParameters.sehirId.$error">
                <small class="text-danger" v-if="!$v.addressParameters.sehirId.required">{{ getMessage(72) }}</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>İlçe</label>
              <select class="form-control" v-model="addressParameters.ilceId"
                      :class="{ 'is-invalid': $v.addressParameters.ilceId.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in $store.state.parameter.districts" :key="index">
                  {{ item.metin }}
                </option>
              </select>
              <template v-if="$v.addressParameters.ilceId.$error">
                <small class="text-danger" v-if="!$v.addressParameters.ilceId.required">{{ getMessage(73) }}</small>
              </template>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Adres</label>
          <input type="text" class="form-control" v-model="addressParameters.adres"
                 :class="{ 'is-invalid': $v.addressParameters.adres.$error }"
          maxlength="100"
          >
          <template v-if="$v.addressParameters.adres.$error">
            <small class="text-danger" v-if="!$v.addressParameters.adres.required">{{ getMessage(74) }}</small>
            <small class="text-danger" v-if="!$v.addressParameters.adres.minLength">{{ getMessage(123) }}</small>
          </template>
        </div>
        <div class="row">
          <div class="col-sm-auto">
            <div class="form-group">
              <label>Posta Kodu</label>
              <input type="text" class="form-control" v-model="addressParameters.postaKodu"
                     :class="{ 'is-invalid': $v.addressParameters.postaKodu.$error }"
                     maxlength="5"
                     v-mask="'#####'"
              >
              <template v-if="$v.addressParameters.postaKodu.$error">
                <small class="text-danger" v-if="!$v.addressParameters.postaKodu.minLength">{{ getMessage(76) }}</small>
              </template>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">İletişim</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true" v-model="addressParameters.varsayilan">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
          id="modal-warning-address"
          centered
          title="Uyarı"
          ok-title="Tamam"
          ok-variant="success"
          header-bg-variant="warning"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok="confirmAddress"
      >
        Bir önceki adresteki iletişim bilgisi kaldırılacaktır, emin misiniz?
      </b-modal>
    </Can>
    <Can I="delete" a="ik/personel">
      <b-modal
          id="modal-delete-address"
          centered
          title="Adres Sil"
          ok-title="Sil"
          ok-variant="danger"
          header-bg-variant="danger"
          header-text-variant="light"
          cancel-title="Vazgeç"
          cancel-variant="outline-secondary"
          :busy="overlay"
          @ok.prevent="remove"
      >
        Adresi silmek istediğinize emin misiniz?
      </b-modal>
    </Can>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Adres Tipi</th>
        <th class="w-75">Adres</th>
        <th class="fit text-center">İletişim</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <Can I="create" a="ik/personel">
            <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-address @click="isEditing=false"/>
          </Can>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item.id)" v-for="(item,index) in addresses"
          :key="index">
        <td class="fit">{{ item.iletisimTip }}</td>
        <td>{{ item.adres }}
        </td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.varsayilan"/>
        </td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
        <td class="fit text-right">
          <Can I="delete" a="ik/personel">
            <button class="btn btn-sm btn-outline-secondary" @click.stop="openConfirmModal(item.id)">
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
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters, mapState} from "vuex";
import {required, minLength} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      overlay: false,
      isEditing: false,
      form: {
        employeeId: this.$route.params.id,
        addressTypeId: null,
        countryId: null,
        cityId: null,
        districtId: null,
        address: '',
        postCode: '',
        default: false
      }
    }
  },
  validations: {
    form: {
      addressTypeId: {
        required
      },
      countryId: {
        required
      },
      cityId: {
        required
      },
      districtId: {
        required
      },
      address: {
        required,
        minLength:minLength(3)
      },
      postCode: {
        minLength: minLength(5)
      },
      default: {
        checked: function (val) {
          if (this.addresses.length === 0 && val === false) {
            return false;
          } else if (this.addresses.length === 1 && val === false && this.isEditing) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    addressParameters: {
      iletisimTipId: {
        required
      },
      ulkeId: {
        required
      },
      sehirId: {
        required
      },
      ilceId: {
        required
      },
      adres: {
        required,
        minLength:minLength(3)
      },
      postaKodu: {
        minLength: minLength(5)
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('parameter', ['getAddressTypes', 'getCountries', 'getCities', 'getDistricts']),
    ...mapActions('hr', ['removeAddress', 'updateAddress', 'getAddressParameters', 'addAddress', 'getAddress']),
    confirmAddress() {
      this.actualSave();
    },
    openConfirmModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-address');
    },
    remove() {
      this.removeAddress(this.selectedId).then((res) => {
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-address');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    actualSave() {
      this.overlay = true;
      this.addAddress(this.form).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-add-address');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    save() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        if (this.addresses.length > 0 && this.form.default) {
          this.$bvModal.show('modal-warning-address');
        } else {
          this.actualSave();
          this.showModal({title: 'İşlem Başarılı', message: this.getMessage(19), type: 'success'});
        }
      }
    },
    showEditModal(id) {
      this.isEditing = true;
      this.getAddressParameters(id).then(() => {
        this.$bvModal.show('modal-edit-address');
      });
    },
    update() {
      this.$v.addressParameters.$touch();
      if (!this.$v.addressParameters.$invalid) {
        this.overlay = true;
        this.updateAddress(this.addressParameters).then((res) => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-edit-address');
            this.showModal({title: 'İşlem Başarılı', message: this.getMessage(56), type: 'success'});
          }
        }).catch(err => {
          this.overlay = false;
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    },
    clearForm() {
      this.form = Object.assign({}, {
        employeeId: this.$route.params.id,
        addressTypeId: null,
        countryId: null,
        cityId: null,
        districtId: null,
        address: '',
        postCode: '',
        default: false
      });
      this.$v.$reset();
    }
  },
  created() {
    this.getCountries();
    this.getAddressTypes();
    this.getAddress(this.$route.params.id);
  },
  computed: {
    ...mapState('hr', ['addressParameters', 'addresses']),
    ...mapGetters('general',['getMessage'])
  },
  watch: {
    'form.countryId'(nw) {
      if (!this.isEditing) {
        this.form.cityId = null;
      }
      if (nw) {
        this.getCities(nw);
      } else {
        this.$store.state.parameter.cities = Object.assign([]);
      }
    },
    'form.cityId'(nw) {
      if (!this.isEditing) {
        this.form.districtId = null;
      }
      if (nw) {
        this.getDistricts(nw);
      } else {
        this.$store.state.parameter.districts = Object.assign([]);
      }
    },
    'addressParameters.ulkeId'(nw) {
      if (!this.isEditing) {
        this.addressParameters.sehirId = null;
      }
      if (nw) {
        this.getCities(nw);
      } else {
        this.$store.state.parameter.cities = Object.assign([]);
      }
    },
    'addressParameters.sehirId'(nw) {
      if (!this.isEditing) {
        this.addressParameters.ilceId = null;
      }
      if (nw) {
        this.getDistricts(nw);
      } else {
        this.$store.state.parameter.districts = Object.assign([]);
      }
    }
  }
}
</script>

<style scoped>

</style>