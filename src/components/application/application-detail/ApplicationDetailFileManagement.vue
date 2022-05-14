<template>
  <div>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary" @click="changeDetailComponent('ApplicationDetailMain')">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Başvuruya Geri Dön
        </button>
      </div>
    </div>
    <b-card no-body class="main-card mt-4">
      <b-tabs pills card vertical class="vertical-img-icon-tab">
        <b-tab :active="$store.state.application.selectedFileComponentId===1"
               title-link-class="d-flex flex-column align-items-center text-center">
          <template v-slot:title>
            Resim
            <img src="@/assets/img/icons/picture-icon.png" alt="" class="mt-2">
          </template>
          <b-card-text class="upload-container">
            <ImageManagement/>
          </b-card-text>
        </b-tab>
        <b-tab :active="$store.state.application.selectedFileComponentId===2"
               title-link-class="d-flex flex-column align-items-center text-center">
          <template v-slot:title>
            Video
            <img src="@/assets/img/icons/video-icon.png" alt="" class="mt-2">
          </template>
          <b-card-text class="upload-container">
            <VideoManagement/>
          </b-card-text>
        </b-tab>
        <b-tab :active="$store.state.application.selectedFileComponentId===3"
               title-link-class="d-flex flex-column align-items-center text-center">
          <template v-slot:title>
            Dosya
            <img src="@/assets/img/icons/folder-icon.png" alt="" class="mt-2">
          </template>
          <b-card-text class="upload-container">
            <FileManagement/>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import ImageManagement from "@/components/application/application-detail/ImageManagement";
import VideoManagement from "@/components/application/application-detail/VideoManagement";
import FileManagement from "@/components/application/application-detail/FileManagement";

export default {
  components: {FileManagement, VideoManagement, ImageManagement},
  data() {
    return {}
  },
  methods: {
    ...mapActions('application', ['changeDetailComponent'])
  }
}
</script>