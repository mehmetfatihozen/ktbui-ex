<template>
  <div>
    <component :is="$store.state.sp.detail.currentGoalsComponent"/>
  </div>
</template>

<script>

export default {}
</script>