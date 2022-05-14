<template>
  <div>
    <b-modal
        id="modal-institution-category"
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
        <div class="col">
          <div class="form-group">
            <label>Kategori Adı</label>
            <input type="text" class="form-control" v-model="form.title"
                   :class="{ 'is-invalid': $v.form.title.$error }">
            <template v-if="$v.form.title.$error">
              <small class="text-danger" v-if="!$v.form.title.required">{{ this.getMessage(99) }}</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox"  v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Kategoriler</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-institution-category>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)" v-for="(item,index) in $store.state.hrSettings.departmentCategories" :key="index">
        <td>{{ item.kategoriAdi }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeInstitutionCategoryComponent({cmp:'InstitutionCategoriesMainHistory',data:item})">
            Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      overlay: false,
      modalTitle: 'Yeni Kategori Girişi',
      isEditing: false,
      form: {
        id: null,
        title: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['changeInstitutionCategoryComponent']),
    ...mapActions('hrSettings', ['getDepartmentCategories', 'addDepartmentCategory', 'updateDepartmentCategory']),
    showEditModal(item) {
      this.isEditing = true;
      this.modalTitle = 'Kategori Düzenle';
      this.form.id = item.id;
      this.form.title = item.kategoriAdi;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-institution-category');
    },
    clear() {
      this.modalTitle = 'Yeni Kategori Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        title: '',
        passive: false
      });
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateDepartmentCategory(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(56), type: 'success'});
              this.$bvModal.hide('modal-institution-category');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          this.addDepartmentCategory(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
              this.$bvModal.hide('modal-institution-category');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        }
      }
    }
  },
  created() {
    this.getDepartmentCategories();
  }
}
</script>