<template>
<div>
  <component :is="$store.state.budgetManagement.currentAnnualBudgetStateTransitionsUserAssignment" />
</div>
</template>

<script>
export default {
  name: "annualBudgetStateTransitionsUserAssignment",
}
</script>
