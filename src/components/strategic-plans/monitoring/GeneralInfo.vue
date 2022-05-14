<template>
  <div>
    <b-modal
        id="modal-delete-plan"
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
      <p class="my-4 text-center">Stratejik Plan İzleme silinecektir, emin misiniz?</p>
    </b-modal>
    <div class="card-component mb-4">
      <div class="body">
        <div class="row">
          <div class="col">
            <div class="form-group mb-0">
              <label>Dönem</label>
              <input type="text" class="form-control" disabled :value="planMonitoringDetail.planAdi">
            </div>
          </div>
          <div class="col-2">
            <div class="form-group mb-0">
              <label>Yıl</label>
              <input type="text" class="form-control" disabled :value="planMonitoringDetail.yil">
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-0">
              <label>Durum</label>
              <input type="text" class="form-control" disabled :value="planMonitoringDetail.durum">
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-0">
              <label>Durum</label>
              <input type="text" class="form-control" disabled :value="planMonitoringDetail.altDurum">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4 justify-content-end">
      <div class="col-4 d-flex justify-content-end mt-4">
        <button class="btn btn-outline-primary btn-block mt-0 mr-2">PC Kaydet</button>
        <button class="btn btn-outline-danger btn-block mt-0" v-b-modal.modal-delete-plan>Sil</button>
      </div>
    </div>
    <Purposes/>
  </div>
</template>

<script>
import Purposes from "@/components/strategic-plans/monitoring/general-info/Purposes";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Purposes
  },
  data() {
    return {
      overlay: false
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('sp', ['deletePlanMonitoring']),
    remove() {
      this.overlay = true;
      this.deletePlanMonitoring(this.$route.params.id).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.$router.push('/strategic-plans/monitoring');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    }
  },
  computed: {
    ...mapState('sp', ['planMonitoringDetail'])
  }
}
</script>