<template>
  <div class="d-content">
    <table class="table table-hover">
      <thead>
      <tr>
        <th class="fit">No</th>
        <th>Tespit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in list" :key="index">
        <td class="fit text-center">{{ item.detayNo }}</td>
        <td>{{ item.aciklama }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: ['data', 'list'],
}
</script>