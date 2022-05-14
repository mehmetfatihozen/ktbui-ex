<template>
  <b-modal
      id="modal-add-goal"
      centered
      title="AMAÇ : 1 - Yeni Hedef Girişi"
      ok-title="Kaydet"
      ok-variant="success"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      size="lg"
  >
    <div class="form-group">
      <label>Hedef</label>
      <textarea rows="5" class="form-control"></textarea>
    </div>
    <div class="row">
      <div class="col-sm-auto">
        <div class="form-group">
          <label>Hedef No</label>
          <select class="form-control">
            <option :value="null">Seçiniz</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Sorumlu Birim</label>
          <select class="form-control">
            <option :value="null">Seçiniz</option>
          </select>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {}
</script>