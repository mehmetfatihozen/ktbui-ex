<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <h4 class="mb-0">PERFORMANS GÖSTERGELERİ DETAY BİLGİLERİ</h4>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary"
                @click="goBack">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Göstergelere Geri Dön
        </button>
      </div>
    </div>
    <b-card class="mb-4" bg-variant="light">
      <b-card-title class="text-center">A.1 Kültür mirasımızın araştırılması, tespit edilmesi, korunması, günümüz
        toplumuna ve gelecek kuşaklara aktarılması
      </b-card-title>
      <b-card-sub-title class="text-center">H.1 Kültür mirasımızın araştırılması, tespit edilmesi, korunması, günümüz
        toplumuna ve
        gelecek kuşaklara aktarılması
      </b-card-sub-title>
      <b-card-text class="mt-4">
        <b-card>
          <div class="row">
            <div class="col-2">
              <div class="form-group">
                <label>Kümülatif Performans</label>
                <input type="text" class="form-control" disabled value="%77">
              </div>
            </div>
            <div class="col-2">
              <div class="form-group">
                <label>Yıllık Performans</label>
                <input type="text" class="form-control" disabled value="%14">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Sorumlu Birim</label>
                <input type="text" class="form-control" disabled value="KÜLTÜR VARLIKLARI VE MÜZELER GENEL MÜDÜRLÜĞÜ">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-10">
              <div class="form-group mb-0">
                <label>Hedefe İlişkin Sapma Nedeni</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-10">
              <textarea rows="5" class="form-control" disabled>
                  Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi; Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                </textarea>
            </div>
            <div class="col d-flex align-items-end">
              <button class="btn btn-secondary btn-block h-100" @click="showNotes">Not Bilgileri</button>
            </div>
          </div>
          <div class="row">
            <div class="col-10">
              <div class="form-group mb-0">
                <label>Hedefe İlişkin Alınacak Önlemler</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-10">
              <textarea rows="5" class="form-control" disabled>

                </textarea>
            </div>
            <div class="col d-flex align-items-end">
              <button class="btn btn-secondary btn-block h-100" @click="showNotes">Not Bilgileri</button>
            </div>
          </div>
        </b-card>
      </b-card-text>
    </b-card>
    <table v-if="!showTabArea" class="table table-hover">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Performans Göstergeleri</th>
        <th class="fit text-center">
          Hesaplama
          <br>
          Türü
        </th>
        <th class="fit text-center">
          Hedefe
          <br>
          Etkisi
        </th>
        <th class="fit text-center">
          Başlangıç
          <br>
          Değeri
        </th>
        <th class="fit text-center">
          İzleme
          <br>
          Dönemi
          <br>
          Yılsonu
          <br>
          Hedefi
        </th>
        <th class="fit text-center">
          2020
          <br>
          Yıllık
          <br>
          Hedefi
        </th>
        <th class="fit text-center">
          2019
          <br>
          Yıllık
          <br>
          Gerçekleşen
        </th>
        <th class="fit text-center">
          İzleme
          <br>
          Dönemi
          <br>
          Gerçekleşme
        </th>
        <th class="fit text-center">
          6
          <br>
          Aylık
          <br>
          Gerçekleşme
        </th>
        <th class="fit text-center">
          Yıllık
          <br>
          Perf.
          <br>
          %
        </th>
        <th class="fit text-center">
          6 Aylık
          <br>
          Perf.
          <br>
          %
        </th>
        <th class="fit text-center">
          Standart
          <br>
          Perf.
          <br>
          %
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="fit" rowspan="6">
          <button class="btn btn-sm btn-outline-secondary" @click="showOtherTabs">PG1.1.1</button>
        </td>
        <td rowspan="6">Tescilli taşınmaz kültür varlıkları restorasyon işi sayısı</td>
        <td class="fit">KÜMÜLATİF</td>
        <td class="fit text-right">%30</td>
        <td class="fit text-right">160</td>
        <td class="fit text-right">510</td>
        <td class="fit text-right">180</td>
        <td class="fit text-right">290</td>
        <td class="fit text-right">310</td>
        <td class="fit text-right">20</td>
        <td class="fit text-right">%43</td>
        <td class="fit text-right">%11</td>
        <td class="fit text-right">%43</td>
      </tr>
      <tr>
        <td colspan="11"><b>Açıklama : </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eum
          illo incidunt libero maxime molestiae nostrum numquam pariatur, possimus, quaerat quisquam, saepe
          voluptatibus? Adipisci dolores dolorum iste non sequi.
        </td>
      </tr>
      <tr>
        <td colspan="11"><b>İlgililik : </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eum
          illo incidunt libero maxime molestiae nostrum numquam pariatur, possimus, quaerat quisquam, saepe
          voluptatibus? Adipisci dolores dolorum iste non sequi.
        </td>
      </tr>
      <tr>
        <td colspan="11"><b>Etkililik : </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eum
          illo incidunt libero maxime molestiae nostrum numquam pariatur, possimus, quaerat quisquam, saepe
          voluptatibus? Adipisci dolores dolorum iste non sequi.
        </td>
      </tr>
      <tr>
        <td colspan="11"><b>Etkinlik : </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eum
          illo incidunt libero maxime molestiae nostrum numquam pariatur, possimus, quaerat quisquam, saepe
          voluptatibus? Adipisci dolores dolorum iste non sequi.
        </td>
      </tr>
      <tr>
        <td colspan="11"><b>Sürdürülebilirlik : </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          doloremque eum illo incidunt libero maxime molestiae nostrum numquam pariatur, possimus, quaerat quisquam,
          saepe voluptatibus? Adipisci dolores dolorum iste non sequi.
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="showTabArea">
      <b-card no-body class="custom" v-if="showNoteArea">
        <b-tabs card nav-class="custom">
          <b-tab title="Hedefe İlişkin Sapma Nedeni" active>
            <b-card-text>
              <div class="row">
                <div class="col">
                  <div class="form-group mb-0">
                    <label class="d-flex justify-content-between">Açıklama <span
                        class="text-secondary"><span
                        :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
                        maxDescriptionLength - form.description.length
                      }}</span></span></label>
                    <textarea rows="5" class="form-control" v-model="form.description"></textarea>
                  </div>
                </div>
                <div class="col-sm-auto d-flex align-items-end">
                  <PlusCircleIcon/>
                </div>
              </div>
              <table class="table table-hover mt-3">
                <thead>
                <tr>
                  <th>Açıklama</th>
                  <th class="fit">Kullanıcı Adı</th>
                  <th class="fit">Kayıt Tarihi</th>
                  <th class="fit"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                    <button class="btn btn-sm btn-outline-secondary">
                      <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                  </td>
                </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-tab>
          <b-tab title="Hedefe İlişkin Alınacak Önlemler">
            <b-card-text>
              <div class="row">
                <div class="col">
                  <div class="form-group mb-0">
                    <label class="d-flex justify-content-between">Açıklama <span
                        class="text-secondary"><span
                        :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
                        maxDescriptionLength - form.description.length
                      }}</span></span></label>
                    <textarea rows="5" class="form-control" v-model="form.description"></textarea>
                  </div>
                </div>
                <div class="col-sm-auto d-flex align-items-end">
                  <PlusCircleIcon/>
                </div>
              </div>
              <table class="table table-hover mt-3">
                <thead>
                <tr>
                  <th>Açıklama</th>
                  <th class="fit">Kullanıcı Adı</th>
                  <th class="fit">Kayıt Tarihi</th>
                  <th class="fit"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                    <button class="btn btn-sm btn-outline-secondary">
                      <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                  </td>
                </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <b-card no-body class="custom" v-if="showOTabs">
        <b-tabs card nav-class="custom" justified>
          <b-tab title="Gerçekleşme Değerleri" active>
            <b-card-text>
              <div class="row">
                <div class="col-2">
                  <div class="form-group mb-0">
                    <label>Gerçekleşme Ayı</label>
                    <select class="form-control">
                      <option :value="null">Seçiniz</option>
                    </select>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-group mb-0">
                    <label>Gerçekleşme Değeri</label>
                    <input type="text" class="form-control">
                  </div>
                </div>
                <div class="col d-flex align-items-end justify-content-end">
                  <PlusCircleIcon/>
                </div>
              </div>
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Gerçekleşme Ayı</th>
                  <th class="fit">Gerçekleşme Değeri</th>
                  <th class="fit">Kullanıcı Adı</th>
                  <th class="fit">Kayıt Tarihi</th>
                  <th class="fit"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>EYLÜL</td>
                  <td class="fit text-right">33</td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                    <button class="btn btn-sm btn-outline-secondary">
                      <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-tab>
          <b-tab title="Açıklamalar">
            <b-card-text>
              <div class="row">
                <div class="col">
                  <div class="form-group mb-0">
                    <label class="d-flex justify-content-between">Açıklama <span
                        class="text-secondary"><span
                        :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
                        maxDescriptionLength - form.description.length
                      }}</span></span></label>
                    <textarea rows="5" class="form-control" v-model="form.description"></textarea>
                  </div>
                </div>
                <div class="col-sm-auto d-flex align-items-end">
                  <PlusCircleIcon/>
                </div>
              </div>
              <table class="table table-hover mt-3">
                <thead>
                <tr>
                  <th>Açıklama</th>
                  <th class="fit">Kullanıcı Adı</th>
                  <th class="fit">Kayıt Tarihi</th>
                  <th class="fit"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                    <button class="btn btn-sm btn-outline-secondary">
                      <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Covid-19 sebebiyle restorasyon amacıyla şehir dışında teknik personel görevlendirilememesi;
                    Taşınmaz Kültür Varlıklarına Yardım Faaliyetleri işlerinin Aralık 2020'ye kadar devam etmesi
                  </td>
                  <td class="fit">necmi.ozben</td>
                  <td class="fit">31.12.2020 12:31</td>
                  <td class="fit">
                  </td>
                </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-tab>
          <b-tab title="İlgililik">
            <b-card-text>
            </b-card-text>
          </b-tab>
          <b-tab title="Etkililik">
            <b-card-text>
            </b-card-text>
          </b-tab>
          <b-tab title="Etkinlik">
            <b-card-text>
            </b-card-text>
          </b-tab>
          <b-tab title="Sürdürülebilirlik">
            <b-card-text>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import PlusCircleIcon from '@/components/PlusCircleIcon';

export default {
  components: {
    PlusCircleIcon
  },
  data() {
    return {
      maxDescriptionLength: 1000,
      showTabArea: false,
      showNoteArea: false,
      showOTabs: false,
      form: {
        description: ''
      }
    }
  },
  methods: {
    ...mapActions('sp', ['changeMonitoringIndicatorComponent']),
    goBack() {
      if (this.showTabArea) {
        this.showTabArea = false;
        this.showNoteArea = false;
        this.showOTabs = false;
      } else {
        this.changeMonitoringIndicatorComponent('MonitoringIndicatorsMain');
      }
    },
    showNotes() {
      this.showOTabs = false;
      this.showNoteArea = true;
      this.showTabArea = true;
    },
    showOtherTabs() {
      this.showNoteArea = false;
      this.showOTabs = true;
      this.showTabArea = true;
    }
  }
}
</script>