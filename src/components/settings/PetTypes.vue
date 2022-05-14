<template>
    <div>
        <b-modal
        id="modal-pets-add-edit"
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
                        <label>Evcil Hayvan Türü</label>
                        <input type="text" maxlength="60" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
                        <template v-if="$v.form.title.$error">
                            <small class="text-danger" v-if="!$v.form.title.required">Evcil hayvan tipi girilmelidir</small>
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
                    <th>Evcil Hayvan Türleri</th>
                    <th class="fit">Pasif</th>
                    <th class="fit"> <PlusCircleIcon v-b-modal.modal-pets-add-edit/> </th>
                </tr>
            </thead>
            <tbody>
                <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.petTypes" :key="index">
                    <td>{{item.metin}}</td>
                    <td class="fit text-center">
                        <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif" />
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
        return{
            overlay: false,
            modalTitle:'Yeni Evcil Hayvan Tipi Girişi',
            isEditing:false,
            form:{
                id:null,
                parametreTipId:23,
                metin:'',
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
    methods:{
        ...mapActions('settings',['getPetTypes','addPetTypes','updatePetTypes']),
      ...mapActions('general',['showModal']),
        save(){
            this.$v.$touch();
            if (!this.$v.$invalid) {
            this.overlay = true;
           if(this.isEditing){
            this.updatePetTypes(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-pets-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
           }else{
            this.addPetTypes(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-pets-add-edit');
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
            this.modalTitle = 'Evcil Hayvan Tipi Düzenle'
            this.isEditing = true;
            this.form.id = item.id;
            this.form.title = item.metin;
            this.form.passive = item.pasif;
            this.$bvModal.show('modal-pets-add-edit');
    },
    clearForm(){
        this.modalTitle = 'Yeni Evcil Hayvan Tipi Girişi';
        this.$v.$reset();
        this.form = Object.assign({}, {
        id: null,
        parametreTipId:23,
        metin: '',
        passive: false,
      });
      this.isEditing = false;
    }
    },
    created(){
        this.getPetTypes(23);
    }
}
</script>