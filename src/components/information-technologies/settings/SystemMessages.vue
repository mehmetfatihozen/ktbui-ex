<template>
  <div>
    <b-modal
        id="modal-s-message-add-edit"
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
        <div class="col-3">
          <div class="form-group">
            <label>Uyarı Tipi</label>
            <select class="form-control" v-model="form.type" :class="{ 'is-invalid': $v.form.type.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in $store.state.informationTechnologies.systemMessageTypes"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.type.$error">
              <small class="text-danger" v-if="!$v.form.type.required">{{this.getMessage(24)}}</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Mesaj</label>
            <input type="text" class="form-control" v-model="form.message"
                   :class="{ 'is-invalid': $v.form.message.$error }">
            <template v-if="$v.form.message.$error">
              <small class="text-danger" v-if="!$v.form.message.required">{{ this.getMessage(25) }}</small>
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
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Mesajlarda Ara</label>
          <input type="text" class="form-control" v-model="searchText">
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit cursor-pointer" @click="orderBy('id')">Kod</th>
        <th class="fit">Uyarı Tipi</th>
        <th class="cursor-pointer" @click="orderBy('message')">Mesaj</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-s-message-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in itemsSearched" :key="index">
        <td class="fit">
          {{ item.id }}
        </td>
        <td class="fit">
          <span :class="getClass(item.uyariTipiId)"><b>{{ item.uyariTipi }}</b></span>
        </td>
        <td>{{ item.mesaj }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapState} from "vuex";

const _ = require('lodash');
export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      searchText: '',
      isEditing: false,
      overlay: false,
      modalTitle: 'Yeni Sistem Mesajı Girişi',
      form: {
        id: null,
        type: null,
        message: '',
        passive: false
      },
      order: 'desc',
      orderMessage: 'asc',
    }
  },
  validations: {
    form: {
      type: {
        required
      },
      message: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['getSystemMessageTypes', 'getSystemMessages', 'addSystemMessage', 'updateSystemMessage']),
    orderBy(type) {
      console.log(type);
      if (type == 'id') {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
        this.$store.state.informationTechnologies.systemMessages = Object.assign([], _.orderBy(this.systemMessages, 'id', this.order));
      } else if (type == 'message') {
        this.orderMessage = this.orderMessage === 'asc' ? 'desc' : 'asc';
        if (this.orderMessage === 'asc') {
          this.systemMessages.sort((a, b) => a.mesaj.localeCompare(b.mesaj));
        }else{
          this.systemMessages.sort((a, b) => b.mesaj.localeCompare(a.mesaj));
        }
      }
    },
    showEditModal(item) {
      this.modalTitle = 'Sistem Mesajı Düzenle';
      this.isEditing = true;
      this.form.id = item.id;
      this.form.type = item.uyariTipiId;
      this.form.message = item.mesaj;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-s-message-add-edit');
    },
    clear() {
      this.modalTitle = 'Yeni Sistem Mesajı Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        type: null,
        message: '',
        passive: false
      })
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateSystemMessage(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(56), type: 'success'});
              this.$bvModal.hide('modal-s-message-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addSystemMessage(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
              this.$bvModal.hide('modal-s-message-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    },
    getClass(id) {
      switch (id) {
        case 140:
          return 'text-success';
        case 139:
          return 'text-warning';
        case 138:
          return 'text-danger';
      }
    }
  },
  created() {
    this.getSystemMessageTypes();
    this.getSystemMessages();
  },
  computed: {
    ...mapState('informationTechnologies', ['systemMessages']),
    ...mapGetters('general',['getMessage']),
    itemsSearched() {
      if (this.searchText == '') {
        return this.systemMessages;
      }
      return this.systemMessages.filter((item) => {
        return item.mesaj.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) >= 0 || item.id == this.searchText;
      });
    }
  }
}
</script>