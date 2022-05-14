<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>İller</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer"
          v-for="(item,index) in $store.state.supplierManagement.cities" :key="index">
        <td>{{ item.metin }}</td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeTaxOfficeComponent({cmp:'TaxOfficesDetail',data:item})">
            Vergi Dairelerini Görüntüle
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
  data() {
    return {
      overlay: false
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('supplierManagement', ['getCities', 'changeTaxOfficeComponent'])
  },
  created() {
    this.getCities();
  }
}
</script>