<template>
  <div>
    <b-modal
        id="modal-add"
        size="lg"
        centered
        :title="modalTitle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        :busy="overlay"
        @ok.prevent="save"
        @hidden="clear"
    >
      <div class="form-group">
        <label>Performans Göstergesi</label>
        <textarea rows="5" class="form-control" maxlength="500" v-model="form.description"
                  :class="{ 'is-invalid': $v.form.description.$error }"></textarea>
        <template v-if="$v.form.description.$error">
          <small class="text-danger" v-if="!$v.form.description.required">Performans Göstergesi girilmelidir</small>
        </template>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>Gösterge No</label>
            <select class="form-control" :class="{ 'is-invalid': $v.form.indicatorNo.$error }"
                    v-model="form.indicatorNo">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in indicatorShortNames" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <template v-if="$v.form.indicatorNo.$error">
              <small class="text-danger" v-if="!$v.form.indicatorNo.required">Gösterge No seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>Sorumlu Birim</label>
            <select class="form-control" :class="{ 'is-invalid': $v.form.department.$error }" v-model="form.department">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in departments" :key="index">{{
                  item.metin
                }}
              </option>
            </select>
            <template v-if="$v.form.department.$error">
              <small class="text-danger" v-if="!$v.form.department.required">Sorumlu Birim seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="form.passive">
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="modal-delete-indicator"
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
      <p class="my-4 text-center">Gösterge silinecektir, emin misiniz?</p>
    </b-modal>
    <b-card class="mb-4" bg-variant="light" v-for="(item,index) in indicators" :key="index">
      <b-card-title class="text-center">{{ item.amacKisaAd }} {{ item.amacAdi }}</b-card-title>
      <b-card-text>
        <table class="table table-hover">
          <tbody>
          <template v-for="(goal,goalIndex) in item.hedefler">
            <tr :key="goalIndex">
              <td><h5 class="mb-0">{{ goal.hedefKisaAd }} {{ goal.hedefAciklama }}</h5>
              </td>
              <td class="fit text-right">
                <button class="btn btn-outline-secondary btn-sm" @click="showIndicatorDetail(goal)">
                  Gösterge Detayları
                </button>
              </td>
            </tr>
            <tr class="no-hover" :key="'a'+goalIndex">
              <td colspan="2" class="py-2 px-0">
                <b-card>
                  <table class="table table-hover" v-if="!showHistory">
                    <thead>
                    <tr>
                      <th class="fit">No</th>
                      <th>Performans Göstergeleri</th>
                      <th class="fit">Hesaplama</th>
                      <th class="fit">Sorumlu Birim</th>
                      <th class="fit">Pasif</th>
                      <th class="fit text-right">
                        <PlusCircleIcon @click.native="showAddModal(goal)"/>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="cursor-pointer" @click="showEditModal(indicator,goal)"
                        v-for="(indicator,indicatorIndex) in goal.gostergeler" :key="indicatorIndex">
                      <td class="fit">
                        {{ indicator.gostergeKisaAd }}
                      </td>
                      <td>{{ indicator.gostergeAciklama }}</td>
                      <td class="fit">{{ indicator.hesaplamaTurAciklama }}</td>
                      <td class="fit">{{ indicator.birimAdi }}</td>
                      <td class="fit text-center">
                        <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="indicator.pasif"/>
                      </td>
                      <td class="fit">
                        <button class="btn btn-sm btn-outline-secondary mr-2" @click.stop="history(indicator)">
                          Tarihçe
                        </button>
                        <button class="btn btn-sm btn-outline-secondary"
                                @click.stop="showDeleteConfirmModal(indicator.id)">
                          <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <div v-else>
                    <div class="row mb-3">
                      <div class="col d-flex align-items-center">
                        <h4 class="mb-0">TARİHÇE : {{ selectedIndicator.gostergeKisaAd }}
                          {{ selectedIndicator.gostergeAciklama }}</h4>
                      </div>
                      <div class="col d-flex justify-content-end">
                        <button class="btn btn-sm btn-outline-secondary"
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
                        <th>Gösterge</th>
                        <th class="fit">Pasif</th>
                        <th class="fit">Kullanıcı</th>
                        <th class="fit">Kayıt Tarihi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item,index) in indicatorHistories" :key="index">
                        <td class="fit">{{ selectedIndicator.gostergeKisaAd }}</td>
                        <td>{{ item.gostergeAciklama }}</td>
                        <td class="fit">{{ item.pasif }}</td>
                        <td class="fit">{{ item.kullanici }}</td>
                        <td class="fit">{{ item.kayitTarihi }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </td>
            </tr>
          </template>

          </tbody>
        </table>
      </b-card-text>
    </b-card>
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
      showHistory: false,
      overlay: false,
      modalTitle: '',
      selectedItem: {},
      selectedIndicatorId: null,
      selectedIndicator: null,
      activeDetailId: null,
      form: {
        goalId: null,
        id: null,
        description: '',
        indicatorNo: null,
        department: null,
        passive: false
      }
    }
  },
  validations: {
    form: {
      description: {
        required
      },
      indicatorNo: {
        required
      },
      department: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['changeIndicatorComponent', 'getIndicators', 'getDepartments', 'getIndicatorShortNames', 'addIndicator', 'deleteIndicator', 'getIndicatorHistory']),
    showIndicatorDetail(item) {
      this.$store.state.sp.selectedGoal = Object.assign({}, item);
      this.changeIndicatorComponent('IndicatorDetail');
    },
    history(item) {
      this.selectedIndicator = item;
      this.getIndicatorHistory(item.id);
      this.showHistory = true;
    },
    showDeleteConfirmModal(id) {
      this.selectedIndicatorId = id;
      this.$bvModal.show('modal-delete-indicator');
    },
    remove() {
      this.overlay = true;
      this.deleteIndicator(this.selectedIndicatorId).then(res => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$bvModal.hide('modal-delete-indicator');
        }
      }).catch((err) => {
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
        this.overlay = false;
      });
    },
    showAddModal(item) {
      this.selectedItem = item;
      this.form.goalId = item.id;
      this.modalTitle = `HEDEF : ${item.hedefKisaAd} - Yeni Performans Göstergesi Girişi`;
      this.$bvModal.show('modal-add');
      this.getIndicatorShortNames(item.id);
    },
    showEditModal(item, goal) {
      this.selectedItem = goal;
      this.form.goalId = goal.id;
      this.form.id = item.id;
      this.form.description = item.gostergeAciklama;
      this.form.department = item.birimId;
      this.form.passive = item.pasif;
      this.modalTitle = `HEDEF : ${goal.hedefKisaAd} - Performans Göstergesi Düzenle`;
      this.$bvModal.show('modal-add');
      this.getIndicatorShortNames(goal.id).then((res) => {
        this.form.indicatorNo = res.data.find(i => i.id == item.gostergeNo);
      });
    },
    clear() {
      this.$v.$reset();
      this.form = Object.assign({}, {
        goalId: null,
        id: null,
        description: '',
        indicatorNo: null,
        department: null
      });
      this.modalTitle = `HEDEF : ${this.selectedItem.hedefKisaAd} - Yeni Performans Göstergesi Girişi`;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.overlay = true;
        this.addIndicator(this.form).then(res => {
          this.overlay = false;
          if (res.hasError) {
            this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
          } else {
            this.$bvModal.hide('modal-add');
          }
        }).catch((err) => {
          this.showModal({title: 'Hata!', message: err, type: 'danger'});
          this.overlay = false;
        });
      }
    }
  },
  created() {
    this.getIndicators(this.$route.params.id);
  },
  computed: {
    ...mapState('sp', ['indicators', 'departments', 'indicatorShortNames', 'indicatorHistories'])
  }
}
</script>