<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">1 - ENVANTER BİLGİLERİ</h3>
    <component :is="$store.state.inventory.currentInventoryDetailComponent"/>
  </div>
</template>
<script>

export default {
  data() {
    return {
      maxTitleLength: 50,
      maxDescriptionLength: 5000,
      showFilterDetail: false,
      form: {
        applicationTitle: 'Outlook uygulamasına yeni email hesabı eklenemiyor',
        applicationDescription: 'Outlook uygulamasına necmi.ozben@ktb.gov.tr hesabını ekleyemiyorum'
      },
      formNote: {
        description: ''
      }
    };
  },
  components: {},
  methods: {
  },
  mounted() {
  }
};
</script>