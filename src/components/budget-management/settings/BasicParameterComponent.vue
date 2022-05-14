<template>
  <div>
    <b-modal
        :id="'modal-basic-parameter-component-add-edit' + parameterTypeId"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        :busy="this.$store.state.general.showOverlay"
        @ok.prevent="save"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>{{ this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text }} Adı</label>
            <input type="text" class="form-control"
                   v-model="form.text"
                   @keypress="isAlphabeticCharacter($event)"
                   @keydown="rejectCopyPaste($event)"
                   :class="{ 'is-invalid': $v.form.text.$error }"
                   :maxlength="basicParameterNameMaxLength">
            <template v-if="$v.form.text.$error">
              <small class="text-danger" v-if="!$v.form.text.required">{{
                  this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text
                }} Adı girilmelidir</small>
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
    <table class="table table-hover">
      <thead>
      <tr>
        <th>{{ this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text }} Adı</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showAddModal()"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class=" cursor-pointer
          " @click="showEditModal(item)"
          v-for="(item,index) in $store.state.budgetManagement.budgetBasicParameters" :key="index">
        <td>{{ item.metin }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  props: ['parameterTypeId'],
  data() {
    return {
      form: {
        id: null,
        parameterTypeId: this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.typeId,
        text: '',
        passive: false
      },
      basicParameterNameMaxLength: 50,
      isEditing: false,
      modalTitle: 'Yeni ' + this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text + ' Ekle'
    }
  },
  validations: {
    form: {
      text: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('budgetManagement', ['getBudgetBasicParameters', 'addBudgetBasicParameter', 'updateBudgetBasicParameter']),
    showAddModal() {
      this.form = Object.assign({}, {
        id: null,
        parameterTypeId: this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.typeId,
        text: '',
        passive: false
      });
      this.$v.$reset();
      this.isEditing = false;
      this.modalTitle = 'Yeni ' + this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text + ' Ekle';
      this.$bvModal.show('modal-basic-parameter-component-add-edit' + this.parameterTypeId);
    },
    showEditModal(item) {
      this.form = Object.assign({}, {
        id: item.id,
        parameterTypeId: this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.typeId,
        text: item.metin,
        passive: item.pasif
      });
      this.$v.$reset();
      this.isEditing = true;
      this.modalTitle = this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.text + ' Güncelle';
      this.$bvModal.show('modal-basic-parameter-component-add-edit' + this.parameterTypeId);
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        if (this.isEditing) {
          this.updateBudgetBasicParameter(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.getBudgetBasicParameters(this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.typeId);
              this.$bvModal.hide('modal-basic-parameter-component-add-edit' + this.parameterTypeId);
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addBudgetBasicParameter(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.getBudgetBasicParameters(this.$store.state.budgetManagement.settings.currentBasicParameterComponentData.typeId);
              this.$bvModal.hide('modal-basic-parameter-component-add-edit' + this.parameterTypeId);
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    },
    rejectCopyPaste(event) {
      let charCode = (event.which) ? event.which : event.keyCode;
      if (event.ctrlKey === true && (charCode == 118 || charCode == 86)) {
        event.preventDefault();
        return true;
      }
    },
    isAlphabeticCharacter(event) {
      let charCode = (event.which) ? event.which : event.keyCode;
      if (((charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 122)) ||
          charCode == 8 || charCode == 32 || charCode == 350 || charCode == 351 ||
          charCode == 304 || charCode == 286 || charCode == 287 || charCode == 231 ||
          charCode == 199 || charCode == 305 || charCode == 214 || charCode == 246 ||
          charCode == 220 || charCode == 252) {
        return true;
      }
      event.preventDefault();
    }
  }
}
</script>