<template>
  <div style="display: contents">
    <tr>
      <td>
        <img class="fit"
             v-if="subGroup.altListe.length > 0"
             :src="require(`@/assets/img/icons/${ showChildren ? 'open-tr.png' : 'close-tr.png' }`)"
             @click="toggleChildren()">
      </td>
      <td class="fit">{{ subGroup.tamKodu }}</td>
      <td>{{ subGroup.adi }}</td>
      <td class="fit">{{ subGroup.alimTuruId }}</td>
      <td class="fit text-center">
        <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="subGroup.pasif"/>
      </td>
      <td class="fit text-center">
        <button class="btn btn-outline-secondary btn-parameter btn-sm"
                @click="showModalForSubGroup()">
          Detay Ekle
        </button>
      </td>
      <td class="fit text-center">
        <button class="btn btn-outline-secondary btn-parameter btn-sm"
                @click="changeCompositionGroupsComponent({ component:'CompositionGroupHistory', data:{ compositionGroup: subGroup, parentCompositionGroup: parentCompositionGroup }})">
          Tarihçe
        </button>
      </td>
    </tr>
    <template v-if="showChildren">
      <CompositionSubGroupsTableRow v-for="(altSubGroup,index) in subGroup.altListe"
                                    :key="index"
                                    :parentCompositionGroup="parentCompositionGroup"
                                    :subGroup="altSubGroup"
      ></CompositionSubGroupsTableRow>
    </template>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CompositionSubGroupsTableRow",
  props: ["subGroup", "parentCompositionGroup"],
  data() {
    return {
      showChildren: false
    }
  },
  methods: {
    ...mapActions('budgetManagement', ['changeCompositionGroupsComponent']),
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
    showModalForSubGroup() {
      this.$store.state.settings.currentCompositionSubGroupModalData = null;
    }
  },
  created() {
  }
}
</script>