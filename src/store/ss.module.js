//import SsService from '../services/ss.service'
import ImmovableGeneralInfo from "../components/support-services/ImmovableGeneralInfo";
import ImmovableNotes from "../components/support-services/ImmovableNotes";
import ImmovableDocuments from "../components/support-services/ImmovableDocuments";
import ImmovableStatusInfo from "../components/support-services/ImmovableStatusInfo";
import ImmovableSubscriptionInfo from "../components/support-services/ImmovableSubscriptionInfo";


const initialState = {
    showNewImmovableButton: false,
    detail: {
        tabs: [
            {name: "ImmovableGeneralInfo", cmp: ImmovableGeneralInfo},
            {name: "ImmovableDocuments", cmp: ImmovableDocuments},
            {name: "ImmovableNotes", cmp: ImmovableNotes},
            {name: "ImmovableStatusInfo", cmp: ImmovableStatusInfo},
            {name: "ImmovableSubscriptionInfo", cmp: ImmovableSubscriptionInfo},
        ],
        currentTab: ImmovableGeneralInfo
    },
    parameters: [],
    documentTypes: [{id: 1, metin: 'Adres Belgesi'}, {id: 2, metin: 'Sistem Belgesi'}],
    documents: [{
        "id": 23,
        "dokumanTipi": "KİRA KONTRATI",
        "ebys": "1234567",
        "dokumanAdi": "2020 - 2030 Yılları Kira Kontratı.pdf",
        "kullanici": "necmi.ozben",
        "kayitTarihi": "03.10.2020 15:23",
        "dokumanYolu": "http://135.181.44.251:8013/api/dosya/dosya-indir?id=155",
        "dosyaId": 155,
        "zipYolu": "http://135.181.44.251:8013/api/dosya/dosyalari-indir?referansId=811b2575-56e5-46dd-9f95-d4b41e219e4f&&kaynakModulId=1"
    }]
};

export const ss = {
    namespaced: true,
    state: initialState,
    actions: {
        changeDetailTab({commit}, payload) {
            commit('changeDetailTab', payload);
        },
    },
    mutations: {
        changeDetailTab(state, payload) {
            const find = state.detail.tabs.find(c => c.name === payload);
            console.log(find);
            if (find) {
                state.detail.currentTab = find.cmp;
            }
        },
    }
};
