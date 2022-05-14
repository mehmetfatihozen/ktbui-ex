<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">DURUM : {{ $store.state.spSettings.selectedSubState.durumAdi }} - ALT DURUM
        ATAMASI İÇİN KULLANICI YETKİLENDİRMELERİ</h3></div>
      <div class="col-sm-auto text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeStatePermissionCmp('StatePermission')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Durum Adı</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.spSettings.subStateTransitions" :key="index">
        <td>{{ item.durumAdi }}</td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary mr-2"
                  @click="changeCmp(item,'AuthorizedUsersSelect')">Yetkili Kullanıcılar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('spSettings', ['changeStatePermissionCmp', 'getSubStateTransitions']),
    changeCmp(item, cmp) {
      this.$store.state.spSettings.selectedSubStateTransition = item;
      this.changeStatePermissionCmp(cmp);
    }
  },
  created() {
    this.$store.state.spSettings.subStateTransitions = Object.assign([]);
    this.getSubStateTransitions(this.$store.state.spSettings.selectedSubState.id);
  }
}
</script>