import axios from 'axios';
import authHeader from './auth-header';


class SupplierService {
    getFilterParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-ara-form`, {
            headers: authHeader()
        });
    }

    getAddParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-ekle-form`, {
            headers: authHeader()
        });
    }

    addSupplier(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-ekle`, {
            firmaTip: parseInt(data.companyId),
            unvan: data.title,
            kisaUnvan: data.shortTitle,
            vergiDaireId: parseInt(data.taxOffice),
            vergiNo: data.taxNo,
            telNo: data.phone,
            faksNo: data.fax,
            webAdres: data.webAddress,
            email: data.email,
            sektor: data.sectors,
            sehirId: parseInt(data.city),
            ilceId: parseInt(data.district),
            postaKodu: data.postCode,
            adres: data.address
        }, {
            headers: authHeader()
        });
    }

    updateSupplier(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-guncelle`, {
            id: parseInt(data.id),
            firmaTip: parseInt(data.companyId),
            unvan: data.title,
            kisaUnvan: data.shortTitle,
            vergiDaireId: parseInt(data.taxOffice),
            vergiNo: data.taxNo,
            telNo: data.phone,
            faksNo: data.fax,
            webAdres: data.webAddress,
            email: data.email,
            sektor: data.sectors,
            sehirId: parseInt(data.city),
            ilceId: parseInt(data.district),
            postaKodu: data.postCode,
            adres: data.address
        }, {
            headers: authHeader()
        });
    }

    searchSupplier(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-ara`, {
            sehirId: parseInt(data.city),
            ilceId: parseInt(data.district),
            firmaAdi: data.companyName,
            kisaUnvan: data.shortTitle,
            vergiNo: data.taxNo,
            durumId: parseInt(data.state),
            sektorId: parseInt(data.sector),
            sayfaNo: parseInt(data.currentPage),
            sayfaBuyukluk: parseInt(data.pageSize)
        }, {
            headers: authHeader()
        });
    }

    getRelations(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-iliskiler-getir`, {
            params: {id},
            headers: authHeader()
        });
    }

    addRelation(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-iliski-ekle`, {
            tedarikciId: parseInt(data.supplierId),
            iliskiTipId: parseInt(data.relationType),
            adSoyad: data.nameSurname,
            cepTel: data.phone,
            digerCepTel: data.phone2,
            isTel: data.workPhone,
            dahili: data.internal,
            email: data.email
        }, {
            headers: authHeader()
        });
    }

    updateRelation(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-iliski-guncelle`, {
            id: parseInt(data.id),
            tedarikciId: parseInt(data.supplierId),
            iliskiTipId: parseInt(data.relationType),
            adSoyad: data.nameSurname,
            cepTel: data.phone,
            digerCepTel: data.phone2,
            isTel: data.workPhone,
            dahili: data.internal,
            email: data.email
        }, {
            headers: authHeader()
        });
    }

    deleteRelation(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-iliski-sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    getBanks(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-banka-getir`, {
            params: {id},
            headers: authHeader()
        });
    }

    deleteBank(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-banka-sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    getBankParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-banka-ekle-form`, {
            headers: authHeader()
        });
    }

    addBank(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-banka-ekle`, {
            tedarikciId: parseInt(data.supplierId),
            bankaId: parseInt(data.bankId),
            dovizCinsiId: parseInt(data.exchangeId),
            iban: data.iban
        }, {
            headers: authHeader()
        });
    }

    updateBank(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-banka-guncelle`, {
            id: parseInt(data.id),
            tedarikciId: parseInt(data.supplierId),
            bankaId: parseInt(data.bankId),
            dovizCinsiId: parseInt(data.exchangeId),
            iban: data.iban
        }, {
            headers: authHeader()
        });
    }

    getStatusTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/tedarikci-durum-tipleri-secim-getir`, {
            headers: authHeader()
        });
    }

    getStatuses(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-durum-getir`, {
            params: {id},
            headers: authHeader()
        });
    }

    addStatus(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-durum-ekle`, {
            tedarikciId: parseInt(data.supplierId),
            durumId: parseInt(data.stateId),
            karaListe: data.blackList,
            aciklama: data.description
        }, {
            headers: authHeader()
        });
    }

    getStatusById(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-durum-getir-id-gore`, {
            params: {id},
            headers: authHeader()
        });
    }

    deleteStatus(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-durum-sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    getNotes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-not-getir`, {
            params: {id},
            headers: authHeader()
        });
    }

    getNoteById(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-not-guncelle-form`, {
            params: {id},
            headers: authHeader()
        });
    }

    addNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-not-ekle`, {
            tedarikciId: parseInt(data.supplierId),
            konu: data.subject,
            hatirlatma: data.reminding,
            hatirlatmaTarihi: data.remindingDate,
            not: data.description,
            alici: data.recipientString,
            aliciCC: data.recipientCCString
        }, {
            headers: authHeader()
        });
    }

    updateNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-not-guncelle`, {
            id: parseInt(data.id),
            tedarikciId: parseInt(data.supplierId),
            konu: data.subject,
            hatirlatma: data.reminding,
            hatirlatmaTarihi: data.remindingDate,
            not: data.description,
            alici: data.recipientString,
            aliciCC: data.recipientCCString
        }, {
            headers: authHeader()
        });
    }

    deleteNote(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-not-sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    getDocumentTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/tedarikci-parametre-dokuman-tipleri-getir`, {
            headers: authHeader()
        });
    }

    getDocuments(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-dokuman-getir`, {
            params: {id},
            headers: authHeader()
        });
    }

    addDocumentType(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-dokuman-ekle`, {
            tedarikciId: parseInt(data.supplierId),
            dokumanTipId: parseInt(data.documentTypeId)
        }, {
            headers: authHeader()
        });
    }

    addDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-dokuman-dosya-ekle`,
            data,
            {
                headers: {
                    Token: authHeader().Token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    }

    deleteDocument(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-dokuman-dosya-sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    getSupplierById(id) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/tedarik/tedarikci-getir`, {}, {
            params: {id},
            headers: authHeader()
        });
    }

    getDocumentParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/dokuman-tipleri-getir`,
            {
                headers: authHeader()
            });
    }

    addDocumentParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/dokuman-tip-ekle`,
            {
                dokumanTipi: data.text,
                pasif: data.passive,
            },
            {
                headers: authHeader()
            });
    }

    updateDocumentParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/dokuman-tip-guncelle`,
            {
                id: parseInt(data.id),
                pasif: data.passive,
                dokumanTipi: data.text
            },
            {
                headers: authHeader()
            });
    }

    getDocumentParameterHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/dokuman-tip-tarihce-getir`,
            {
                params: {id},
                headers: authHeader()
            });
    }

    getSupplierParametersByTypeId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/parametreleri-getir-tipe-gore`,
            {
                params: {id},
                headers: authHeader()
            });
    }

    addSupplierParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/parametre-ekle`,
            {
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateSupplierParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/parametre-guncelle`,
            {
                id: parseInt(data.id),
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getCities() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/sehir-dropdown`, {
            headers: authHeader()
        });
    }

    getTaxOfficeParametersByCityId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/vergi-daire-getir`,
            {
                params: {id},
                headers: authHeader()
            });
    }

    addTaxOfficeParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/vergi-daire-ekle`,
            {
                sehirId: parseInt(data.cityId),
                ad: data.taxOfficeName,
                kod: data.taxOfficeCode,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateTaxOfficeParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/parametre/vergi-daire-guncelle`,
            {
                id: parseInt(data.id),
                sehirId: parseInt(data.cityId),
                ad: data.taxOfficeName,
                kod: data.taxOfficeCode,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
}

export default new SupplierService();