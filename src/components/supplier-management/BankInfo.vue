<template>
  <div>
    <b-modal
        id="modal-add"
        size="lg"
        centered
        :title= "modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="saveBank"
    >
      <div class="form-group">
        <label>Banka Adı</label>
        <select class="form-control" v-model="form.bankId" :class="{ 'is-invalid': $v.form.bankId.$error }">
          <option :value="null">Seçiniz</option>
          <option :value="item.id" v-for="(item,index) in $store.state.supplierManagement.bankParameters.bankalar"
                  :key="index">
            {{ item.metin }}
          </option>
        </select>
        <template v-if="$v.form.bankId.$error">
          <small class="text-danger" v-if="!$v.form.bankId.required">{{ this.getMessage(115) }}</small>
        </template>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="form-group">
            <label>Döviz Cinsi</label>
            <select class="form-control" v-model="form.exchangeId" :class="{ 'is-invalid': $v.form.exchangeId.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id"
                      v-for="(item,index) in $store.state.supplierManagement.bankParameters.dovizCinsleri"
                      :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.form.exchangeId.$error">
              <small class="text-danger" v-if="!$v.form.exchangeId.required">{{ this.getMessage(156) }}</small>
            </template>
          </div>
        </div>
        <div class="col-9">
          <div class="form-group">
            <label>IBAN No</label>
            <input type="text" class="form-control" placeholder="TR" v-mask="'TR## #### #### #### #### ##'"
                   v-model="form.iban" :class="{ 'is-invalid': $v.form.iban.$error }">
            <template v-if="$v.form.iban.$error">
              <small class="text-danger" v-if="!$v.form.iban.required">{{ this.getMessage(157) }}</small>
              <small class="text-danger" v-if="!$v.form.iban.minLength">{{ this.getMessage(158) }}</small>
            </template>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete"
        centered
        title="Banka Sil"
        ok-title="Sil"
        ok-variant="danger"
        header-bg-variant="danger"
        header-text-variant="white"
        cancel-title="İptal"
        cancel-variant="outline-secondary"
        @ok.prevent="remove"
        :busy="overlay"
    >
      <p>Banka bilgisi silinecektir, emin misiniz?</p>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Banka Adı</th>
        <th class="fit">Döviz Tipi</th>
        <th class="fit">IBAN No</th>
        <th class="fit text-right">
          <PlusCircleIcon @click.native="showAddModal"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer" v-b-modal.modal-add v-for="(item,index) in $store.state.supplierManagement.banks"
          :key="index" @click="showUpdateModal(item)">
        <td>{{ item.bankaAdi }}</td>
        <td class="fit">{{ item.dovizTipi }}</td>
        <td class="fit">{{ item.iban }}</td>
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
import {required, minLength} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      overlay: false,
      modalTitle: 'Banka Bilgisi Girişi',
      form: {
        id: null,
        supplierId: this.$route.params.id,
        bankId: null,
        exchangeId: null,
        iban: ''
      }
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  validations: {
    form: {
      bankId: {
        required
      },
      exchangeId: {
        required
      },
      iban: {
        required,
        minLength: minLength(27)
      }
    }
  },
  methods: {
    ...mapActions('supplierManagement', ['addBank', 'updateBank', 'getBanks', 'deleteBank', 'getBankParameters']),
    showAddModal(){
      this.form = Object.assign({}, {
        id: null,
        supplierId: this.$route.params.id,
        bankId: null,
        exchangeId: null,
        iban: ''
      });
      this.$v.$reset();
      this.modalTitle = 'Banka Bilgisi Girişi';
      this.$bvModal.show('modal-add');
    },
    showUpdateModal(item){
      this.form = Object.assign({}, {
        id: item.id,
        supplierId: this.$route.params.id,
        bankId: item.bankaId,
        exchangeId: item.dovizCinsiId,
        iban: item.iban
      });
      this.$v.$reset();
      this.modalTitle = 'Banka Bilgisi Güncelle';
      this.$bvModal.show('modal-add');
    },
    showDeleteModal(id) {
      this.form.id = id;
      this.$bvModal.show('modal-delete');
    },
    remove() {
      this.overlay = true;
      this.deleteBank(this.form.id).then(() => {
        this.overlay = false;
        this.$bvModal.hide('modal-delete');
      }).catch(err => {
        this.overlay = false;
        alert(err);
      })
    },
    saveBank() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        if (this.form.id) {
          this.updateBank(this.form).then(() => {
            this.$bvModal.hide('modal-add');
          }).catch(err => {
            alert(err);
          });
        } else {
          console.log(this.form);
          this.addBank(this.form).then(() => {
            this.$bvModal.hide('modal-add');
          }).catch(err => {
            alert(err);
          });
        }
        this.overlay = false;
      }
    }
  },
  created() {
    this.getBanks(this.$route.params.id);
    this.getBankParameters();
  }
}
</script>