<template>
  <div class="d-content">
    <b-modal
        id="modal-add-cost"
        size="lg"
        centered
        title="Hedef Detay Girişi : MALİYET TAHMİNİ"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="form-group">
        <label>Tahmini Maliyet</label>
        <vue-mask
            class="form-control"
            :class="{ 'is-invalid': $v.form.text.$error }"
            v-model="form.text"
            :raw="false"
            mask="000.000.000.000.000,00"
            :options="options"
        >
        </vue-mask>
        <template v-if="$v.form.text.$error">
          <small class="text-danger" v-if="!$v.form.text.required">Tahmini Maliyet girilmelidir</small>
        </template>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete-cost"
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
      <p class="my-4 text-center">Hedef detayı silinecektir, emin misiniz?</p>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Maliyet</th>
        <th class="fit text-center">
          <PlusCircleIcon v-b-modal.modal-add-cost/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in list" :key="index">
        <td class="fit text-center">{{ item.detayNo }}</td>
        <td>{{ item.aciklama }}</td>
        <td class="fit text-center">
          <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item)">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
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
  props: ['data', 'list'],
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      options: {
        reverse: true
      },
      overlay: false,
      form: {
        planPurposeId: this.$store.state.sp.selectedGoal.id,
        type: this.data.detayyParametreId,
        text: ''
      },
      selectedItem: null
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
    ...mapActions('sp', ['addGoalDetail','deleteGoalDetail']),
    showDeleteModal(item) {
      this.selectedItem = item;
      this.$bvModal.show('modal-delete-cost');
    },
    remove(){
      this.overlay=true;
      this.deleteGoalDetail(this.selectedItem.id).then(res => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-cost');
        }
      }).catch((err) => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.overlay = false;
      });
    },
    clear() {
      this.$v.$reset();
      this.form.text = '';
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.addGoalDetail(this.form).then(res => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-add-cost');
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.overlay = false;
        });
      }
    }
  }
}
</script>