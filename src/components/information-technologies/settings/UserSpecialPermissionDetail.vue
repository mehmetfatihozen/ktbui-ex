<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0  text-nowrap">
        {{ $store.state.informationTechnologies.specialPermissionUserInfos[0].adSoyad }}
        ({{ $store.state.informationTechnologies.specialPermissionUserInfos[0].kullaniciAdi }})
        {{ getDepartmentName }}
      </h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermission',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th class="fit">Sicil No</th>
        <th>Alt Birim</th>
        <!--        <th>Birim</th>-->
        <th class="fit">Ünvan</th>
        <th class="fit">Rol Tipi</th>
        <th class="fit"></th>
        <th class="fit">Özel Yetkili</th>
        <th class="fit">Pasif</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item,index) in this.$store.state.informationTechnologies.specialPermissionUserInfos" :key="index">
        <td class="fit">{{ item.sicilNo }}</td>
        <td>{{ item.bolum }}</td>
        <!--        <td>{{ item.birim }}</td>-->
        <td class="fit">{{ item.unvan }}</td>
        <td class="fit">{{ item.rolTipi }}</td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary btn btn-parameter"
                  @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionPermissions',data:item})">
            Yetkiler
          </button>
        </td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-success" v-if="item.ozelYetki"/>
        </td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary btn btn-parameter"
                  @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionDetailHistory',data:{id,nameSurname:$store.state.informationTechnologies.specialPermissionUserInfos[0].adSoyad,personelRolId:item.personelRolId}})">
            Tarihçe
          </button>
        </td>
      </tr>

      </tbody>
    </table>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  props: ['id'],
  methods: {
    ...mapActions('informationTechnologies', ['getSpecialPermissionUserInfo', 'changeUserSpecialPermissionComponent'])
  },
  computed: {
    ...mapState('informationTechnologies', ['specialPermissionUserInfo', 'specialPermissionUserInfos']),
    getDepartmentName() {
      if (this.$store.state.informationTechnologies.specialPermissionUserInfos[0].birim) {
        return "- (" + this.$store.state.informationTechnologies.specialPermissionUserInfos[0].bagliBirim + " - " +
            this.$store.state.informationTechnologies.specialPermissionUserInfos[0].birim + ")";
      }
      return "";
    }
  },
  created() {
    this.getSpecialPermissionUserInfo(this.id);
  }
}
</script>