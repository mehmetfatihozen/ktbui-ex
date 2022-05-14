<template>
  <div class="dashboard">
    <div class="left">

      <div class="my-tasks">

        <table class="table">
          <thead>
          <tr>
            <th>Kod</th>
            <th>Açıklama</th>
            <th>İş Yeri</th>
            <th>Bölüm</th>
            <th>Alt Lokasyon</th>
            <th>Personel</th>
            <th>İşlem</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="index in 10" :key="index">
            <td>B0001</td>
            <td>BİLGİSAYAR KASASI HP</td>
            <td>GENEL MÜDÜRLÜK</td>
            <td>İNSAN KAYNAKLARI</td>
            <td></td>
            <td>MUHAMMED YÜCE</td>
            <td><a href="#"><font-awesome-icon icon="eye" class="mr-2"/></a> </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "InventoryRecordList"
}
</script>

<style scoped>

</style>