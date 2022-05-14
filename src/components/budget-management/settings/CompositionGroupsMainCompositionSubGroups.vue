<template>
  <div>
    <b-modal
        id="modal-composition-sub-groups-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        :busy="$store.state.general.showOverlay"
        @ok.prevent="save"
    >
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <label>Tertip Grubu</label>
            <input type="text" class="form-control" disabled
                   v-model="compositionGroup.adi">
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Grup No</label>
            <input type="text" class="form-control" disabled
                   v-model="compositionGroup.kodu">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <label>Tertip Alt Grubu</label>
            <input type="text" class="form-control"
                   v-model="form.compositionSubGroupName"
                   :class="{ 'is-invalid': $v.form.compositionSubGroupName.$error }"
                   :disabled="compositionSubGroupDisabled"
                   :maxlength="nameMaxLength">
            <template v-if="$v.form.compositionSubGroupName.$error">
              <small class="text-danger" v-if="!$v.form.compositionSubGroupName.requiredIf">Tertip Alt Grubu
                girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Alt Grup No</label>
            <input type="text" class="form-control"
                   v-model="form.compositionSubGroupNo"
                   :class="{ 'is-invalid': $v.form.compositionSubGroupNo.$error }"
                   :disabled="compositionSubGroupDisabled"
                   :maxlength="noMaxLength">
            <template v-if="$v.form.compositionSubGroupNo.$error">
              <small class="text-danger" v-if="!$v.form.compositionSubGroupNo.requiredIf">Alt Grup No
                girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row" v-if="compositionDetailGroupVisible">
        <div class="col-10">
          <div class="form-group">
            <label>Tertip Detay Grubu</label>
            <input type="text" class="form-control"
                   v-model="form.compositionDetailGroupName"
                   :class="{ 'is-invalid': $v.form.compositionDetailGroupName.$error }"
                   :disabled="compositionDetailGroupDisabled"
                   :maxlength="nameMaxLength">
            <template v-if="$v.form.compositionDetailGroupName.$error">
              <small class="text-danger" v-if="!$v.form.compositionDetailGroupName.requiredIf">Tertip Detay Grubu
                girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Detay Grup No</label>
            <input type="text" class="form-control"
                   v-model="form.compositionDetailGroupNo"
                   :class="{ 'is-invalid': $v.form.compositionDetailGroupNo.$error }"
                   :disabled="compositionDetailGroupDisabled"
                   :maxlength="noMaxLength">
            <template v-if="$v.form.compositionDetailGroupNo.$error">
              <small class="text-danger" v-if="!$v.form.compositionDetailGroupNo.requiredIf">Detay Grup No
                girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row" v-if="compositionDetailAccountVisible">
        <div class="col-10">
          <div class="form-group">
            <label>Tertip Detay Hesabı</label>
            <input type="text" class="form-control"
                   v-model="form.compositionDetailAccountName"
                   :class="{ 'is-invalid': $v.form.compositionDetailAccountName.$error }"
                   :maxlength="nameMaxLength">
            <template v-if="$v.form.compositionDetailAccountName.$error">
              <small class="text-danger" v-if="!$v.form.compositionDetailAccountName.requiredIf">Tertip Detay Hesabı
                girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Kalem No</label>
            <input type="text" class="form-control"
                   v-model="form.compositionDetailAccountNo"
                   :class="{ 'is-invalid': $v.form.compositionDetailAccountNo.$error }"
                   :maxlength="noMaxLength">
            <template v-if="$v.form.compositionDetailAccountNo.$error">
              <small class="text-danger" v-if="!$v.form.compositionDetailAccountNo.requiredIf">Kalem No
                girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10" v-if="purchaseTypeVisible">
          <div class="form-group">
            <label>Alım Türü</label>
            <select class="form-control" v-model="form.purchaseTypeId">
              <option :value="null">Seçiniz</option>
              <option v-for="(item,index) in $store.state.budgetManagement.budgetBasicParameters"
                      :value="item.id"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.purchaseTypeId.$error">
              <small class="text-danger" v-if="!$v.form.purchaseTypeId.requiredIf">Alım Türü girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
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
      <div class="col"><h4 class="mb-0"><strong>{{
          this.compositionGroup.kodu + " - " + this.compositionGroup.adi
        }}</strong></h4></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeCompositionGroupsComponent({ component:'CompositionGroupsMain', data:null })">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Detay</th>
        <th class="fit">Grup No</th>
        <th>Tertip Alt Grupları ve Hesaplar</th>
        <th class="fit">Alım Türü</th>
        <th class="fit">Pasif</th>
        <th class="fit"></th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showModalForSubGroup(null)"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <CompositionSubGroupsTableRow v-for="(subGroup,index) in $store.state.budgetManagement.compositionSubGroups"
                                    :key="index"
                                    :parentCompositionGroup="compositionGroup"
                                    :subGroup="subGroup">
      </CompositionSubGroupsTableRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions} from "vuex";
