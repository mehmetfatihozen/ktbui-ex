<template>
  <b-modal
      id="modal-email-add"
      centered
      title="Yeni Email Girişi"
      ok-variant="success"
      ok-title="Kaydet"
      cancel-variant="outline-secondary"
      cancel-title="Vazgeç"
      :busy="showOverlay"
      @ok.prevent="save"
      @hidden="clearForm"
  >

    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email"
                 :class="{ 'is-invalid': $v.email.$error }">
          <template v-if="$v.email.$error">
            <small class="text-danger" v-if="!$v.email.required">{{ this.getMessage(65) }}</small>
            <small class="text-danger" v-if="!$v.email.email">{{ this.getMessage(169) }}</small>
          </template>
        </div>
      </div>
      <div class="col-sm-auto">
        <div class="form-group">
          <label class="d-block">İletişim</label>
          <label class="label_switch">
            <input type="checkbox" :false-value="false" :true-value="true" v-model="check">
            <span class="mr-2"></span>
          </label>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {required, email} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      showOverlay: false,
      email: '',
      check: false
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    ...mapActions('application', ['saveEmail', 'getEmails']),
    ...mapActions('general', ['showModal']),
    clearForm() {
      this.$v.$reset();
      this.showOverlay = false;
      this.email = '';
      this.check = false;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        const data = {
          staffId: this.$store.state.auth.user.id,
          email: this.email,
          check: this.check
        };
        this.saveEmail(data).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.getEmails(this.$store.state.auth.user.id);
            this.$bvModal.hide('modal-email-add');
            this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
        });
      }
    }
  }
}
</script>