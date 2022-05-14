<template>
  <div>
    <b-modal
        id="modal-linked-institution"
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
            <label>Üst Yönetim Birim Adı</label>
            <input type="text" class="form-control" disabled
                   :value="$store.state.hrSettings.selectedTopDepartment.birimAd">
          </div>
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>DETSİS No</label>
                <input type="text" class="form-control" disabled
                       :value="$store.state.hrSettings.selectedTopDepartment.detsisNo">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Kurum Kodu</label>
                <input type="text" class="form-control" disabled
                       :value="$store.state.hrSettings.selectedTopDepartment.kurumKodu">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="form-group">
            <label>Bağlı Birim Adı</label>
            <input type="text" class="form-control"
                   v-model="form.departmentName"
                   :class="{ 'is-invalid': $v.form.departmentName.$error }">
            <template v-if="$v.form.departmentName.$error">
              <small class="text-danger" v-if="!$v.form.departmentName.required">Bağlı Birim Adı girilmelidir</small>
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
                       v-mask="'##########'">
                <template v-if="$v.form.detsis.$error">
                  <small class="text-danger" v-if="!$v.form.detsis.required">DETSİS No girilmelidir</small>
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
                  <small class="text-danger" v-if="!$v.form.departmentCode.required">Kurum Kodu girilmelidir</small>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Kısa Ad</label>
            <input type="text" class="form-control"
                   v-model="form.shortName"
                   :class="{ 'is-invalid': $v.form.shortName.$error }">
            <template v-if="$v.form.shortName.$error">
              <small class="text-danger" v-if="!$v.form.shortName.required">Kısa Ad girilmelidir</small>
            </template>
          </div>
        </div>
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
              <small class="text-danger" v-if="!$v.form.categoryId.required">Kategori seçilmelidir</small>
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
              <small class="text-danger" v-if="!$v.form.statusId.required">Statü seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
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
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Bağlı Birimler : {{
          $store.state.hrSettings.selectedTopDepartment.birimAd
        }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeInstitutionComponent({cmp:'InstitutionMain',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Bağlı Birim / Kurumlar</th>
        <th class="fit">Kısa Adı</th>
        <th class="fit">Kategori</th>
        <th class="fit">Statü</th>
        <th class="fit">K. Kod</th>
        <th class="fit">DETSİS No</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" v-b-modal.modal-linked-institution>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.linkedDepartments" :key="index">
        <td>{{ item.birimAd }}</td>
        <td class="fit">{{ item.kisaAd }}</td>
        <td class="fit">{{ item.kategori }}</td>
        <td class="fit">{{ item.statu }}</td>
        <td class="fit">{{ item.kurumKodu }}</td>
        <td class="fit">{{ item.detsisNo }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-outline-secondary btn-parameter mr-2 btn-sm"
                  @click="titles(item)">
            Unvanlar
          </button>
          <button class="btn btn-outline-secondary btn-parameter mr-2 btn-sm"
                  @click="subDepartments(item)">
            Alt Birimler
          </button>
          <button class="btn btn-outline-secondary btn-parameter btn-sm"
                  @click="changeInstitutionComponent({cmp:'LinkedInstitutionsHistory',data:{...item}})">
            Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      overlay: false,
      modalTitle: 'Yeni Bağlı Birim Girişi',
      form: {
        id: null,
        parentId: this.$store.state.hrSettings.selectedTopDepartment.id,
        departmentName: '',
        detsis: '',
        departmentCode: '',
        shortName: '',
        categoryId: null,
        statusId: null,
        passive: false
      }
    }
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
      shortName: {
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
    ...mapActions('hrSettings', ['getLinkedDepartments', 'addLinkedDepartment', 'updateLinkedDepartment']),
    subDepartments(item) {
      this.changeInstitutionComponent({cmp: 'SubInstitutions', data: {...item}});
      this.$store.state.hrSettings.selectedLinkedDepartment = Object.assign({}, item);
    },
    titles(item) {
      this.changeInstitutionComponent({cmp: 'LinkedTitles', data: {...item}});
      this.$store.state.hrSettings.selectedLinkedDepartment = Object.assign({}, item);
    },
    showEditModal(item) {
      this.modalTitle = 'Bağlı Birim Düzenle';
      this.isEditing = true;
      this.form.id = item.id;
      this.form.departmentName = item.birimAd;
      this.form.detsis = item.detsisNo;
      this.form.departmentCode = item.kurumKodu;
      this.form.shortName = item.kisaAd;
      this.form.categoryId = item.kategoriId;
      this.form.statusId = item.statuId;
      this.form.passive = item.pasif;
      this.$bvModal.show('modal-linked-institution');
    },
    clear() {
      this.modalTitle = 'Yeni Bağlı Birim Girişi';
      this.isEditing = false;
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        parentId: this.$store.state.hrSettings.selectedTopDepartment.id,
        departmentName: '',
        detsis: '',
        departmentCode: '',
        shortName: '',
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
          this.updateLinkedDepartment(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-linked-institution');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        } else {
          this.addLinkedDepartment(this.form).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: 'İşlem başarılı şekilde kaydedilmiştir.', type: 'success'});
              this.$bvModal.hide('modal-linked-institution');
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
    this.getLinkedDepartments(this.$store.state.hrSettings.selectedTopDepartment.id);
  }
}
</script>