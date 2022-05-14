<template>
<div>
  <b-modal
      id="modal-district-add-edit"
      centered
      :title='modalTitle'
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
          <label>İlçe Adı</label>
          <input type="text" maxlength="45" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
          <template v-if="$v.form.title.$error">
            <small class="text-danger" v-if="!$v.form.title.required">İlçe adı girilmelidir</small>
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

  <div class="row mb-3">
    <div class="col"><h5 class="mb-0">{{this.$store.state.settings.selectedCountryName+" - "+ this.$store.state.settings.selectedCityName }}</h5></div>
    <div class="col text-right">
      <button class="btn btn-outline-secondary btn-sm"
              @click="changeCountriesAndCitiesComponent('CountriesAndCitiesCities')">
        <font-awesome-icon icon="angle-left"/>
        Geri Dön
      </button>
    </div>
  </div>

  <table class="table table-hover">
    <thead>
    <tr>
      <th>İlçeler</th>
      <th class="fit">Pasif</th>
      <th class="fit"> <PlusCircleIcon v-b-modal.modal-district-add-edit/> </th>
    </tr>
    </thead>
    <tbody>
    <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.districts"
        :key="index">
      <td>{{ item.ilceAdi }}</td>
      <td class="fit text-center">
        <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
      </td>
      <td></td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import PlusCircleIcon from '@/components/PlusCircleIcon'
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";



export default {
  components:{
    PlusCircleIcon
  },
  data(){
    return {
      overlay: false,
      modalTitle:'Yeni İlçe Girişi',
      isEditing:false,
      form:{
        id:null,
        title:'',
        passive: false,
        sehirId: this.$store.state.settings.selectedCity,
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
    ...mapActions('settings',['changeCountriesAndCitiesComponent','getDistrict','addDistrict','updateDistrict']),
    ...mapActions('general',['showModal']),
    changeComponent(id,ulkeAdi){
      this.$store.state.settings.selectedCountryName = ulkeAdi;
      this.changeCountriesAndCitiesComponent('CountriesAndCitiesCities')
    },
    save(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if(this.isEditing){
          this.updateDistrict(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-district-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addDistrict(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-district-add-edit');
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
      this.modalTitle = 'İlçe Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.ilceAdi;
      this.form.passive = item.pasif;
      this.form.plakaKodu = item.plakaKodu;
      this.$bvModal.show('modal-district-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Yeni İlçe Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false,
        sehirId: this.$store.state.settings.selectedCity,
      });
      this.isEditing = false;
    }
  },
  created(){
    this.getDistrict(this.$store.state.settings.selectedCity);
  }
}
</script>
