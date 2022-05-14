<template>
  <div>
    <b-modal
        id="modal-employee-statuses"
        size="lg"
        centered
        :title="modalTitle"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
    >

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Durum Adı</label>
            <input type="text" class="form-control" v-model="form.state"
                   :class="{ 'is-invalid': $v.form.state.$error }">
            <template v-if="$v.form.state.$error">
              <small class="text-danger" v-if="!$v.form.state.required">Durum Adı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Personel Durumu</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-employee-statuses>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.employeeStates" :key="index">
        <td>{{ item.durum }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm mr-2"
                  :class="item.isRenk?'btn-success':'btn-outline-secondary'"
                  @click.stop="changeEmployeeStatusComponent({cmp:'EmployeeSubStatuses',data:item})">
            Alt Durumlar
          </button>
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeEmployeeStatusComponent({cmp:'EmployeeStatusesMainHistory',data:item})">
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
  data() {
    return {
      modalTitle: 'Yeni Durum Girişi',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        state: '',
        passive: false,
        parentId: null
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
    ...mapActions('hrSettings', ['updateEmployeeState','addEmployeeState', 'getEmployeeStates']),
    clear() {
      this.isEditing=false;
      this.modalTitle = 'Yeni Durum Girişi';
      this.form = Object.assign({}, {
        id: null,
        state: '',
        passive: false,
        parentId: null
      });
      this.$v.$reset();
    },
    showEditModal(item) {
      this.isEditing=true;
      this.modalTitle = 'Durum Düzenle';
      this.form.id = item.id;
      this.form.state = item.durum;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-employee-statuses');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing){
          this.updateEmployeeState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-employee-statuses');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addEmployeeState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-employee-statuses');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    }
  },
  created() {
    this.getEmployeeStates();
  }
}
</script>