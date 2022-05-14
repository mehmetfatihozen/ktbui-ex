<template>
  <div id="login-container">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-6 mx-auto">
          <img src="@/assets/img/logo.png" alt="" class="hitit-logo mx-auto d-block">
          <b-overlay :show="$store.state.auth.showOverlay" rounded="sm" class="d-flex flex-fill">
            <div class="card card-signin my-3 d-flex flex-fill">
              <div class="card-body d-flex flex-fill">
                <component :is="$store.state.auth.activeComponent"></component>
              </div>
            </div>
          </b-overlay>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {mapActions} from "vuex";

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions('auth', ['resetLoginState'])
  },
  created() {
    this.resetLoginState();
  }
}
</script>