<template>
  <div>
    <b-modal
        id="modal-countriesAndCities-add-edit"
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
            <label>Ülke Adı</label>
            <input type="text" maxlength="45" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Ülke adı girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Ülke Kodu</label>
            <input type="text" maxlength="10" class="form-control" v-model="form.telefonKodu" :class="{ 'is-invalid': $v.form.telefonKodu.$error }">
            <template v-if="$v.form.telefonKodu.$error">
              <small class="text-danger" v-if="!$v.form.telefonKodu.required">Ülke kodu girilmelidir</small>
              <small class="text-danger" v-else-if="!$v.form.telefonKodu.onlyplus">Ülke kodunu eksiksiz giriniz</small>
              <small class="text-danger" v-else-if="!$v.form.telefonKodu.titleValidate">Ülke kodu doğru formatta değil</small>
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
        <th>Ülkeler ve Şehirler</th>
        <th class="fit">Ülke Kodu</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right"> <PlusCircleIcon v-b-modal.modal-countriesAndCities-add-edit/> </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.countries"
          :key="index">
        <td>{{ item.ulkeAdi }}</td>
        <td>{{item.telefonKodu}}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-success"
                  @click="changeComponent(item.id,item.ulkeAdi)">Şehirler
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
      modalTitle:'Yeni Ülke Girişi',
      isEditing:false,
      form:{
        id:null,
        title:'',
        telefonKodu:'+',
        passive: false
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      telefonKodu: {
        required,
        titleValidate(value){
          return (/([+])+\d{1,}$/.test(value));
        },
        onlyplus(value){
          return !(value == '+');
        },
      },
    }
  },
  methods:{
    ...mapActions('settings' ,['changeCountriesAndCitiesComponent','getCountries','addCountry','updateCountry']),
    ...mapActions('general',['showModal']),
    changeComponent(id,ulkeAdi){
      this.$store.state.settings.selectedCountry=id;
      this.$store.state.settings.selectedCountryName = ulkeAdi;
      this.changeCountriesAndCitiesComponent('CountriesAndCitiesCities')
    },
    save(){
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.overlay = true;
          if(this.isEditing){
            this.updateCountry(this.form).then((res) => {
              this.overlay = false;
              if (res.hasError) {
                this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
              } else {
                this.$bvModal.hide('modal-countriesAndCities-add-edit');
                this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
              }
            }).catch(err => {
              this.overlay = false;
              this.showModal({title: 'Hata!', message: err, type: 'danger'});
            })
          }else{
            this.addCountry(this.form).then((res) => {
              this.overlay = false;
              if (res.hasError) {
                this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
              } else {
                this.$bvModal.hide('modal-countriesAndCities-add-edit');
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
      this.modalTitle = 'Ülke Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.ulkeAdi;
      this.form.passive = item.pasif;
      this.form.telefonKodu = item.telefonKodu;
      this.$bvModal.show('modal-countriesAndCities-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Yeni Ülke Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false,
        telefonKodu: '+'
      });
      this.isEditing = false;
    }
  },

  created(){
    this.getCountries();
  }
}
</script>