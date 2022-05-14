<template>
  <div>
    <b-modal
        id="modal-taxOffice-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="$store.state.general.showOverlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Vergi Dairesi Adı</label>
            <input type="text" class="form-control"
                   v-model="form.taxOfficeName"
                   @keydown="rejectCopyPaste($event)"
                   :class="{ 'is-invalid': $v.form.taxOfficeName.$error }"
                   :maxlength="taxOfficeNameMaxLength">
            <template v-if="$v.form.taxOfficeName.$error">
              <small class="text-danger" v-if="!$v.form.taxOfficeName.required">Vergi Dairesi Adı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Vergi Dairesi Kodu</label>
            <input type="text" class="form-control" v-model="form.taxOfficeCode"
                   :class="{ 'is-invalid': $v.form.taxOfficeCode.$error }" :maxlength="taxOfficeCodeMaxLength">
            <template v-if="$v.form.taxOfficeCode.$error">
              <small class="text-danger" v-if="!$v.form.taxOfficeCode.required">Vergi Dairesi Kodu girilmelidir</small>
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
      <div class="col"><h3 class="mb-0">İl : {{ this.$store.state.supplierManagement.settings.currentTaxOfficeComponentData.metin }}</h3>
      </div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeTaxOfficeComponent({cmp:'TaxOfficesMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Vergi Daire Adı</th>
        <th>Vergi Daire Kodu</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-taxOffice-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.supplierManagement.taxOfficeParameters" :key="index">
        <td>{{ item.ad }}</td>
        <td>{{ item.kod }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
        </td>
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
  data() {
    return {
      taxOfficeNameMaxLength: 250,
      taxOfficeCodeMaxLength: 5,
      modalTitle: 'Vergi Dairesi Ekle',
      isEditing: false,
      form: {
        id: null,
        cityId: this.$store.state.supplierManagement.settings.currentTaxOfficeComponentData.id,
        taxOfficeName: '',
        taxOfficeCode: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      taxOfficeName: {
        required
      },
      taxOfficeCode: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('supplierManagement', ['addTaxOfficeParameter', 'updateTaxOfficeParameter', 'getTaxOfficeParametersByCityId', 'changeTaxOfficeComponent']),
    clear() {
      this.modalTitle = 'Vergi Dairesi Ekle';
      this.$v.$reset();
      this.isEditing = false;
      this.form = Object.assign({}, {
        id: null,
        cityId: this.$store.state.supplierManagement.settings.currentTaxOfficeComponentData.id,
        taxOfficeName: '',
        taxOfficeCode: '',
        passive: false
      })
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        if (this.isEditing) {
          this.updateTaxOfficeParameter(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-taxOffice-add-edit');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addTaxOfficeParameter(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-taxOffice-add-edit');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }

      }
    },
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Vergi Dairesi Düzenle';
      this.form.id = item.id;
      this.form.cityId = this.$store.state.supplierManagement.settings.currentTaxOfficeComponentData.id;
      this.form.taxOfficeName = item.ad;
      this.form.taxOfficeCode = item.kod;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-taxOffice-add-edit');
    },
    rejectCopyPaste(event){
      let charCode = (event.which) ? event.which : event.keyCode;
      if (event.ctrlKey === true && (charCode == 118 || charCode == 86)) {
        event.preventDefault();
        return true;
      }
    },
  },
  created() {
    this.$store.state.supplierManagement.taxOfficeParameters = Object.assign([],[]);
    this.getTaxOfficeParametersByCityId(this.$store.state.supplierManagement.settings.currentTaxOfficeComponentData.id);
  }
}
</script>