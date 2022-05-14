<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>Roller</th>
      <th class="fit">Pasif</th>
      <th class="fit"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in $store.state.informationTechnologies.roles"
        :key="index">
      <td>{{ item.rolAdi }}</td>
      <td class="fit text-center">
        <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
      </td>
      <td class="fit text-right">
        <button class="btn btn-sm"
                :class="item.isKullanici?'btn-success':'btn-outline-secondary'"
                @click="changeRoleTypeUserComponent({cmp:'RoleTypeUserDetail',data:item})">Kullanıcılar
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('informationTechnologies', ['changeRoleTypeUserComponent'])
  }
}
</script>