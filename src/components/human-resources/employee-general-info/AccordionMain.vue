<template>
  <div class="accordion mt-4" role="tablist">
    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-1>
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                  variant="null">
          Durum Bilgileri
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
          <StatusInfo/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-2>
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                  variant="null">
          Kullanıcı Bilgileri
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
          <UserInfo/>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-3>
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                  variant="null">
          Telefon Bilgileri
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
          <PhoneInfo/>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-4>
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                  variant="null">
          Email Bilgileri
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
          <EmailInfo/>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body>
      <b-card-header header-tag="header" role="tab" class="mr-0" v-b-toggle.accordion-5>
        <b-button class="w-100 text-left d-flex justify-content-between btn btn-link  font-weight-bold"
                  variant="null">
          Adres Bilgileri
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
          <AddressInfo/>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import StatusInfo from "@/components/human-resources/employee-general-info/accordion/StatusInfo";
import UserInfo from "@/components/human-resources/employee-general-info/accordion/UserInfo";
import PhoneInfo from "@/components/human-resources/employee-general-info/accordion/PhoneInfo";
import EmailInfo from "@/components/human-resources/employee-general-info/accordion/EmailInfo";
import AddressInfo from "@/components/human-resources/employee-general-info/accordion/AddressInfo";

export default {
  components: {AddressInfo, EmailInfo, PhoneInfo, UserInfo, StatusInfo}
}
</script>