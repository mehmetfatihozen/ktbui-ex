<template>
    <div class="standart-page">
        <h3 class="title">TAŞINMAZ BİLGİLERİ</h3>
        <div class="card-component mb-5">
            <div class="body">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Taşınmaz Cinsi</label>
                                    <select class="form-control">
                                        <option :value="null">Seçiniz</option>
                                        <option value="BİNA">
                                            BİNA
                                        </option>
                                        <option value="ARSA">
                                            ARSA
                                        </option>
                                        <option value="OTOPARK">
                                            OTOPARK
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Mülkiyet Tipi</label>
                                    <select class="form-control">
                                        <option :value="null">Seçiniz</option>
                                        <option value="KİRA">
                                            KİRA
                                        </option>
                                        <option value="MÜLK">
                                            MÜLK
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Mülkiyet Durumu</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="AKTİF">
                                    AKTİF
                                </option>
                                <option value="PASİF">
                                    PASİF
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Kullanım Durumu</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="KULLANIMDA">
                                    KULLANIMDA
                                </option>
                                <option value="KİRADA">
                                    KİRADA
                                </option>
                                <option value="KİRALIK">
                                    KİRALIK
                                </option>
                                <option value="SATILDI">
                                    SATILDI
                                </option>
                                <option value="ATIL">
                                    ATIL
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Hizmet Türü</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="MERKEZ OFİS">
                                    MERKEZ OFİS
                                </option>
                                <option value="KÜTÜPHANE">
                                    KÜTÜPHANE
                                </option>
                                <option value="MÜDÜRLÜK">
                                    MÜDÜRLÜK
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-2">
                        <div class="form-group">
                            <label>Malik Tipi</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="BİREYSEL">
                                    BİREYSEL
                                </option>
                                <option value="TÜZEL">
                                    TÜZEL
                                </option>
                                <option value="HAZİNE">
                                    HAZİNE
                                </option>
                                <option value="BELEDİYE">
                                    BELEDİYE
                                </option>
                                <option value="KTB">
                                    KTB
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Malik Adı</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Kiracı Adı</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Bağlı Birim</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="Birim 1">
                                    Birim 1
                                </option>
                                <option value="Birim 2">
                                    Birim 2
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group">
                            <label>Alt Birim</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="Birim 1">
                                    Alt Birim 1
                                </option>
                                <option value="Birim 2">
                                    Alt Birim 2
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="form-group">
                            <label>Birim</label>
                            <select class="form-control">
                                <option :value="null">Seçiniz</option>
                                <option value="Birim 1">
                                    Birim 1
                                </option>
                                <option value="Birim 2">
                                    Birim 2
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group">
                            <label>Taşınmaz Adı</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer d-flex justify-content-end">
                <button class="btn btn-outline-primary">Detaylı Arama</button>
                <button class="btn btn-outline-secondary">Temizle</button>
                <button class="btn btn-secondary">Listele</button>
            </div>
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="fit">No</th>
                <th style="width:20%">Taşınmaz Adı</th>
                <th style="width:5%">Cinsi</th>
                <th style="width:2%">Mülkiyet</th>
                <th style="width:5%">Hizmet Türü</th>
                <th style="width:5%">İl</th>
                <th style="width:5%">İlçe</th>
                <th style="width:7%">Durumu</th>
                <th style="width:5%">Kullanım</th>
                <th style="width:8%">Malik Tipi</th>
            </tr>
            </thead>
            <tbody>
            <tr class="cursor-pointer" @click="$router.push('/support-services/immovable/detail/1')">
                <td>9999999</td>
                <td>ADANA İL MÜDÜRLÜĞÜ</td>
                <td>BİNA</td>
                <td>KİRA</td>
                <td>MÜDÜRLÜK</td>
                <td>ADANA</td>
                <td>MERKEZ</td>
                <td>AKTİF</td>
                <td>KULLANIMDA</td>
                <td>ÖZEL İDARE</td>
            </tr>
            <tr class="cursor-pointer" @click="$router.push('/support-services/immovable/detail/1')">
                <td>9999999</td>
                <td>XYZ KÜTÜPHANESİ</td>
                <td>BİNA</td>
                <td>MÜLK</td>
                <td>KÜTÜPHANE</td>
                <td>KÜTAHYA</td>
                <td>MERKEZ</td>
                <td>PASİF</td>
                <td>SATILDI</td>
                <td></td>
            </tr>
            <tr class="cursor-pointer" @click="$router.push('/support-services/immovable/detail/1')">
                <td>9999999</td>
                <td>İMİT HİZMET BİNASI</td>
                <td>BİNA</td>
                <td>KİRA</td>
                <td>MERKEZ OFİS</td>
                <td>ANKARA</td>
                <td>ÇANKAYA</td>
                <td>AKTİF</td>
                <td>KULLANIMDA</td>
                <td>BELEDİYE</td>
            </tr>
            <tr class="cursor-pointer" @click="$router.push('/support-services/immovable/detail/1')">
                <td>9999999</td>
                <td>EMEK HİZMET BİNASI</td>
                <td>BİNA</td>
                <td>MÜLK</td>
                <td>MERKEZ OFİS</td>
                <td>ANKARA</td>
                <td>ÇANKAYA</td>
                <td>AKTİF</td>
                <td>KULLANIMDA</td>
                <td>KTB</td>
            </tr>
            <tr class="cursor-pointer" @click="$router.push('/support-services/immovable/detail/1')">
                <td>9999999</td>
                <td>ULUS HİZMET BİNASI</td>
                <td>BİNA</td>
                <td>MÜLK</td>
                <td>MERKEZ OFİS</td>
                <td>ANKARA</td>
                <td>ÇANKAYA</td>
                <td>AKTİF</td>
                <td>KULLANIMDA</td>
                <td>KTB</td>
            </tr>
            </tbody>
        </table>
        <div class="row">
            <div class="col">
                <i class="text-secondary">112 kayıttan
                    1-15 arası gösterilmektedir</i>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col d-flex justify-content-end">
                        <nav>
                            <paginate
                                      :page-count="3"
                                      :prev-text="'Önceki'"
                                      :next-text="'Sonraki'"
                                      :active-class="'active'"
                                      :container-class="'pagination'">
                            </paginate>
                        </nav>
                    </div>
                    <div class="col-2">
                        <select class="form-control" v-model="form.pageSize" @change="list()">
                            <option value="25" selected>25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="alert alert-danger text-center" v-if="showError">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                showError: false,
                errorMessage: '',
                form: {
                    currentPage: 1,
                    pageSize: 25,
                    city: null,
                    district: null,
                    companyName: '',
                    shortTitle: '',
                    taxNo: '',
                    state: null,
                    sector: null
                }
            }
        },
        methods: {
            ...mapActions('parameter', ['getDistrictsByCityId']),
            ...mapActions('supplierManagement', ['getFilterParameters', 'searchSupplier']),
            changePage(pageNumber) {
                this.form.currentPage = pageNumber;
                this.list();
            },
            list() {
                this.$store.state.supplierManagement.suppliers = Object.assign([], []);
                this.$store.state.supplierManagement.suppliersPagination = Object.assign({}, {});
                if (this.isEmptyFilterForm()) {
                    this.showError = true;
                    this.errorMessage = "Listeleme için en az bir kriter girilmelidir";
                    return;
                }
                this.searchSupplier(this.form).then(res => {
                    if (res.tedarikciler.length === 0) {
                        this.showError = true;
                        this.errorMessage = "Listeleme için uygun kayıt bulunamadı";
                    } else {
                        this.showError = false;
                    }
                    this.$store.state.supplierManagement.showNewSupplierButton = true;
                });
            },
            clear() {
                this.form = {
                    currentPage: 1,
                    pageSize: 25,
                    city: null,
                    district: null,
                    companyName: '',
                    shortTitle: '',
                    taxNo: '',
                    state: null,
                    sector: null
                };
                this.showError = false;
                this.errorMessage = '';
                this.$store.state.supplierManagement.supplier = Object.assign({}, {});
                this.$store.state.supplierManagement.suppliers = Object.assign([], []);
                this.$store.state.supplierManagement.suppliersPagination = Object.assign({}, {});
            },
            isEmptyFilterForm() {
                return this.form.city == null &&
                    this.form.district == null &&
                    this.form.companyName === '' &&
                    this.form.shortTitle === '' &&
                    this.form.taxNo === '' &&
                    this.form.state === null &&
                    this.form.sector === null
            }
        },
        mounted() {
        },
        created() {
            this.$store.state.supplierManagement.showNewSupplierButton = false;
            this.clear();
            this.getFilterParameters();
        },
        watch: {
            'form.city'(nw) {
                this.form.district = null;
                if (nw) {
                    this.getDistrictsByCityId(nw);
                } else {
                    this.$store.state.parameter.districts = Object.assign([]);
                }
            }
        }
    };
</script>
