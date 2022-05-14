<template>
  <div>
    <b-modal id="modal-inventory-state" size="lg" centered title="Yeni Envanter Durumu" ok-variant="success"
             ok-title="Kaydet"
             cancel-variant="outline-secondary" cancel-title="İptal">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durumu</label>
            <input type="text" class="form-control" >
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table">
      <thead>
      <tr>
        <th>Durum</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-inventory-state>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>ARIZALI</td>
        <td class="fit">Pasif</td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm" @click="changeInventoryComponent('InventoryHistory')">
            Tarihçe
          </button>
        </td>
      </tr>
      <tr>
        <td>BOŞTA</td>
        <td class="fit"></td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm" @click="changeInventoryComponent('InventoryHistory')">
            Tarihçe
          </button>
        </td>
      </tr>
      <tr>
        <td>İADE</td>
        <td class="fit"></td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm" @click="changeInventoryComponent('InventoryHistory')">
            Tarihçe
          </button>
        </td>
      </tr>
      <tr>
        <td>İMHA</td>
        <td class="fit"></td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm" @click="changeInventoryComponent('InventoryHistory')">
            Tarihçe
          </button>
        </td>
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