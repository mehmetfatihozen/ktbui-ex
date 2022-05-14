<template>
  <b-modal
      id="modal-phone-add"
      centered
      title="Yeni Telefon Girişi"
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
          <label>Telefon</label>
          <input type="text" class="form-control" v-mask="'(###) ### ## ##'" v-model="phone"
                 :class="{ 'is-invalid': $v.phone.$error }">
          <template v-if="$v.phone.$error">
            <small class="text-danger" v-if="!$v.phone.required">{{ this.getMessage(60) }}</small>
            <small class="text-danger"
                   v-if="!$v.phone.phoneCheck&&$v.phone.minLength&&$v.phone.required">{{ this.getMessage(63) }}</small>
            <small class="text-danger" v-if="!$v.phone.minLength">{{ this.getMessage(225) }}</small>
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
import {required, minLength} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      showOverlay: false,
      phone: '',
      check: false
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(15),
      phoneCheck: function (value) {
        const char = value.charAt(1);
        return char == 5;
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('application', ['savePhone', 'getPhones']),
    clearForm() {
      this.$v.$reset();
      this.showOverlay = false;
      this.phone = '';
      this.check = false;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        const data = {
          staffId: this.$store.state.auth.user.id,
          phone: this.phone,
          check: this.check
        };
        this.savePhone(data).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.getPhones(this.$store.state.auth.user.id);
            this.$bvModal.hide('modal-phone-add');
          }
        });
      }
    }
  }
}
</script>