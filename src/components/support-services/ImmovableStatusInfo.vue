<template>
    <div>
        <b-modal
                id="modal-add-edit"
                size="lg"
                centered
                :title="modalTitle"
                ok-title="Kaydet"
                ok-variant="success"
                cancel-title="İptal"
                cancel-variant="outline-secondary"
                :busy="overlay"
                @ok.prevent="save"
                @hidden="clear"
        >
            <div class="row">
                <div class="col-sm-3">
                    <div class="form-group"><label>Mülkiyet Durumu</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="AKTİF">AKTİF</option>
                        <option value="PASİF">PASİF</option>
                    </select></div>
                </div>
                <div class="col-sm-9">
                    <div class="form-group">
                        <label>Kulllanım Durumu</label>
                        <input type="text" class="form-control" v-model="form.title"
                               :class="{ 'is-invalid': $v.form.title.$error }">
                        <template v-if="$v.form.title.$error">
                            <small class="text-danger" v-if="!$v.form.title.required">Kullanım DUrumu
                                girilmelidir</small>
                        </template>
                    </div>
                </div>
            </div>
        </b-modal>
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="fit">Mülkiyet Durumu</th>
                <th>Kullanım Durumu</th>
                <th class="fit">Kullanıcı Adı</th>
                <th class="fit">İşlem Tarihi</th>
                <td class="fit text-right">
                    <PlusCircleIcon @click.native="showAddModal"/>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="fit">PASIF</td>
                <td>TAŞINMA</td>
                <td class="fit">necmi.ozben</td>
                <td class="fit">31.10.2020 12:32</td>
                <td></td>
            </tr>
            <tr>
                <td class="fit">AKTİF</td>
                <td>KİRALIK</td>
                <td class="fit">necmi.ozben</td>
                <td class="fit">31.10.2020 12:32</td>
                <td></td>
            </tr>
            <tr>
                <td class="fit">YENİ KAYIT</td>
                <td>YENİ KAYIT</td>
                <td class="fit">necmi.ozben</td>
                <td class="fit">31.10.2020 12:32</td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PlusCircleIcon from "@/components/PlusCircleIcon";
    import {mapActions} from "vuex";
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/tr';
    import {required, requiredIf} from "vuelidate/lib/validators";

    export default {
        components: {
            PlusCircleIcon,
        },
        data() {
            return {
                disabledDate: (date) => date < this.$moment(new Date()).add(-1, 'days'),
                modalTitle: 'Yeni Durum Girişi',
                selectedId: null,
                overlay: false,
                optionsTo: [],
                optionsCc: [],
                maxDescriptionLength: 500,
                form: {
                    id: null,
                    employeeId: this.$route.params.id,
                    title: '',
                    description: '',
                    remind: false,
                    dateTime: '',
                    receiverTo: [],
                    receiverToString: '',
                    receiverCc: [],
                    receiverCcString: '',
                }
            }
        },
        validations: {
            form: {
                title: {
                    required
                },
                description: {
                    required
                },
                dateTime: {
                    requiredIf: requiredIf(function (form) {
                        return form.remind;
                    })
                },
                receiverTo: {
                    requiredIf: requiredIf(function (form) {
                        return form.remind;
                    })
                }
            }
        },
        methods: {
            ...mapActions('general', ['showModal']),
            ...mapActions('ss', []),
            clear() {
                this.$v.$reset();
                this.form = Object.assign({}, {
                        id: null,
                        employeeId: this.$route.params.id,
                        title: '',
                        description: '',
                        remind: false,
                        dateTime: '',
                        receiverTo: [],
                        receiverToString: '',
                        receiverCc: [],
                        receiverCcString: '',
                    }
                )
            },
            showAddModal() {
                this.isEditing = false;
                this.$bvModal.show('modal-add-edit');
            },
            save() {
                this.$bvModal.hide('modal-add-edit');
            },
        },
        created() {
            //this.getNotes(this.$route.params.id);
        },
        watch: {}
    }
</script>
