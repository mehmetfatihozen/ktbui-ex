<template>
  <div>
    <b-modal
        id="modal-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>Plan Durumu</label>
            <select class="form-control" v-if="!isEditing" v-model="form.state" @change="getSubStates"
                    :class="{ 'is-invalid': $v.form.state.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in monitoringStateDropdown" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <input type="text" class="form-control" v-if="isEditing" disabled v-model="form.stateText">
            <template v-if="$v.form.state.$error">
              <small class="text-danger" v-if="!$v.form.state.required">Durum seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Alt Durum</label>
            <select class="form-control" v-if="!isEditing" v-model="form.subState"
                    :class="{ 'is-invalid': $v.form.subState.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in monitoringSubStateDropdown" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <input type="text" class="form-control" v-if="isEditing" disabled v-model="form.subStateText">
            <template v-if="$v.form.subState.$error">
              <small class="text-danger" v-if="!$v.form.subState.required">Alt Durum seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Açıklama</label>
        <textarea rows="5" class="form-control" v-model="form.description"></textarea>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-25">Durum</th>
        <th class="w-75">Alt Durum</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit">
          <PlusCircleIcon v-b-modal.modal-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr :class="{ 'cursor-pointer': item.sonDurum }" @click="item.sonDurum?showEditModal(item):null"
          v-for="(item,index) in monitoringStates" :key="index">
        <td>{{ item.planDurum }}</td>
        <td>{{ item.altDurum }}</td>
        <td class="fit">{{ item.kullanici }}</td>
        <td class="fit">{{ item.islemTarihi }}</td>
        <td class="fit"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      modalTitle: 'Yeni Durum Girişi',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        planId: this.$route.params.id,
        state: null,
        stateText: '',
        subState: null,
        subStateText: '',
        description: ''
      }
    }
  },
  validations: {
    form: {
      state: {
        required
      },
      subState: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['getMonitoringStates', 'getMonitoringStateDropdown', 'getMonitoringSubStateDropdown', 'addMonitoringState', 'updateMonitoringState']),
    getSubStates(e) {
      this.getMonitoringSubStateDropdown({planId: this.$route.params.id, stateId: e.target.value});
    },
    showEditModal(item) {
      this.modalTitle = 'Durum Düzenle';
      this.isEditing = true;
      this.form.id = item.id;
      this.form.state = item.durumId;
      this.form.stateText = item.planDurum;
      this.form.subState = item.altDurumId;
      this.form.subStateText = item.altDurum;
      this.form.description = item.aciklama;
      this.$bvModal.show('modal-add-edit');
    },
    clear() {
      this.$store.state.sp.monitoringSubStateDropdown = Object.assign([]);
      this.modalTitle = 'Yeni Durum Girişi';
      this.isEditing = false;
      this.form = Object.assign({}, {
        id: null,
        planId: this.$route.params.id,
        state: null,
        subState: null,
        description: ''
      });
      this.$v.$reset();
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateMonitoringState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          this.addMonitoringState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        }
      }
    }
  },
  created() {
    this.getMonitoringStateDropdown(this.$route.params.id);
    this.getMonitoringStates(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['monitoringStates', 'monitoringStateDropdown', 'monitoringSubStateDropdown'])
  }
}
</script>