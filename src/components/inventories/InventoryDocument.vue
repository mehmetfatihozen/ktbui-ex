<template>
  <div>
    <b-modal
        id="modal-add-document"
        size="lg"
        centered
        title="Döküman Ekle"
        ok-title="Kaydet"
        ok-variant="success"
        cancel-title="İptal"
        cancel-variant="outline-secondary">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Personel Adı</label>
            <input type="text" class="form-control">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Dosya Ekle</label>
            <input type="file" class="form-control">
          </div>
        </div>

      </div>
    </b-modal>
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="w-75">Personel Adı</th>
        <th class="w-25">Dosya Adı</th>
        <th class="fit">İşlem Tarihi</th>
        <th class="fit text-right">
          <PlusCircleIcon class="cursor-pointer" v-b-modal.modal-add-document/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="w-75">Muhammed YÜCE</td>
        <td class="w-25">Envanter 1</td>
        <td class="fit">15.01.2019 12:13</td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
          </button>
        </td>
      </tr>
      <tr>
        <td class="w-75">Muhammed YÜCE</td>
        <td class="w-25">Envanter 2</td>
        <td class="fit">15.01.2019 12:13</td>
        <td class="fit text-right">
          <button class="btn btn-sm btn-outline-secondary">
            <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlusCircleIcon from "@/components/PlusCircleIcon";

export default {
  components: {
    PlusCircleIcon
  }
}
</script>

<style scoped>

</style>