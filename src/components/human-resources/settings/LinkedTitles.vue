<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">Bağlı Birim : {{ birimAd }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeInstitutionComponent({cmp:'LinkedInstitutions',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <div class="form-group mb-0">
          <label>Unvanlarda Ara</label>
          <input type="text" class="form-control" v-model="searchText">
        </div>
      </div>
      <div class="col d-flex align-items-end">
        <button class="btn btn-outline-secondary" @click="searchText=''">Temizle</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-card
            header="UNVANLAR"
            header-tag="header"
            header-class="font-weight-bold"
            no-body
        >
          <b-list-group flush class="left">
            <b-list-group-item href="#" @click.stop="addToList(item)"
                               v-for="(item,index) in departmentTitlesLeft"
                               :key="index">
              {{ item.unvanAdi }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-sm-auto">
        <img src="@/assets/img/icons/lr_arrow.png" alt="">
      </div>
      <div class="col">
        <b-card
            header="UNVANLAR"
            header-tag="header"
            header-bg-variant="secondary"
            header-text-variant="light"
            header-class="font-weight-bold"
            border-variant="secondary"
            no-body
        >

          <b-list-group flush class="right">
            <b-list-group-item href="#" @click.stop="deleteFromList(item)"
                               v-for="(item,index) in departmentTitles"
                               :key="index">
              {{ item.unvanAdi }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </div>
    <button class="btn btn-success mt-4 d-flex align-self-end px-5" @click="save">Kaydet</button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  props: ['id', 'birimAd'],
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('hr', ['changeInstitutionComponent']),
    ...mapActions('hrSettings', ['searchDepartmentTitles', 'getDepartmentTitles', 'saveDepartmentTitle']),
    search() {
      if (this.searchText.length >= 2) {
        this.searchDepartmentTitles({id: this.id, searchText: this.searchText});
      } else {
        this.$store.state.hrSettings.departmentTitlesLeft = Object.assign([]);
      }
    },
    addToList(item) {
      const index = this.departmentTitlesLeft.findIndex(i => i.id === item.id);
      const i = this.departmentTitlesLeft.splice(index, 1)[0];
      this.departmentTitles.push(i);
    },
    deleteFromList(item) {
      const index = this.departmentTitles.findIndex(i => i.id === item.id);
      const i = this.departmentTitles.splice(index, 1)[0];
      this.departmentTitlesLeft.push(i);
    },
    save() {
      const list = [];
      this.departmentTitles.map(i => {
        list.push(i.id);
      });
      this.$store.state.general.showOverlay = true;
      this.saveDepartmentTitle({list, id: this.id, text: this.searchText}).then((res) => {
        this.$store.state.general.showOverlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.showModal({
            title: 'Başarılı!',
            message: this.getMessage(19),
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
    this.$store.state.hrSettings.departmentTitles = Object.assign([]);
    this.$store.state.hrSettings.departmentTitlesLeft = Object.assign([]);
    this.getDepartmentTitles(this.id);
  },
  computed: {
    ...mapState('hrSettings', ['departmentTitles', 'departmentTitlesLeft']),
    ...mapGetters('general',['getMessage'])
  },
  watch: {
    searchText() {
      this.search();
    }
  }
}
</script>