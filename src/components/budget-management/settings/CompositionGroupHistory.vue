<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h4 class="mb-0"><strong>TARİHÇE :
        {{ this.compositionGroup.kodu + " - " + this.compositionGroup.adi }}</strong></h4></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeCompositionGroupsComponent({ component:component, data: componentData })">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Grup No</th>
        <th>Tertip Grupları</th>
        <th class="fit">{{ this.parentCompositionGroup === null ? "Bütçe Türü" : "Alım Türü" }}</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.budgetManagement.compositionGroupHistory" :key="index">
        <td>{{ item.grupNo }}</td>
        <td>{{ item.tertipGrubu }}</td>
        <td>{{ item.butceTuru }}</td>
        <td>{{ item.pasif }}</td>
        <td>{{ item.kullanici }}</td>
        <td>{{ item.kayitTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ["compositionGroup", "parentCompositionGroup"],
  data() {
    return {
      component: "CompositionGroupsMain",
      componentData: null
    }
  },
  methods: {
    ...mapActions('budgetManagement', ['getCompositionGroupHistory', 'changeCompositionGroupsComponent'])
  },
  created() {
    this.component = this.parentCompositionGroup === null ? "CompositionGroupsMain" : "CompositionGroupsMainCompositionSubGroups";
    this.componentData = this.parentCompositionGroup === null ? null : { compositionGroup : this.parentCompositionGroup };
    this.getCompositionGroupHistory(this.compositionGroup.id);
  }
}
</script>