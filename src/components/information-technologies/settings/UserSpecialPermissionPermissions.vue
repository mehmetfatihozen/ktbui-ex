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
      <div class="col"><h5 class="mb-0">{{ adSoyad }} ({{ unvan }})</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionDetail',data:{id}})">
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
      <custom-row-special-permission v-for="(item,index) in specialPermissionPermissions" :key="'c'+index" :depth="0"
                                     :item="item"
                                     :showChildren="true"
                                     :user-id="id"
                                     :name-surname="adSoyad"
                                     :title="unvan"
                                     :open="item.open"
                                     :personelRolId="personelRolId"
                                     :pasif="pasif"
      ></custom-row-special-permission>
      </tbody>
    </table>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <button v-if="!pasif" class="btn btn-success" @click="confirmSave">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import CustomRowSpecialPermission from "@/components/information-technologies/settings/CustomRowSpecialPermission";

export default {
  props: ['id', 'adSoyad', 'unvan', 'comeBackFromHistory', 'personelRolId','pasif'],
  components: {CustomRowSpecialPermission},
  data() {
    return {
      showChildren: false,
      read: false,
      write: false,
      remove: false
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['addUserSpecialPermission', 'getSpecialPermissionPermissions', 'changeUserSpecialPermissionComponent']),
    confirmSave() {
      this.$bvModal.show('modal-confirm');
    },
    save() {
      this.$store.state.general.showOverlay = true;
      this.addUserSpecialPermission({
        userId: this.id,
        list: this.specialPermissionPermissions
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
  computed: {
    ...mapGetters('general',['getMessage']),
    ...mapState('informationTechnologies', ['specialPermissionPermissions'])
  },
  created() {
    if (!this.comeBackFromHistory) {
      this.$store.state.informationTechnologies.specialPermissionPermissions = Object.assign([]);

      this.getSpecialPermissionPermissions(this.personelRolId,this.pasif);
    }
  },
  watch: {
    read(nw) {
      if (nw) {
        this.specialPermissionPermissions.forEach(item => {
          item.okuma = true;
        });
      } else {
        this.specialPermissionPermissions.forEach(item => {
          item.okuma = false;
        });
      }
    },
    write(nw) {
      if (nw) {
        this.specialPermissionPermissions.forEach(item => {
          item.yazma = true;
        });
      } else {
        this.specialPermissionPermissions.forEach(item => {
          item.yazma = false;
        });
      }
    },
    remove(nw) {
      if (nw) {
        this.specialPermissionPermissions.forEach(item => {
          item.silme = true;
        });
      } else {
        this.specialPermissionPermissions.forEach(item => {
          item.silme = false;
        });
      }
    }
  }
}
</script>