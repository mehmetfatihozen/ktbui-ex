<template>
    <div>
        <div class="card-component new-employee-container">
            <div class="body">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group"><label>Taşınmaz Tipi</label><select class="form-control">
                                    <option value="">Seçiniz</option>
                                    <option value="TAM" selected> TAM</option>
                                    <option value="ARSA"> ARSA</option>
                                    <option value="OTOPARK"> OTOPARK</option>
                                </select></div>
                            </div>
                            <div class="col-6">
                                <div class="form-group"><label>Mülkiyet Tipi</label><select class="form-control">
                                    <option value="">Seçiniz</option>
                                    <option value="KİRA" selected> KİRA</option>
                                    <option value="MÜLK"> MÜLK</option>
                                </select></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group"><label>Hizmet Türü</label>
                            <select class="form-control">
                                <option value="">Seçiniz</option>
                                <option value="MERKEZ OFİS"> MERKEZ OFİS</option>
                                <option value="KÜTÜPHANE"> KÜTÜPHANE</option>
                                <option value="MÜDÜRLÜK" selected> MÜDÜRLÜK</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Malik Tipi</label>
                            <select class="form-control">
                                <option value="">Seçiniz</option>
                                <option value="BİREYSEL" selected> BİREYSEL</option>
                                <option value="TÜZEL"> TÜZEL</option>
                                <option value="HAZİNE"> HAZİNE</option>
                                <option value="BELEDİYE"> BELEDİYE</option>
                                <option value="KTB"> KTB</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Ülke</label>
                            <select class="form-control">
                                <option value="">Seçiniz</option>
                                <option value="TÜRKİYE" selected> TÜRKİYE</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <div class="form-group">
                            <label>Şehir</label>
                            <select class="form-control">
                                <option value="">Seçiniz</option>
                                <option value="ADANA" selected> ADANA</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>İlçe</label>
                            <select class="form-control">
                                <option value="">Seçiniz</option>
                                <option value="ADANA" selected> SEYHAN</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="form-group">
                            <label>Adres</label>
                            <input type="text" class="form-control" value="MERKEZ MAH. KÜLTÜR CAD. NO.202">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <div class="form-group">
                            <label>Ada</label>
                            <input type="text" value="27012" class="form-control">
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Pafta</label>
                            <input type="text" value="16" class="form-control">
                        </div>
                    </div>
                    <div class="col-1">
                        <div class="form-group">
                            <label>Arsa M2</label>
                            <input type="text" value="1.500,00" class="form-control">
                        </div>
                    </div>
                    <div class="col-1">
                        <div class="form-group">
                            <label>Bina M2</label>
                            <input type="text" value="2.900,00" class="form-control">
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group"><label>Taşınmaz Adı</label>
                            <input type="text" class="form-control" value="ADANA İL MÜDÜRLÜĞÜ">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group"><label>Açıklama</label>
                            <textarea class="form-control" rows="10"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-2 d-flex justify-content-end mt-4">
                        <button class="btn btn-outline-secondary btn-block mt-0 mr-2">Vazgeç</button>
                        <button class="btn btn-success btn-block mt-0">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="operation mt-5">
            <h5 style="font-weight: bold;" class="mb-3">BİRİMLER</h5>
            <div class="row" v-if="!isHistoryOpen">
                <div class="col-sm-2">
                    <div class="form-group"><label>Bağlı Birim</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="Birim 1">Birim 1</option>
                        <option value="Birim 2">Birim 2</option>
                    </select></div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group"><label>Alt Birim</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="Alt Birim 1">Alt Birim 1</option>
                        <option value="Alt Birim 2">Alt Birim 2</option>
                    </select></div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group"><label>Birim</label><select class="form-control">
                        <option value="">Seçiniz</option>
                        <option value="Birim 1">Birim 1</option>
                        <option value="Birim 2">Birim 2</option>
                    </select></div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group"><label>M2</label>
                        <input type="text" class="form-control" value="">
                    </div>
                </div>
                <div class="col-sm-1">
                    <div class="form-group">
                        <label>SMS Bilgi</label><br/>
                        <label class="label_switch">
                            <input type="checkbox">
                            <span class="mr-2"></span>
                        </label>
                    </div>
                </div>
                <div class="col-sm-1">
                    <label>&nbsp;</label>
                    <PlusCircleIcon class="mt-3"/>
                </div>
            </div>
        </div>
        <table class="table table-hover" v-if="!isHistoryOpen">
            <thead>
            <tr>
                <th>Birim</th>
                <th class="fit">M2</th>
                <th class="fit">Birim</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>ADANA İL KÜLTÜR MÜDÜRLÜĞÜ</td>
                <td>1.000,00</td>
                <td>
                    <button class="btn btn-outline-secondary" @click="showHistory">Tarihçe</button>
                </td>
            </tr>
            <tr>
                <td>ADANA KÜTÜPHANELER MÜDÜRLÜĞÜ</td>
                <td>1.900,00</td>
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
                    <th>M2</th>
                    <th class="fit">Pasif</th>
                    <th class="fit">Kullanıcı</th>
                    <th class="fit">Kayıt Tarihi</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1.000,00</td>
                    <td>EVET</td>
                    <td>necmi.ozben</td>
                    <td>15.12.2020 15:35</td>
                </tr>
                <tr>
                    <td>1.000,00</td>
                    <td>HAYIR</td>
                    <td>necmi.ozben</td>
                    <td>15.12.2020 15:35</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import 'vue2-datepicker/index.css';
    import {mapActions, mapState} from "vuex";
    import PlusCircleIcon from "../PlusCircleIcon";

    export default {
        components: {
            PlusCircleIcon,
        },
        data() {
            return {
                isHistoryOpen: false
            };
        },
        validations: {},
        methods: {
            ...mapActions('general', ['showModal']),
            showHistory() {
                this.isHistoryOpen = true
            },
            hideHistory() {
                this.isHistoryOpen = false
            }
        },
        created() {
        },
        computed: {
            ...mapState('hr', ['employeeGeneralInfo'])
        },
        watch: {}
    }
</script>
