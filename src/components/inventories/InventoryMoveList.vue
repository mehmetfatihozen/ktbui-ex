<template>
  <div class="dashboard">
    <div class="left">

      <div class="my-tasks">

        <table class="table">
          <thead>
          <tr>
            <th>İşlem Türü</th>
            <th>Fiş No</th>
            <th>Fiş Tarihi</th>
            <th>Belge No</th>
            <th>Belge Tipi</th>
            <th>Belge Tarihi</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="index in 2" :key="index">
            <td>Demirbaş Giriş</td>
            <td>DG-0002</td>
            <td>04.09.2020</td>
            <td></td>
            <td>BELGESİ</td>
            <td>04.09.2020</td>
            <td><a v-b-modal.modal-move-list><font-awesome-icon icon="eye" class="mr-2"/></a> </td>
          </tr>
          <tr v-for="index in 2" :key="index">
            <td>Demirbaş Personel Zİmmeti</td>
            <td>PZ-0002</td>
            <td>04.09.2020</td>
            <td></td>
            <td>BELGESİ</td>
            <td>07.09.2020</td>
            <td><a v-b-modal.modal-move-list><font-awesome-icon icon="eye" class="mr-2"/></a> </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    <b-modal id="modal-move-list" centered title="DG-0003" ok-variant="success" hide-footer=true size="xl">
      <table class="table">
        <thead>
        <tr>
          <th>Demirbaş Adı</th>
          <th>Miktar</th>
          <th>Birim Fiyatı</th>
          <th>Dövizli B.F</th>
          <th>KDV Oranı</th>
          <th>Tutar</th>
          <th>Garanti Başlangıç Tarihi</th>
          <th>Garanti Bitiş Tarihi</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="index in 1" :key="index">
          <td>BİLGİSAYAR KASASI HP</td>
          <td>5</td>
          <td>10</td>
          <td>0</td>
          <td>18</td>
          <td>59</td>
          <td>30.12.2019</td>
          <td>30.12.2021</td>
        </tr>
        </tbody>
      </table>

    </b-modal>
  </div>
</template>

<script>
export default {
name: "InventoryMoveList"
}
</script>

<style scoped>

</style>