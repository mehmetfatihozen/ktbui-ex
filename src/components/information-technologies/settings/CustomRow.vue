<template>
  <div class="tr-wrapper">
    <tr>
      <td :style="indent">
        <img v-if="item.izinList.length>0"
             :src="require(`@/assets/img/icons/${showChildren?'open-tr.png':'close-tr.png'}`)"
             alt="" class=" float-left mr-2 cursor-pointer img" @click="toggleChildren(item)">
        <span class="span float-left">{{ item.izinAdi }}</span>
      </td>
      <td class="text-center">
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.okuma"/>
      </td>
      <td class="text-center">
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.yazma"/>
      </td>
      <td class="text-center">
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.silme"/>
      </td>
      <td>
        <button class="btn btn-outline-secondary btn-parameter btn-sm"
                @click="changeRoleTypePermissionComponent({cmp:'RoleTypePermissionDetailHistory',data:{rolId:roleId,rolAdi:roleName,id:item.id,izinAdi:item.izinAdi}})">
          Tarihçe
        </button>
      </td>
    </tr>
    <template v-if="showChildren">
      <custom-row v-for="(child,childIndex) in item.izinList" :depth="depth + 1" :key="childIndex"
                  :item="child"
                  :role-id="roleId"
                  :role-name="roleName"
      ></custom-row>
    </template>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CustomRow",
  props: ['item', 'depth', 'roleId', 'roleName', 'open'],
  data() {
    return {
      showChildren: this.open
    }
  },
  computed: {
    indent() {
      return {paddingLeft: this.depth === 0 ? '0.75rem' : `${this.depth * 50}px`}
    }
  },
  methods: {
    ...mapActions('informationTechnologies', ['changeRoleTypePermissionComponent']),
    toggleChildren(item) {
      let t = !this.showChildren;
      item.open = t;
      this.showChildren = t;
    }
  },
  watch: {
    'item.okuma'(nw) {
      if (nw) {
        this.item.izinList.forEach(child => {
          child.okuma = true;
        });
      } else {
        this.item.izinList.forEach(child => {
          child.okuma = false;
        });
      }
    },
    'item.yazma'(nw) {
      if (nw) {
        this.item.izinList.forEach(child => {
          child.yazma = true;
        });
      } else {
        this.item.izinList.forEach(child => {
          child.yazma = false;
        });
      }
    },
    'item.silme'(nw) {
      if (nw) {
        this.item.izinList.forEach(child => {
          child.silme = true;
        });
      } else {
        this.item.izinList.forEach(child => {
          child.silme = false;
        });
      }
    }
  }
}
</script>
<style scoped>
.tr-wrapper {
  display: contents;
}

.span {
  line-height: 28px;
}
</style>