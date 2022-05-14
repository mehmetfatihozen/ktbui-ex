<template>
  <div>
    <b-modal
        id="modal-composition-groups-main-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        :busy="$store.state.general.showOverlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <label>Tertip Grubu</label>
            <input type="text" class="form-control"
                   v-model="form.name"
                   :class="{ 'is-invalid': $v.form.name.$error }"
                   :maxlength="compositionGroupNameMaxLength">
            <template v-if="$v.form.name.$error">
              <small class="text-danger" v-if="!$v.form.name.required">Tertip Grubu girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Grup No</label>
            <input type="text" class="form-control"
                   v-model="form.code"
                   :class="{ 'is-invalid': $v.form.code.$error }"
                   :maxlength="compositionGroupCodeMaxLength">
            <template v-if="$v.form.name.$error">
              <small class="text-danger" v-if="!$v.form.code.required">Grup No girilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <label>Bütçe Türü</label>
            <select class="form-control" v-model="form.budgetTypeId">
              <option :value="null">Seçiniz</option>
              <option v-for="(item,index) in $store.state.budgetManagement.budgetBasicParameters"
                      :value="item.id"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.budgetTypeId.$error">
              <small class="text-danger" v-if="!$v.form.budgetTypeId.required">Bütçe Türü girilmelidir</small>
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
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Grup No</th>
        <th>Tertip Grupları</th>
        <th class="fit">Bütçe Türü</th>
        <th class="fit">Pasif</th>
        <th class="fit"></th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-composition-groups-main-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.budgetManagement.compositionGroups" :key="index">
        <td class="fit">{{ item.kodu }}</td>
        <td>{{ item.adi }}</td>
        <td class="fit">{{ item.butceTuru }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-center">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeCompositionGroupsComponent({component:'CompositionGroupsMainCompositionSubGroups', data:{ compositionGroup: item }})">
            Tertip Alt Grubu
          </button>
        </td>
        <td class="fit text-center">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeCompositionGroupsComponent({component:'CompositionGroupHistory', data:{ compositionGroup: item, parentCompositionGroup: null }})">
            Tarihçe
          </button>
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
      compositionGroupNameMaxLength: 50,
      compositionGroupCodeMaxLength: 5,
      form: {
        id: null,
        name: '',
        code: '',
        budgetTypeId: null,
        passive: false
      },
      isEditing: false,
      modalTitle: 'Yeni Tertip Grubu Girişi',
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      code: {
        required
      },
      budgetTypeId: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('budgetManagement', ['addCompositionGroup', 'updateCompositionGroup', 'getCompositionGroups', 'changeCompositionGroupsComponent', "getBudgetBasicParameters"]),
    clear() {
      this.form = Object.assign({}, {
        id: null,
        name: '',
        code: '',
        budgetTypeId: null,
        passive: false
      })
      this.$v.$reset();
      this.isEditing = false;
      this.modalTitle = 'Yeni Tertip Grubu Girişi';
    },
    showEditModal(item) {
      this.form = Object.assign({}, {
        id: item.id,
        name: item.adi,
        code: item.kodu,
        budgetTypeId: item.butceTuruId,
        passive: item.pasif
      })
      this.isEditing = true;
      this.modalTitle = 'Tertip Grubu Güncelleme';
      this.$bvModal.show('modal-composition-groups-main-add-edit');
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
              this.getCompositionGroups();
              this.$bvModal.hide('modal-composition-groups-main-add-edit');
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addCompositionGroup(this.form).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.getCompositionGroups();
              this.$bvModal.hide('modal-composition-groups-main-add-edit');
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
    this.getBudgetBasicParameters(1024);
    this.getCompositionGroups();
  }
}
</script>