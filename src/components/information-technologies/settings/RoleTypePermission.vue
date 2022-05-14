<template>
  <div>
    <table class="table table-hover ">
      <thead>
      <tr>
        <th>Roller</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
        </th>
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
          <button class="btn   btn-parameter btn-sm" :class="item.yetkiVarMi?'btn-success':'btn-outline-secondary'"
                  @click="changeRoleTypePermissionComponent({cmp:'RoleTypePermissionDetail',data:item})">Yetkiler
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
  components: {},
  methods: {
    ...mapActions('informationTechnologies', ['changeRoleTypePermissionComponent']),
  },
  created() {
  }
}
</script>