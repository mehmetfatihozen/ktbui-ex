<template>
  <div>
    <div class="alert alert-danger" v-if="showAlert">
      {{ errorMessage }}
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>Adı Soyadı</label>
          <input type="text" class="form-control" v-model="form.nameSurname"
                 :class="{ 'is-invalid': $v.form.nameSurname.$error }">
          <template v-if="$v.form.nameSurname.$error">
            <small class="text-danger" v-if="!$v.form.nameSurname.required">{{ this.getMessage(312) }}</small>
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
      <div class="col">
        <div class="form-group">
          <label>Personel Durumu</label>
          <select class="form-control" v-model="form.state">
            <option :value="null">Seçiniz</option>
            <option :value="item.id"
                    v-for="(item,index) in $store.state.informationTechnologies.specialPermissionParameters.personelDurumlari"
                    :key="index">
              {{ item.metin }}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Personel Tipi</label>
          <select class="form-control" v-model="form.type">
            <option :value="null">Seçiniz</option>
            <option :value="item.id"
                    v-for="(item,index) in $store.state.informationTechnologies.specialPermissionParameters.personelTipleri"
                    :key="index">
              {{ item.metin }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-2 col-sm-3 d-flex justify-content-between">
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
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in $store.state.informationTechnologies.specialPermissionUsers"
          :key="index" @click="changeUserSpecialPermissionComponent({cmp:'UserSpecialPermissionDetail',data:item})">
        <td>{{ item.adSoyad }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td class="fit">{{ item.durum }}</td>
        <td class="fit text-right">{{ item.durumTarihi }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {minLength} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      showAlert: false,
      errorMessage: '',
      form: {
        nameSurname: '',
        userName: '',
        registrationNumber: '',
        state: null,
        type: null
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
  methods: {
    ...mapActions('informationTechnologies', ['searchSpecialPermissionUsers', 'getSpecialPermissionParameters', 'changeUserSpecialPermissionComponent', 'setDuplicateForm']),
    clear() {
      this.form = {
        nameSurname: '',
        userName: '',
        registrationNumber: '',
        state: null,
        type: null
      };
      this.$store.state.informationTechnologies.specialPermissionUsers = Object.assign([]);
    },
    list() {
      this.setDuplicateForm(this.form);
      if (!this.form.nameSurname && !this.form.userName && !this.form.registrationNumber && !this.form.state && !this.form.type) {
        this.showAlert = true;
        this.errorMessage = this.getMessage(121);
      } else {
        this.showAlert = false;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.searchSpecialPermissionUsers(this.form).then(res => {
            if ((res.data && res.data.length === 0) || !res.data) {
              this.showAlert = true;
              this.errorMessage = this.getMessage(118);
            }
          });
        }
      }
    }
  },
  created() {
    if (Object.keys(this.duplicateForm).length > 0) {
      this.form = Object.assign({}, this.duplicateForm)
    }
    this.getSpecialPermissionParameters();
  },
  computed: {
    ...mapState('informationTechnologies', ['duplicateForm']),
    ...mapGetters('general',['getMessage'])
  }
}
</script>