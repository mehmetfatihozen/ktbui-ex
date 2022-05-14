<template>
  <div>
    <div class="alert alert-danger" v-if="showError">
      {{ errorMessage }}
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>Adı Soyadı</label>
          <input type="text" class="form-control" v-model="form.nameSurname"
                 :class="{ 'is-invalid': $v.form.nameSurname.$error }">
          <template v-if="$v.form.nameSurname.$error">
            <p class="text-danger" v-if="!$v.form.nameSurname.minLength">{{ this.getMessage(312) }}</p>
          </template>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Kullanıcı Adı</label>
          <input type="text" class="form-control" v-model="form.userName">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Sicil No</label>
          <input type="text" class="form-control" v-model="form.registrationNumber">
        </div>
      </div>
      <div class="col-3 d-flex  align-self-end d-flex mb-3">
        <button class="btn btn-outline-secondary mt-0 mr-2 btn-block" @click="clear">Temizle</button>
        <button class="btn btn-secondary mt-0 btn-block" @click="list">Listele</button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th>Adı Soyadı</th>
        <th class="fit">Kullanıcı Adı</th>
        <th class="fit">Personel Durumu</th>
        <th class="fit">Durum Tarihi</th>
        <th class="fit">Giriş</th>
        <th class="fit">Bloke</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.informationTechnologies.systemLoginEmployeeList"
          :key="index">
        <td>
          {{ item.adSoyad }}
        </td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td class="fit">{{ item.durum }}</td>
        <td class="fit">{{ item.durumTarihi }}</td>
        <td class="fit text-center">
          <b-form-checkbox v-model="item.giris" @change="changeUserLogin(item)" v-if="!item.cikis"></b-form-checkbox>
        </td>
        <td class="fit text-center">
          <b-form-checkbox v-model="item.bloke" @change="userBlocked(item)" v-if="!item.cikis"></b-form-checkbox>
        </td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary btn-parameter"
                  @click.stop="changeSystemLoginPermissionComponent({cmp:'SystemLoginPermissionHistory',data:item})">
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
import {minLength} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      showError: false,
      errorMessage: '',
      form: {
        nameSurname: '',
        userName: '',
        registrationNumber: ''
      }
    }
  },
  validations: {
    form: {
      nameSurname: {
        minLength: minLength(2)
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('informationTechnologies', ['loginPermission', 'blockUser', 'systemLoginEmployeeSearch', 'changeSystemLoginPermissionComponent']),
    list() {
      if (!this.form.nameSurname && !this.form.userName && !this.form.registrationNumber) {
        this.showError = true;
        this.errorMessage = 'En az bir kriter girilmelidir';
      } else {
        this.showError = false;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.systemLoginEmployeeSearch(this.form).then(res => {
            if (res.data.length === 0) {
              this.errorMessage = this.getMessage(118);
              this.showError = true;
            } else {
              this.showError = false;
            }
          });
        }
      }
    },
    clear() {
      this.showListError = false;
      this.form = {
        nameSurname: '',
        userName: '',
        registrationNumber: ''
      }
      this.$store.state.informationTechnologies.systemLoginEmployeeList = Object.assign([]);
    },
    userBlocked(item) {
      this.blockUser({
        id: item.id,
        blocked: !item.bloke
      }).then(res => {
        if (res.data.hasError) {
          this.showModal({title: 'Hata!', message: res.data.errorMessage, type: 'danger'});
        } else {
          this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
        }
      }).catch(err => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    changeUserLogin(item) {
      this.loginPermission({
        id: item.id,
        login: !item.giris
      }).then(res => {
        if (res.data.hasError) {
          this.showModal({title: 'Hata!', message: res.data.errorMessage, type: 'danger'});
        } else {
          this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
        }
      }).catch(err => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  }
}
</script>