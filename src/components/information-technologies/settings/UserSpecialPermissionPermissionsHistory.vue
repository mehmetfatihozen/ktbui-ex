<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Tarihçe : {{ izinAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionPermissions',data:{id:kullaniciId,adSoyad,unvan,comeBackFromHistory:true,personelRolId,pasif}})">
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
      <tr v-for="(item,index) in $store.state.informationTechnologies.userSpecialPermissionPermissionsHistories"
          :key="index">
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
  props: ['id', 'kullaniciId', 'izinAdi', 'adSoyad', 'unvan', 'personelRolId','pasif'],
  components: {},
  methods: {
    ...mapActions('informationTechnologies', ['getUserSpecialPermissionPermissionsHistories', 'changeUserSpecialPermissionComponent'])
  },
  created() {
    this.getUserSpecialPermissionPermissionsHistories({
      userId: this.kullaniciId,
      permissionId: this.id,
      personelRolId:this.personelRolId,
      pasif:this.pasif
    });
  }
}
</script>