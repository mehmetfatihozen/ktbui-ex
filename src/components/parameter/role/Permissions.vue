<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex justify-content-between align-items-center">
        <b-button variant="danger" @click="changeComponent('Main')">
          <b-icon icon="arrow-left"></b-icon>
          Geri Dön
        </b-button>
        <h4 class="title m-0">Yetkiler (Admin)</h4>
        <b-button variant="primary">
          Yetkileri Güncelle
          <b-icon icon="plus-circle"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table outlined fixed :busy="loading" :fields="fields" :items="items">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Yükleniyor...</strong>
        </div>
      </template>
      <template v-slot:head(okuma)="data">
        <b-form-checkbox  v-model="readAll">{{ data.label }}</b-form-checkbox>
      </template>
      <template v-slot:cell(okuma)="data">
        <b-form-checkbox  v-model="data.item.okuma"></b-form-checkbox>
      </template>
      <template v-slot:head(yazma)="data">
        <b-form-checkbox  v-model="writeAll">{{ data.label }}</b-form-checkbox>
      </template>
      <template v-slot:cell(yazma)="data">
        <b-form-checkbox  v-model="data.item.yazma"></b-form-checkbox>
      </template>
      <template v-slot:head(silme)="data">
        <b-form-checkbox  v-model="deleteAll">{{ data.label }}</b-form-checkbox>
      </template>
      <template v-slot:cell(silme)="data">
        <b-form-checkbox  v-model="data.item.silme"></b-form-checkbox>
      </template>
    </b-table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      readAll:false,
      writeAll:false,
      deleteAll:false,
      loading: false,
      fields: [
        {key: 'ad', label: 'Ad'},
        {key: 'okuma', label: 'Okuma'},
        {key: 'yazma', label: 'Yazma'},
        {key: 'silme', label: 'Silme'},
      ],
      items: [
        {ad: 'Dashboard', okuma: true, yazma: false, silme: false},
        {ad: 'Başvurular', okuma: true, yazma: true, silme: false},
      ]
    }
  },
  methods: {
    ...mapActions('role', ['changeComponent']),
    selectAll(type,state){
      switch (type){
        case 'read':
          if (state){
            this.items.map(i=>{
              i.okuma=true;
            });
          }else{
            this.items.map(i=>{
              i.okuma=false;
            });
          }
          break;
        case 'write':
          if (state){
            this.items.map(i=>{
              i.yazma=true;
            });
          }else{
            this.items.map(i=>{
              i.yazma=false;
            });
          }
          break;
        case 'delete':
          if (state){
            this.items.map(i=>{
              i.silme=true;
            });
          }else{
            this.items.map(i=>{
              i.silme=false;
            });
          }
          break;
      }
    }
  },
  created() {
  },
  watch:{
    readAll(nw){
      this.selectAll('read',nw)
    },
    writeAll(nw){
      this.selectAll('write',nw)
    },
    deleteAll(nw){
      this.selectAll('delete',nw)
    }
  }
}
</script>