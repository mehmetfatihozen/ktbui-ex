<template>
  <div>
    <b-modal
        id="modal-annualBudgetState-add-edit"
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
            <label>Durum Adı</label>
            <input type="text" maxlength="45" class="form-control" v-model="form.title" :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">Durum adı girilmelidir</small>
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
        <th>Durumlar</th>
        <th class="fit">Pasif</th>
        <th></th>
        <th class="fit text-right"> <PlusCircleIcon v-b-modal.modal-annualBudgetState-add-edit/> </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.budgetManagement.annualBudgetStates"
          :key="index">
        <td>{{ item.durumAdi }}</td>
        <td class="">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit">
          <button class="btn btn-sm btn-success"
                  @click.stop="changeComponent(item.id,item.ulkeAdi,'stateTransitions')">Durum Geçişleri
          </button>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-success"
                  @click.stop="changeComponent(item.id,item.ulkeAdi,'authorizedUsers')">Yetkili Kullanıcılar
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
      modalTitle:'Yeni Durum Girişi',
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
  methods:{
    ...mapActions('budgetManagement',['changeAnnualBudgetStateTransitionsUserAssignment', 'getAnnualBudgetStates','addAnnualBudgetState','updateAnnualBudgetState']),
    ...mapActions('general',['showModal']),

    changeComponent(id,ulkeAdi,componentName){
      this.changeAnnualBudgetStateTransitionsUserAssignment(componentName);
      this.$store.state.budgetManagement.selectedSubState = id;
    },
    save(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if(this.isEditing){
          this.updateAnnualBudgetState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-annualBudgetState-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla güncellendi.", type: 'success'});
              this.$forceUpdate();
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }else{
          this.addAnnualBudgetState(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-annualBudgetState-add-edit');
              this.showModal({title: 'İşlem Başarılı', message: "İşlem başarıyla eklendi.", type: 'success'});
              this.$forceUpdate();
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }

      }


    },
    showEditModal(item) {
      this.modalTitle = 'Durum Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.durumAdi;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-annualBudgetState-add-edit');
    },
    clearForm(){
      this.modalTitle = 'Durum Girişi';
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
    this.getAnnualBudgetStates();
  }
}
</script>