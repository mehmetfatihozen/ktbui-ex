<template>
  <div>
    <b-modal
        id="modal-delete-single-image"
        centered
        title="Resim Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeSingleImage"
        :busy="overlay"
    >
      {{this.getMessage(51)}}
    </b-modal>
    <b-modal
        id="modal-delete-multi-image"
        centered
        title="Seçilen Resimleri Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeMultiImage"
        :busy="overlay"
    >
      Seçilen resimler silinecektir, emin misiniz?
    </b-modal>
    <vue-dropzone
        v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled"
        ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
        v-on:vdropzone-sending="sendingEvent"
        v-on:vdropzone-success="success"
        class="mb-4"
    ></vue-dropzone>
    <div class="row mb-4"
         v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled&&$store.state.application.images.dosyalar&&$store.state.application.images.dosyalar.length>0">
      <div class="col">
        <div class="custom-control custom-checkbox"
             v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled">
          <input type="checkbox" class="custom-control-input" id="selectAll" v-model="selectAll">
          <label class="custom-control-label pt-1" for="selectAll">Tümünü Seç</label>
        </div>
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-danger" v-if="showMultipleDelete" @click="confirmMultipleDelete">
          <font-awesome-icon icon="trash-alt"/>
          Seçilenleri Sil
        </button>
      </div>
    </div>
    <div class="row" v-viewer>
      <div class="col-2 mb-4" v-for="(item,index) in $store.state.application.images.dosyalar" :key="index">
        <div class="img-container">
          <div class="custom-control custom-checkbox"
               v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled">
            <input type="checkbox" class="custom-control-input" v-model="item.checked" :id="item.id">
            <label class="custom-control-label" :for="item.id"></label>
          </div>
          <img :src="item.dosyaAdres" class="mw-100" alt="">
          <div class="button-container image"
               v-if="!$store.state.application.applicationDetail.basvuruKapali&&!isApplicationCancelled">
            <button class="btn btn-sm btn-danger" @click.stop="showSingleDeleteConfirm(item.id)">
              <font-awesome-icon icon="trash-alt"/>
              Sil
            </button>
            <button class="btn btn-sm btn-success" @click.stop="downloadFile(item.dosyaAdres)">
              <font-awesome-icon icon="download"/>
              İndir
            </button>
          </div>
          <div class="name-container image">
            {{ item.dosyaAdi }}
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
import {mapActions, mapGetters} from "vuex";
import 'viewerjs/dist/viewer.css'
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
        maxFilesize: 10,
        addRemoveLinks: true,
        dictRemoveFile:'',
        dictCancelUpload:'İptal Et',
        dictCancelUploadConfirmation:'İptal edilecek, emin misiniz?',
        dictRemoveFileConfirmation:'Silinecek, emin misiniz?',
        dictDefaultMessage: `Buraya tıklayın veya dosyaları sürükleyip bırakın (Maksimum 10MB) <br/><img class="mt-3" src="${require('@/assets/img/icons/plus-circle.png')}"/>`,
        dictFileTooBig: 'Dosya çok büyük ({{filesize}}MB). Maksimum {{maxFilesize}}MB olabilir',
        dictInvalidFileType: 'Geçersiz format',
        acceptedFiles: 'image/*',
        headers: authHeader()
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('application', ['getImages', 'removeImage', 'removeImagesMultiple']),
    downloadFile(url) {
      window.open(url, '_blank');
    },
    confirmMultipleDelete() {
      this.$bvModal.show('modal-delete-multi-image');
    },
    removeMultiImage() {
      this.overlay = true;
      const arr = [];
      this.$store.state.application.images.dosyalar.map(item => {
        if (item.checked) {
          arr.push(item.id);
        }
      });
      this.removeImagesMultiple(arr).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-multi-image');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    showSingleDeleteConfirm(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-single-image');
    },
    removeSingleImage() {
      this.overlay = true;
      this.removeImage(this.selectedId).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-single-image');
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
      this.getImages(this.$route.params.id);
    }
  },
  created() {
    this.getImages(this.$route.params.id);
  },
  computed: {
    ...mapGetters('application', ['isApplicationCancelled']),
    ...mapGetters('general',['getMessage']),
    showMultipleDelete() {
      return this.$store.state.application.images.dosyalar && this.$store.state.application.images.dosyalar.some(i => i.checked);
    }
  },
  watch: {
    selectAll(nw) {
      if (nw) {
        this.$store.state.application.images.dosyalar.map(item => {
          this.$set(item, 'checked', true);
        });
      } else {
        this.$store.state.application.images.dosyalar.map(item => {
          this.$set(item, 'checked', false);
        });
      }
    }
  }
}
</script>