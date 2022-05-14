import axios from 'axios';
import authHeader from "@/services/auth-header";

class SpSettingsService {
    getDocuments() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/dokuman-tip-liste`,
            {
                headers: authHeader()
            });
    }

    addDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/dokuman-tip-ekle`,
            {
                dokumanTipi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/dokuman-tip-guncelle`,
            {
                id: data.id,
                dokumanTipi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getDocumentHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/dokuman-tip-tarihce-liste`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getSubStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/alt-durum-liste`,
            {
                headers: authHeader()
            });
    }

    addSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/alt-durum-ekle`,
            {
                durumAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/alt-durum-guncelle`,
            {
                id: data.id,
                durumAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getSubStateHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/alt-durum-tarihce-liste`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getCalculateTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/hesaplama-turu-liste`,
            {
                headers: authHeader()
            });
    }

    addCalculateType(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/hesaplama-turu-ekle`,
            {
                ad: data.title,
                kisaAd: data.subTitle,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateCalculateType(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/hesaplama-turu-guncelle`,
            {
                id: data.id,
                ad: data.title,
                kisaAd: data.subTitle,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getCalculateTypeHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/hesaplama-turu-tarihce-liste`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getStatePermission() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-liste`,
            {
                headers: authHeader()
            });
    }

    getSubStatePermissions(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-select`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    saveSubStatePermission(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-select-ekle`,
            {
                "altDurumIds": data.list,
                "durumId": data.id
            },
            {
                headers: authHeader()
            });
    }

    getSubStateTransitions(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-gecis`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getSubStateTransitionsSelect(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-gecis-select`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    saveSubStateTransitionsSelect(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-gecis-select-ekle`,
            {
                yeniDurumAltDurumIds: data.list,
                durumAltDurumId: data.id
            },
            {
                headers: authHeader()
            });
    }

    getSubStateTransitionsSelectList(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-yetki-select`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    saveAuthorizeTransitionsSelect(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/parametre/durum-altdurum-yetki-select-ekle?durumAltDurumId=${data.id}`,
            data.list,
            {
                headers: authHeader()
            });
    }

    getTitlesByDepartmentId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birime-gore-unvan-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }
}

export default new SpSettingsService();