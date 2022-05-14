<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ PLAN GİRİŞİ</h3>
    <b-card>
      <div class="alert alert-danger text-center" v-if="showError">
        {{ errorMessage }}
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group mb-0">
            <label>Başlangıç Yılı</label>
            <select class="form-control" v-model="form.startDate" :class="{ 'is-invalid': $v.form.startDate.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in years" :key="index">{{ item }}</option>
            </select>
            <template v-if="$v.form.startDate.$error">
              <small class="text-danger" v-if="!$v.form.startDate.required">Başlangıç Yılı seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group mb-0">
            <label>Bitiş Yılı</label>
            <select class="form-control" v-model="form.endDate" :class="{ 'is-invalid': $v.form.endDate.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in years" :key="index">{{ item }}</option>
            </select>
            <template v-if="$v.form.endDate.$error">
              <small class="text-danger" v-if="!$v.form.endDate.required">Bitiş Yılı seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group mb-0">
            <label>Plan Adı</label>
            <input type="text" class="form-control" v-model="form.planName" v-uppercase
                   :class="{ 'is-invalid': $v.form.planName.$error }"
                   maxlength="50"
            >
            <template v-if="$v.form.planName.$error">
              <small class="text-danger" v-if="!$v.form.planName.required">Plan Adı girilmelidir</small>
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
import {mapActions} from "vuex";

export default {
  data() {
    return {
      showError: false,
      errorMessage: '',
      form: {
        startDate: null,
        endDate: null,
        planName: ''
      }
    }
  },
  validations: {
    form: {
      startDate: {
        required
      },
      endDate: {
        required
      },
      planName: {
        required
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['addPlan']),
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const diff = parseInt(this.form.endDate) - parseInt(this.form.startDate);
        if (diff >= 1 && diff < 5) {
          this.showError = false;
          this.$store.state.general.showOverlay = true;
          this.addPlan(this.form).then(res => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$router.push('/strategic-plans/detail/' + res.data.id);
            }
          }).catch((err) => {
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
            this.$store.state.general.showOverlay = false;
          });
        } else if (diff <= 0) {
          this.errorMessage = 'Plan bitiş yılı, başlangıç yılına eşit veya küçük olamaz';
          this.showError = true;
        } else {
          this.errorMessage = 'Başlangıç yılı ve bitiş yılı en az 2 yıllık dönem , en fazla 5 yıllık dönemi kapsar';
          this.showError = true;
        }
      }
    }
  },
  created() {

  },
  computed: {
    years() {
      const year = new Date().getFullYear() + 11
      return Array.from({length: year - 1990}, (value, index) => 1990 + index)
    }
  }
}
</script>