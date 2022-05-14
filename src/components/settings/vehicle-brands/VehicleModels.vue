<template>
<div>
  {{$store.state.settings.selectedVehicleBrand}}
  <button @click="changeVehicleComponent('VehicleBrandsMain')">Geri Dön</button>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
methods:{
  ...mapActions('settings',['changeVehicleComponent'])
}
}
</script>
