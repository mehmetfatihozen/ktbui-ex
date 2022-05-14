<template>
  <div class="d-flex flex-fill justify-content-center align-items-center">
    <form class="form-sms d-flex justify-content-center align-items-center flex-column" @submit.prevent="login">
      <p class="text-center font-weight-bold">E-Posta Doğrulama Kodunu Giriniz</p>
      <div class="input-group mb-3">
        <v-otp-input
            ref="otpInput"
            class="otp-input-container"
            input-classes="otp-input form-control"
            separator=""
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
        />
      </div>
      <p class="text-center">Doğrulama için kalan süre</p>
      <circular-count-down-timer
          :initial-value="120"
          :steps="120"
          :second-label="''"
          :seconds-fill-color="'transparent'"
          :seconds-stroke-color="'#db0c14'"
          :underneath-stroke-color="'transparent'"
          :stroke-width="2"
          :size="100"
          @finish="finished"
      ></circular-count-down-timer>
      <button class="btn btn-lg btn-danger text-uppercase" type="submit">GİRİŞ YAP</button>
    </form>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import {AbilityBuilder} from "@casl/ability";

export default {
  data() {
    return {
      remainingTime: 120,
      interval: null,
      number: 0,
    }
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('auth', ['updateToken', 'checkEmail', 'resetLoginState']),
    ...mapActions('general', ['updateMenu']),
    handleOnChange(value) {
      this.number = value;
    },
    handleOnComplete(value) {
      this.number = value;
      this.login();
    },
    finished() {
      this.resetLoginState();
    },
    login() {
      if (this.number.length > 5) {
        this.checkEmail({userId: this.$store.state.auth.user.id, code: this.number}).then((res) => {
          if (!res.hasError) {
            this.updateRules(res.data.izinRoller);
            this.updateToken(res.data.token);
            this.updateMenu(res.data.menuRol.menuler);
            if (this.$store.state.auth.user.personelKullaniciTipId == 64) {
              this.$router.push(this.$route.query.returnUrl || '/');
            } else {
              this.$router.push('/');
            }
          } else {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          }
        });
      } else {
        this.showModal({title: 'Hata!', message: 'E-Posta doğrulama kodunu giriniz', type: 'danger'});
      }
    },
    updateRules(items) {
      localStorage.setItem('permissions',JSON.stringify(items));
      const {can, rules} = new AbilityBuilder();
      items.forEach(item => {
        if (item.uiUrl) {
          if (item.okuma)
            can('read', item.uiUrl);
          if (item.yazma)
            can('create', item.uiUrl);
          if (item.silme)
            can('delete', item.uiUrl);
        }
      })
      this.$ability.update(rules);
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>