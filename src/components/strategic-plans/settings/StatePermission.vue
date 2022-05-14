<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th colspan="2">Durumlar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.spSettings.statePermissions" :key="index">
        <td>{{ item.durumAdi }}</td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary mr-2" @click="changeCmp(item,'SubStates')">Alt Durumlar
          </button>
          <button class="btn btn-sm btn-outline-secondary mr-2" @click="changeCmp(item,'SubStateTransitions')">Alt Durum
            Geçişleri
          </button>
          <button class="btn btn-sm btn-outline-secondary" @click="changeCmp(item,'AuthorizedUsers')">Yetkili
            Kullanıcılar
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
      selectedItem: null
    }
  },
  methods: {
    ...mapActions('spSettings', ['getStatePermission', 'changeStatePermissionCmp']),
    changeCmp(item, cmp) {
      this.$store.state.spSettings.selectedSubState = item;
      this.changeStatePermissionCmp(cmp);
    }
  },
  created() {
    this.getStatePermission();
  }
}
</script>
