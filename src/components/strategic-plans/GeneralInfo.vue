<template>
  <div>
    <b-modal
        id="modal-delete-plan"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="remove"
        :busy="overlay"
    >
      <p class="my-4 text-center">Plan silinecektir, emin misiniz?</p>
    </b-modal>
    <div class="card-component mb-4">
      <div class="body">
        <div class="alert alert-danger text-center" v-if="showError">
          {{ errorMessage }}
        </div>
        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label>Başlangıç Yılı</label>
              <select class="form-control" v-model="plan.baslangicYil"
                      :class="{ 'is-invalid': $v.plan.baslangicYil.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item" v-for="(item,index) in years" :key="index">{{ item }}</option>
              </select>
              <template v-if="$v.plan.baslangicYil.$error">
                <small class="text-danger" v-if="!$v.plan.baslangicYil.required">Başlangıç Yılı seçilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col-2">
            <div class="form-group">
              <label>Bitiş Yılı</label>
              <select class="form-control" v-model="plan.bitisYil" :class="{ 'is-invalid': $v.plan.bitisYil.$error }">
                <option :value="null">Seçiniz</option>
                <option :value="item" v-for="(item,index) in years" :key="index">{{ item }}</option>
              </select>
              <template v-if="$v.plan.bitisYil.$error">
                <small class="text-danger" v-if="!$v.plan.bitisYil.required">Bitiş Yılı seçilmelidir</small>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Plan Adı</label>
              <input type="text" class="form-control" v-model="plan.planAdi" v-uppercase
                     :class="{ 'is-invalid': $v.plan.planAdi.$error }">
              <template v-if="$v.plan.planAdi.$error">
                <small class="text-danger" v-if="!$v.plan.planAdi.required">Plan Adı girilmelidir</small>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group mb-0">
              <label>Durum</label>
              <input type="text" class="form-control" disabled v-model="plan.durum">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group mb-0">
              <label>Alt Durum</label>
              <input type="text" class="form-control" disabled v-model="plan.altDurum">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4 justify-content-end">
      <div class="col-6 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-primary btn-block mt-0 mr-2">PC Kaydet</button>
        <button class="btn btn-outline-danger btn-block mt-0 mr-2" v-b-modal.modal-delete-plan>Sil</button>
        <button class="btn btn-success btn-block mt-0" @click="save">Kaydet</button>
      </div>
    </div>
    <Purposes/>
  </div>
</template>

<script>
import Purposes from "@/components/strategic-plans/general-info/Purposes";
import {mapActions, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    Purposes
  },
  data() {
    return {
      showError: false,
      errorMessage: '',
      overlay: false,
    }
  },
  validations: {
    plan: {
      baslangicYil: {
        required
      },
      bitisYil: {
        required
      },
      planAdi: {
        required
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['getPlan', 'deletePlan', 'updatePlan']),
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const diff = parseInt(this.plan.bitisYil) - parseInt(this.plan.baslangicYil);
        if (diff >= 1 && diff < 5) {
          this.$store.state.general.showOverlay = true;
          this.updatePlan(this.plan).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'Plan başarıyla güncellendi', type: 'success'});
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else if (diff <= 0) {
          this.errorMessage = 'Plan bitiş yılı, başlangıç yılına eşit veya küçük olamaz';
          this.showError = true;
        } else {
          this.errorMessage = 'Başlangıç yılı ve bitiş yılı en az 2 yıllık dönem , en fazla 5 yıllık dönemi kapsar';
          this.showError = true;
        }
      }

    },
    remove() {
      this.overlay = true;
      this.deletePlan(this.$route.params.id).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$router.push('/strategic-plans');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  created() {
    this.getPlan(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['plan']),
    years() {
      const year = new Date().getFullYear() + 11
      return Array.from({length: year - 1990}, (value, index) => 1990 + index)
    }
  }
}
</script>