import {requiredIf} from "vuelidate/lib/validators";
import CompositionSubGroupsTableRow from "@/components/budget-management/settings/CompositionSubGroupsTableRow";

export default {
  components: {
    CompositionSubGroupsTableRow,
    PlusCircleIcon
  },
  props: ["compositionGroup"],
  data() {
    return {
      showDetail: false,
      selectedRowGroupTypeId: 2,
      nameMaxLength: 50,
      noMaxLength: 5,
      compositionSubGroupDisabled: false,
      compositionDetailGroupDisabled: false,
      compositionDetailGroupVisible: true,
      compositionDetailAccountVisible: true,
      purchaseTypeVisible: true,
      form: {
        id: null,
        compositionSubGroupName: '',
        compositionSubGroupNo: '',
        compositionDetailGroupName: '',
        compositionDetailGroupNo: '',
        compositionDetailAccountName: '',
        compositionDetailAccountNo: '',
        purchaseTypeId: null,
        passive: false
      },
      isEditing: false,
      modalTitle: 'Yeni Tertip Alt Grubu ve Hesap Girişi',
    }
  },
  validations: {
    form: {
      purchaseTypeId: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 2;
        })
      },
      compositionSubGroupName: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 2;
        })
      },
      compositionSubGroupNo: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 2;
        })
      },
      compositionDetailGroupName: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 3;
        })
      },
      compositionDetailGroupNo: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 3;
        })
      },
      compositionDetailAccountName: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 4;
        })
      },
      compositionDetailAccountNo: {
        requiredIf: requiredIf(function () {
          return this.selectedRowGroupTypeId === 4;
        })
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('budgetManagement', ['addCompositionSubGroup', 'updateCompositionSubGroup', "getCompositionSubGroups",
      "getBudgetBasicParameters", 'changeCompositionGroupsComponent']),
    aaa(event){
      console.log(event);
      console.log("dada");
    },
    showModalForSubGroup(subGroup) {
      if (subGroup === null) {
        this.form = Object.assign({}, {
          id: null,
          compositionSubGroupName: '',
          compositionSubGroupNo: '',
          compositionDetailGroupName: '',
          compositionDetailGroupNo: '',
          compositionDetailAccountName: '',
          compositionDetailAccountNo: '',
          purchaseTypeId: null,
          passive: false
        })
        this.isEditing = false;
        this.modalTitle = 'Yeni Tertip Alt Grubu ve Hesap Girişi';
      } else {
        this.form = Object.assign({}, {
          id: subGroup.id,
          compositionSubGroupName: subGroup.adi,
          compositionSubGroupNo: subGroup.kodu,
          compositionDetailGroupName: '',
          compositionDetailGroupNo: '',
          compositionDetailAccountName: '',
          compositionDetailAccountNo: '',
          purchaseTypeId: null,
          passive: false
        })
        this.isEditing = true;
        this.modalTitle = 'Tertip Alt Grubu ve Hesap Güncelleme';
      }
      this.compositionSubGroupDisabled = false;
      this.compositionDetailGroupVisible = false;
      this.compositionDetailAccountVisible = false;
      this.purchaseTypeVisible = true;
      this.selectedRowGroupTypeId = 2;
      this.$v.$reset();
      this.$bvModal.show('modal-composition-sub-groups-add-edit');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        if (this.isEditing) {
          this.updateCompositionGroup(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.getCompositionSubGroups(this.compositionGroup.id);
              this.$bvModal.hide('modal-composition-sub-groups-add-edit');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addCompositionSubGroup(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.getCompositionSubGroups(this.compositionGroup.id);
              this.$bvModal.hide('modal-composition-sub-groups-add-edit');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    }
  },
  created() {
    this.getBudgetBasicParameters(1007);
    this.getCompositionSubGroups(this.compositionGroup.id);
  }
}
</script>