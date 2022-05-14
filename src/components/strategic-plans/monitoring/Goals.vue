<template>
  <div>
    <component :is="$store.state.sp.monitoring.currentGoalsComponent"/>
  </div>
</template>

<script>

export default {}
</script>