<template>
  <div>
    <b-modal
        id="modal-delete-single-video"
        centered
        title="Video Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeSingleVideo"
        :busy="overlay"
    >
      Video silinecektir, emin misiniz?
    </b-modal>
    <b-modal
        id="modal-delete-multi-video"
        centered
        title="Seçilen Videoları Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeMultiVideo"
        :busy="overlay"
    >
      Seçilen videolar silinecektir, emin misiniz?
    </b-modal>
    <vue-dropzone

        ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
        v-on:vdropzone-sending="sendingEvent"
        v-on:vdropzone-success="success"
        class="mb-4"
    ></vue-dropzone>
    <div class="row mb-4"
         v-if="$store.state.application.videos.dosyalar&&$store.state.application.videos.dosyalar.length>0">
      <div class="col">
        <div class="custom-control custom-checkbox"
        >
          <input type="checkbox" class="custom-control-input" id="selectAllVideo" v-model="selectAll">
          <label class="custom-control-label pt-1" for="selectAllVideo">Tümünü Seç</label>
        </div>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-danger" v-if="showMultipleDelete" @click="confirmMultipleDelete">
          <font-awesome-icon icon="trash-alt"/>
          Seçilenleri Sil
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-2 mb-4" v-for="(item,index) in $store.state.application.videos.dosyalar" :key="index">
        <div class="img-container">
          <div class="name-container">
            {{ item.dosyaAdi }}
          </div>
          <div class="custom-control custom-checkbox"
          >
            <input type="checkbox" class="custom-control-input" v-model="item.checked" :id="item.id">
            <label class="custom-control-label" :for="item.id"></label>
          </div>
          <img src="@/assets/img/defaultvideo.jpg" class="mw-100" alt="">
          <div class="button-container"
          >
            <button class="btn btn-sm btn-danger" @click.stop="showSingleDeleteConfirm(item.id)">
              <font-awesome-icon icon="trash-alt"/>
              Sil
            </button>
            <button class="btn btn-sm btn-success" @click.stop="downloadFile(item.dosyaAdres)">
              <font-awesome-icon icon="download"/>
              İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import authHeader from "@/services/auth-header";
import {mapActions} from "vuex";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      selectAll: false,
      overlay: false,
      selectedId: null,
      dropzoneOptions: {
        url: `${process.env.VUE_APP_USER_API_URL}basvurudosya/dosya-ekle`,
        thumbnailWidth: 150,
        maxFilesize: 50,
        addRemoveLinks: true,
        dictRemoveFile:'',
        dictCancelUpload:'İptal Et',
        dictCancelUploadConfirmation:'İptal edilecek, emin misiniz?',
        dictRemoveFileConfirmation:'Silinecek, emin misiniz?',
        dictDefaultMessage: `Buraya tıklayın veya dosyaları sürükleyip bırakın (Maksimum 50MB) <br/><img class="mt-3" src="${require('@/assets/img/icons/plus-circle.png')}"/>`,
        dictFileTooBig: 'Dosya çok büyük ({{filesize}}MB). Maksimum {{maxFilesize}}MB olabilir',
        dictInvalidFileType: 'Geçersiz format',
        acceptedFiles: '.mov,video/*',
        headers: authHeader()
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('application', ['getVideos', 'removeVideo', 'removeVideosMultiple']),
    downloadFile(url) {
      window.open(url, '_blank');
    },
    confirmMultipleDelete() {
      this.$bvModal.show('modal-delete-multi-video');
    },
    removeMultiVideo() {
      this.overlay = true;
      const arr = [];
      this.$store.state.application.videos.dosyalar.map(item => {
        if (item.checked) {
          arr.push(item.id);
        }
      });
      this.removeVideosMultiple(arr).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-multi-video');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    showSingleDeleteConfirm(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-single-video');
    },
    removeSingleVideo() {
      this.overlay = true;
      this.removeVideo(this.selectedId).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-single-video');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    sendingEvent(file, xhr, formData) {
      formData.append('basvuruId', this.$route.params.id);
    },
    success(file) {
      this.$refs.myVueDropzone.removeFile(file);
      this.getVideos(this.$route.params.id);
    }
  },
  created() {
    this.getVideos(this.$route.params.id);
  },
  computed: {
    showMultipleDelete() {
      return this.$store.state.application.videos.dosyalar && this.$store.state.application.videos.dosyalar.some(i => i.checked);
    }
  },
  watch: {
    selectAll(nw) {
      if (nw) {
        this.$store.state.application.videos.dosyalar.map(item => {
          this.$set(item, 'checked', true);
        });
      } else {
        this.$store.state.application.videos.dosyalar.map(item => {
          this.$set(item, 'checked', false);
        });
      }
    }
  }
}
</script>