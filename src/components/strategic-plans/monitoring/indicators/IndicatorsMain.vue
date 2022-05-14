<template>
  <div>
    <b-card class="mb-4" bg-variant="light" v-for="(item,index) in monitoringPurposes" :key="index">
      <b-card-title class="text-center">{{ item.amacKisaAd }} {{ item.amacAdi }}
      </b-card-title>
      <b-card-text>
        <table class="table table-hover">
          <tbody>
          <template v-for="(item,index) in item.hedefler">
            <tr :key="index">
              <td>{{ item.hedefKisaAd }} {{ item.hedefAciklama }}
              </td>
              <td class="fit text-right">
                <button class="btn btn-outline-secondary btn-sm"
                        @click="changeMonitoringIndicatorComponent('MonitoringIndicatorDetail')">
                  Gösterge Detayları
                </button>
              </td>
            </tr>
            <tr class="no-hover" :key="'s'+index">
              <td colspan="3" class="py-2 px-0">
                <b-card>
                  <table class="table table-hover">
                    <thead>
                    <tr>
                      <th class="fit">No</th>
                      <th>Performans Göstergeleri</th>
                      <th class="fit">Hesaplama</th>
                      <th class="fit">6 Aylık %</th>
                      <th class="fit">Perf. %</th>
                      <th class="fit">Sorumlu Birim</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in item.gostergeler" :key="index">
                      <td class="fit">
                        {{ item.gostergeKisaAd }}
                      </td>
                      <td>{{ item.gostergeAciklama }}</td>
                      <td class="fit">{{ item.hesaplamaTurAciklama }}</td>
                      <td class="fit text-right">{{ item.altiAylik }}</td>
                      <td class="fit text-right">{{ item.yillik }}</td>
                      <td class="fit">
                        {{ item.birimAdi }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
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
import {mapActions, mapState} from "vuex";

export default {
  components: {},
  data() {
    return {
      activeDetailId: null,
    }
  },
  methods: {
    ...mapActions('sp', ['changeMonitoringIndicatorComponent', 'getMonitoringPurposes'])
  },
  computed: {
    ...mapState('sp', ['monitoringPurposes'])
  }
}
</script>