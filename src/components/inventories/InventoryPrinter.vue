<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Baskı Türü:</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Baskı Hızı</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Kağıt Boyutları</label>
              <select class="form-control" multiple>

                <option value="">A2</option>
                <option value="">A3</option>
                <option value="">A4</option>
                <option value="">A5</option>

              </select>
            </div>
          </div>
        </div>
        <div class="row">

          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Dubleks Baskı</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Dahili Bellek</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Fotokopi</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Tarayıcı</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Faks</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">USB</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Wireless</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Ethernet Girişi</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>