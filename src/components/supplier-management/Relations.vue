<template>
  <div>
    <b-modal
        id="modal-edit-update"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="saveModal"
        :busy="showOverlay"
    >
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>İlişki Tipi</label>
            <select class="form-control" v-model="form.relationType"
                    :class="{ 'is-invalid': $v.form.relationType.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in $store.state.parameter.relationTypes" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.relationType.$error">
              <small class="text-danger" v-if="!$v.form.relationType.required">{{ this.getMessage(151) }}</small>
            </template>
          </div>
        </div>
        <div class="col-9">
          <div class="form-group">
            <label>Adı Soyadı</label>
            <input type="text" class="form-control" v-model="form.nameSurname"
                   :class="{ 'is-invalid': $v.form.nameSurname.$error }" :maxlength="nameSurnameMaxLength">
            <template v-if="$v.form.nameSurname.$error">
              <small class="text-danger" v-if="!$v.form.nameSurname.required">{{ this.getMessage(152) }}</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>Cep Tel - 1</label>
            <input type="text" class="form-control"
                   v-mask="'(###) ### ## ##'"
                   maxlength="15"
                   v-model="form.phone">
            <template v-if="$v.form.phone.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.phone.phoneCheck">{{ this.getMessage(246) }}</small>
              </div>
            </template>
            <template v-if="$v.form.phone.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.phone.minLength">{{ this.getMessage(244) }}</small>
              </div>
            </template>
            <template v-if="$v.form.phone.$error || $v.form.phone2.$error || $v.form.workPhone.$error">
              <small class="text-danger" v-if="!$v.form.phone.requiredIf &&
                                               !$v.form.phone2.requiredIf &&
                                               !$v.form.workPhone.requiredIf">{{ this.getMessage(153) }}</small>
            </template>
          </div>
        </div>
        <div class="col-3">
          <div class="form-group">
            <label>Cep Tel - 2</label>
            <input type="text" class="form-control"
                   v-mask="'(###) ### ## ##'"
                   maxlength="15"
                   v-model="form.phone2">
            <template v-if="$v.form.phone2.$error">
              <div class="mb-1">
                <small class="text-danger" v-if="!$v.form.phone2.phoneCheck">{{ this.getMessage(247) }}</small>
              </div>
            </template>
            <template v-if="$v.form.phone2.$error">
              <small class="text-danger" v-if="!$v.form.phone2.minLength">{{ this.getMessage(245) }}</small>
            </template>
          </div>
        </div>
        <div class="col-3">
          <div class="form-group">
            <label>İş Tel</label>
            <input type="text" class="form-control"
                   v-mask="'(###) ### ## ##'"
                   maxlength="15"
                   v-model="form.workPhone">
            <template v-if="$v.form.workPhone.$error">
              <small class="text-danger" v-if="!$v.form.workPhone.minLength">{{ this.getMessage(248) }}</small>
              <small class="text-danger"
                     v-if="!$v.form.workPhone.phoneCheck && $v.form.workPhone.minLength">{{ this.getMessage(141) }}</small>
            </template>
          </div>
        </div>
        <div class="col-3">
          <div class="form-group">
            <label>Dahili</label>
            <input type="text" class="form-control" v-mask="'#####'" v-model="form.internal">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="form.email">
        <template v-if="$v.form.email.$error">
          <small class="text-danger" v-if="!$v.form.email.email">{{ this.getMessage(169) }}</small>
        </template>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete"
        centered
        title="İlişki Sil"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeRelation"
        :busy="showOverlay"
    >
      {{ this.getMessage(154) }}
    </b-modal>
    <b-modal
        id="modal-alert"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Kapat"
        ok-variant="outline-secondary"
        ok-only
        @ok="$bvModal.hide('modal-alert')"
        :busy="showOverlay"
    >
      <p class="my-4 text-center">{{ errorMessage }}</p>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Adı Soyadı</th>
        <th class="fit">İlişki</th>
        <th class="fit">Cep Tel - 1</th>
        <th class="fit">Cep Tel - 2</th>
        <th class="fit">İş Tel</th>
        <th class="fit">Dahili</th>
        <th class="fit">Email</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showAddModal"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in $store.state.supplierManagement.relations"
          :key="index" @click="showEditModal(item)">
        <td>{{ item.adSoyad }}</td>
        <td class="fit">{{ item.iliski }}</td>
        <td class="fit">{{ item.cepTel }}</td>
        <td class="fit">{{ item.digerCepTel }}</td>
        <td class="fit">{{ item.isTel }}</td>
        <td class="fit">{{ item.dahili }}</td>
        <td class="fit">{{ item.email }}</td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(item.id)">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapGetters} from "vuex";
