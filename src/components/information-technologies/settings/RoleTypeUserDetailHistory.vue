<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Tarihçe : {{ nameSurname }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypeUserComponent({cmp:'RoleTypeUserDetail',data:{id:roleId,rolAdi:roleName}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Durum</th>
        <th>Rol Tipi</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.roleTypeUserHistories" :key="index">
        <td class="fit">{{ item.durum }}</td>
        <td>{{ item.rolAdi }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.tarih }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['id', 'nameSurname', 'roleId', 'roleName'],
  components: {},
  methods: {
    ...mapActions('informationTechnologies', ['getRoleTypeUserHistory', 'changeRoleTypeUserComponent'])
  },
  created() {
    this.getRoleTypeUserHistory(this.id);
  }
}
</script>