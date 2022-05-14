<template>
  <div class="d-flex flex-column">
    <div class="row mb-3">
      <div class="col"><h3 class="mb-0">{{ metin }}</h3></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm" @click="changeTopicComponent({cmp:'Topics',data:null})">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-card
            header="BAŞVURU DETAYLARI"
            header-tag="header"
            header-class="font-weight-bold"
            no-body
        >
          <b-list-group flush class="left">
            <b-list-group-item href="#" @click.stop="addToList(item)"
                               v-for="(item,index) in $store.state.applicationSettings.topicDetails.left"
                               :key="index">
              {{ item.detayAd }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
      <div class="col-sm-auto">
        <img src="@/assets/img/icons/lr_arrow.png" alt="">
      </div>
      <div class="col">
        <b-card
            header="BAŞVURU DETAYLARI"
            header-tag="header"
            header-bg-variant="secondary"
            header-text-variant="light"
            header-class="font-weight-bold"
            border-variant="secondary"
            no-body
        >

          <b-list-group flush class="right">
            <b-list-group-item href="#" @click.stop="deleteFromList(item)"
                               v-for="(item,index) in $store.state.applicationSettings.topicDetails.right"
                               :key="index">
              {{ item.detayAd }}
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
  props: ['id', 'metin'],
  components: {},
  data() {
    return {}
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('applicationSettings', ['changeTopicComponent', 'getTopicDetails', 'saveTopicDetail']),
    addToList(item) {
      const index = this.topicDetails.left.findIndex(i => i.id === item.id);
      const i = this.topicDetails.left.splice(index, 1)[0];
      this.topicDetails.right.push(i);
    },
    deleteFromList(item) {
      const index = this.topicDetails.right.findIndex(i => i.id === item.id);
      const i = this.topicDetails.right.splice(index, 1)[0];
      this.topicDetails.left.push(i);
    },
    save() {
      const list = [];
      this.topicDetails.right.map(i => {
        list.push(i.id);
      });
      this.$store.state.general.showOverlay = true;
      this.saveTopicDetail({list, id: this.id}).then((res) => {
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
    this.$store.state.applicationSettings.topicDetails = Object.assign({});
    this.getTopicDetails(this.id);
  },
  computed: {
    ...mapState('applicationSettings', ['topicDetails']),
    ...mapGetters('general',['getMessage'])
  }
}
</script>