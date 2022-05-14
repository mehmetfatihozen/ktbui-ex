import axios from 'axios';
import authHeader from './auth-header';


class ApplicationService {
    getStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurumbilgi/basvuru-durum`, {
            headers: authHeader()
        });
    }

    getSubStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurumbilgi/basvuru-alt-durum`, {
            params: {
                id
            },
            headers: authHeader()
        });
    }

    createApplication(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvuru/ekle`, {
            callId: data.callId,
            basvuruSahibiId: data.applicationOwnerId,
            basvuruTipId: parseInt(data.type),
            basvuruKonuId: parseInt(data.topic),
            basvuruDetayId: parseInt(data.detail),
            lokasyonId: data.location,
            oncelikId: parseInt(data.priority),
            konuBasligi: data.title,
            aciklama: data.description,
            smsBilgi: data.phoneCheck,
            emailBilgi: data.emailCheck,
            personelAdresTelefonId: parseInt(data.phone),
            personelAdresEpostaId: parseInt(data.email)
        }, {headers: authHeader()});
    }

    createApplicationAssign(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurudurum/ekle`, {
            basvuruDurumId: parseInt(data.applicationStateId),
            basvuruId: parseInt(data.id),
            atananPersonelId: data.employee,
            durumId: parseInt(data.stateId),
            altDurumId: parseInt(data.subStateId),
            sla: data.sla,
            aciklama: data.description,
            asilCozucu: data.solvent
        }, {headers: authHeader()});
    }

    removeApplication(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-sil`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    sendApplication(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-gonder`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    cancelApplication(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-iptal`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    editApplication(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvuru/guncelle`, {
            id: data.id,
            basvuruTipId: parseInt(data.type),
            basvuruKonuId: parseInt(data.topic),
            basvuruDetayId: parseInt(data.detail),
            lokasyonId: data.location,
            oncelikId: parseInt(data.priority),
            konuBasligi: data.title,
            aciklama: data.description,
            smsBilgi: data.phoneCheck,
            emailBilgi: data.emailCheck,
            personelAdresTelefonId: parseInt(data.phone),
            personelAdresEpostaId: parseInt(data.email)
        }, {headers: authHeader()});
    }

    getStateAndAssignInfo(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurum/basvuru-durum-liste`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    getStateAndAssignInfoHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurum/basvuru-durum-tarihce-liste`, {
            params: {basvuruDurumId: id},
            headers: authHeader()
        });
    }

    getApplicationParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-parametreleri-getir`, {headers: authHeader()});
    }

    getApplicationTopicDetailDd(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay`, {
            params: {id},
            headers: authHeader()
        });
    }

    getApplications(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-liste`, {
            sorguTipi: parseInt(data.activeListType),
            basvuruNo: data.applicationNo,
            durumId: parseInt(data.state),
            altDurumId: parseInt(data.subState),
            oncelikId: parseInt(data.priority),
            basvuruKonusu: data.topic,
            basvuruSahibi: data.applicationOwner,
            baslangicTarihi: data.startDate,
            bitisTarihi: data.endDate,
            basvuruTipId: parseInt(data.applicationType),
            ustBirimId: parseInt(data.topDepartment),
            bagliBirimId: parseInt(data.linkedDepartment),
            altBirimId: parseInt(data.subDepartment),
            birimId: parseInt(data.department),
            atananPersonelId: data.employee,
            basvuruKonuId: parseInt(data.topicId),
            basvuruDetayId: parseInt(data.topicDetailId),
            currentPage: parseInt(data.currentPage),
            pageSize: parseInt(data.pageSize)
        }, {
            headers: authHeader()
        });
    }

    getPhones(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/personel-telefon-secim-getir`, {
            params: {personelId: id},
            headers: authHeader()
        });
    }

    savePhone(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-personel-telefon-ekle`, {
            personelId: data.staffId,
            telefon: data.phone,
            varsayilan: data.check,
        }, {
            headers: authHeader()
        });
    }

    getEmails(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/personel-email-secim-getir`, {
            params: {personelId: id},
            headers: authHeader()
        });
    }

    saveEmail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-personel-email-ekle`, {
            personelId: data.staffId,
            email: data.email,
            varsayilan: data.check,
        }, {
            headers: authHeader()
        });
    }

    getDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-detay`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    getNotes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurunot/not-liste`, {
            params: {basvuruId: id},
            headers: authHeader()
        });
    }

    addNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurunot/ekle`, {
            basvuruId: parseInt(data.id),
            aciklama: data.description,
            basvuruSahibiGorebilir: data.canSeeOwner
        }, {
            headers: authHeader()
        });
    }

    editNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurunot/guncelle`, {
            id: parseInt(data.id),
            aciklama: data.description,
            basvuruSahibiGorebilir: data.canSeeOwner
        }, {
            headers: authHeader()
        });
    }

    deleteNote(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurunot/sil`, {
            params: {id},
            headers: authHeader()
        });
    }

    employeeSearchForNewApplication(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-kimlik-ara`, {
            sicilNo: data.registrationNumber,
            tckn: data.identityNumber,
            adSoyad: data.nameSurname
        }, {
            headers: authHeader()
        });
    }

    getFilterParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-filtre-parametreleri-getir`, {
            headers: authHeader()
        });
    }

    getAssignedApplicationList(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurum/basvuru-atanan-liste`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });
    }

    getStateAndAssignInfoDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurum/detay`, {
            params: {
                basvuruDurumId: id
            },
            headers: authHeader()
        });
    }

    getStateAndAssignInfoStateDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudurum/basvuru-durum-detay`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });
    }

    redirectApplication(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurudurum/yonlendir`, {
            basvuruId: parseInt(data.id),
            atananPersonelId: data.employee,
            durumId: parseInt(data.stateId),
            altDurumId: parseInt(data.subStateId),
            sla: data.sla,
            aciklama: data.description,
            asilCozucu: data.solvent
        }, {
            headers: authHeader()
        });
    }

    removeFile(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudosya/dosya-sil`, {
            params: {
                basvuruDosyaId: id
            },
            headers: authHeader()
        });
    }

    removeFilesMultiple(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurudosya/coklu-dosya-sil`,
            data,
            {
                headers: authHeader()
            });
    }

    getImages(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudosya/resimler-getir`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });
    }

    getVideos(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudosya/videolar-getir`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });
    }

    getFiles(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurudosya/dosyalar-getir`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });
    }

    getFormDepartment(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvuru/basvuru-bilgi-formu-getir`, {
            params: {
                basvuruId: id
            },
            headers: authHeader()
        });

    }
}

export default new ApplicationService();