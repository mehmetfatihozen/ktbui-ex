<template>
    <div>
        <b-modal 
        id="modal-months-add-edit" 
        centered
        :title="modalTitle" 
        ok-variant="success" 
        ok-title="Kaydet"
        cancel-title="Vazgeç" 
        cancel-variant="outline-secondary" 
        size="lg"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clearForm"
        >

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Ay</label>
                        <input type="text" maxlength="35" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
                        <template v-if="$v.form.title.$error">
                            <small class="text-danger" v-if="!$v.form.title.required">Ay girilmelidir</small>
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

        
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Aylar</th>
                    <th class="fit">Pasif</th>
                    <th class="fit"> <PlusCircleIcon v-b-modal.modal-months-add-edit/> </th>
                </tr>
            </thead>
            <tbody>
                <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.months" :key="index">
                    <td>{{item.ay}}</td>
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
import PlusCircleIcon from '@/components/PlusCircleIcon'
import { mapActions } from 'vuex'
import {required} from "vuelidate/lib/validators";

export default {
    components:{
        PlusCircleIcon
    },
    data(){
        return {
            overlay: false,
            modalTitle:'Yeni Ay Girişi',
            isEditing:false,
            form:{
                id:null,
                title:'',
                passive: false
            }
        }
    },
    validations: {
    form: {
      title: {
        required
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('settings', ['getMonths', 'addMonth', 'updateMonth']),
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateMonth(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-months-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
           }else{
            this.addMonth(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-months-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla eklendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
           }
        
      }
        },
        showEditModal(item) {
            this.modalTitle = 'Ay Düzenle'
            this.isEditing = true;
            this.form.id = item.id;
            this.form.title = item.ay;
            this.form.passive = item.pasif;
            this.$bvModal.show('modal-months-add-edit');
    },
    clearForm(){
        this.modalTitle = 'Yeni Ay Girişi';
        this.$v.$reset();
        this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false,
      });
      this.isEditing = false;
    }
    },
    created(){
        this.getMonths();
    }
}
</script>