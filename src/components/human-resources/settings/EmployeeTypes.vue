<template>
  <div>
    <b-modal
        id="modal-e-type-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-variant="outline-secondary"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Personel Tipi</label>
            <input type="text" class="form-control" v-model="form.title"
                   :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Personel Tipi girilmelidir</small>
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
        <th>Personel Tipleri</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-e-type-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.employeeTypes" :key="index">
        <td>{{ item.metin }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import PlusCircleIcon from "@/components/PlusCircleIcon";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      modalTitle:'Yeni Personel Tipi Girişi',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        parameterTypeId: 10,
        title: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hrSettings', ['updateEmployeeTypes','addEmployeeTypes', 'getEmployeeTypes']),
    clear() {
      this.modalTitle='Yeni Personel Tipi Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        parameterTypeId: 10,
        title: '',
        passive: false
      });
      this.isEditing = false;
    },
    showEditModal(item) {
      this.modalTitle='Personel Tipi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.metin;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-e-type-add-edit');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateEmployeeTypes(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-e-type-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addEmployeeTypes(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-e-type-add-edit');
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
    this.getEmployeeTypes(this.form.parameterTypeId);
  }
}
</script>