<template>
  <div>
    <component :is="$store.state.sp.detail.currentIndicatorComponent"/>
  </div>
</template>

<script>

export default {}
</script>