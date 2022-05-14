<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ PLAN DÖNEM AÇILIŞI</h3>
    <b-card>
      <div class="alert alert-danger text-center" v-if="showError">
        {{ errorMessage }}
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group mb-0">
            <label>Dönem</label>
            <select class="form-control" v-model="form.period" :class="{ 'is-invalid': $v.form.period.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in listDropdown" :key="index">{{ item.metin }}</option>
            </select>
            <template v-if="$v.form.period.$error">
              <small class="text-danger" v-if="!$v.form.period.required">Dönem seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group mb-0">
            <label>Yıl</label>
            <select class="form-control" v-model="form.year" :class="{ 'is-invalid': $v.form.year.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in monitoringYears" :key="index">{{ item.metin }}</option>
            </select>
            <template v-if="$v.form.year.$error">
              <small class="text-danger" v-if="!$v.form.year.required">Yıl seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
    </b-card>
    <div class="row justify-content-end">
      <div class="col-2 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-secondary btn-block mt-0 mr-2" @click="$router.go(-1)">Vazgeç</button>
        <button class="btn btn-success btn-block mt-0" @click="save">
          Kaydet
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from "vuelidate/lib/validators";
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
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
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['getListDropdown', 'getMonitoringYears', 'addPlanMonitoring']),
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        this.addPlanMonitoring(this.form).then(res => {
          this.$store.state.general.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$router.push('/strategic-plans/monitoring/detail/' + res.data.yillikPlanId);
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.$store.state.general.showOverlay = false;
        });
      }
    }
  },
  created() {
    this.getListDropdown();
  },
  computed: {
    ...mapState('sp', ['listDropdown', 'monitoringYears'])
  },
  watch: {
    'form.period'(nw) {
      if (nw) {
        this.getMonitoringYears(nw)
      } else {
        this.$store.state.sp.monitoringYears = Object.assign([]);
      }
    }
  }
}
</script>