<template>
  <div>
    <b-modal id="modal-center" size="lg" centered title="Yeni Kullanıcı Bilgileri" ok-title="Kaydet" ok-variant="success" cancel-title="İptal" cancel-variant="outline-secondary">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>Sicil No</label>
            <input type="text" class="form-control" >
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Şehir</label>
            <select class="form-control">
              <option :value="null">Seçiniz</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Maaş Tipi</label>
            <select class="form-control">
              <option :value="null">Seçiniz</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>Birimi</label>
            <select class="form-control">
              <option :value="null">Seçiniz</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Bölümü</label>
            <select class="form-control">
              <option :value="null">Seçiniz</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Ünvanı</label>
            <select class="form-control">
              <option :value="null">Seçiniz</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <toggle-button/>
        </div>
      </div>
    </b-modal>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Sicil No</th>
        <th>Bölümü</th>
        <th>Birimi</th>
        <th>Ünvanı</th>
        <th>Maaş Tipi</th>
        <th>Pasif</th>
        <th class="text-right">
          <img src="@/assets/img/icons/plus-circle.png" alt="" class="cursor-pointer" v-b-modal.modal-center >
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <font-awesome-icon icon="eye" class="cursor-pointer"/>
        </td>
        <td>121</td>
        <td>BİLGİ TEKNOLOJİLERİ</td>
        <td>BİLGİ TEKNOLOJİLERİ</td>
        <td>PERSONEL</td>
        <td>TAM ZAMANLI</td>
        <td>ÇALIŞAN</td>
        <td class="text-right">
          <button class="mr-2 btn btn-sm btn-outline-secondary">Maaş Merkezi</button>
          <button class="btn btn-sm btn-outline-secondary">Tarihçe</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {}
</script>