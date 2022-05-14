<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">DURUM : {{ $store.state.spSettings.selectedSubState.durumAdi }} - ALT DURUM :
        {{ $store.state.spSettings.selectedSubStateTransition.durumAdi }}</h3></div>
      <div class="col-sm-auto text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeStatePermissionCmp('AuthorizedUsers')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-5">
        <div class="form-group mb-0">
          <label>Birim</label>
          <select class="form-control" v-model="topDepartment" @change="listLinkedDepartments">
            <option :value="null">Seçiniz</option>
            <option :value="item" v-for="(item,index) in topDepartments" :key="index">{{ item.metin }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <b-card
            header="BAĞLI BİRİMLER"
            header-tag="header"
            header-class="font-weight-bold"
            no-body
        >
          <b-list-group flush class="left">
            <b-list-group-item href="javascript:void(0)" @click.stop="getTitles(item)"
                               v-for="(item,index) in linkedDepartments"
                               :key="index">
              {{ item.metin }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-2">
        <b-card
            header="UNVANLAR"
            header-tag="header"
            header-bg-variant="secondary"
            header-text-variant="light"
            header-class="font-weight-bold"
            border-variant="secondary"
            no-body
        >

          <b-list-group flush class="left">
            <b-list-group-item href="javascript:void(0)" v-for="(item,index) in $store.state.spSettings.titles"
                               :key="index" @click="addToList(item)">
              {{ item.metin }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-sm-auto">
        <img src="@/assets/img/icons/lr_arrow.png" alt="">
      </div>
      <div class="col-4">
        <b-card
            header="KULLANICILAR"
            header-tag="header"
            header-bg-variant="secondary"
            header-text-variant="light"
            header-class="font-weight-bold"
            border-variant="secondary"
            no-body
        >

          <b-list-group flush class="right custom">
            <b-list-group-item href="javascript:void(0)"
                               v-for="(item,index) in subStateTransitionsSelectList"
                               :key="index">
              <b>{{ item.ustBirim }}</b>
              <hr>
              <ul>
                <li v-for="(item,index) in item.bagliBirimler"
                    :key="index">{{ item.bagliBirim }}
                  <ul>
                    <li @click.stop="deleteFromList(item)" class="ml-4" v-for="(item,index) in item.unvanlar"
                        :key="index">{{ item.unvan }}
                    </li>
                  </ul>
                </li>
              </ul>
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
  data() {
    return {
      topDepartments: [],
      linkedDepartments: [],
      topDepartment: null,
      selectedLinkedDepartment: null,
      list: []
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('spSettings', ['changeStatePermissionCmp', 'getSubStateTransitionsSelect', 'saveAuthorizeTransitionsSelect', 'getTitlesByDepartmentId', 'getSubStateTransitionsSelectList']),
    ...mapActions('parameter', ['getDepartments']),
    getTitles(item) {
      this.selectedLinkedDepartment = item;
      this.getTitlesByDepartmentId(item.id)
    },
    // eslint-disable-next-line no-unused-vars
    addToList(item) {
      const checkTopAdded = this.subStateTransitionsSelectList.find(i => i.ustBirimId == this.topDepartment.id);
      if (checkTopAdded) {
        const checkIfLinkedExists = checkTopAdded.bagliBirimler.find(s => s.bagliBirimId == this.selectedLinkedDepartment.id);
        if (!checkIfLinkedExists) {
          checkTopAdded.bagliBirimler.push({
            bagliBirimId: this.selectedLinkedDepartment.id,
            bagliBirim: this.selectedLinkedDepartment.metin,
            ustBirimId: this.topDepartment.id,
            ustBirim: this.topDepartment.metin,
            unvanlar: [{
              bagliBirimId: this.selectedLinkedDepartment.id,
              id: item.id,
              unvan: item.metin,
              ustBirimId: this.topDepartment.id
            }]
          });
        } else {
          const checkIsTitleExists = checkIfLinkedExists.unvanlar.find(t => t.id == item.id);
          if (!checkIsTitleExists) {
            checkIfLinkedExists.unvanlar.push({
              bagliBirimId: this.selectedLinkedDepartment.id,
              id: item.id,
              unvan: item.metin,
              ustBirimId: this.topDepartment.id
            })
          }
        }
      } else {
        const obj = {
          ustBirimId: this.topDepartment.id,
          ustBirim: this.topDepartment.metin,
          durumAltDurumId: this.$store.state.spSettings.selectedSubStateTransition.id,
          bagliBirimler: [{
            bagliBirimId: this.selectedLinkedDepartment.id,
            bagliBirim: this.selectedLinkedDepartment.metin,
            ustBirimId: this.topDepartment.id,
            ustBirim: this.topDepartment.metin,
            unvanlar: [{
              bagliBirimId: this.selectedLinkedDepartment.id,
              id: item.id,
              unvan: item.metin,
              ustBirimId: this.topDepartment.id
            }]
          }]
        };
        this.subStateTransitionsSelectList.push(obj);
      }

    },
    deleteFromList(item) {
      const parent = this.subStateTransitionsSelectList.find(i => i.ustBirimId == item.ustBirimId);
      const linked = parent.bagliBirimler.find(i => i.bagliBirimId == item.bagliBirimId);
      const titleIndex = linked.unvanlar.findIndex(i => i.id == item.id);
      linked.unvanlar.splice(titleIndex, 1);
      if (linked.unvanlar.length == 0) {
        const linkedIndex = parent.bagliBirimler.findIndex(p => p.bagliBirimId == item.bagliBirimId);
        parent.bagliBirimler.splice(linkedIndex, 1);
      }
      if (parent.bagliBirimler.length == 0) {
        const parentIndex = this.subStateTransitionsSelectList.findIndex(p => p.ustBirimId == item.ustBirimId);
        this.subStateTransitionsSelectList.splice(parentIndex, 1);
      }
    },
    save() {
      this.$store.state.general.showOverlay = true;
      this.saveAuthorizeTransitionsSelect({
        list: this.subStateTransitionsSelectList,
        id: this.$store.state.spSettings.selectedSubStateTransition.id
      }).then((res) => {
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
    },
    listLinkedDepartments() {
      if (this.topDepartment.id) {
        this.getDepartments(this.topDepartment.id).then(res => {
          if (res.data)
            this.linkedDepartments = Object.assign([], res.data);
        });
      } else {
        this.linkedDepartments = Object.assign([]);
      }
    }
  },
  created() {
    this.$store.state.spSettings.titles = Object.assign([]);
    this.$store.state.spSettings.subStateTransitionsSelectList = Object.assign([]);
    this.getSubStateTransitionsSelectList(this.$store.state.spSettings.selectedSubStateTransition.id);
    this.getDepartments().then(res => {
      if (res.data)
        this.topDepartments = Object.assign([], res.data);
    });
  },
  computed: {
    ...mapState('spSettings', ['subStateTransitionsSelectList'])
  }
}
</script>