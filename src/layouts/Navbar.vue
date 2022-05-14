<template>
  <b-navbar type="dark" variant="light" fixed="top">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div class="user-info">
          <div class="row">
            <div class="col text-right d-flex justify-content-center  flex-column pr-0">
              <div class="name">
                <b>{{ $store.state.auth.user && $store.state.auth.user.ad }}
                  {{ $store.state.auth.user && $store.state.auth.user.soyad }}</b>
              </div>
              <div class="title">{{ $store.state.auth.user && $store.state.auth.user.personelTipAd }} /
                {{ $store.state.auth.user && $store.state.auth.user.birimAd }}
              </div>
            </div>
            <div class="col-sm-auto d-flex justify-content-center align-items-center">
              <div class="avatar">
                <img :src="profilePhoto" alt/>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-logout">
          <a href="#" class="btn btn-link" @click="logout">
            <font-awesome-icon icon="sign-out-alt" size="lg" class="mr-2"/>
            <b>Çıkış Yap</b>
          </a>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  },
  computed: {
    profilePhoto() {
      if (this.$store.state.auth.user && this.$store.state.auth.user.profilResmi) {
        return this.$store.state.auth.user.profilResmi;
      } else {
        return require('@/assets/img/icons/user.png');
      }
    }
  }
}
</script>