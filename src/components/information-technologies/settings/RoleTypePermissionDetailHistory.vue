<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Tarihçe : {{ rolAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypePermissionComponent({cmp:'RoleTypePermissionDetail',data:{id:rolId,rolAdi,fromHistory:true}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Menü</th>
        <th class="fit">İşlem</th>
        <th class="fit">İşlem Türü</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Kayıt Tarihi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.permissionHistories" :key="index">
        <td>{{ item.izinAdi }}</td>
        <td class="fit">{{ item.islem }}</td>
        <td class="fit">{{ item.islemTuru }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.kayitTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['rolId', 'rolAdi', 'id', 'izinAdi'],
  components: {},
  methods: {
    ...mapActions('informationTechnologies', ['getPermissionHistories', 'changeRoleTypePermissionComponent'])
  },
  created() {
    this.getPermissionHistories({
      roleId: this.rolId,
      permissionId: this.id
    });
  }
}
</script>