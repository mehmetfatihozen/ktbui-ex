<template>
  <div>
    <b-modal
        id="modal-edit"
        centered
        title="Kullanıcı Bilgisi Düzenle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        :busy="overlay"
        @ok.prevent="save"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Kullanıcı Bilgisi</label>
            <input type="text" class="form-control" disabled :value="item.adSoyad">
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" :false-value="false" :true-value="true" v-model="item.rolPasif">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">{{ rolAdi }}</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeRoleTypeUserComponent({cmp:'RoleTypeUser',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">Kullanıcılar</th>
        <th class="fit">Personel Tipi</th>
        <th class="fit">Kullanıcı Adı</th>
        <th class="text-nowrap">Bağlı Birim</th>
        <th>Alt Birim</th>
        <th>Birim</th>
        <th class="fit">Ünvan</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right">
          <PlusCircleIcon
              @click.native="changeRoleTypeUserComponent({cmp:'RoleTypeUserDetailSearch',data:{id,rolAdi}})" v-if="!pasif"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-for="(item,index) in $store.state.informationTechnologies.roleTypeUsers" :key="index"
          @click="showEditModal(item)">
        <td class="fit">{{ item.adSoyad }}</td>
        <td class="fit">{{ item.personelTipi }}</td>
        <td class="fit">{{ item.kullaniciAdi }}</td>
        <td>{{ item.bagliBirim }}</td>
        <td>{{ item.altBirim }}</td>
        <td>{{ item.birim }}</td>

        <td class="fit">{{ item.unvan }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" class="text-danger" size="lg" v-if="item.rolPasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary btn-parameter"
                  @click.stop="changeRoleTypeUserComponent({
                  cmp:'RoleTypeUserDetailHistory',
                  data:{
                    id:item.id,
                    nameSurname:item.adSoyad,
                    roleId:id,
                    roleName:rolAdi
                  }})">
            Tarihçe
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

export default {
  props: ['id', 'rolAdi','pasif'],
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      overlay: false,
      item: {}
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general',['showModal']),
    ...mapActions('informationTechnologies', ['roleTypeUserRoleDetailUpdate', 'getRoleTypeUsers', 'changeRoleTypeUserComponent']),
    showEditModal(item) {
      this.item = Object.assign({}, item);
      this.$bvModal.show('modal-edit');
    },
    save() {
      this.overlay = true;
      this.roleTypeUserRoleDetailUpdate(this.item).then((res) => {
        this.overlay = false;
        if (res.hasError){
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        }else{
          this.$bvModal.hide('modal-edit');
          this.showModal({title: 'Başarılı!', message: this.getMessage(19), type: 'success'});
          this.getRoleTypeUsers(this.id);
        }
      }).catch(err=>{
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  created() {
    this.$store.state.informationTechnologies.roleTypeUsers=Object.assign([]);
    this.getRoleTypeUsers(this.id);
  }
}
</script>