<template>
  <div>
    <div class="row">
      <div class="col-10">
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Ad</label>
              <input type="text" class="form-control">
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Soyad</label>
              <input type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Cinsiyet</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Uyruk</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>TC Kimlik No</label>
              <input type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Doğum Tarihi</label>
              <span class="datepicker">
            <input type="text" class="form-control"/>
          </span>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Baba Adı</label>
              <input type="text" class="form-control">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Medeni Durum</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Askerlik Durumu</label>
              <select class="form-control" disabled>
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Tescil Tarihi</label>
              <span class="datepicker">
            <input type="text" class="form-control" disabled>
          </span>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Kan Grubu</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Öğrenim Durumu</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Engelli Durumu</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label>Durum</label>
              <select class="form-control">
                <option :value="null">Seçiniz</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label>Alt Durum</label>
              <input type="text" class="form-control" disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 d-flex justify-content-center">
        <div class="user-avatar">
          <img src="@/assets/img/icons/user.png" alt="">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-right">
        <button class="btn btn-danger">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>