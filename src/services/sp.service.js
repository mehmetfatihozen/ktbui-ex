import axios from "axios";
import authHeader from "@/services/auth-header";

class SpService {
    getListDropdown() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plan/planlar-ozet`, {
            headers: authHeader()
        });
    }


    getPlanList(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plan/ara`,
            {
                planId: data.period,
                sayfaNo: data.currentPage,
                sayfaBuyukluk: data.pageSize
            },
            {
                headers: authHeader()
            });
    }

    addPlan(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plan/ekle`,
            {
                planAdi: data.planName,
                baslangicYil: data.startDate,
                bitisYil: data.endDate
            },
            {
                headers: authHeader()
            });
    }

    updatePlan(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plan/guncelle`,
            {
                id: data.id,
                planAdi: data.planAdi,
                baslangicYil: data.baslangicYil,
                bitisYil: data.bitisYil
            },
            {
                headers: authHeader()
            });
    }

    deletePlan(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plan/plan-sil`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getPlan(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plan/plan-getir`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getPurposeShortNames(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planamac/plan-amac-kisa-adlar`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getPurposes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planamac/plan-amaclar`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    addPurpose(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planamac/ekle`,
            {
                planId: data.id,
                amacAdi: data.purpose,
                amacNo: data.purposeNo.id,
                amacKisaAd: data.purposeNo.metin,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    removePurpose(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planamac/sil`, {
            params: {
                amacId: id
            },
            headers: authHeader()
        });
    }

    getPurposeHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planamactarihce/plan-amac-tarihce-getir`, {
            params: {
                planAmacId: id
            },
            headers: authHeader()
        });
    }

    getDocuments(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandokuman/plan-dokuman-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getDocumentParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandokuman/plan-dokuman-parametre-getir`,
            {
                headers: authHeader()
            });
    }

    addDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plandokuman/plan-dokuman-dosya-ekle`,
            data,
            {
                headers: {
                    Token: authHeader().Token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    }

    deleteDocument(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandokuman/plan-dokuman-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getNotes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plannot/plan-not-getir`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getNoteDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plannot/plan-not-guncelle-form`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plannot/plan-not-ekle`,
            {
                konu: data.title,
                planId: data.planId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    updateNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plannot/plan-not-guncelle`,
            {
                id: parseInt(data.id),
                konu: data.title,
                planId: data.planId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    deleteNote(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plannot/plan-not-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandurum/plan-durum-liste`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    getStateDropdown(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandurum/parametre-durum-getir`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    getSubStateDropdown(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plandurum/parametre-alt-durum-getir`,
            {
                params: {
                    planId: data.planId,
                    durumId: data.stateId,
                },
                headers: authHeader()
            });
    }

    addState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plandurum/plan-durum-ekle`,
            {
                planId: data.planId,
                durumId: data.state,
                altDurumId: data.subState,
                aciklama: data.description
            },
            {
                headers: authHeader()
            });
    }

    updateState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plandurum/plan-durum-guncelle`,
            {
                id: data.id,
                planId: data.planId,
                durumId: data.state,
                altDurumId: data.subState,
                aciklama: data.description
            },
            {
                headers: authHeader()
            });
    }

    getGoals(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedef/plan-hedefler`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    getGoalShortNames(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedef/hedef-nolari-getir`,
            {
                params: {
                    amacId: id
                },
                headers: authHeader()
            });
    }

    getDepartments() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/bagli-birimler-getir`,
            {
                headers: authHeader()
            });
    }

    addGoal(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planhedef/ekle`,
            {
                planAmacId: data.purposeId,
                hedefAciklama: data.goal,
                hedefNo: data.goalNo.id,
                hedefKisaAd: data.goalNo.metin,
                birimId: data.department,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateGoal(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planhedef/guncelle`,
            {
                id: data.id,
                planAmacId: data.purposeId,
                hedefAciklama: data.goal,
                hedefNo: data.goalNo.id,
                hedefKisaAd: data.goalNo.metin,
                birimId: data.department,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    deleteGoal(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedef/sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getGoalHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedeftarihce/plan-hedef-tarihce-getir`,
            {
                params: {
                    planHedefId: id
                },
                headers: authHeader()
            });
    }

    getGoalDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedefdetay/hedef-detaylar`,
            {
                params: {
                    hedefId: id
                },
                headers: authHeader()
            });
    }

    addGoalDetail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planhedefdetay/ekle`,
            {
                planHedefId: data.planPurposeId,
                tip: data.type,
                aciklama: data.text
            },
            {
                headers: authHeader()
            });
    }

    deleteGoalDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planhedefdetay/sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getIndicators(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangosterge/plan-gostergeler`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    addIndicator(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plangosterge/ekle`,
            {
                planHedefId: data.goalId,
                gostergeAciklama: data.description,
                gostergeNo: data.indicatorNo.id,
                gostergeKisaAd: data.indicatorNo.metin,
                birimId: data.department,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getIndicatorShortNames(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangosterge/gosterge-nolari-getir`,
            {
                params: {
                    hedefId: id
                },
                headers: authHeader()
            });
    }

    deleteIndicator(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangosterge/sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getIndicatorHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergetarihce/plan-gosterge-tarihce-getir`,
            {
                params: {
                    planGostergeId: id
                },
                headers: authHeader()
            });
    }

    getIndicatorDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/gosterge-detaylar`,
            {
                params: {
                    hedefId: id
                },
                headers: authHeader()
            });
    }

    getIndicatorDetailForm(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/ekle-form-getir`,
            {
                params: {
                    planGostergeId: id
                },
                headers: authHeader()
            });
    }

    getIndicatorDetailYears(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/yillari-getir-plan`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    addIndicatorDetail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/ekle`,
            data,
            {
                headers: authHeader()
            });
    }

    deleteIndicatorDetail(id) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/sil`,
            {
                params: {
                    planGostergeDetayId: id
                },
                headers: authHeader()
            });
    }

    getIndicatorDetailHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/plangostergedetay/detay-tarihce-getir`,
            {
                params: {
                    planGostergeDetayId: id
                },
                headers: authHeader()
            });
    }

    getMonitoringYears(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/yillik-plan-yillari`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getPlanMonitoringList(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/ara`,
            {
                planId: data.period,
                yil: data.year
            },
            {
                headers: authHeader()
            });
    }

    addPlanMonitoring(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/ekle`,
            {
                planId: data.period,
                yil: data.year
            },
            {
                headers: authHeader()
            });
    }

    getPlanMonitoringDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/getir`,
            {
                params: {
                    yillikPlanId: id
                },
                headers: authHeader()
            });
    }

    deletePlanMonitoring(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/sil`, {
            params: {
                yillikPlanId: id
            },
            headers: authHeader()
        });
    }

    getMonitoringDocuments(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-dokuman/listele`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getMonitoringDocumentParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-dokuman/tip-parametre-getir`,
            {
                headers: authHeader()
            });
    }

    addMonitoringDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-dokuman/dosya-ekle`,
            data,
            {
                headers: {
                    Token: authHeader().Token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    }

    deleteMonitoringDocument(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-dokuman/sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getMonitoringNotes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-not/listele`, {
            params: {
                planId: id
            },
            headers: authHeader()
        });
    }

    getMonitoringNoteDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-not/guncelle-form`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addMonitoringNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-not/ekle`,
            {
                konu: data.title,
                planId: data.planId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    updateMonitoringNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-not/guncelle`,
            {
                id: parseInt(data.id),
                konu: data.title,
                planId: data.planId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    deleteMonitoringNote(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-not/sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getMonitoringStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-durum/listele`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    getMonitoringStateDropdown(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-durum/parametre-durum-getir`,
            {
                params: {
                    planId: id
                },
                headers: authHeader()
            });
    }

    getMonitoringSubStateDropdown(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-durum/parametre-alt-durum-getir`,
            {
                params: {
                    planId: data.planId,
                    durumId: data.stateId,
                },
                headers: authHeader()
            });
    }

    addMonitoringState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-durum/ekle`,
            {
                planId: data.planId,
                durumId: data.state,
                altDurumId: data.subState,
                aciklama: data.description
            },
            {
                headers: authHeader()
            });
    }

    updateMonitoringState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik-durum/guncelle`,
            {
                id: data.id,
                planId: data.planId,
                durumId: data.state,
                altDurumId: data.subState,
                aciklama: data.description
            },
            {
                headers: authHeader()
            });
    }

    getMonitoringPurposes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/yillik-plan-hedefler`,
            {
                params: {
                    yillikPlanId: id
                },
                headers: authHeader()
            });
    }

    getMonitoringGoalDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}strateji/planyillik/yillik-plan-hedef-detaylar`,
            {
                params: {
                    hedefId: id
                },
                headers: authHeader()
            });
    }
}

export default new SpService();