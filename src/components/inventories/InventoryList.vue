<template>
  <div class="dashboard">
    <div class="left">

      <div class="my-tasks">
        <table class="table">
          <thead>
          <tr>
            <th>Kod</th>
            <th>Açıklama</th>
            <th>Marka</th>
            <th>Model</th>
            <th>KDV Oranı</th>
            <th>Kullanım Durumu</th>
            <th>Toplam</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="index in 10" :key="index">
            <td>B0001</td>
            <td>BİLGİSAYAR KASASI HP</td>
            <td>HP</td>
            <td>ÇOK FONKSİYONLU YAZICI</td>
            <td>0</td>
            <td>Aktif</td>
            <td>10000</td>
            <td><a v-b-modal.modal-list><font-awesome-icon icon="eye" class="mr-2"/></a> </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    <b-modal id="modal-list" centered title="B0001 DETAY" ok-variant="success" hide-footer=true size="xl">
      <table class="table">
        <thead>
        <tr>
          <th>Kod</th>
          <th>Açıklama</th>
          <th>İş Yeri</th>
          <th>Bölüm</th>
          <th>Barkod</th>
          <th>Tipi</th>
          <th>Durumu</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="index in 1" :key="index">
          <td>D-0000006</td>
          <td>BİLGİSAYAR KASASI HP</td>
          <td>GENEL MÜDÜRLÜK</td>
          <td>YAZILIM BÖLÜMÜ</td>
          <td>0001-0101-080001-D-00000022</td>
          <td>DEVİR</td>
          <td>ZİMMETLENDİ</td>
        </tr>
        </tbody>
      </table>

    </b-modal>
  </div>
</template>

<script>
export default {
name: "InventoryList"
}
</script>

<style scoped>

</style>