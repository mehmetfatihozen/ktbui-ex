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
            <div class="form-group">
                <label>Konu</label>
                <input type="text" class="form-control" v-model="form.title"
                       :class="{ 'is-invalid': $v.form.title.$error }">
                <template v-if="$v.form.title.$error">
                    <small class="text-danger" v-if="!$v.form.title.required">Konu girilmelidir</small>
                </template>
            </div>
            <div class="form-group">
                <label class="d-flex justify-content-between">Not <span
                        class="text-secondary">Kalan Karakter : <span
                        :class="{'text-danger':(maxDescriptionLength - form.description.length)<50}">{{
            maxDescriptionLength - form.description.length
          }}</span></span></label>
                <textarea rows="5" class="form-control"
                          :maxlength="maxDescriptionLength"
                          v-model="form.description"
                          :class="{ 'is-invalid': $v.form.description.$error }"
                ></textarea>
                <template v-if="$v.form.description.$error">
                    <small class="text-danger" v-if="!$v.form.description.required">Not girilmelidir</small>
                </template>
            </div>
            <div class="row">
                <div class="col-sm-auto">
                    <div class="form-group">
                        <label class="d-block">Hatırlatma</label>
                        <label class="label_switch d-inline-block">
                            <input type="checkbox" :false-value="false" :true-value="true" v-model="form.remind">
                            <span class="mr-2"></span>
                        </label>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group ">
                        <label>Tarih / Saat</label>
                        <date-picker v-model="form.dateTime"
                                     format="DD.MM.YYYY HH:mm"
                                     :disabled="!form.remind"
                                     type="datetime"
                                     :input-class="$v.form.dateTime.$error ?'is-invalid form-control':'form-control'"
                                     valueType="format"
                                     :disabled-date="disabledDate"
                        ></date-picker>
                        <template v-if="$v.form.dateTime.$error">
                            <small class="text-danger" v-if="!$v.form.dateTime.requiredIf">Tarih / Saat
                                seçilmelidir</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Alıcı (TO)</label>
                <multiselect
                        v-model="form.receiverTo"
                        placeholder="Alıcı email adresi yazıp ENTER tuşuna basın"
                        label="name"
                        selectLabel="Eklemek için enter tuşuna basın" selectedLabel="Seçildi"
                        deselectLabel="Silmek için enter tuşuna basın" track-by="name"
                        tagPlaceholder="Eklemek için enter tuşuna basın"
                        :options="optionsTo"
                        :multiple="true"
                        :taggable="true"
                        @tag="addTagTo"
                        :class="{ 'is-invalid': $v.form.receiverTo.$error }"
                >
                    <template slot="noOptions">
                        Henüz e-posta eklenmemiş
                    </template>
                    <template slot="caret" class="d-none">
                    </template>
                </multiselect>
                <template v-if="$v.form.receiverTo.$error">
                    <small class="text-danger" v-if="!$v.form.receiverTo.requiredIf">Alıcı (TO) girilmelidir</small>
                </template>
            </div>
            <div class="form-group">
                <label>Alıcı (CC)</label>
                <multiselect
                        v-model="form.receiverCc"
                        placeholder="Alıcı email adresi yazıp ENTER tuşuna basın"
                        label="name"
                        selectLabel="Eklemek için enter tuşuna basın" selectedLabel="Seçildi"
                        deselectLabel="Silmek için enter tuşuna basın" track-by="name"
                        tagPlaceholder="Eklemek için enter tuşuna basın"
                        :options="optionsCc"
                        :multiple="true"
                        :taggable="true"
                        @tag="addTagCc"
                >
                    <template slot="noOptions">
                        Henüz e-posta eklenmemiş
                    </template>
                </multiselect>
            </div>
        </b-modal>
        <b-modal
                id="modal-delete"
                centered
                title="Not Sil"
                ok-title="Sil"
                ok-variant="danger"
                header-bg-variant="danger"
                header-text-variant="light"
                cancel-title="Vazgeç"
                cancel-variant="outline-secondary"
                :busy="overlay"
                @ok.prevent="remove"

        >
            Notu silmek istediğine emin misiniz?
        </b-modal>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Konu</th>
                <th class="fit">Hatırlatma Tarihi</th>
                <th class="fit">Kullanıcı Adı</th>
                <th class="fit">Kayıt Tarihi</th>
                <th class="fit text-right">
                    <Can I="create" a="ik/personel">
                        <PlusCircleIcon @click.native="showAddModal"/>
                    </Can>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="cursor-pointer" @click="showEditModal(1)">
                <td>Deneme 11111</td>
                <td class="fit">31.12.2020 12:12</td>
                <td class="fit">necmi.ozben</td>
                <td class="fit">31.10.2020 12:32</td>
                <td class="fit text-right">
                    <button class="btn btn-sm btn-outline-secondary" @click.stop="showDeleteModal(1)">
                        <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PlusCircleIcon from "@/components/PlusCircleIcon";
    import {mapActions} from "vuex";
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/tr';
    import {required, requiredIf, email} from "vuelidate/lib/validators";

    export default {
        components: {
            PlusCircleIcon,
            DatePicker
        },
        data() {
            return {
                disabledDate: (date) => date < this.$moment(new Date()).add(-1, 'days'),
                modalTitle: 'Yeni Not Girişi',
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
            showDeleteModal(id) {
                this.selectedId = id;
                this.$bvModal.show('modal-delete');
            },
            remove() {
                this.overlay = true;
                this.$bvModal.hide('modal-delete');
            },
            showEditModal(id) {
                this.isEditing = true;
                this.modalTitle = 'Not Düzenle';
                this.form.id = id;
                this.form.title = "BTGM Bütçe revizyon Talebi için hatırlatma";
                this.form.description = "BGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatmaBGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatma BGTM Bütçe revizyon talebi için hatırlatma";
                this.form.remind = true;
                this.form.dateTime = "2020-12-12 13:00:00";
                this.form.receiverToString = 'necmi.ozben@ktb.gov.tr;';
                this.form.receiverCcString = '';
                this.form.receiverTo = [];
                this.form.receiverToString = '';
                this.form.receiverCc = [];
                this.form.receiverCcString = '';
                this.optionsTo = [];
                this.optionsCc = [];
                'necmi.ozben@ktb.gov.tr;ahmet.yilmaz@ktb.gov.tr'.split(';').map(a => {
                    if (a) {
                        const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
                        this.form.receiverTo.push(obj);
                        this.optionsTo.push(obj);
                    }
                });
                /*
                ''.aliciCC.split(';').map(a => {
                    if (a) {
                        const obj = {code: Math.floor((Math.random() * 10000000)), name: a};
                        this.form.receiverCc.push(obj);
                        this.optionsCc.push(obj);
                    }
                });*/
                this.$bvModal.show('modal-add-edit');
            },
            showAddModal() {
                this.isEditing = false;
                this.$bvModal.show('modal-add-edit');
            },
            save() {
                this.$bvModal.hide('modal-add-edit');
            },
            addTagTo(newTag) {
                if (email(newTag)) {
                    const tag = {
                        name: newTag,
                        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                    }
                    this.optionsTo.push(tag)
                    this.form.receiverTo.push(tag)
                } else {
                    this.showModal({title: 'Hata!', message: 'Geçersiz e-posta formatı', type: 'danger'});
                }
            },
            addTagCc(newTag) {
                if (email(newTag)) {
                    const tag = {
                        name: newTag,
                        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                    }
                    this.optionsCc.push(tag)
                    this.form.receiverCc.push(tag)
                } else {
                    this.showModal({title: 'Hata!', message: 'Geçersiz e-posta formatı', type: 'danger'});
                }
            }
        },
        created() {
            //this.getNotes(this.$route.params.id);
        },
        watch: {
            'form.remind'() {
                if (!this.isEditing) {
                    this.form.dateTime = '';
                }
            }
        }
    }
</script>
