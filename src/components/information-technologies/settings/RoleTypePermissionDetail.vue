<template>
  <div>
    <b-modal
        id="modal-confirm"
        centered
        title="Uyarı"
        ok-title="Kaydet"
        ok-variant="success"
        header-bg-variant="warning"
        header-text-variant="light"
        cancel-title="Vazgeç"
        @ok="save"
    >
      {{ this.getMessage(115) }}
    </b-modal>
    <b-modal
        id="modal-success"
        centered
        title="İşlem Başarılı"
        ok-title="Kapat"
        ok-variant="success"
        header-bg-variant="success"
        header-text-variant="white"
        ok-only
        hide-header-close
        no-close-on-backdrop
    >
      {{ this.getMessage(116) }}
    </b-modal>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">{{ rolAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypePermissionComponent({cmp:'RoleTypePermission',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Menüler</th>
        <th class="fit text-center">
          <label class="d-flex align-items-center justify-content-center">
            Okuma
            <b-form-checkbox class="ml-2 d-inline-block" v-model="read"/>
          </label>
        </th>
        <th class="fit text-center">
          <label class="d-flex align-items-center justify-content-center">
            Yazma
            <b-form-checkbox class="ml-2 d-inline-block" v-model="write"/>
          </label>
        </th>
        <th class="fit text-center">
          <label class="d-flex align-items-center justify-content-center">
            Silme
            <b-form-checkbox class="ml-2 d-inline-block" v-model="remove"/>
          </label>
        </th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <custom-row v-for="(item,index) in $store.state.informationTechnologies.rolePermissions" :key="'c'+index"
                  :depth="0" :item="item"
                  :showChildren="true"
                  :role-id="id"
                  :role-name="rolAdi"
                  :open="item.open"
      ></custom-row>
      </tbody>
    </table>
    <div class="row" v-if="!pasif">
      <div class="col d-flex justify-content-end">
        <button class="btn btn-success" @click="confirmSave">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomRow from "@/components/information-technologies/settings/CustomRow";
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['id', 'rolAdi','fromHistory','pasif'],
  components: {CustomRow},
  data() {
    return {
      showChildren: false,
      read: false,
      write: false,
      remove: false
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['savePermissions', 'getRolePermissions', 'changeRoleTypePermissionComponent']),
    confirmSave() {
      this.$bvModal.show('modal-confirm');
    },
    save() {
      this.$store.state.general.showOverlay = true;
      this.savePermissions({
        roleId: this.id,
        list: this.$store.state.informationTechnologies.rolePermissions
      }).then((res) => {
        this.$store.state.general.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.show('modal-success');
          this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
        }
      }).catch(err => {
        this.$store.state.general.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  created() {
    if (!this.fromHistory){
      this.$store.state.informationTechnologies.rolePermissions=Object.assign([]);
      this.getRolePermissions(this.id);
    }
  },
  watch: {
    read(nw) {
      if (nw) {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.okuma = true;
        });
      } else {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.okuma = false;
        });
      }
    },
    write(nw) {
      if (nw) {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.yazma = true;
        });
      } else {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.yazma = false;
        });
      }
    },
    remove(nw) {
      if (nw) {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.silme = true;
        });
      } else {
        this.$store.state.informationTechnologies.rolePermissions.forEach(item => {
          item.silme = false;
        });
      }
    }
  }
}
</script>