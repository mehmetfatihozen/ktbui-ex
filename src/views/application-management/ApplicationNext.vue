<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ BAŞVURU GİRİŞİ</h3>

    <component :is="$store.state.application.currentApplicationNextComponent"/>

  </div>
</template>
<script>

export default {
};
</script>