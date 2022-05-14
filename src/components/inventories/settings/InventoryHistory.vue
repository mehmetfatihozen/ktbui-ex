<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Tarihçe : Envanter Durumu</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeInventoryComponent('InventoryState')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>

        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr>

        <td class="fit">necmi.ozben</td>
        <td class="fit">15.12.2020 13:21</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  methods:{
    ...mapActions('inventory',['changeInventoryComponent'])
  }
}
</script>