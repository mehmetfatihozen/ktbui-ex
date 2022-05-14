<template>
  <div class="standart-page">
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <div class="call-id" v-if="$store.state.application.applicationDetail.callId">
          Call ID : {{ $store.state.application.applicationDetail.callId }}
        </div>
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <h3 class="title mb-0">{{ this.$route.params.id }} - BAŞVURU BİLGİLERİ</h3>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-secondary" @click="$router.go(-1)">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Listeye Geri Dön
        </button>
      </div>
    </div>
    <component :is="$store.state.application.currentApplicationDetailComponent"/>
  </div>
</template>
<script>

import {mapActions} from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapActions('application', ['changeDetailComponent']),
  },
  created() {
    this.changeDetailComponent('ApplicationDetailMain');
  },
  mounted() {
  }
};
</script>