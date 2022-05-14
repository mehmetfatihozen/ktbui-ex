<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">DURUM : {{ $store.state.budgetManagement.selectedSubState }}</h3></div>
      <div class="col-sm-auto text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeAnnualBudgetStateTransitionsUserAssignment('annulBudgetStateTransitionsUserAssignmentMain')">
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
                               v-for="(item,index) in $store.state.budgetManagement.subStateTransitions.altDurumlar"
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
                               v-for="(item,index) in $store.state.budgetManagement.subStateTransitions.atanabilecekler"
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
    ...mapActions('budgetManagement', ['changeAnnualBudgetStateTransitionsUserAssignment', 'getSubStateTransitions', 'saveSubStateTransitionsSelect']),
    addToList(item) {
      console.log(item)
      const index = this.$store.state.budgetManagement.subStateTransitions.altDurumlar.findIndex(i => i.id == item.id);
      const i = this.$store.state.budgetManagement.subStateTransitions.altDurumlar.splice(index, 1)[0];
      this.$store.state.budgetManagement.subStateTransitions.atanabilecekler.push(i);
    },
    deleteFromList(item) {
      const index = this.$store.state.budgetManagement.subStateTransitions.atanabilecekler.findIndex(i => i.id == item.id);
      const i = this.$store.state.budgetManagement.subStateTransitions.atanabilecekler.splice(index, 1)[0];
      this.$store.state.budgetManagement.subStateTransitions.altDurumlar.push(i);
    },
    save() {
      const list = [];
      this.$store.state.budgetManagement.subStateTransitions.altDurumlar.map(i => {
        list.push(i.id);
      });
      this.$store.state.general.showOverlay = true;
      this.saveSubStateTransitionsSelect({list, id: this.$store.state.budgetManagement.selectedSubStateTransition.id}).then((res) => {
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
    this.getSubStateTransitions(this.$store.state.budgetManagement.selectedSubState);
    this.$store.state.budgetManagement.subStateTransitionsSelect = Object.assign({});
  },
  computed: {
    ...mapState('spSettings', ['subStateTransitionsSelect'])
  }
}
</script>