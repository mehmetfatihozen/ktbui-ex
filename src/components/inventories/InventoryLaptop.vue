<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>İşlemci Tipi:</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>İşlemci Detay</label>
              <input type="text" class="form-control" placeholder="İşlemci Detay">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Ram Kapasitesi</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
                <option value="">2 GB</option>
                <option value="">4 GB</option>
                <option value="">8 GB</option>
                <option value="">12 GB</option>
                <option value="">16 GB</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Harddisk Tipi:</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Harddisk Kapasitesi</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
                <option value="">40 GB</option>
                <option value="">80 GB</option>
                <option value="">120 GB</option>
                <option value="">256 GB</option>
                <option value="">512 GB</option>
                <option value="">1 TB</option>
                <option value="">2 TB</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>İkinci Hard Disk Tipi</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>İkinci Hard Disk Kapasitesi</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
                <option value="">40 GB</option>
                <option value="">80 GB</option>
                <option value="">120 GB</option>
                <option value="">256 GB</option>
                <option value="">512 GB</option>
                <option value="">1 TB</option>
                <option value="">2 TB</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Ekran Kartı Tipi</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Ekran Kartı Modeli</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-2">
            <div class="form-group">
              <label>USB Adet</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                <option value="">6</option>
              </select>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">HDMI</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Kart Okuyucu</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Optik Sürücü</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Webcam</label>
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
              <label class="d-block">Bluetooth</label>
              <label class="label_switch">
                <input type="checkbox" :false-value="false" :true-value="true">
                <span class="mr-2"></span>
              </label>
            </div>
          </div>
          <div class="col-sm-auto">
            <div class="form-group">
              <label class="d-block">Display Port</label>
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