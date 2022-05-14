<template>
    <div class="standart-page">
        <div class="go-back d-flex justify-content-end mb-3">
            <button class="btn btn-outline-secondary" @click="$router.push('/support-services')">
                <font-awesome-icon icon="angle-double-left" class="mr-2"/>
                Listeye Geri Dön
            </button>
        </div>
        <h3 class="title">23233 - ADANA İL MÜDÜRLÜĞÜ</h3>
        <div class="row justify-content-center mb-4">
            <div class="col-5 d-flex justify-content-center">
                <button class="btn btn-block mr-2 mt-0" :class="activeTab===0?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(0,'ImmovableGeneralInfo')">Genel
                    Bilgiler
                </button>
                <button class="btn btn-block mr-2 mt-0" :class="activeTab===1?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(1,'EmployeeGeneralInfo')">Kiralama Bilgileri
                </button>
                <button class="btn btn-block mr-2 mt-0" :class="activeTab===2?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(2,'ImmovableSubscriptionInfo')">Abonelik Bilgileri
                </button>
                <button class="btn btn-block mr-2 mt-0" :class="activeTab===3?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(3,'ImmovableStatusInfo')">Durum Bilgileri
                </button>
                <button class="btn btn-block mr-2 mt-0" :class="activeTab===4?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(4,'ImmovableDocuments')">
                    Dokümanlar
                </button>
                <button class="btn btn-block mt-0" :class="activeTab===5?'btn-secondary':'btn-outline-secondary'"
                        @click="changeComponent(5,'ImmovableNotes')">Notlar
                </button>
            </div>
        </div>


        <component :is="$store.state.ss.detail.currentTab"/>



    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {mapActions} from "vuex";

    export default {
        components: {},
        data() {
            return {
                activeTab: 0
            }
        },
        validations: {
            staffType: {
                required
            }
        },
        methods: {
            ...mapActions('ss', ['changeDetailTab']),
            changeComponent(id, cmp) {
                this.activeTab = id;
                this.changeDetailTab(cmp);
            }
        },
        created() {
            this.changeComponent(0, 'ImmovableGeneralInfo');
            this.$store.state.ss.showNewImmovableButton = false;
        }
    }
</script>
