<template>
  <div>
    <b-modal
        id="modal-delete-single-file"
        centered
        title="Dosya Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeSingleFile"
        :busy="overlay"
    >
      Dosya silinecektir, emin misiniz?
    </b-modal>
    <b-modal
        id="modal-delete-multi-file"
        centered
        title="Seçilen Dosyaları Sil"
        header-bg-variant="danger"
        header-text-variant="light"
        ok-title="Sil"
        ok-variant="danger"
        cancel-title="Kapat"
        cancel-variant="outline-secondary"
        @ok.prevent="removeMultiFile"
        :busy="overlay"
    >
      Seçilen dosyalar silinecektir, emin misiniz?
    </b-modal>
    <vue-dropzone
        
        ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
        v-on:vdropzone-sending="sendingEvent"
        v-on:vdropzone-success="success"
        class="mb-4"
    ></vue-dropzone>
    <div class="row mb-4" v-if="$store.state.application.files.dosyalar&&$store.state.application.files.dosyalar.length>0">
      <div class="col">
        <div class="custom-control custom-checkbox"
             >
          <input type="checkbox" class="custom-control-input" id="selectAllFile" v-model="selectAll">
          <label class="custom-control-label pt-1" for="selectAllFile">Tümünü Seç</label>
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
      <div class="col-2 mb-4" v-for="(item,index) in $store.state.application.files.dosyalar" :key="index">
        <div class="img-container">
          <div class="name-container">
            {{item.dosyaAdi}}
          </div>
          <div class="custom-control custom-checkbox"
               >
            <input type="checkbox" class="custom-control-input" v-model="item.checked" :id="item.id">
            <label class="custom-control-label" :for="item.id"></label>
          </div>
          <img src="@/assets/img/defaultfile.jpg" class="mw-100" alt="">
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
        maxFilesize: 10,
        addRemoveLinks: true,
        dictRemoveFile:'',
        dictCancelUpload:'İptal Et',
        dictCancelUploadConfirmation:'İptal edilecek, emin misiniz?',
        dictRemoveFileConfirmation:'Silinecek, emin misiniz?',
        dictDefaultMessage: `Buraya tıklayın veya dosyaları sürükleyip bırakın (Maksimum 10MB) <br/><img class="mt-3" src="${require('@/assets/img/icons/plus-circle.png')}"/>`,
        dictFileTooBig: 'Dosya çok büyük ({{filesize}}MB). Maksimum {{maxFilesize}}MB olabilir',
        dictInvalidFileType: 'Geçersiz format',
        acceptedFiles: '.doc,.docx,.xls,.xlsx,.pdf',
        headers: authHeader()
      }
    }
  },
  methods: {
    ...mapActions('general', ['showModal']),
    ...mapActions('application', ['getFiles', 'removeFile', 'removeFilesMultiple']),
    downloadFile(url) {
      window.open(url, '_blank');
    },
    confirmMultipleDelete() {
      this.$bvModal.show('modal-delete-multi-file');
    },
    removeMultiFile() {
      this.overlay = true;
      const arr = [];
      this.$store.state.application.files.dosyalar.map(item => {
        if (item.checked) {
          arr.push(item.id);
        }
      });
      this.removeFilesMultiple(arr).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-multi-file');
        }
      }).catch(err => {
        this.overlay = false;
        this.showModal({title: 'Hata!', message: err, type: 'danger'});
      });
    },
    showSingleDeleteConfirm(id) {
      this.selectedId = id;
      this.$bvModal.show('modal-delete-single-file');
    },
    removeSingleFile() {
      this.overlay = true;
      this.removeFile(this.selectedId).then((res) => {
        this.overlay = false;
        if (res.hasError) {
          this.showModal({title: 'Hata!', message: res.errorMessage, type: 'danger'});
        } else {
          this.selectAll = false;
          this.$bvModal.hide('modal-delete-single-file');
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
      this.getFiles(this.$route.params.id);
    }
  },
  created() {
    this.getFiles(this.$route.params.id);
  },
  computed: {
    showMultipleDelete() {
      return this.$store.state.application.files.dosyalar && this.$store.state.application.files.dosyalar.some(i => i.checked);
    }
  },
  watch: {
    selectAll(nw) {
      if (nw) {
        this.$store.state.application.files.dosyalar.map(item => {
          this.$set(item, 'checked', true);
        });
      } else {
        this.$store.state.application.files.dosyalar.map(item => {
          this.$set(item, 'checked', false);
        });
      }
    }
  }
}
</script>