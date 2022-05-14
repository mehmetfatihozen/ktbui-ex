<template>
  <div class="standart-page">
    <h3 class="title">STRATEJİK PLANLAR</h3>
    <div class="card-component mb-5">
      <div class="body">
        <div class="row">
          <div class="col">
            <div class="form-group mb-0">
              <label>Dönem</label>
              <select class="form-control" v-model="form.period" :class="{ 'is-invalid': $v.form.period.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in listDropdown" :key="index">{{ item.metin }}</option>
              </select>
            </div>
          </div>
          <div class="col-3 d-flex align-items-end">
            <button class="btn btn-outline-secondary btn-block mr-2" @click="clear">Temizle</button>
            <button class="btn btn-secondary btn-block" @click="list">Listele</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <template v-if="$v.form.period.$error">
              <small class="text-danger" v-if="!$v.form.period.required">Dönem seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Dönem</th>
        <th class="fit">Durumu</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="$router.push('/strategic-plans/detail/'+item.id)"
          v-for="(item,index) in planList.planlar" :key="index">
        <td>{{ item.baslangicYil }} - {{ item.bitisYil }} {{ item.planAdi }}</td>
        <td>{{ item.durum }}</td>
      </tr>
      </tbody>
    </table>
    <div class="alert alert-danger text-center" v-if="showError">
      {{ errorMessage }}
    </div>
    <div class="row" v-if="planList.length>0">
      <div class="col">
        <i class="text-secondary">112 kayıttan 1 - 15 arası gösterilmektedir</i>
      </div>
      <div class="col">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-2">
            <select class="form-control">
              <option value="" selected>25</option>
              <option value="">50</option>
              <option value="">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      prevRoute: null,
      showError: false,
      errorMessage: '',
      form: {
        period: null,
        currentPage: 1,
        pageSize: 25
      }
    }
  },
  validations: {
    form: {
      period: {
        required
      }
    }
  },
  methods: {
    ...mapActions('sp', ['getListDropdown', 'getPlanList']),
    clear() {
      this.$store.state.sp.planList = Object.assign({});
      this.form = Object.assign({}, {
        period: null,
        currentPage: 1,
        pageSize: 25
      });
    },
    list() {
      this.$store.state.sp.duplicateForm = Object.assign({}, this.form);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.getPlanList(this.form);
        this.$store.state.sp.showNewPlan = true;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  created() {
    this.getListDropdown();
  },
  computed: {
    ...mapState('sp', ['listDropdown', 'planList'])
  },
  watch: {
    prevRoute(nw) {
      if (nw.name === 'strategic-plans/detail') {
        if (Object.keys(this.$store.state.sp.duplicateForm).length > 0) {
          this.form = Object.assign({}, this.$store.state.sp.duplicateForm);
        }
      } else {
        this.clear();
      }
    },
  }
};
</script>