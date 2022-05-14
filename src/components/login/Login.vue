<template>
  <div class="d-flex flex-fill">
    <form class="d-flex flex-fill justify-content-center align-items-center flex-column form-signin"
          @submit.prevent="lgn">
      <div class="form-label-group">
        <input type="text" id="user" class="form-control"  required autofocus placeholder="Kullanıcı Adınızı giriniz"
               v-model="$store.state.auth.loginForm.userName" autocomplete="off">
        <label for="user">Kullanıcı Adınızı giriniz</label>
      </div>
      <button class="btn btn-lg btn-danger text-uppercase" type="submit">GİRİŞ YAP</button>
    </form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  data(){
    return{
    }
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('auth', ['login', 'updateLoginComponent']),
    lgn() {
      this.$store.state.auth.showOverlay=true;
      this.login({
        userName: this.$store.state.auth.loginForm.userName,
        password: this.$store.state.auth.loginForm.password
      }).then((res) => {
        this.$store.state.auth.showOverlay=false;
        //this.updateRules(res.izinRoller);
        this.updateLoginComponent(res.girisTipi);
        // this.$router.push('/');
      }, err => {
        this.$store.state.auth.showOverlay=false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  computed: {}
}
</script>