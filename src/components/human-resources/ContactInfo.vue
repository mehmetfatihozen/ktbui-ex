<template>
  <div class="accordion">
    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0">
        <b-button class="btn btn-link text-secondary font-weight-bold" variant="null" v-b-toggle.accordion-1>Adres Bilgileri</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>

        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0">
        <b-button class="btn btn-link text-secondary font-weight-bold" variant="null" v-b-toggle.accordion-2>Telefon Bilgileri</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0">
        <b-button class="btn btn-link text-secondary font-weight-bold" variant="null" v-b-toggle.accordion-3>E-Posta Bilgileri</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>

        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {}
</script>