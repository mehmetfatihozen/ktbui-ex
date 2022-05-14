<template>
  <div class="standart-page">
    <h3 class="title">TEDARİKÇİ YÖNETİMİ</h3>
    <div class="card-component mb-5">
      <div class="body">
        <div class="row">
          <div class="col-5">
            <div class="row">
              <div class="col-5">
                <div class="form-group">
                  <label>Şehir</label>
                  <select class="form-control" v-model="form.city">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in $store.state.supplierManagement.filterParameters.sehirler"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <label>İlçe</label>
                  <select class="form-control" v-model="form.district">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in $store.state.parameter.districts"
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
              <label>Firma Adı</label>
              <input type="text" class="form-control" v-model="form.companyName">
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label>Kısa Ünvan</label>
              <input type="text" class="form-control" v-model="form.shortTitle">
            </div>
          </div>
        </div>
      </div>
      <div class="footer">

        <div class="row">
          <div class="col-5">
            <div class="row">
              <div class="col-5">
                <div class="form-group mb-0">
                  <label>Vergi No</label>
                  <input type="text"
                         class="form-control"
                         v-model="form.taxNo"
                         @keypress="isNumber($event)"
                         :maxlength="taxNoMaxLength">
                </div>
              </div>
              <div class="col-7">
                <div class="form-group mb-0">
                  <label>Durumu</label>
                  <select class="form-control" v-model="form.state">
                    <option :value="null">Seçiniz</option>
                    <option :value="item.id"
                            v-for="(item,index) in $store.state.supplierManagement.filterParameters.durumlar"
                            :key="index">
                      {{ item.metin }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group mb-0">
              <label>Sektör</label>
              <select class="form-control" v-model="form.sector">
                <option :value="null">Seçiniz</option>
                <option :value="item.id"
                        v-for="(item,index) in $store.state.supplierManagement.filterParameters.sektorler" :key="index">
                  {{ item.metin }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-3 d-flex justify-content-end align-items-end">
            <button class="btn btn-outline-secondary btn-block mr-2 mt-0" @click="clear()">Temizle</button>
            <button class="btn btn-secondary btn-block mt-0" @click="list()">Listele</button>
          </div>
        </div>
        <template v-if="$v.form.taxNo.$error">
          <div class="row">
            <div class="col-5">
              <div class="row">
                <div class="col-5">
                  <div class="form-group mb-0">
                    <div class="mb-1 ml-1">
                      <small class="text-danger" v-if="!$v.form.taxNo.minLength">Vergi No 10 ya da 11 digit
                        olmalıdır</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Firma Adı</th>
        <th class="fit">Kısa Ünvan</th>
        <th class="fit">Vergi No</th>
        <th class="fit">Şehir</th>
        <th class="fit">Durum</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="$router.push('/supplier-management/detail/'+item.id)"
          v-for="(item,index) in $store.state.supplierManagement.suppliers" :key="index">
        <td>{{ item.firmaAdi }}</td>
        <td class="fit">{{ item.kisaUnvan }}</td>
        <td class="fit">{{ item.vergiNo }}</td>
        <td class="fit">{{ item.sehir }}</td>
        <td class="fit">{{ item.durum }}</td>
      </tr>
      </tbody>
    </table>
    <div class="row" v-if="$store.state.supplierManagement.suppliers.length>0">
      <div class="col">
        <i class="text-secondary">{{ $store.state.supplierManagement.suppliersPagination.totalItems }} kayıttan {{
            ((form.currentPage - 1) * form.pageSize) + 1
          }} - {{ form.currentPage * form.pageSize }} arası gösterilmektedir</i>
      </div>
      <div class="col">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <nav>
              <paginate v-if="$store.state.supplierManagement.suppliers.length"
                        :page-count="$store.state.supplierManagement.suppliersPagination.totalPages"
                        :click-handler="changePage"
                        :prev-text="'Önceki'"
                        :next-text="'Sonraki'"
                        :active-class="'active'"
                        :container-class="'pagination'"
                        v-model="form.currentPage">
              </paginate>
            </nav>
          </div>
          <div class="col-2">
            <select class="form-control" v-model="form.pageSize" @change="list()">
              <option value="25" selected>25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-danger text-center" v-if="showError">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      showError: false,
      errorMessage: '',
      taxNoMaxLength: 11,
      form: {
        currentPage: 1,
        pageSize: 25,
        city: null,
        district: null,
        companyName: '',
        shortTitle: '',
        taxNo: '',
        state: null,
        sector: null
      }
    }
  },
  validations: {
    form: {
      taxNo: {
        minLength: function (value) {
          if (value.length !== 0)
            return value.length >= 10;
          else
            return true;
        }
      }
    }
  },
  methods: {
    ...mapActions('parameter', ['getDistrictsByCityId']),
    ...mapActions('supplierManagement', ['getFilterParameters', 'searchSupplier']),
    changePage(pageNumber) {
      this.form.currentPage = pageNumber;
      this.list();
    },
    list() {
      this.showError = false;
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$v.$reset();
        this.$store.state.supplierManagement.suppliers = Object.assign([], []);
        this.$store.state.supplierManagement.suppliersPagination = Object.assign({}, {});
        if (this.isEmptyFilterForm()) {
          this.showError = true;
          this.errorMessage = "Listeleme için en az bir kriter girilmelidir";
          return;
        }
        this.searchSupplier(this.form).then(res => {
          if (res.tedarikciler.length === 0) {
            this.showError = true;
            this.errorMessage = "Listeleme için uygun kayıt bulunamadı";
          } else {
            this.showError = false;
          }
          this.$store.state.supplierManagement.showNewSupplierButton = true;
        });
      }
    },
    clear() {
      this.form = {
        currentPage: 1,
        pageSize: 25,
        city: null,
        district: null,
        companyName: '',
        shortTitle: '',
        taxNo: '',
        state: null,
        sector: null
      };
      this.$v.$reset();
      this.showError = false;
      this.errorMessage = '';
      this.$store.state.supplierManagement.supplier = Object.assign({}, {});
      // this.$store.state.supplierManagement.suppliers = Object.assign([], []);
      // this.$store.state.supplierManagement.suppliersPagination = Object.assign({}, {});
      this.$store.state.parameter.districts = Object.assign([]);
    },
    isEmptyFilterForm() {
      return this.form.city == null &&
          this.form.district == null &&
          this.form.companyName === '' &&
          this.form.shortTitle === '' &&
          this.form.taxNo === '' &&
          this.form.state === null &&
          this.form.sector === null
    },
    isNumber(event) {
      let charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
    },
  },
  mounted() {
  },
  created() {
    this.$store.state.supplierManagement.showNewSupplierButton = false;
    this.clear();
    this.getFilterParameters();
  },
  watch: {
    'form.city'(nw) {
      this.form.district = null;
      if (nw) {
        this.getDistrictsByCityId(nw);
      } else {
        this.$store.state.parameter.districts = Object.assign([]);
      }
    }
  }
};
</script>