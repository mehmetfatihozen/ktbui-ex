<template>
  <div>
    <component :is="$store.state.sp.monitoring.currentIndicatorComponent"/>
  </div>
</template>

<script>

export default {}
</script>