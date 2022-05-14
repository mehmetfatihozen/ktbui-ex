<template>
  <div>
    <b-modal
        id="modal-employee-sub-statuses"
        size="lg"
        centered
        :title="modalTitle"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="İptal"
        @ok.prevent="save"
        @hidden="clear"
    >

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Alt Durum Adı</label>
            <input type="text" class="form-control" v-model="form.state"
                   :class="{ 'is-invalid': $v.form.state.$error }">
            <template v-if="$v.form.state.$error">
              <small class="text-danger" v-if="!$v.form.state.required">Alt Durum Adı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Durum : Çalışan</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeEmployeeStatusComponent({cmp:'EmployeeStatusesMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Alt Durumlar</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-employee-sub-statuses>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.employeeSubStates" :key="index">
        <td>{{ item.durum }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeEmployeeStatusComponent({cmp:'EmployeeSubStatusesHistory',data:item})">
            Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  props: ['id'],
  data() {
    return {
      modalTitle: 'Yeni Alt Durum Girişi',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        parentId: this.id,
        state: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      state: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['changeEmployeeStatusComponent']),
    ...mapActions('hrSettings', ['updateEmployeeSubState', 'addEmployeeSubState', 'getEmployeeSubStates']),
    clear() {
      this.isEditing = false;
      this.modalTitle = 'Yeni Alt Durum Girişi';
      this.form = Object.assign({}, {
        id: null,
        state: '',
        passive: false,
        parentId: this.id
      });
      this.$v.$reset();
    },
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Alt Durum Düzenle';
      this.form.id = item.id;
      this.form.state = item.durum;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-employee-sub-statuses');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateEmployeeSubState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-employee-sub-statuses');
            }
          }).catch(err => {
            this.overlay = false;
            alert(err);
          })
        } else {
          this.addEmployeeSubState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-employee-sub-statuses');
            }
          }).catch(err => {
            this.overlay = false;
            alert(err);
          })
        }
      }
    }
  },
  created() {
    this.$store.state.hrSettings.employeeSubStates = Object.assign([]);
    this.getEmployeeSubStates(this.id);
  }
}
</script>