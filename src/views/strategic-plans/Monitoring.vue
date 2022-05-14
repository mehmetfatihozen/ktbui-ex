<template>
  <div class="standart-page">
    <h3 class="title">STRATEJİK PLAN İZLEMELERİ</h3>
    <div class="card-component mb-5">
      <div class="body">
        <div class="alert alert-danger" v-if="showError">
          {{ errorMessage }}
        </div>
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
          <div class="col-2">
            <div class="form-group mb-0">
              <label>Yıl</label>
              <select class="form-control" v-model="form.year" :class="{ 'is-invalid': $v.form.year.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item.id" v-for="(item,index) in monitoringYears" :key="index">{{ item.metin }}</option>
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
          <div class="col-2">
            <template v-if="$v.form.year.$error">
              <small class="text-danger" v-if="!$v.form.year.required">Yıl seçilmelidir</small>
            </template>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Yıl</th>
        <th>Stratejik Plan Adı</th>
        <th class="fit">Durumu</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="$router.push(`/strategic-plans/monitoring/detail/${item.yillikPlanId}`)"
          v-for="(item,index) in planMonitoringList" :key="index">
        <td>{{ item.yil }}</td>
        <td>{{ item.donem }}</td>
        <td>{{ item.durum }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {required} from "vuelidate/lib/validators";
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      prevRoute: null,
      showError: false,
      errorMessage: '',
      form: {
        period: null,
        year: null
      }
    }
  },
  validations: {
    form: {
      period: {
        required
      },
      year: {
        required
      }
    }
  },
  methods: {
    ...mapActions('sp', ['getListDropdown', 'getMonitoringYears', 'addPlanMonitoring', 'getPlanMonitoringList']),
    clear() {
      this.$store.state.sp.planMonitoringList = Object.assign([]);
      this.form = Object.assign({}, {
        period: null,
        year: null
      });
    },
    list() {
      this.$store.state.sp.monitoringDuplicateForm = Object.assign({}, this.form);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.getPlanMonitoringList(this.form);
      }
      this.$store.state.sp.showNewPlanMonitoring = true;
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
    ...mapState('sp', ['listDropdown', 'monitoringYears', 'planMonitoringList'])
  },
  watch: {
    prevRoute(nw) {
      if (nw.name === 'strategic-plans/monitoring/detail') {
        if (Object.keys(this.$store.state.sp.monitoringDuplicateForm).length > 0) {
          this.form = Object.assign({}, this.$store.state.sp.monitoringDuplicateForm);
        }
      } else {
        this.clear();
      }
    },
    'form.period'(nw) {
      if (nw) {
        this.getMonitoringYears(nw)
      } else {
        this.$store.state.sp.monitoringYears = Object.assign([]);
      }
    }
  }
};
</script>