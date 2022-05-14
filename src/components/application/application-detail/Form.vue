<template>
  <div>
    <div class="row mb-4">
      <div class="col d-flex justify-content-end">
        <button class="btn btn-outline-secondary" @click="changeDetailComponent('ApplicationDetailMain')">
          <font-awesome-icon icon="angle-double-left" class="mr-2"/>
          Başvuruya Geri Dön
        </button>
      </div>
    </div>
    <div class="button-container d-flex justify-content-center mb-4">
      <button class="btn btn-outline-secondary" @click="download">
        <font-awesome-icon icon="download" size="lg"/>
        İndir
      </button>
    </div>
    <div class="pdf-container" id="pdf-container" ref="pdf-content" :style="pdfContainer">
      <div class="header mb-4">
        <div class="row">
          <div class="col-4 d-flex  align-items-center">
            <img src="@/assets/img/ktb.jpg" alt="">
          </div>
          <div class="col-4 d-flex align-items-center justify-content-center">
            <h5 class="mb-0 text-center">BAŞVURU BİLGİ FORMU</h5>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <div id="app-no" :style="appNo">
              <div class="title" :style="title">
                B. No
              </div>
              {{ $route.params.id }}
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <table class="table" :style="table">
          <tbody>
          <tr>
            <td :style="[td,fit]">Başvuru Sahibi</td>
            <td :style="td">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.basvuruSahibi }}</span>
            </td>
            <td :style="[td,fit]" class="fit">Başvuru Tarihi</td>
            <td :style="td" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.basvuruTarihi }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]">Birimi</td>
            <td :style="td" class="pr-0" colspan="3">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.birim }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]" class="fit">Bölümü</td>
            <td :style="td" colspan="3" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.bolum }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]" class="fit">Unvanı</td>
            <td :style="td">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.unvan }}</span>
            </td>
            <td :style="[td,fit]" class="fit">E-Posta</td>
            <td :style="td" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.email }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]" class="fit">Cep Telefonu</td>
            <td :style="td">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.cepTelefonu }}</span>
            </td>

            <td :style="[td,fit]" class="fit">Başvuru Tipi</td>
            <td :style="td" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.basvuruTipi }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]" class="fit">Başvuru Konu Detayı</td>
            <td :style="td" class="pr-0" colspan="3">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.konuDetay }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]">Çözüm SLA (Saat)</td>
            <td :style="td">
              <span type="text" class="form-control form-control-sm" :style="input">{{ formDepartmentData.sla }}</span>
            </td>

            <td :style="[td,fit]" class="fit">Öncelik</td>
            <td :style="td" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.oncelik }}</span>
            </td>
          </tr>
          <tr>
            <td :style="[td,fit]" class="fit">Konu Başlığı</td>
            <td :style="td" colspan="3" class="pr-0">
              <span type="text" class="form-control form-control-sm"
                    :style="input">{{ formDepartmentData.konuBasligi }}</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="textarea-container" :style="textAreaContainer">
          <div class="textarea-title" :style="textAreaTitle">
            BAŞVURU AÇIKLAMASI
          </div>
          <span class="form-control" :style="[input,h190]">{{ formDepartmentData.aciklama }}</span>
        </div>
        <div class="textarea-container" :style="textAreaContainer">
          <div class="textarea-title" :style="textAreaTitle">
            NOT
          </div>
          <span class="form-control" :style="[input,h190]">{{ formDepartmentData.not }}</span>
        </div>
      </div>
      <div class="footer">
        <div class="row">
          <div class="col">
            <div class="item" :style="item">
              <label class="title">Başvuru Sahibi</label>
            </div>
          </div>
          <div class="col">
            <div class="item" :style="item">
              <label class="title">İlgili Personel</label>
            </div>
          </div>
          <!--<div class="col">
            <div class="item" :style="item">
              <label class="title">Birim Sorumlusu</label>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import html2pdf from 'html2pdf.js';

export default {
  components: {},
  data() {
    return {
      pdfContainer: {
        width: '100%',
        background: '#fff',
        padding: '20px',
        color: '#dc3545'
      },
      appNo: {
        width: '100px',
        padding: '5px 0',
        border: '1px solid #eeeef5',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'rgb(115,115,115)',
        fontSize: '24px'
      },
      title: {
        color: '#dc3545'
      },
      table: {
        padding: '0',
        margin: '0'
      },
      td: {
        color: '#dc3545',
        fontWeight: 'bold',
        border: 'none',
        paddingLeft: '0',
        paddingRight: '1.5rem',
        paddingBottom: '.25rem',
        verticalAlign: 'middle',
        fontSize: '12px'
      },
      fit:{
        whiteSpace: 'nowrap',
        width: '1%'
      },
      tdTableTd: {
        color: '#dc3545',
        fontWeight: 'bold',
        border: 'none',
        paddingLeft: '0',
        paddingTop: '0',
        paddingBottom: '.25rem',
        paddingRight: '1.5rem',
        verticalAlign: 'middle'
      },
      textAreaContainer: {
        margin: '20px 0'
      },
      textAreaTitle: {
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        background: 'rgb(230 235 244)',
        padding: '5px 0'
      },
      item: {
        fontWeight: 'bold',
        padding: '10px',
        border: '1px solid #eeeef5',
        borderRadius: '4px',
        minHeight: '130px'
      },
      input: {
        fontSize: '12px',
        width: '100%',
        background: '#fff'
      },
      h190: {
        height: '190px',
        overflow: 'hidden'
      }
    }
  },
  methods: {
    ...mapActions('application', ['changeDetailComponent', 'getFormDepartment']),
    print() {
      window.print();
    },
    download() {
      const element = document.getElementById('pdf-container');
      const opt = {
        margin: 0.1,
        filename: this.$route.params.id + ' - Basvuru.pdf',
        image: {type: 'jpeg', quality: 1},
        html2canvas: {scale: 1},
        jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait'}
      };
      html2pdf().set(opt).from(element).save();
    }
  },
  mounted() {

  },
  created() {
    this.getFormDepartment(this.$route.params.id);
  },
  computed: {
    ...mapState('application', ['formDepartmentData'])
  }
}
</script>