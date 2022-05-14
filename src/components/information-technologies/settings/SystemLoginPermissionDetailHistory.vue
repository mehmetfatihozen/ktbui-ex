<template>
  <div>
    <div class="row mb-3">
      <div class="col"><h5 class="mb-0">Sisteme Giriş Yetki Tarihçesi : merve.aydin</h5></div>
      <div class="col text-right">
        <button class="btn btn-outline-secondary btn-sm"
                @click="changeSystemLoginPermissionComponent('SystemLoginPermissionDetail')">
          <font-awesome-icon icon="angle-left"/>
          Geri Dön
        </button>
      </div>
    </div>
    <table class="table table-hover mt-3">
      <thead>
      <tr>
        <th>Giriş</th>
        <th class="fit">Kullanıcı</th>
        <th class="fit">Tarih</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <font-awesome-icon icon="check" size="lg" class="text-success"/>
        </td>
        <td class="fit">burcu.hamza</td>
        <td class="fit">14.08.2020 12:39</td>
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