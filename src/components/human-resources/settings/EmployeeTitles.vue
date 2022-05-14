<template>
  <div>
    <b-modal
        id="modal-title-add-edit"
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
      <div class="form-group">
        <label>Unvan</label>
        <input type="text" class="form-control" v-model="form.title"
               :class="{ 'is-invalid': $v.form.title.$error }">
        <template v-if="$v.form.title.$error">
          <small class="text-danger" v-if="!$v.form.title.required">{{ this.getMessage(105) }}</small>
        </template>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Görev Kodu</label>
            <input type="text" class="form-control" v-model="form.taskCode"
                   :class="{ 'is-invalid': $v.form.taskCode.$error }"
                   maxlength="15"
            >
            <template v-if="$v.form.taskCode.$error">
              <small class="text-danger" v-if="!$v.form.taskCode.required">{{ this.getMessage(106) }}</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Hitap Kodu</label>
            <input type="text" class="form-control" v-model="form.appealCode"
                   :class="{ 'is-invalid': $v.form.appealCode.$error }"
                   v-mask="'##########'"
            >
            <template v-if="$v.form.appealCode.$error">
              <small class="text-danger" v-if="!$v.form.appealCode.required">{{ this.getMessage(107) }}</small>
            </template>
          </div>
        </div>

        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="form.passive">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-0">
          <label>Unvanlarda Ara</label>
          <input type="text" class="form-control" v-model="searchText">
        </div>
      </div>
      <div class="col d-flex align-items-end">
        <button class="btn btn-outline-secondary" @click="searchText=''">Temizle</button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Unvanlar</th>
        <th class="fit">Hitap Kodu</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon v-b-modal.modal-title-add-edit/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" @click="showEditModal(item)"
          v-for="(item,index) in $store.state.hrSettings.titles" :key="index">
        <td>{{ item.unvanAdi }}</td>
        <td class="fit">{{ item.hitapKodu }}</td>
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
import {mapActions, mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";
import PlusCircleIcon from "@/components/PlusCircleIcon";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      searchText: '',
      modalTitle: 'Yeni Unvan Girişi',
      isEditing: false,
      overlay: false,
      form: {
        id: null,
        title: '',
        taskCode: '',
        appealCode: '',
        passive: false,
        searchText:'',
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      title: {
        required
      },
      taskCode: {
        required
      },
      appealCode: {
        required
      },
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hrSettings', ['updateTitle', 'addTitle', 'searchTitles']),
    search() {
      if (this.searchText.length >= 2) {
        this.searchTitles(this.searchText);
      } else {
        this.$store.state.hrSettings.titles = Object.assign([]);
      }
    },
    clear() {
      this.modalTitle = 'Yeni Unvan Girişi';
      this.$v.$reset();
      this.form = Object.assign({}, {
        id: null,
        parameterTypeId: 10,
        title: '',
        taskCode: '',
        appealCode: '',
        passive: false,
        searchText:''
      });
      this.isEditing = false;
    },
    showEditModal(item) {
      this.modalTitle = 'Unvan Düzenle'
      this.isEditing = true;
      this.form.id = item.id;
      this.form.title = item.unvanAdi;
      this.form.taskCode = item.gorevKodu;
      this.form.appealCode = item.hitapKodu;
      this.form.passive = item.pasif;
      this.form.searchText = this.searchText;
      this.$bvModal.show('modal-title-add-edit');
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.isEditing) {
          this.updateTitle(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(56), type: 'success'});
              this.$bvModal.hide('modal-title-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        } else {
          this.addTitle(this.form).then((res) => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
              this.$bvModal.hide('modal-title-add-edit');
            }
          }).catch(err => {
            this.overlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          })
        }
      }
    }
  },
  created() {
  },
  watch: {
    searchText() {
      this.search();
    }
  }
}
</script>