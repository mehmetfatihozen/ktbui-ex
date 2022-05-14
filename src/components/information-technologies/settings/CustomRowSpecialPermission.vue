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
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.okuma" :class="getClass(item,'read')"/>
      </td>
      <td class="text-center">
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.yazma" :class="getClass(item,'write')"/>
      </td>
      <td class="text-center">
        <b-form-checkbox class="ml-2 d-inline-block" v-model="item.silme" :class="getClass(item,'delete')"/>
      </td>
      <td>
        <button class="btn btn-outline-secondary btn-parameter btn-sm"
                @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionPermissionsHistory',data:{adSoyad:nameSurname,unvan:title,kullaniciId:userId,personelRolId:personelRolId,pasif:pasif,...item}})">
          Tarihçe
        </button>
      </td>
    </tr>
    <template v-if="showChildren">
      <custom-row-special-permission v-for="(child,childIndex) in item.izinList" :depth="depth + 1" :key="childIndex"
                                     :item="child"
                                     :user-id="userId"
                                     :name-surname="nameSurname"
                                     :title="title"
                                     :personelRolId="personelRolId"
                                     :pasif="pasif"
      ></custom-row-special-permission>
    </template>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CustomRowSpecialPermission",
  props: ['item', 'depth', 'userId', 'nameSurname', 'title', 'open', 'personelRolId','pasif'],
  data() {
    return {
      showChildren: this.open
    }
  },
  created() {
console.log(this.personelRolId);
  },
  computed: {
    indent() {
      return {paddingLeft: this.depth === 0 ? '0.75rem' : `${this.depth * 50}px`}
    }
  },
  methods: {
    ...mapActions('informationTechnologies', ['changeUserSpecialPermissionComponent']),
    getClass(item, type) {
      switch (type) {
        case "read":
          if (item.okumaKaldirildi) {
            return 'danger';
          } else if (item.okumaEklendi) {
            return 'success';
          }
          return '';
        case "write":
          if (item.yazmaKaldirildi) {
            return 'danger';
          } else if (item.yazmaEklendi) {
            return 'success';
          }
          return '';
        case "delete":
          if (item.silmeKaldirildi) {
            return 'danger';
          } else if (item.silmeEklendi) {
            return 'success';
          }
          return '';
      }
    },
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