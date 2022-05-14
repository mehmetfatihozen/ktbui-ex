<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Tarihçe : {{ rolAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypes({cmp:'RoleTypes',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Rol Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Tarih</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.roleHistories" :key="index">
        <td>{{ item.rolAdi }}</td>
        <td class="fit">{{ item.pasif }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td class="fit">{{ item.tarih }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['id', 'rolAdi'],
  data() {
    return {}
  },
  methods: {
    ...mapActions('informationTechnologies', ['getRoleHistory', 'changeRoleTypes'])
  },
  created() {
    this.$store.state.informationTechnologies.roleHistories = Object.assign([]);
    this.getRoleHistory(this.id);
  }
}
</script>