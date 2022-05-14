<template>
  <div class="d-flex flex-column">
    <b-modal
        id="modal-success"
        centered
        title="Başarılı"
        ok-title="Kapat"
        ok-variant="danger"
        header-bg-variant="success"
        header-text-variant="light"
        ok-only
    >
      İşlem başarıyla kaydedildi.
    </b-modal>
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">SLA : {{ metin }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeTopicComponent({cmp:'Topics',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="alert alert-danger" v-if="showError">
      {{ errorMessage }}
    </div>
    <div class="row">
      <div class="col-2">
        <div class="form-group mb-0">
          <label>SLA (Saat)</label>
          <input type="number" class="form-control" v-model="sla" :class="{ 'is-invalid': $v.sla.$error }">
        </div>
      </div>
      <div class="col-sm-auto d-flex align-items-end">
        <button class="btn btn-success" @click="save">Kaydet</button>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <template v-if="$v.sla.$error">
          <small class="text-danger" v-if="!$v.sla.required">{{ this.getMessage(21) }}</small>
        </template>
      </div>
    </div>
    <table class="table table-hover mt-4">
      <thead>
      <tr>
        <th class="fit">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="selectAll" @change="selectAllChanged"
                   v-model="selectAll">
            <label class="custom-control-label" for="selectAll"></label>
          </div>
        </th>
        <th>Başvuru Detayları</th>
        <th class="fit">SLA (Saat)</th>
        <th class="fit">Pasif</th>
        <th class="fit text-right"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in $store.state.applicationSettings.slaList" :key="index">
        <td class="fit">
          <div class="custom-control custom-checkbox" v-if="!item.pasif">
            <input type="checkbox" class="custom-control-input" v-model="item.checked" @change="cbChanged(item)"
                   :id="item.id">
            <label class="custom-control-label" :for="item.id"></label>
          </div>
        </td>
        <td>{{ item.detay }}</td>
        <td class="fit">{{ item.sla }}</td>
        <td class="fit text-center">
          <font-awesome-icon icon="check" size="lg" class="text-danger" v-if="item.pasif"/>
        </td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary"
                  @click.stop="changeTopicComponent({cmp:'SlaHistory',data:{id,metin,historyId:item.id,history:item.detay}})">
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
import {required} from "vuelidate/lib/validators";

export default {
  props: ['id', 'metin'],
  components: {},
  data() {
    return {
      showError: false,
      errorMessage: 'Listeden seçim yapmalısınız',
      selectAll: false,
      sla: '',
    }
  },
  validations: {
    sla: {
      required
    }
  },
  computed:{
    ...mapGetters('general',['getMessage'])
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('applicationSettings', ['addSla', 'changeTopicComponent', 'getSlaList']),
    selectAllChanged() {
      this.$store.state.applicationSettings.slaList.map(i => {
        this.$set(i, 'checked', this.selectAll);
      });
    },
    cbChanged() {
      if (this.$store.state.applicationSettings.slaList.some(s => !s.checked)) {
        this.selectAll = false;
      } else {
        this.selectAll = true;
      }
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const ids = [];
        this.$store.state.applicationSettings.slaList.map(i => {
          if (i.checked) {
            ids.push(i.id);
          }
        });
        if (ids.length === 0) {
          this.showError = true;
        } else {
          this.showError = false;
          this.$store.state.general.showOverlay = true;
          this.addSla({
            ids,
            topicId: this.id,
            sla: this.sla
          }).then((res) => {
            this.$store.state.general.showOverlay = false;
            if (res.hasError) {
              this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
            } else {
              this.selectAll = false;
              this.sla = '';
              this.$v.$reset();
            }
          }).catch(err => {
            this.$store.state.general.showOverlay = false;
            this.showModal({title: 'Hata!', message: err, type: 'danger'});
          });
        }
      }
    }
  },
  created() {
    this.getSlaList(this.id);
  },
  watch: {}
}
</script>