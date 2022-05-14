<template>
  <div class="standart-page">
    <h3 class="title">AYARLAR</h3>

    <div class="accordion" role="tablist">
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BAŞVURU DURUM ve ALT DURUMLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <component :is="$store.state.applicationSettings.currentStateComponent"
                       v-bind="$store.state.applicationSettings.currentStateComponentData"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BAŞVURU KONULARI ve DETAYLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <component :is="$store.state.applicationSettings.currentTopicComponent"
                       v-bind="$store.state.applicationSettings.currentTopicComponentData"/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-6>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BAŞVURU DETAYLARI

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Details/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BAŞVURU ÖNCELİĞİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Priorities/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            BAŞVURU TİPİ

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Types/>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-5>
          <b-button class="w-100 text-left d-flex justify-content-between btn btn-link font-weight-bold" variant="null">
            LOKASYONLAR

            <span class="when-opened">
                 <font-awesome-icon icon="chevron-down"/>
                 </span>
            <span class="when-closed">
                     <font-awesome-icon icon="chevron-right"/>
                 </span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Location/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Topics from "@/components/application/settings/TopicDetail";
import Priorities from "@/components/application/settings/Priorities";
import Types from "@/components/application/settings/Types";
import Location from "@/components/application/settings/Location";
import Details from "@/components/application/settings/Details";

export default {
  components: {
    Location,
    Topics,
    Priorities,
    Types,
    Details
  },
  data() {
    return {}
  },
  methods: {}
}
</script>