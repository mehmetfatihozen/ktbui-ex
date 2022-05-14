<template>
  <div class="standart-page">
    <div class="go-back d-flex justify-content-end mb-3">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <font-awesome-icon icon="angle-double-left" class="mr-2"/>
        Listeye Geri Dön
      </button>
    </div>
    <h3 class="title">YENİ ENVANTER GİRİŞİ</h3>
    <div class="new-employee-tab-container">
      <b-card no-body class="main-card">
        <b-card-text style="margin: 10px">
          <b-tabs pills horizontal content-class="mt-3"  align="center">
            <b-tab active title-link-class="d-flex flex-column align-items-center text-center">
              <template v-slot:title>
                Genel
              </template>
              <b-card-text>
                <InventoryInfo/>
              </b-card-text>
            </b-tab>
            <b-tab :disabled="disabledTab" title-link-class="d-flex flex-column align-items-center text-center">
              <template v-slot:title>
                Satın Alma
              </template>
              <b-card-text>
                <InventoryPurchase/>
              </b-card-text>
            </b-tab>
            <b-tab :disabled="disabledTab" title-link-class="d-flex flex-column align-items-center text-center">
              <template v-slot:title>
               Dökümanlar

              </template>
              <b-card-text>
                <InventoryDocument/>
              </b-card-text>
            </b-tab>
            <b-tab :disabled="disabledTab" title-link-class="d-flex flex-column align-items-center text-center">
              <template v-slot:title >
               Notlar
              </template>
              <b-card-text class="p-3">
                <InventoryNote/>
              </b-card-text>
            </b-tab>
          </b-tabs>
          <div class="row">
            <div class="col-12 text-right">
              <button class="btn btn-danger">Kaydet</button>
            </div>
          </div>
        </b-card-text>


      </b-card>

    </div>
  </div>
</template>

<script>

import InventoryInfo from "@/components/inventories/InventoryInfo";
import InventoryPurchase from "@/components/inventories/InventoryPurchase";
import InventoryDocument from "@/components/inventories/InventoryDocument";
import InventoryNote from "@/components/inventories/InventoryNote";



export default {
  components: {
    InventoryPurchase,
    InventoryInfo,
   InventoryDocument,

    InventoryNote
  },
  data(){
    return{
      disabledTab:false
    }
  }
}
</script>