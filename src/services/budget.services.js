import axios from 'axios';
import authHeader from './auth-header';


class BudgetService {
    getAnnualBudgetYears() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/butce-yili/listele`,
            {
                headers: authHeader()
            });
    }

    addAnnualBudgetYears(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/butce-yili/ekle`,
            {
                yil: data.title,
            },
            {
                headers: authHeader()
            });
    }

    updateAnnualBudgetYears(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/butce-yili/guncelle`,
            {
                id: data.id,
                yil: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getAnnualBudgetStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/yillik-butce/durum-getir`,
            {
                headers: authHeader()
            });
    }

    addAnnualBudgetState(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/yillik-butce/durum-ekle`,
            {
                params: {
                    durumAdi: data.title,
                },
                headers: authHeader()
            });

    }

    updateAnnualBudgetState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}butce/yillik-butce/durum-guncelle`,
            {
                id: data.id,
                durumAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getSubStateTransitions(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/yillik-butce/durum-gecisleri`,
            {
                params: {
                    durumId: id
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
        return axios.post(`${process.env.VUE_APP_USER_API_URL}/butce/yillik-butce/durum-gecisleri-kaydet`,
            {
                atananlar: data.list,
                durumId: data.id
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


    getBudgetBasicParametersByTypeId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/parametreleri-getir-tipe-gore`,
            {
                params: {id},
                headers: authHeader()
            });
    }

    addBudgetBasicParameter(data) {
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

    updateBudgetBasicParameter(data) {
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

    getCompositionGroups() {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-grubu-listele`,
            {},
            {
                headers: authHeader()
            });
    }

    addCompositionGroup(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-grubu-ekle`,
            {
                adi: data.name,
                kodu: data.code,
                butceTuruId: parseInt(data.budgetTypeId),
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateCompositionGroup(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-grubu-guncelle`,
            {
                id: parseInt(data.id),
                adi: data.name,
                kodu: data.code,
                butceTuruId: parseInt(data.budgetTypeId),
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getCompositionGroupHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-grubu-tarihce`,
            {
                params: {id},
                headers: authHeader()
            });
    }

    getCompositionSubGroups(id) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-alt-grubu-listele`,
            {},
            {
                params: { ustGrubId: id },
                headers: authHeader()
            });
    }

    addCompositionSubGroup(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-alt-grubu-ekle`,
            {
                adi: data.name,
                kodu: data.code,
                ustGrupId: parseInt(data.parentGroupId),
                alimTuruId: parseInt(data.purchaseTypeId),
                pasif: data.passive
            },
            {
                params: { grupTipId: parseInt(data.groupTypeId) },
                headers: authHeader()
            });
    }

    updateCompositionSubGroup(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}tertip-grubu/tertip-alt-grubu-guncelle`,
            {
                id: parseInt(data.id),
                adi: data.name,
                kodu: data.code,
                ustGrupId: parseInt(data.parentGroupId),
                alimTuruId: parseInt(data.purchaseTypeId),
                pasif: data.passive
            },
            {
                params: { grupTipId: parseInt(data.groupTypeId) },
                headers: authHeader()
            });
    }
}

export default new BudgetService();