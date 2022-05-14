<template>
  <div>
    <b-modal
        id="modal-location-add-edit"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Lokasyon</label>
            <input type="text" class="form-control" v-model="form.text" :class="{ 'is-invalid': $v.form.text.$error }">
            <template v-if="$v.form.text.$error">
              <small class="text-danger" v-if="!$v.form.text.required">{{ this.getMessage(5) }}</small>
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
        <th>Lokasyonlar</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-location-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.applicationSettings.locations" :key="index">
        <td>{{ item.metin }}</td>
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
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      modalTitle: 'Lokasyon Ekle',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        parameterTypeId: 12,
        text: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      text: {
        required
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('applicationSettings', ['updateLocation', 'addLocation', 'getLocations']),
    clear() {
      this.modalTitle = 'Lokasyon Ekle';
      this.$v.$reset();
      this.isEditing = false;
      this.form = Object.assign({}, {
        id: null,
        parameterTypeId: 12,
        text: '',
        passive: false
      })
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateLocation(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-location-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addLocation(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-location-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }

      }
    },
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Lokasyon Düzenle';
      this.form.id = item.id;
      this.form.text = item.metin;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-location-add-edit');
    }
  },
  created() {
    this.getLocations();
  }
}
</script>