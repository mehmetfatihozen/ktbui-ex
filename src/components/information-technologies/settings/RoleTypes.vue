<template>
  <div>
    <b-modal
        id="modal-role-add"
        centered
        title="Yeni Rol Girişi"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="Vazgeç"
        :busy="showOverlay"
        @ok.prevent="saveRole"
        @hidden="clearForm"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Rol Adı</label>
            <input type="text" class="form-control" v-model="role" :class="{ 'is-invalid': $v.role.$error }">
            <template v-if="$v.role.$error">
              <small class="text-danger" v-if="!$v.role.required">{{ this.getMessage(113) }}</small>
              <small class="text-danger" v-if="!$v.role.minLength">{{ this.getMessage(229) }}</small>
            </template>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="modal-role-edit"
        centered
        title="Rol Düzenle"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="Vazgeç"
        :busy="showOverlay"
        @ok.prevent="editRole"
        @hidden="clearForm"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Rol Adı</label>
            <input type="text" class="form-control" v-model="role" :class="{ 'is-invalid': $v.role.$error }">
            <template v-if="$v.role.$error">
              <small class="text-danger" v-if="!$v.role.required">{{ this.getMessage(113) }}</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="modal-role-types-success"
        centered
        title="Başarılı"
        ok-variant="success"
        ok-title="kapat"
        header-bg-variant="success"
        header-text-variant="light"
        ok-only
    >
      {{ this.getMessage(230) }}
    </b-modal>
    <b-modal
        id="modal-confirm-edit"
        centered
        title="Uyarı!"
        header-bg-variant="warning"
        header-text-variant="light"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="Vazgeç"
        @ok.prevent="confirmEdit"
        :busy="showOverlay"
    >
      {{ getMessage(293) }}
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Roller</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-role-add/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="populateForm(item)"
          v-for="(item,index) in $store.state.informationTechnologies.roles"
          :key="index">
        <td>{{ item.rolAdi }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary"
                  @click.stop="changeRoleTypes({cmp:'RoleTypesHistory',data:item})">Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters} from "vuex";
import {required, minLength} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      showOverlay: false,
      selectedId: null,
      role: '',
      passive: false,
      showHistory: false
    }
  },
  validations: {
    role: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['getRoles', 'addRole', 'updateRole', 'changeRoleTypes']),
    saveRole() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.addRole({role: this.role, passive: this.passive}).then((res) => {
          this.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-role-add');
            this.$bvModal.show('modal-role-types-success');
            this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
          }
        }).catch(err => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.showOverlay = false;

        });
      }
    },
    confirmEdit() {
      this.actualEdit();
    },
    actualEdit() {
      this.showOverlay = true;
      this.updateRole({id: this.selectedId, role: this.role, passive: this.passive}).then((res) => {
        this.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-confirm-edit');
          this.$bvModal.hide('modal-role-edit');
          this.$bvModal.show('modal-role-types-success');
        }
      }).catch(err => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.showOverlay = false;

      });
    },
    editRole() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.passive) {
          this.$bvModal.show('modal-confirm-edit');
        } else {
          this.actualEdit();
        }
      }
    },
    populateForm(item) {
      this.selectedId = item.id;
      this.role = item.rolAdi;
      this.passive = item.pasif;
      this.$bvModal.show('modal-role-edit');
    },
    clearForm() {
      this.role = '';
      this.passive = false;
      this.$v.$reset();
    }
  },
  created() {
    this.getRoles();
  },
  computed: {
    ...mapGetters('general', ['getMessage'])
  }
}
</script>