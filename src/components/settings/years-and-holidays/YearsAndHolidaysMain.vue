<template>
  <div>
    <b-modal
        id="modal-yearsAndHolidays-add-edit"
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
            <label>Yıl</label>
            <input type="text" maxlength="4" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Yıl girilmelidir</small>
              <small class="text-danger" v-else-if="!$v.form.title.titleValidate">Girilen yıl doğru formatta değil</small>
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
        <th>Yıllar</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right"> <PlusCircleIcon v-b-modal.modal-yearsAndHolidays-add-edit/> </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.settings.years"
          :key="index">
        <td>{{ item.yil }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-success"
                  @click.stop="changeComponent(item.id,item.yil)">Tatiller
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
      modalTitle:'Yeni Yıl Girişi',
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
        required,
        titleValidate(value){
          return (/[0-9]{1,4}$/.test(value));
          },
      },
    }
  },
  methods:{
    ...mapActions('settings' ,['changeYearsAndHolidaysComponent','getYears','addYear','updateYear']),
    ...mapActions('general',['showModal']),
    changeComponent(id,year){
      this.$store.state.settings.selectedYear=id;
      this.$store.state.settings.selectedYearTitle = year;
      this.changeYearsAndHolidaysComponent('YearsAndHolidaysHolidays')
    },
    save(){
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.overlay = true;
        if(this.isEditing){
          this.updateYear(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-yearsAndHolidays-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addYear(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-yearsAndHolidays-add-edit');
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
      this.modalTitle = 'Yıl Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.yil;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-yearsAndHolidays-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Yeni Yıl Girişi';
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
    this.getYears();
  }
}
</script>
