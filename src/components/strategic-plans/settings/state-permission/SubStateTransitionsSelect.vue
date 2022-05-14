<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">DURUM : {{ $store.state.spSettings.selectedSubStateTransition.durumAdi }}</h3></div>
      <div class="col-sm-auto text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeStatePermissionCmp('SubStateTransitions')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-card
            header="DURUMA BAĞLI ALT DURUMLAR"
            header-tag="header"
            header-class="font-weight-bold"
            no-body
        >
          <b-list-group flush class="left">
            <b-list-group-item href="#" @click.stop="addToList(item)"
                               v-for="(item,index) in $store.state.spSettings.subStateTransitionsSelect.left"
                               :key="index">
              {{ item.metin }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-sm-auto">
        <img src="@/assets/img/icons/lr_arrow.png" alt="">
      </div>
      <div class="col">
        <b-card
            header="ATANABİLECEK YENİ ALT DURUMLAR"
            header-tag="header"
            header-bg-variant="secondary"
            header-text-variant="light"
            header-class="font-weight-bold"
            border-variant="secondary"
            no-body
        >

          <b-list-group flush class="right">
            <b-list-group-item href="#" @click.stop="deleteFromList(item)"
                               v-for="(item,index) in $store.state.spSettings.subStateTransitionsSelect.right"
                               :key="index">
              {{ item.metin }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </div>
    <button class="btn btn-success mt-4 d-flex align-self-end px-5" @click="save">Kaydet</button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('spSettings', ['changeStatePermissionCmp', 'getSubStateTransitionsSelect', 'saveSubStateTransitionsSelect']),
    addToList(item) {
      const index = this.subStateTransitionsSelect.left.findIndex(i => i.durumAltDurumId === item.durumAltDurumId);
      const i = this.subStateTransitionsSelect.left.splice(index, 1)[0];
      this.subStateTransitionsSelect.right.push(i);
      this.subStateTransitionsSelect.right.sort((a, b) => a.no - b.no);
    },
    deleteFromList(item) {
      const index = this.subStateTransitionsSelect.right.findIndex(i => i.durumAltDurumId === item.durumAltDurumId);
      const i = this.subStateTransitionsSelect.right.splice(index, 1)[0];
      this.subStateTransitionsSelect.left.push(i);
      this.subStateTransitionsSelect.left.sort((a, b) => a.no - b.no);
    },
    save() {
      const list = [];
      this.subStateTransitionsSelect.right.map(i => {
        list.push(i.durumAltDurumId);
      });
      this.$store.state.general.showOverlay = true;
      this.saveSubStateTransitionsSelect({list, id: this.$store.state.spSettings.selectedSubStateTransition.id}).then((res) => {
        this.$store.state.general.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.showModal({
            title: 'Başarılı!',
            message: 'İşlem başarılı şekilde kaydedildi',
            type: 'success',
            textType: 'light'
          });
        }
      }).catch(err => {
        this.$store.state.general.showOverlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      })
    }
  },
  created() {
    this.$store.state.spSettings.subStateTransitionsSelect = Object.assign({});
    this.getSubStateTransitionsSelect(this.$store.state.spSettings.selectedSubStateTransition.id);
  },
  computed: {
    ...mapState('spSettings', ['subStateTransitionsSelect'])
  }
}
</script>