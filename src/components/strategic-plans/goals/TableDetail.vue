<template>
  <div>
    <b-modal
        :id="'modal-add-edit-goal'+item.id"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        size="lg"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
        @shown="shown"
    >
      <div class="form-group">
        <label>Hedef</label>
        <textarea rows="5" class="form-control" maxlength="500" v-model="form.goal"
                  :class="{ 'is-invalid': $v.form.goal.$error }"></textarea>
        <template v-if="$v.form.goal.$error">
          <small class="text-danger" v-if="!$v.form.goal.required">Hedef girilmelidir</small>
        </template>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>Hedef No</label>
            <select class="form-control" v-model="form.goalNo" :class="{ 'is-invalid': $v.form.goalNo.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in $store.state.sp.goalShortNames" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <template v-if="$v.form.goalNo.$error">
              <small class="text-danger" v-if="!$v.form.goalNo.required">Hedef No seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Sorumlu Birim</label>
            <select class="form-control" v-model="form.department" :class="{ 'is-invalid': $v.form.department.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in $store.state.sp.departments" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <template v-if="$v.form.department.$error">
              <small class="text-danger" v-if="!$v.form.department.required">Sorumlu Birim seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
        :id="'modal-delete-goal'+item.id"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="remove"
        :busy="overlay"
    >
      <p class="my-4 text-center">Hedef silinecektir, emin misiniz?</p>
    </b-modal>
    <table class="table table-hover" v-if="!showHistory">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Hedefler</th>
        <th class="fit">Sorumlu Birim</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="updateSelectedPurpose(item)" v-b-modal="'modal-add-edit-goal'+item.id"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(i)" v-for="(i,index) in list" :key="index">
        <td class="fit">{{ i.hedefKisaAd }}</td>
        <td>
          {{ i.hedefAciklama }}
        </td>
        <td class="fit">{{ i.sorumluBirim }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="i.pasif"/>
        </td>
        <td class="fit">
          <button class="btn  btn-sm mr-2" @click="goToDetail(i)"
                  :class="i.hedefDetayVarmi?'btn-success':'btn-outline-secondary'">Hedef
            Detayları
          </button>
          <button class="btn btn-sm btn-outline-secondary mr-2" @click.stop="history(i)">
            Tarihçe
          </button>
          <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(i.id)">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="row mb-3">
        <div class="col d-flex align-items-center">
          <h4 class="mb-0">TARİHÇE : {{ selectedItem.hedefKisaAd }} {{ selectedItem.hedefAciklama }}</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-outline-secondary"
                  @click="showHistory=false">
            <font-awesome-icon icon="angle-double-left" class="mr-2"/>
            Geri Dön
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th class="fit">No</th>
          <th>Hedef</th>
          <th class="fit">Pasif</th>
          <th class="fit">Kullanıcı</th>
          <th class="fit">Kayıt Tarihi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.sp.goalHistories" :key="index">
          <td class="fit">{{ selectedItem.hedefKisaAd }}</td>
          <td>{{ item.hedefAciklama }}</td>
          <td class="fit">{{ item.pasif }}</td>
          <td class="fit">{{ item.kullanici }}</td>
          <td class="fit">{{ item.kayitTarihi }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  props: ['list', 'item'],
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      selectedItem: null,
      selectedId: null,
      showHistory: false,
      modalTitle: `AMAÇ : ${this.item.amacKisaAd} - Yeni Hedef Girişi`,
      overlay: false,
      form: {
        id: null,
        purposeId: this.item.id,
        goal: '',
        goalNo: null,
        department: null,
        passive: false
      }
    }
  },
  validations: {
    form: {
      goal: {
        required
      },
      goalNo: {
        required
      },
      department: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['changeGoalsComponent', 'updateSelectedPurpose', 'updateSelectedGoal', 'getGoalShortNames', 'getDepartments', 'addGoal', 'deleteGoal', 'getGoalHistory']),
    shown() {
      this.getGoalShortNames(this.item.id);
    },
    goToDetail(item) {
      this.updateSelectedGoal(item);
      this.changeGoalsComponent('GoalDetails');
    },
    history(item) {
      this.selectedItem = item;
      this.showHistory = true;
      this.getGoalHistory(item.id);
    },
    showDeleteModal(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-goal' + this.item.id);
    },
    remove() {
      this.overlay = true;
      this.deleteGoal(this.selectedId).then(res => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-goal' + this.item.id);
        }
      }).catch((err) => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.overlay = false;
      });
    },
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = `AMAÇ : ${this.item.amacKisaAd} - Hedef Düzenle`;
      this.form.id = item.id;
      this.form.goal = item.hedefAciklama;
      this.form.goalNo = this.$store.state.sp.goalShortNames.find(i => i.id == item.hedefNo);
      this.form.department = item.birimId;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-add-edit-goal' + this.item.id);
    },
    clear() {
      this.isEditing = false;
      this.modalTitle = `AMAÇ : ${this.item.amacKisaAd} - Yeni Hedef Girişi`;
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        purposeId: this.item.id,
        goal: '',
        goalNo: null,
        department: null,
        passive: false
      });
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.addGoal(this.form).then(res => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-add-edit-goal' + this.item.id);
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.overlay = false;
        });
      }
    }
  },
  created() {
    this.getDepartments();
  }
}
</script>
