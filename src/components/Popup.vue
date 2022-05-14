<template>
  <b-modal
      id="modal-global-message"
      centered
      :title="modal.title"
      ok-variant="secondary"
      ok-title="Tamam"
      :header-bg-variant="modal.type"
      header-text-variant="light"
      ok-only
      @hidden="$store.state.general.showPopup=false"
  >
    {{ modal.message }}
  </b-modal>
</template>

<script>
import {mapState} from "vuex";

export default {
  mounted() {
    this.$bvModal.show('modal-global-message');
  },
  computed: {
    ...mapState('general', ['modal'])
  }
}
</script>