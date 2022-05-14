<template>
  <div class="d-content">
    <b-modal
        id="modal-add-risk"
        size="lg"
        centered
        title="Hedef Detay Girişi : RİSKLER"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="form-group">
        <label>Risk</label>
        <textarea rows="5" class="form-control" v-model="form.text"
                  :class="{ 'is-invalid': $v.form.text.$error }"
                  maxlength="250"></textarea>
        <template v-if="$v.form.text.$error">
          <small class="text-danger" v-if="!$v.form.text.required">Risk girilmelidir</small>
        </template>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete-risk"
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
        <th>Risk</th>
        <th class="fit text-center">
          <PlusCircleIcon v-b-modal.modal-add-risk/>
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
      this.$bvModal.show('modal-delete-risk');
    },
    remove(){
      this.overlay=true;
      this.deleteGoalDetail(this.selectedItem.id).then(res => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-risk');
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
            this.$bvModal.hide('modal-add-risk');
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