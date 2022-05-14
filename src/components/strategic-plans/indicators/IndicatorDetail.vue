<template>
  <div>
    <b-modal
        id="modal-pi-detail"
        size="lg"
        centered
        title="Performans Göstergeleri Değerleri"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        @ok.prevent="save"
        :busy="overlay"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Hesaplama Tipi</label>
            <select class="form-control" v-model="selectedItem.hesaplamaTurId"
                    :class="{ 'is-invalid': $v.selectedItem.hesaplamaTurId.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in indicatorDetailForm.hesaplamaTurleri" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.selectedItem.hesaplamaTurId.$error">
              <small class="text-danger" v-if="!$v.selectedItem.hesaplamaTurId.required">Hesaplama Tipi
                seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Hedefe Etkisi %</label>
            <vue-mask
                class="form-control"
                :class="{ 'is-invalid': $v.selectedItem.etki.$error }"
                v-model="selectedItem.etki"
                :raw="false"
                mask="000"
            ></vue-mask>
            <template v-if="$v.selectedItem.etki.$error">
              <small class="text-danger" v-if="!$v.selectedItem.etki.required">Hedefe Etkisi % girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Değerler</label>
            <select class="form-control" v-model="selectedItem.degerId"
                    :class="{ 'is-invalid': $v.selectedItem.degerId.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item.id" v-for="(item,index) in indicatorDetailForm.degerler" :key="index">
                {{ item.metin }}
              </option>
            </select>
            <template v-if="$v.selectedItem.degerId.$error">
              <small class="text-danger" v-if="!$v.selectedItem.degerId.required">Değer seçilmelidir</small>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>Baş. Değeri</label>
            <vue-mask
                class="form-control"
                :class="{ 'is-invalid': $v.selectedItem.baslangicDeger.$error }"
                v-model="selectedItem.baslangicDeger"
                :raw="false"
                mask="000"
                :options="options"
            ></vue-mask>
            <template v-if="$v.selectedItem.baslangicDeger.$error">
              <small class="text-danger" v-if="!$v.selectedItem.baslangicDeger.required">Baş. Değeri
                girilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2" v-for="(item,index) in selectedItem.detayYillar" :key="index">
          <div class="form-group">
            <label>{{ item.yil }}</label>
            <vue-mask
                class="form-control"
                v-model="item.deger"
                :raw="false"
                mask="000"
                :options="options"
            ></vue-mask>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="form-group">
            <label>İzleme Sıklığı</label>
            <select class="form-control" v-model="selectedItem.izlemeSikligi"
                    :class="{ 'is-invalid': $v.selectedItem.izlemeSikligi.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in indicatorDetailForm.izlemeSikligiList" :key="index">
                {{ item }} AY
              </option>
            </select>
            <template v-if="$v.selectedItem.izlemeSikligi.$error">
              <small class="text-danger" v-if="!$v.selectedItem.izlemeSikligi.required">İzleme Sıklığı
                seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-2">
          <div class="form-group">
            <label>Rapor Sıklığı</label>
            <select class="form-control" v-model="selectedItem.raporSikligi"
                    :class="{ 'is-invalid': $v.selectedItem.raporSikligi.$error }">
              <option :value="null">Seçiniz</option>
              <option :value="item" v-for="(item,index) in indicatorDetailForm.raporlamaSikligiList" :key="index">
                {{ item }} AY
              </option>
            </select>
            <template v-if="$v.selectedItem.raporSikligi.$error">
              <small class="text-danger" v-if="!$v.selectedItem.raporSikligi.required">Rapor Sıklığı
                seçilmelidir</small>
            </template>
          </div>
        </div>
        <div class="col-sm-auto">
          <div class="form-group">
            <label class="d-block">Pasif</label>
            <label class="label_switch">
              <input type="checkbox" v-model="selectedItem.pasif">
              <span class="mr-2"></span>
            </label>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <h4 class="mb-0">PERFORMANS GÖSTERGELERİ DETAY BİLGİLERİ</h4>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary"
                @click="changeIndicatorComponent('IndicatorsMain')">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Göstergelere Geri Dön
        </button>
      </div>
    </div>
    <h5 class="mb-0">{{ $store.state.sp.selectedGoal.hedefKisaAd }}
      {{ $store.state.sp.selectedGoal.hedefAciklama }}</h5>
    <hr>
    <table class="table table-hover" v-if="!showHistory">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Performans Göstergeleri</th>
        <th class="fit">Hesaplama</th>
        <th class="fit">Değer</th>
        <th class="fit">Hedefe Etkisi</th>
        <th class="fit">Başlangıç Değeri</th>
        <th class="fit" v-for="(item,index) in indicatorDetailYears" :key="index">{{ item.yil }}</th>
        <th class="fit">İzleme</th>
        <th class="fit">Rapor</th>
        <th class="fit">Pasif</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in indicatorDetail.detaylar" :key="index">
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary w-100" @click="sModal(item)">{{
              item.planGostergeKisaAd
            }}
          </button>
        </td>
        <td>{{ item.planGostergeAdi }}</td>
        <td class="fit">{{ item.hesaplamaTur }}</td>
        <td class="fit">{{ item.deger }}</td>
        <td class="fit text-right">%{{ item.etki }}</td>
        <td class="fit text-right">{{ item.degerId == 12 ? '%' : '' }}{{ item.baslangicDeger }}</td>
        <td class="fit text-right" v-for="(year,index) in item.detayYillar" :key="index">
          {{ item.degerId == 12 ? '%' : '' }}{{ year.deger }}
        </td>
        <td class="fit text-right">{{ item.izlemeSikligi }} AY</td>
        <td class="fit text-right">{{ item.raporSikligi }} AY</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary mr-2" @click="history(item)">
            Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="row mb-3">
        <div class="col d-flex align-items-center">
          <h4 class="mb-0">TARİHÇE : {{ selectedItem.planGostergeKisaAd }} {{ selectedItem.planGostergeAdi }}</h4>
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
          <th>Performans Göstergeleri</th>
          <th class="fit">Hesaplama</th>
          <th class="fit">Değer</th>
          <th class="fit">Hedefe Etkisi</th>
          <th class="fit">Başlangıç Değeri</th>
          <th class="fit" v-for="(item,index) in selectedItem.detayYillar" :key="index">{{ item.yil }}</th>
          <th class="fit">İzleme</th>
          <th class="fit">Rapor</th>
          <th class="fit">Pasif</th>
          <th class="fit">Kullanıcı</th>
          <th class="fit">İşlem Tarihi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.sp.indicatorDetailHistories" :key="index">
          <td class="fit">
            {{item.planGostergeKisaAd}}
          </td>
          <td>{{ item.planGostergeAdi }}</td>
          <td class="fit">{{ item.hesaplamaTur }}</td>
          <td class="fit">{{ item.deger }}</td>
          <td class="fit text-right">%{{ item.etki }}</td>
          <td class="fit text-right">{{ item.degerId == 12 ? '%' : '' }}{{ item.baslangicDeger }}</td>
          <td class="fit text-right" v-for="(year,index) in item.yilTarihceler" :key="index">
            {{ item.degerId == 12 ? '%' : '' }}{{ year.deger }}
          </td>
          <td class="fit text-right">{{ item.izlemeSikligi }} AY</td>
          <td class="fit text-right">{{ item.raporSikligi }} AY</td>
          <td class="fit">
            {{item.pasif}}
          </td>
          <td class="fit">
            {{item.kullanici}}
          </td>
          <td class="fit">
            {{item.kayitTarihi}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  components: {},
  data() {
    return {
      showHistory: false,
      overlay: false,
      selectedItem: {},
      options: {
        onKeyPress: (val, e, field, options) => {
          field.mask(this.maskBehavior.apply({}, arguments), options);
        },
        reverse: true
      }
    }
  },
  validations: {
    selectedItem: {
      hesaplamaTurId: {
        required
      },
      etki: {
        required
      },
      degerId: {
        required
      },
      baslangicDeger: {
        required
      },
      izlemeSikligi: {
        required
      },
      raporSikligi: {
        required
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['changeIndicatorComponent', 'getIndicatorDetail', 'getIndicatorDetailForm', 'getIndicatorDetailYears', 'addIndicatorDetail', 'getIndicatorDetailHistory']),
    history(item) {
      this.$store.state.sp.indicatorDetailHistories=Object.assign([]);
      this.selectedItem = item;
      this.getIndicatorDetailHistory(item.id);
      this.showHistory = true;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.selectedItem.detayYillar.some(s => !s.deger)) {
          this.showModal({title: 'Hata!', message: 'Yıl değerleri boş geçilemez', type: 'danger'});
        } else {
          this.overlay = true;
          this.addIndicatorDetail(this.selectedItem).then(res => {
            this.overlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.$bvModal.hide('modal-pi-detail');
            }
          }).catch((err) => {
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
            this.overlay = false;
          });
        }
      }
    },
    maskBehavior() {
      return this.selectedItem.degerId == '12' ? '000' : '000.000.000.000.000';
    },
    sModal(item) {
      this.$v.$reset();
      this.selectedItem = Object.assign({}, item);
      this.getIndicatorDetailForm(item.planGostergeId);
      this.$bvModal.show('modal-pi-detail');
    }
  },
  created() {
    this.getIndicatorDetailYears(this.$route.params.id);
    this.getIndicatorDetail(this.$store.state.sp.selectedGoal.id);
  },
  computed: {
    ...mapState('sp', ['indicatorDetail', 'indicatorDetailYears', 'indicatorDetailForm']),
  }
}
</script>