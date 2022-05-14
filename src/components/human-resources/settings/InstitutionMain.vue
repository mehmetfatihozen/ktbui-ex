<template>
  <div>
    <b-modal
        id="modal-institution"
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
        <div class="col-8">
          <div class="form-group">
            <label>Üst Birim Adı</label>
            <input type="text" class="form-control"
                   v-model="form.departmentName"
                   :class="{ 'is-invalid': $v.form.departmentName.$error }">
            <template v-if="$v.form.departmentName.$error">
              <small class="text-danger" v-if="!$v.form.departmentName.required">{{ this.getMessage(92) }}</small>
            </template>
          </div>
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>DETSİS No</label>
                <input type="text" class="form-control"
                       v-model="form.detsis"
                       :class="{ 'is-invalid': $v.form.detsis.$error }"
                       v-mask="'##########'"
                >
                <template v-if="$v.form.detsis.$error">
                  <small class="text-danger" v-if="!$v.form.detsis.required">{{ this.getMessage(93) }}</small>
                </template>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Kurum Kodu</label>
                <input type="text" class="form-control"
                       v-model="form.departmentCode"
                       :class="{ 'is-invalid': $v.form.departmentCode.$error }"
                       v-mask="'##########'">
                <template v-if="$v.form.departmentCode.$error">
                  <small class="text-danger" v-if="!$v.form.departmentCode.required">{{ this.getMessage(94) }}</small>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Kategori</label>
                <select class="form-control" v-model="form.categoryId"
                        :class="{ 'is-invalid': $v.form.categoryId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.hrSettings.categoryParameters"
                          :key="index">{{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.categoryId.$error">
                  <small class="text-danger" v-if="!$v.form.categoryId.required">{{ this.getMessage(95) }}</small>
                </template>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Statü</label>
                <select class="form-control" v-model="form.statusId"
                        :class="{ 'is-invalid': $v.form.statusId.$error }">
                  <option :value="null">Seçiniz</option>
                  <option :value="item.id" v-for="(item,index) in $store.state.hrSettings.statusParameters"
                          :key="index">{{ item.metin }}
                  </option>
                </select>
                <template v-if="$v.form.statusId.$error">
                  <small class="text-danger" v-if="!$v.form.statusId.required">{{ this.getMessage(96) }}</small>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Üst Yönetim</th>
        <th class="fit">Kategori</th>
        <th class="fit">Statü</th>
        <th class="fit">K. Kod</th>
        <th class="fit">DETSİS No</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-institution>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.topDepartments" :key="index">
        <td>{{ item.birimAd }}</td>
        <td class="fit">{{ item.kategori }}</td>
        <td class="fit">{{ item.statu }}</td>
        <td class="fit">{{ item.kurumKodu }}</td>
        <td class="fit">{{ item.detsisNo }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter mr-2 btn-sm"
                  @click="linkedDepartments(item)">
            Bağlı Birimler
          </button>
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeInstitutionComponent({cmp:'InstitutionMainHistory',data:item})">
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
      isEditing: false,
      overlay: false,
      modalTitle: 'Yeni Bakanlık Üst Yönetim Girişi',
      form: {
        id: null,
        parentId: null,
        departmentName: '',
        detsis: '',
        departmentCode: '',
        categoryId: null,
        statusId: null,
        passive: false
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      departmentName: {
        required
      },
      detsis: {
        required
      },
      departmentCode: {
        required
      },
      categoryId: {
        required
      },
      statusId: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('hr', ['changeInstitutionComponent']),
    ...mapActions('hrSettings', ['addTopDepartment', 'updateTopDepartment', 'getCategoryParameter', 'getStatusParameter', 'getTopDepartments']),
    linkedDepartments(item) {
      this.changeInstitutionComponent({cmp: 'LinkedInstitutions', data: item});
      this.$store.state.hrSettings.selectedTopDepartment = Object.assign({}, item);
    },
    showEditModal(item) {
      this.modalTitle = 'Bakanlık Üst Yönetim Düzenle';
      this.isEditing = true;
      this.form.id = item.id;
      this.form.departmentName = item.birimAd;
      this.form.detsis = item.detsisNo;
      this.form.departmentCode = item.kurumKodu;
      this.form.categoryId = item.kategoriId;
      this.form.statusId = item.statuId;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-institution');
    },
    clear() {
      this.modalTitle = 'Yeni Bakanlık Üst Yönetim Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        parentId: null,
        departmentName: '',
        detsis: '',
        departmentCode: '',
        categoryId: null,
        statusId: null,
        passive: false
      });
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateTopDepartment(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(56) , type: 'success'});
              this.$bvModal.hide('modal-institution');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          this.addTopDepartment(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
              this.$bvModal.hide('modal-institution');
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
    this.getCategoryParameter();
    this.getStatusParameter();
    this.getTopDepartments(null);
  }
}
</script>