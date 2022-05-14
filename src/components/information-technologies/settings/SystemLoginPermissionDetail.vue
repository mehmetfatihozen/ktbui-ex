<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Kullanıcı : merve.aydin</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeSystemLoginPermissionComponent('SystemLoginPermission')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th class="fit">P. Tipi</th>
        <th class="fit">Sicil No</th>
        <th>Bölüm - Birim - Ünvan</th>
        <th class="fit">Maaş Tipi</th>
        <th class="fit">Gün</th>
        <th class="fit">Pasif</th>
        <th class="fit">Giriş</th>
        <th class="fit"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="fit">MERKEZ</td>
        <td class="fit">1234</td>
        <td>merve.aydin</td>
        <td class="fit">TAM ZAMANLI</td>
        <td class="fit"></td>
        <td class="fit"></td>
        <td class="fit text-center">
          <b-form-checkbox></b-form-checkbox>
        </td>
        <td class="fit">
          <button class="btn btn-sm btn-outline-secondary btn-parameter"
                  @click="changeSystemLoginPermissionComponent('SystemLoginPermissionDetailHistory')">Tarihçe
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('informationTechnologies', ['changeSystemLoginPermissionComponent'])
  }
}
</script>