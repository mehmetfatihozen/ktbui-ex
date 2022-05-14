<template>
  <div>
    <b-modal
        id="modal-role-type-user-success"
        centered
        title="Başarılı"
        ok-variant="success"
        ok-title="Kapat"
        header-bg-variant="success"
        header-text-variant="light"
        ok-only
        @hidden="goBack"
    >
      {{ this.getMessage(19) }}
    </b-modal>
    <b-modal
        id="modal-role-type-user-confirm"
        centered
        title="Uyarı"
        ok-variant="success"
        ok-title="Kaydet"
        cancel-title="Vazgeç"
        header-bg-variant="warning"
        header-text-variant="light"
        @ok="save"
    >
      Seçilen kullanıcılar mevcut rolünden çıkarılarak <b>{{ rolAdi }}</b> rolüne eklenecektir. Emin misiniz?
    </b-modal>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">{{ rolAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypeUserComponent({cmp:'RoleTypeUserDetail',data:{id,rolAdi}})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="alert alert-danger" v-if="showError">
      {{ errorMessage }}
    </div>
    <div class="row mb-4">
      <div class="col-4">
        <div class="form-group mb-0">
          <label>Adı Soyad</label>
          <input type="text" class="form-control" v-model.trim="form.nameSurname"
                 :class="{ 'is-invalid': $v.form.nameSurname.$error }">
          <template v-if="$v.form.nameSurname.$error">
            <p class="text-danger" v-if="!$v.form.nameSurname.minLength">{{ this.getMessage(312) }}</p>
          </template>
        </div>
      </div>
      <div class="col-2">
        <div class="form-group mb-0">
          <label>Kullanıcı Adı</label>
          <input type="text" class="form-control" v-model.trim="form.userName">
        </div>
      </div>
      <div class="col-2">
        <div class="form-group mb-0">
          <label>TC Kimlik No</label>
          <input type="text" class="form-control" v-model.trim="form.identityNumber">
        </div>
      </div>
      <div class="col-4 d-flex align-items-end justify-content-between">
        <button class="btn btn-outline-danger btn-block mr-2" @click="clear">Temizle</button>
        <button class="btn btn-outline-primary btn-block mr-2" @click="list">Listele</button>
        <button class="btn btn-success btn-block" @click="saveConfirm">Kaydet</button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">
          <b-form-checkbox v-model="selectAll"></b-form-checkbox>
        </th>
        <th class="fit">Kullanıcılar</th>
        <th class="fit">Personel Tipi</th>
        <th class="fit">Kullanıcı Adı</th>
        <th>Bağlı Birim</th>
        <th>Alt Birim</th>
        <th>Birim</th>
        <th class="fit">Ünvan</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in roleTypeUserSearchList" :key="index">
        <td class="fit">
          <b-form-checkbox v-model="item.checked" @change="customChange(item)"
                           v-if="item.durum==='1'"></b-form-checkbox>
        </td>
        <td class="fit">{{ item.adSoyad }}</td>
        <td class="fit">{{ item.personelTipi }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td>{{ item.bagliBirim }}</td>
        <td>{{ item.altBirim }}</td>
        <td>{{ item.birim }}</td>
        <td class="fit">{{ item.unvan }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {minLength} from "vuelidate/lib/validators";

export default {
  props: ['id', 'rolAdi'],
  components: {},
  data() {
    return {
      cbChanged: false,
      showError: false,
      errorMessage: '',
      form: {
        id: this.id,
        nameSurname: '',
        userName: '',
        identityNumber: ''
      },
      selectAll: false,
      roleTypeUserSearchList: [],
      selectedList: []
    }
  },
  validations: {
    form: {
      nameSurname: {
        minLength: minLength(2)
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['saveSelectedUserRoles', 'searchRoleTypeUser', 'changeRoleTypeUserComponent']),
    customChange(item) {
      this.cbChanged = true;
      item.checked = !item.checked;
      if (this.roleTypeUserSearchList.some(val => !val.checked)) {
        this.selectAll = false;
      } else {
        this.selectAll = true;
      }
    },
    list() {
      if (this.form.nameSurname == '' && this.form.userName == '' && this.form.identityNumber == '') {
        this.showError = true;
        this.errorMessage = 'En az bir kriter girilmelidir';
      } else {
        this.showError = false;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.searchRoleTypeUser(this.form).then(res => {
            this.roleTypeUserSearchList = Object.assign([], res.data);
            if (res.data.length === 0) {
              this.showError = true;
              this.errorMessage = this.getMessage(118);
            } else {
              this.showError = false;
            }
          });
        }
      }
    },
    goBack() {
      this.changeRoleTypeUserComponent({cmp: 'RoleTypeUserDetail', data: {id: this.id, rolAdi: this.rolAdi}});
    },
    clear() {
      this.form = {
        id: this.id,
        nameSurname: '',
        userName: '',
        identityNumber: ''
      }
      this.roleTypeUserSearchList = Object.assign([]);
      this.roleTypeUserSearchList.map(item => {
        this.$set(item, 'checked', false);
      });
    },
    saveConfirm() {
      this.selectedList = [];
      this.roleTypeUserSearchList.forEach(item => {
        if (item.checked) {
          this.selectedList.push(item.id);
        }
      });
      if (this.selectedList.length === 0) {
        this.showError = true;
        this.errorMessage = 'En az bir personel seçilmelidir';
      } else {
        this.$bvModal.show('modal-role-type-user-confirm');
      }
    },
    save() {
      this.showError = false;
      this.$store.state.general.showOverlay = true;
      this.$bvModal.hide('modal-role-type-user-confirm');
      this.saveSelectedUserRoles({id: this.id, list: this.selectedList}).then((res) => {
        this.$store.state.general.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.show('modal-role-type-user-success');
          this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
        }
      }).catch(err => {
        this.$store.state.general.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  created() {
    this.clear();
  },
  computed: {
    ...mapGetters('general',['getMessage'])
  },
  watch: {
    selectAll(nw) {
      if (nw) {
        this.cbChanged = false;
        this.roleTypeUserSearchList.map(item => {
          this.$set(item, 'checked', true);
        });
      } else {
        if (!this.cbChanged) {
          this.roleTypeUserSearchList.map(item => {
            this.$set(item, 'checked', false);
          });
        }
      }
    }
  }
}
</script>