<template>
<div>
  <!--<button @click="changeComponent('1')">Modellere Git</button> -->

  <b-modal
      id="modal-vehicleBrands-add-edit"
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
          <label>Marka Adı</label>
          <input type="text" maxlength="25" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
          <template v-if="$v.form.title.$error">
            <small class="text-danger" v-if="!$v.form.title.required">Yeni marka adı  girilmelidir</small>
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
      <th>Araç Markaları</th>
      <th class="fit">Pasif</th>
      <th class="fit"> <PlusCircleIcon v-b-modal.modal-vehicleBrands-add-edit/> </th>
    </tr>
    </thead>
    <tbody>
    <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.vehicleBrands"
        :key="index">
      <td>{{ item.metin }}</td>
      <td class="fit text-center">
        <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
      </td>
      <td></td>
      <!-- <td class="fit text-right">
        <button class="btn btn-sm"
                :class="item.isKullanici?'btn-success':'btn-outline-secondary'"
                @click="changeComponent(item.id)">Modeller
        </button>
      </td> -->
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
      modalTitle:'Yeni Araç Markası Girişi',
      isEditing:false,
      form:{
        id:null,
        parametreTipId:27,
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
    ...mapActions('settings',['changeVehicleComponent','getVehicleBrands','addVehicleBrands','updateVehicleBrands']),
    ...mapActions('general',['showModal']),
    changeComponent(id){
      this.$store.state.settings.selectedVehicleBrand=id;
      this.changeVehicleComponent('VehicleModels')
    },
    save(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if(this.isEditing){
          this.updateVehicleBrands(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-vehicleBrands-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addVehicleBrands(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-vehicleBrands-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }

      }
    },
    showEditModal(item) {
      this.modalTitle = 'Araç Markası Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.metin;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-vehicleBrands-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Yeni Araç Markası Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        parametreTipId:27,
        metin: '',
        passive: false,
      });
      this.isEditing = false;
    }
  },
  created(){
    this.getVehicleBrands(27);
  }
}
</script>