import {required, email, minLength, requiredIf} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      nameSurnameMaxLength: 50,
      errorMessage: '',
      showOverlay: false,
      modalTitle: 'İlgili Kişi Girişi',
      form: {
        supplierId: this.$route.params.id,
        relationType: null,
        nameSurname: '',
        phone: '',
        phone2: '',
        workPhone: '',
        internal: '',
        email: ''
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      relationType: {
        required
      },
      nameSurname: {
        required
      },
      phone: {
        requiredIf: requiredIf(function (form) {
          return form.phone2 === '' && form.workPhone === '';
        }),
        minLength: minLength(15),
        phoneCheck: function (value) {
          if (value !== '') {
            return value.charAt(1) == 5;
          } else
            return true;
        }
      },
      phone2: {
        requiredIf: requiredIf(function (form) {
          return form.phone === '' && form.workPhone === '';
        }),
        minLength: minLength(15),
        phoneCheck: function (value) {
          if (value !== '') {
            return value.charAt(1) == 5;
          } else
            return true;
        }
      },
      workPhone: {
        requiredIf: requiredIf(function (form) {
          return form.phone === '' && form.phone2 === '';
        }),
        minLength: minLength(15),
        phoneCheck: function (value) {
          const char = value.charAt(1);
          if (value !== '') {
            return char != 0 && char != 1 && char != 5;
          } else
            return true;
        }
      },
      email: {
        email
      }
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['getRelations', 'addRelation', 'updateRelation', 'deleteRelation']),
    ...mapActions('parameter', ['getRelationTypes']),
    showDeleteModal(id) {
      this.form.id = id;
      this.$bvModal.show('modal-delete');
    },
    removeRelation() {
      this.showOverlay = true;
      this.deleteRelation(this.form.id).then(() => {
        this.showOverlay = false;
        this.$bvModal.hide('modal-delete');
        this.form.id = null;
      }).catch(err => {
        this.errorMessage = err;
        this.$bvModal.show('modal-alert');
        this.showOverlay = false;
      });
    },
    saveModal() {
      if (this.form.id) {
        this.editRelation();
      } else {
        this.saveRelation();
      }
    },
    showAddModal() {
      this.form = Object.assign({}, {
        supplierId: this.$route.params.id,
        relationType: null,
        nameSurname: '',
        phone: '',
        phone2: '',
        workPhone: '',
        internal: '',
        email: ''
      });
      this.$v.$reset();
      this.modalTitle = 'İlgili Kişi Girişi';
      this.$bvModal.show('modal-edit-update');
    },
    showEditModal(item) {
      this.form = Object.assign({}, {
        id: item.id,
        supplierId: this.$route.params.id,
        relationType: item.iliskiTipId,
        nameSurname: item.adSoyad,
        phone: item.cepTel,
        phone2: item.digerCepTel,
        workPhone: item.isTel,
        internal: item.dahili,
        email: item.email
      });
      this.$v.$reset();
      this.modalTitle = 'İlgili Kişi Güncelle';
      this.$bvModal.show('modal-edit-update');
    },
    saveRelation() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.addRelation(this.form).then(() => {
          this.showOverlay = false;
          this.$bvModal.hide('modal-edit-update');
          this.$v.$reset();
        }).catch(err => {
          this.showOverlay = false;
          this.errorMessage = err;
          this.$bvModal.show('modal-alert');
        })
      }
    },
    editRelation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.showOverlay = true;
        this.updateRelation(this.form).then(() => {
          this.showOverlay = false;
          this.$bvModal.hide('modal-edit-update');
          this.$v.$reset();
        }).catch(err => {
          this.showOverlay = false;
          this.errorMessage = err;
          this.$bvModal.show('modal-alert');
        })
      }
    }
  },
  created() {
    this.getRelationTypes();
    this.getRelations(this.$route.params.id);
  }
}
</script>