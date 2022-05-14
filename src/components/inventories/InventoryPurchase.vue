<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Tedarikçi:</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>

              </select>
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <label>Satın Alma Tarihi:</label>
              <span class="datepicker">
                    <input type="text" class="form-control">
                  </span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Fatura No</label>
              <input type="text" class="form-control" placeholder="Fatura No">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Tutar</label>
              <b-input-group >
                <input type="text" class="form-control" placeholder="Tutar">
                <template v-slot:append class="ml-5">
                  <b-form-select v-model="selectedPriceCurrency" :options="currencies"></b-form-select>
                </template>
              </b-input-group>

            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>KDV Dahil Tutar</label>
              <b-input-group >
                <input type="text" class="form-control" placeholder="Tutar">
                <template v-slot:append class="ml-5">
                  <b-form-select v-model="selectedPriceCurrency" :options="currencies"></b-form-select>
                </template>
              </b-input-group>

            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Kur</label>
              <input type="text" class="form-control" placeholder="Kur">
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: "InventoryPurchase",

  data() {
    return {
      selectedPriceCurrency: null,
      currencies: [
          {value: null, text: 'Döviz Cinsi'},
          {value: 'TL', text: 'TL'},
          {value: 'USD', text: 'USD'},
          {value: 'EURO', text: 'EURO'},
          ]
    }
  },
  methods: {}
}
</script>

