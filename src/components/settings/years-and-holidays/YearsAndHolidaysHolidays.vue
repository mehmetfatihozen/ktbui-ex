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
            <input type="text" disabled v-model="$store.state.settings.selectedYearTitle" class="form-control">
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label>Resmi Tatil Adı</label>
            <select class="form-control" v-model="form.resmiTatilId" :input-class="$v.form.resmiTatilId">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in this.$store.state.settings.holidays"  :key="index" >{{ item.metin }}</option>
            </select>
            <template v-if="$v.form.resmiTatilId.$error">
              <small class="text-danger" v-if="!$v.form.resmiTatilId.requiredIf">Resmi tatil seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>


      <div class="row">

        <div class="col">
          <div class="form-group">
            <label>Başlangıç Tarihi</label>
            <date-picker v-model="form.startDate"
                         format="DD.MM.YYYY"
                         type="date"
                         :input-class="$v.form.startDate.$error ?'is-invalid form-control':'form-control'"
                         valueType="format"
                         :disabled-date="disabledDate"
            ></date-picker>
            <template v-if="$v.form.startDate.$error">
              <small class="text-danger" v-if="!$v.form.startDate.requiredIf">Başlangıç tarihi seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Bitiş Tarihi</label>
            <date-picker v-model="form.finishDate"
                         format="DD.MM.YYYY"
                         type="date"
                         :input-class="$v.form.finishDate.$error ?'is-invalid form-control':'form-control'"
                         valueType="format"
                         :disabled-date="disabledDate"
            ></date-picker>
            <template v-if="$v.form.finishDate.$error">
              <small class="text-danger" v-if="!$v.form.finishDate.requiredIf">Bitiş tarih seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
    </b-modal>

    <div class="row mb-3">
      <div class="col"><h5 class="mb-0 font-weight-bold">{{'YIL: ' + this.$store.state.settings.selectedYearTitle }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click.stop="changeYearsAndHolidaysComponent('YearsAndHolidaysMain')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Resmi Tatiller</th>
        <th class=" fit">Başlangıç Tarihi</th>
        <th class="text-right">Bitiş Tarihi</th>
        <th class="fit text-right"> <PlusCircleIcon v-b-modal.modal-yearsAndHolidays-add-edit/> </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click.stop="showEditModal(item)" v-for="(item,index) in $store.state.settings.holidaysOfYear"
          :key="index">
        <td>{{ item.resmiTatil }}</td>
        <td class="fit align-self-center">{{ item.baslangicTarihi }}</td>
        <td class="text-right align-self-center">{{ item.bitisTarihi }}</td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';
import PlusCircleIcon from "@/components/PlusCircleIcon";


export default {
  components: {
    DatePicker,
    PlusCircleIcon
  },
  data() {
    return {
      disabledDate: (date) => date < new Date() || date > new Date(this.$moment(`31.12.${this.$store.state.settings.selectedYearTitle}`, "DD.MM.YYYY")),
      overlay: false,
      modalTitle: 'Yeni Resmi Tatil Girişi',
      isEditing: false,
      selected:'',
      form: {
        id: null,
        yilId: this.$store.state.settings.selectedYear,
        resmiTatil:'',
        resmiTatilId: '',
        startDate: '',
        finishDate: '',
        passive: false,
        yil: this.$store.state.settings.selectedYearTitle,
        title:'',
      }
    }
  },
  validations: {
    form: {
      resmiTatilId:{
        required,
      },
      startDate: {
        required,
      },
      finishDate: {
        required
      }
    }
  },
  methods: {
    ...mapActions('settings', ['changeYearsAndHolidaysComponent', 'getHolidaysOfYear', 'updateHolidaysOfYear','addHolidaysOfYear']),
    ...mapActions('general', ['showModal']),
    changeComponent(id) {
      this.$store.state.settings.selectedYear = id;
      this.changeYearsAndHolidaysComponent('YearsAndHolidaysMain')
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if(this.form.finishDate<this.form.startDate){
          this.showModal({title: 'Hata!', message: "Bitiş tarihi başlangıç tarihinden önce olamaz. ", type: 'danger'});
          return;
        }
        this.overlay = true;
        if (this.isEditing) {
          this.updateHolidaysOfYear(this.form).then((res) => {
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
          this.addHolidaysOfYear(this.form).then((res) => {
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
      this.modalTitle = 'Resmi Tatil Bilgisi Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.yilId =this.$store.state.settings.selectedYear;
      this.form.resmiTatil = this.selected.resmiTatil;
      this.form.resmiTatilId = item.resmiTatilId;
      this.selected = item;
      this.form.title = item.resmiTatil;
      this.form.startDate = item.baslangicTarihi;
      this.form.finishDate = item.bitisTarihi;
      this.form.passive = item.pasif;
      this.form.yil = this.$store.state.settings.selectedYearTitle;
      this.$bvModal.show('modal-yearsAndHolidays-add-edit');
    },
    clearForm() {
      this.modalTitle = 'Yeni Resmi Tatil Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false,
        startDate: '',
        finishDate: '',
        resmiTatil: '',
        yilId: null,
        selected:null,
      });
      this.isEditing = false;
    }
  },
  created() {
    this.getHolidaysOfYear(this.$store.state.settings.selectedYear);
  },
  mounted() {
  }
}
</script>
