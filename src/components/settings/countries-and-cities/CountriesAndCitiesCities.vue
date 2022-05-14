<template>
<div>
  <!--{{$store.state.settings.selectedCountry}}
  <button @click="changeCountriesAndCitiesComponent('CountriesAndCitiesMain')">Geri Dön</button>-->
  <b-modal
      id="modal-cities-add-edit"
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
          <label>Şehir Adı</label>
          <input type="text" maxlength="35" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
          <template v-if="$v.form.title.$error">
            <small class="text-danger" v-if="!$v.form.title.required">Şehir adı girilmelidir</small>
          </template>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Şehir Kodu</label>
          <input type="text" maxlength="10" class="form-control" v-model="form.plakaKodu" :class="{ 'is-invalid': $v.form.plakaKodu.$error }">
          <template v-if="$v.form.plakaKodu.$error">
            <small class="text-danger" v-if="!$v.form.plakaKodu.required">Şehir kodu girilmelidir</small>
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
    <div class="col"><h5 class="mb-0">{{ this.$store.state.settings.selectedCountryName }}</h5></div>
    <div class="col text-right">
      <button class="btn btn-outline-secondary btn-sm"
              @click.stop="changeCountriesAndCitiesComponent('CountriesAndCitiesMain')">
        <font-awesome-icon icon="angle-left"/>
        Geri Dön
      </button>
    </div>
  </div>

  <table class="table table-hover">
    <thead>
    <tr>
      <th>Şehirler</th>
      <th class="fit">Plaka Kodu</th>
      <th class="fit">Pasif</th>
      <th class="fit text-right"> <PlusCircleIcon v-b-modal.modal-cities-add-edit/> </th>
    </tr>
    </thead>
    <tbody>
    <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.cities"
        :key="index">
      <td>{{ item.sehirAdi }}</td>
      <td class="fit text-center">{{item.plakaKodu}}</td>
      <td class="fit text-center">
        <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
      </td>
      <td class="fit text-right">
        <button class="btn btn-sm btn-success"
                @click.stop="changeComponent(item.id,item.sehirAdi)">İlçeler
        </button>
      </td>
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
      modalTitle:'Yeni Şehir Girişi',
      isEditing:false,
      form:{
        id:null,
        title:'',
        plakaKodu:'',
        passive: false,
        ulkeId: this.$store.state.settings.selectedCountry,
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      plakaKodu: {
        required
      },
    }
  },
  methods:{
    ...mapActions('settings',['changeDistrictComponents','changeCountriesAndCitiesComponent','getCities','addCity','updateCity']),
    ...mapActions('general',['showModal']),
    changeComponent(id,metin){
      this.$store.state.settings.selectedCity=id;
      this.$store.state.settings.selectedCityName = metin;
      this.changeCountriesAndCitiesComponent('Districts')
    },
    save(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if(this.isEditing){
          this.updateCity(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-cities-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addCity(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-cities-add-edit');
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
      this.modalTitle = 'Şehir Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.sehirAdi;
      this.form.passive = item.pasif;
      this.form.plakaKodu = item.plakaKodu;
      this.$bvModal.show('modal-cities-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Yeni Şehir Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false,
        plakaKodu: ''
      });
      this.isEditing = false;
    }
  },
  created(){
    this.getCities(this.$store.state.settings.selectedCountry);
  }
}
</script>
