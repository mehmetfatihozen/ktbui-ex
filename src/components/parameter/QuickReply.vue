<template>
  <div>
    <b-modal id="modal-quick-reply" centered title="Hızlı Yanıt Ekle" ok-variant="success" ok-title="Kaydet"
             cancel-variant="danger" cancel-title="Vazgeç">
      <b-form-group
          label="Başlık"
      >
        <b-form-input
            v-model="form.title"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Açıklama"
      >
        <b-form-textarea
            v-model="form.description"
        ></b-form-textarea>
      </b-form-group>
      <b-form-checkbox
          v-model="form.isActive"
      >
        {{ form.isActive ? 'Aktif' : 'Pasif' }}
      </b-form-checkbox>
    </b-modal>
    <div class="row mb-3">
      <div class="col d-flex justify-content-end">
        <b-button v-b-modal.modal-quick-reply variant="primary">Hızlı Yanıt Ekle
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
      <template v-slot:cell(aktif)="data">
        <b-form-checkbox switch size="lg" v-model="data.item.aktif" button-variant="secondary"></b-form-checkbox>
      </template>
      <template v-slot:cell(islemler)>
        <b-button v-b-modal.modal-quick-reply variant="primary" size="sm" class="mr-2">Düzenle
          <b-icon icon="pencil-square"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        isActive: false
      },
      loading: false,
      fields: [
        {key: 'baslik', label: 'Başlık'},
        {key: 'aciklama', label: 'Açıklama'},
        {key: 'aktif', label: 'Aktif / Pasif'},
        {key: 'islemler', label: 'İşlemler'},
      ],
      items: [
        {baslik: 'İnternet Bağlantı Sorunu', aciklama: 'Bağlantıda sorun yaşanmaktadır.', aktif: true},
      ]
    }
  }
}
</script>