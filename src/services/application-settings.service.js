import axios from 'axios';
import authHeader from './auth-header';


class ApplicationSettingsService {
    getDetails() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-detay-liste`,
            {
                headers: authHeader()
            });
    }
    addParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/ekle`,
            {
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/guncelle`,
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

    getStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-durum-liste`,
            {
                headers: authHeader()
            });
    }

    getSubStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-parametre-durum-liste`,
            {
                params: {
                    durumId: id
                },
                headers: authHeader()
            });
    }

    addSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurudurumbilgi/alt-durum-ekle`,
            {
                durumId: parseInt(data.stateId),
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurudurumbilgi/alt-durum-guncelle`,
            {
                id: parseInt(data.id),
                parametreTipId: parseInt(data.parameterTypeId),
                durumId: parseInt(data.stateId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getPriorities() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-oncelik-liste`,
            {
                headers: authHeader()
            });
    }

    getTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-tip-liste`,
            {
                headers: authHeader()
            });
    }

    getTopics() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/basvuru-konu-liste`,
            {
                headers: authHeader()
            });
    }

    getTopicDetails(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay-select`,
            {
                params: {
                    basvuruKonuId: id
                },
                headers: authHeader()
            });
    }

    saveTopicDetail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay-select-ekle`,
            {
                "ids": data.list,
                "konuId": data.id
            },
            {
                headers: authHeader()
            });
    }

    getSlaList(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay-sla-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getSlaHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay-sla-tarihce-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addSla(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}basvurukonu/basvuru-konu-detay-sla-ekle`,
            {
                "ids": data.ids,
                "konuId": data.topicId,
                "sla": data.sla,
            },
            {
                headers: authHeader()
            });
    }
    getLocations() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/lokasyon-liste-getir`,
            {
                headers: authHeader()
            });
    }

    addLocation(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/lokasyon-ekle`,
            {
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.text,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateLocation(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/lokasyon-guncelle`,
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
}

export default new ApplicationSettingsService();