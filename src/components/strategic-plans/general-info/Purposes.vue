<template>
  <div>
    <b-modal
        id="modal-confirm-delete"
        centered
        title="Uyarı"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Vazgeç"
        cancel-variant="outline-secondary"
        @ok.prevent="remove"
        :busy="overlay"
    >
      <p class="my-4 text-center">Amaç silinecektir, emin misiniz?</p>
    </b-modal>
    <h4 class="mb-4">AMAÇLAR</h4>
    <div v-if="!showHistory">
      <div class="row">
        <div class="col-2">
          <div class="form-group mb-0">
            <label>Amaç No</label>
            <select class="form-control" v-model="form.purposeNo" :class="{ 'is-invalid': $v.form.purposeNo.$error }"
                    @change="form.purpose=''">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in purposeShortNames" :key="index">{{ item.metin }}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group mb-0">
            <label>Amaç</label>
            <input type="text" class="form-control" v-model="form.purpose"
                   :class="{ 'is-invalid': $v.form.purpose.$error }"
                   maxlength="500"
            >
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group mb-0">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span></span>
            </label>
          </div>
        </div>
        <div class="col-sm-auto d-flex align-items-end">
          <PlusCircleIcon @click.native="save"/>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <template v-if="$v.form.purposeNo.$error">
            <small class="text-danger" v-if="!$v.form.purposeNo.required">Amaç No seçilmelidir</small>
          </template>
        </div>
        <div class="col">
          <template v-if="$v.form.purpose.$error">
            <small class="text-danger" v-if="!$v.form.purpose.required">Amaç girilmelidir</small>
          </template>
        </div>
      </div>
      <table class="mt-4 table table-hover">
        <thead>
        <tr>
          <th class="fit">No</th>
          <th>Amaç</th>
          <th class="fit">Pasif</th>
          <th class="fit"></th>
        </tr>
        </thead>
        <tbody>
        <tr class="cursor-pointer" @click="populateForm(item)" v-for="(item,index) in purposes" :key="index">
          <td class="fit">{{ item.amacKisaAd }}</td>
          <td>{{ item.amacAdi }}</td>
          <td class="fit text-center">
            <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
          </td>
          <td class="fit">
            <button class="btn btn-sm btn-outline-secondary mr-2" @click="history(item)">
              Tarihçe
            </button>
            <button class="btn btn-sm btn-outline-secondary" @click.stop="selectedId=item.id"
                    v-b-modal.modal-confirm-delete>
              <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="row mb-3">
        <div class="col d-flex align-items-center">
          <h4 class="mb-0">TARİHÇE : {{ selectedItem.amacKisaAd }}</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-outline-secondary"
                  @click="showHistory=false">
            <font-awesome-icon icon="angle-double-left" class="mr-2"/>
            Geri Dön
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th class="fit">No</th>
          <th>Amaç</th>
          <th class="fit">Pasif</th>
          <th class="fit">Kullanıcı</th>
          <th class="fit">Kayıt Tarihi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in purposeHistories" :key="index">
          <td class="fit">{{ selectedItem.amacKisaAd }}</td>
          <td>{{ item.amacAdi }}</td>
          <td class="fit">{{ item.pasif }}</td>
          <td class="fit">{{ item.kullanici }}</td>
          <td class="fit">{{ item.kayitTarihi }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";
import {mapActions, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      overlay: false,
      showHistory: false,
      selectedItem: null,
      selectedId: null,
      form: {
        id: this.$route.params.id,
        purposeNo: null,
        purpose: '',
        passive: false
      }
    }
  },
  validations: {
    form: {
      purposeNo: {
        required
      },
      purpose: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['getPurposeShortNames', 'getPurposes', 'addPurpose', 'removePurpose', 'getPurposeHistory','getGoals']),
    populateForm(item) {
      const find = this.purposeShortNames.find(i => i.id == item.amacNo);
      this.form = Object.assign({}, {
        id: this.$route.params.id,
        purposeNo: find,
        purpose: item.amacAdi,
        passive: item.pasif
      })
    },
    history(item) {
      this.$store.state.sp.purposeHistories = Object.assign([]);
      this.selectedItem = item;
      this.getPurposeHistory(item.id);
      this.showHistory = true;
    },
    remove() {
      this.overlay = true;
      this.removePurpose(this.selectedId).then(res => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-confirm-delete');
          this.getPurposeShortNames(this.$route.params.id);
          this.getGoals(this.$route.params.id);
        }
      }).catch((err) => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.overlay = false;
      });
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.state.general.showOverlay = true;
        this.addPurpose(this.form).then(res => {
          this.$store.state.general.showOverlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.form = Object.assign({}, {
              id: this.$route.params.id,
              purposeNo: null,
              purpose: '',
              passive: false
            });
            this.$v.$reset();
            this.getPurposeShortNames(this.$route.params.id);
            this.getGoals(this.$route.params.id);
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.$store.state.general.showOverlay = false;
        });
      }
    }
  },
  created() {
    this.getPurposes(this.$route.params.id);
    this.getPurposeShortNames(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['purposeShortNames', 'purposes', 'purposeHistories'])
  }
}
</script>