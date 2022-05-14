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
                    <div class="form-group"><label>Abonelik Tipi</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="ELEKTRİK">ELEKTRİK</option>
                        <option value="DOĞALGAZ">DOĞALGAZ</option>
                        <option value="SU">SU</option>
                        <option value="TELEFON">TELEFON</option>
                    </select></div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>Sayaç/Tesisat No</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>Sözleşme/Hesap No</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group"><label>Abone Şirket Adı</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="CVK">CVK</option>
                        <option value="Türk Telekom">Türk Telekom</option>
                        <option value="Turkcell">Turkcell</option>
                    </select></div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group"><label>Birim</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="Birim 1">Birim 1</option>
                        <option value="Birim 2">Birim 2</option>
                        <option value="Birim 3">Birim 3</option>
                    </select></div>
                </div>
            </div>
        </b-modal>
        <table class="table table-hover" v-if="!isHistoryOpen">
            <thead>
            <tr>
                <th style="width:13%">Abonelik Tipi</th>
                <th style="width:13%">Sayaç/Tesisat No</th>
                <th style="width:13%">Sözleşme/Hesap No</th>
                <th>Abone Firma</th>
                <th>Birim</th>
                <td class="fit">
                    <PlusCircleIcon @click.native="showAddModal"/>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ELEKTRİK</td>
                <td>67489567</td>
                <td>8223604</td>
                <td>CK BOĞAZİÇİ</td>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="isHistoryOpen">
            <div class="row">
                <div class="col-sm-8">
                    <b>TARİHÇE : ELEKTRİK - 67489730</b>
                </div>
                <div class="col-sm-4 text-right">
                    <button class="btn btn-outline-secondary" @click="hideHistory">
                        Geri Dön
                    </button>
                </div>
            </div>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th style="width:13%">Abonelik Tipi</th>
                    <th style="width:13%">Sayaç/Tesisat No</th>
                    <th style="width:13%">Sözleşme/Hesap No</th>
                    <th>Abone Firma</th>
                    <th>Birim</th>
                    <th>Pasif</th>
                    <th>Kullanıcı</th>
                    <th>Kayıt Tarihi</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>ELEKTRİK</td>
                    <td>67489567</td>
                    <td>8223604</td>
                    <td>CK BOĞAZİÇİ</td>
                    <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                    <td>EVET</td>
                    <td>necmi.ozben</td>
                    <td>15.12.2020 15:35</td>
                </tr>
                <tr>
                    <td>ELEKTRİK</td>
                    <td>67489567</td>
                    <td>8223604</td>
                    <td>CK BOĞAZİÇİ</td>
                    <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                    <td>Hayır</td>
                    <td>necmi.ozben</td>
                    <td>15.12.2019 15:35</td>
                </tr>
                </tbody>
            </table>
        </div>
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
                },
                isHistoryOpen: false
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
            showHistory() {
                this.isHistoryOpen = true
            },
            hideHistory() {
                this.isHistoryOpen = false
            }
        },
        created() {
            //this.getNotes(this.$route.params.id);
        },
        watch: {}
    }
</script>
