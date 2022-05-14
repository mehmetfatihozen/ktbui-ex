import SupplierService from "@/services/supplier.service";
import GeneralInfo from "@/components/supplier-management/GeneralInfo";
import Documents from "@/components/supplier-management/Documents";
import Notes from "@/components/supplier-management/Notes";
import Relations from "@/components/supplier-management/Relations";
import BankInfo from "@/components/supplier-management/BankInfo";
import StatusInfo from "@/components/supplier-management/StatusInfo";
import DocumentsMain from "@/components/supplier-management/settings/DocumentsMain";
import DocumentsMainHistory from "@/components/supplier-management/settings/DocumentsMainHistory";
import TaxOffices from "@/components/supplier-management/settings/TaxOffices";
import TaxOfficesDetail from "@/components/supplier-management/settings/TaxOfficesDetail";

const initialState = {
    showNewSupplierButton: false,
    settings: {
        taxOfficeComponents: [
            {name: 'TaxOfficesMain', cmp: TaxOffices},
            {name: 'TaxOfficesDetail', cmp: TaxOfficesDetail},
        ],
        currentTaxOfficeComponent: TaxOffices,
        currentTaxOfficeComponentData: null,

        documentComponents: [
            {name: 'DocumentsMain', cmp: DocumentsMain},
            {name: 'DocumentsMainHistory', cmp: DocumentsMainHistory},
        ],
        currentDocumentComponents: DocumentsMain,
        currentDocumentComponentsData: null
    },
    detail: {
        tabs: [
            {name: 'GeneralInfo', cmp: GeneralInfo},
            {name: 'Documents', cmp: Documents},
            {name: 'Notes', cmp: Notes},
            {name: 'Relations', cmp: Relations},
            {name: 'BankInfo', cmp: BankInfo},
            {name: 'StatusInfo', cmp: StatusInfo},
        ],
        currentTab: GeneralInfo
    },
    filterParameters: [],
    addParameters: {
        firmaTipleri: [],
        sehirler: [],
        sektorler: []
    },
    addedSupplier: {},
    supplier: {},
    suppliers: [],
    suppliersPagination: {},
    relations: [],
    banks: [],
    bankParameters: {},
    statusTypes: [],
    statuses: [],
    notes: [],
    documentTypes: [],
    documents: [],
    documentParameters: [],
    documentParameterHistory: [],
    stateInfoParameters: [],
    stateInfoParameter: {},
    relationTypeParameters: [],
    relationTypeParameter: {},
    sectorParameters: [],
    sectorParameter: {},
    taxOfficeParameters: [],
    taxOfficeParameter: {},
    note: {},
    status: {},
    cities: []
};

export const supplierManagement = {
    namespaced: true,
    state: initialState,
    actions: {
        changeDocumentComponent({commit}, payload) {
            commit('changeDocumentComponent', payload);
        },
        getDocumentParameters({commit}) {
            return SupplierService.getDocumentParameters().then(res => {
                commit('setDocumentParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addDocumentParameter({commit}, payload) {
            return SupplierService.addDocumentParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setDocumentParameters', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateDocumentParameter({commit}, payload) {
            return SupplierService.updateDocumentParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setDocumentParameters', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getDocumentParameterHistory({commit}, payload) {
            return SupplierService.getDocumentParameterHistory(payload).then(res => {
                commit('setDocumentParameterHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        changeTaxOfficeComponent({commit}, payload) {
            commit('changeTaxOfficeComponent', payload);
        },
        getTaxOfficeParametersByCityId({commit}, payload) {
            return SupplierService.getTaxOfficeParametersByCityId(payload).then(res => {
                commit('setTaxOfficeParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addTaxOfficeParameter({commit}, payload) {
            return SupplierService.addTaxOfficeParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setTaxOfficeParameters', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateTaxOfficeParameter({commit}, payload) {
            return SupplierService.updateTaxOfficeParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setTaxOfficeParameters', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getRelationTypeParameters({commit}, payload) {
            return SupplierService.getSupplierParametersByTypeId(payload).then(res => {
                commit('setRelationTypeParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addRelationTypeParameter({commit}, payload) {
            return SupplierService.addSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setRelationTypeParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateRelationTypeParameter({commit}, payload) {
            return SupplierService.updateSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setRelationTypeParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getStateInfoParameters({commit}, payload) {
            return SupplierService.getSupplierParametersByTypeId(payload).then(res => {
                commit('setStateInfoParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addStateInfoParameter({commit}, payload) {
            return SupplierService.addSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setStateInfoParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateStateInfoParameter({commit}, payload) {
            return SupplierService.updateSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setStateInfoParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getSectorParameters({commit}, payload) {
            return SupplierService.getSupplierParametersByTypeId(payload).then(res => {
                commit('setSectorParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addSectorParameter({commit}, payload) {
            return SupplierService.addSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setSectorParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateSectorParameter({commit}, payload) {
            return SupplierService.updateSupplierParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setSectorParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getFilterParameters({commit}) {
            return SupplierService.getFilterParameters().then(res => {
                commit('getFilterParameters', res.data.data);
                return Promise.resolve(res.data.data);
            });
        },
        getAddParameters({commit}) {
            return SupplierService.getAddParameters().then(res => {
                commit('getAddParameters', res.data.data);
                return Promise.resolve(res.data.data);
            });
        },
        addSupplier({commit}, payload) {
            return SupplierService.addSupplier(payload).then(res => {
                commit('addSupplier', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateSupplier({commit}, payload) {
            return SupplierService.updateSupplier(payload).then(res => {
                commit('updateSupplier', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSupplierById({commit}, payload) {
            return SupplierService.getSupplierById(payload).then(res => {
                commit('getSupplierById', res.data.data);
                return Promise.resolve(res.data.data);
            });
        },
        searchSupplier({commit}, payload) {
            return SupplierService.searchSupplier(payload).then(res => {
                commit('searchSupplier', res.data.data);
                return Promise.resolve(res.data.data);
            });
        },
        getRelations({commit}, payload) {
            return SupplierService.getRelations(payload).then(res => {
                commit('setRelations', res.data.data.tedarikciIliski);
                return Promise.resolve(res.data.data);
            });
        },
        addRelation({commit}, payload) {
            return SupplierService.addRelation(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setRelations', res.data.data.tedarikciIliski);
                    return Promise.resolve(res.data.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateRelation({commit}, payload) {
            return SupplierService.updateRelation(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setRelations', res.data.data.tedarikciIliski);
                    return Promise.resolve(res.data.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        deleteRelation({commit}, payload) {
            return SupplierService.deleteRelation(payload).then(res => {
                commit('setRelations', res.data.data.tedarikciIliski);
                return Promise.resolve(res.data.data);
            });
        },
        resetState({commit}) {
            commit('resetState')
        },
        changeDetailTab({commit}, payload) {
            commit('changeDetailTab', payload);
        },
        getBanks({commit}, payload) {
            return SupplierService.getBanks(payload).then(res => {
                commit('updateBanks', res.data.data.bankalar);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        deleteBank({commit}, payload) {
            return SupplierService.deleteBank(payload).then(res => {
                commit('updateBanks', res.data.data.bankalar);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getBankParameters({commit}) {
            return SupplierService.getBankParameters().then(res => {
                commit('getBankParameters', res.data.data);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addBank({commit}, payload) {
            return SupplierService.addBank(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateBanks', res.data.data.bankalar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateBank({commit}, payload) {
            return SupplierService.updateBank(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateBanks', res.data.data.bankalar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getStatusTypes({commit}) {
            return SupplierService.getStatusTypes().then(res => {
                commit('getStatusTypes', res.data.data);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getStatuses({commit}, payload) {
            return SupplierService.getStatuses(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateStatuses', res.data.data.durumlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addStatus({commit}, payload) {
            return SupplierService.addStatus(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateStatuses', res.data.data.durumlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getStatusById({commit}, payload) {
            return SupplierService.getStatusById(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('getStatusById', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        deleteStatus({commit}, payload) {
            return SupplierService.deleteStatus(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateStatuses', res.data.data.durumlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getNotes({commit}, payload) {
            return SupplierService.getNotes(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateNotes', res.data.data.notlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getNoteById({commit}, payload) {
            return SupplierService.getNoteById(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('getNoteById', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addNote({commit}, payload) {
            return SupplierService.addNote(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateNotes', res.data.data.notlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateNote({commit}, payload) {
            return SupplierService.updateNote(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateNotes', res.data.data.notlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        deleteNote({commit}, payload) {
            return SupplierService.deleteNote(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('updateNotes', res.data.data.notlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getDocumentTypes({commit}) {
            return SupplierService.getDocumentTypes().then(res => {
                commit('getDocumentTypes', res.data.data);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getDocuments({commit}, payload) {
            return SupplierService.getDocuments(payload).then(res => {
                commit('getDocuments', res.data.data.dokumanlar);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addDocument({commit}, payload) {
            return SupplierService.addDocument(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('getDocuments', res.data.data.dokumanlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        deleteDocument({commit}, payload) {
            return SupplierService.deleteDocument(payload).then(res => {
                commit('getDocuments', res.data.data.dokumanlar);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addDocumentType({commit}, payload) {
            return SupplierService.addDocumentType(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('getDocuments', res.data.data.dokumanlar);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getCities({commit}) {
            return SupplierService.getCities().then(res => {
                commit('getCities', res.data.data);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
    },
    mutations: {
        changeDocumentComponent(state, payload) {
            const find = state.settings.documentComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentDocumentComponents = find.cmp;
                state.settings.currentDocumentComponentsData = payload.data;
            }
        },
        changeTaxOfficeComponent(state, payload) {
            const find = state.settings.taxOfficeComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentTaxOfficeComponent = find.cmp;
                state.settings.currentTaxOfficeComponentData = payload.data;
            }
        },
        setDocumentParameters(state, payload) {
            state.documentParameters = Object.assign([], payload);
        },
        setDocumentParameterHistory(state, payload) {
            state.documentParameterHistory = Object.assign([], payload);
        },
        setTaxOfficeParameters(state, payload) {
            state.taxOfficeParameters = Object.assign([], payload);
        },
        setStateInfoParameters(state, payload) {
            state.stateInfoParameters = Object.assign([], payload);
        },
        setStateInfoParameter(state, payload) {
            state.stateInfoParameter = Object.assign({}, payload);
        },
        setRelationTypeParameters(state, payload) {
            state.relationTypeParameters = Object.assign([], payload);
        },
        setRelationTypeParameter(state, payload) {
            state.relationTypeParameter = Object.assign({}, payload);
        },
        setSectorParameters(state, payload) {
            state.sectorParameters = Object.assign([], payload);
        },
        setSectorParameter(state, payload) {
            state.sectorParameter = Object.assign({}, payload);
        },
        getFilterParameters(state, payload) {
            state.filterParameters = Object.assign({}, payload);
        },
        getAddParameters(state, payload) {
            state.addParameters = Object.assign({}, payload);
        },
        addSupplier(state, payload) {
            state.addedSupplier = Object.assign({}, payload);
        },
        updateSupplier(state, payload) {
            state.supplier = Object.assign({}, payload);
        },
        getSupplierById(state, payload) {
            state.supplier = Object.assign({}, payload);
        },
        searchSupplier(state, payload) {
            state.suppliers = Object.assign([], payload.tedarikciler);
            state.suppliersPagination = Object.assign({}, payload.sayfalama);
        },
        setRelations(state, payload) {
            state.relations = Object.assign([], payload);
        },
        resetState(state) {
            state.showNewSupplierButton = false;
        },
        changeDetailTab(state, payload) {
            const find = state.detail.tabs.find(c => c.name === payload);
            if (find) {
                state.detail.currentTab = find.cmp;
            }
        },
        updateBanks(state, payload) {
            state.banks = Object.assign([], payload);
        },
        getBankParameters(state, payload) {
            state.bankParameters = Object.assign({}, payload);
        },
        getStatusTypes(state, payload) {
            state.statusTypes = Object.assign([], payload);
        },
        updateStatuses(state, payload) {
            state.statuses = Object.assign([], payload);
        },
        getStatusById(state, payload) {
            state.status = Object.assign({}, payload);
        },
        updateNotes(state, payload) {
            state.notes = Object.assign([], payload);
        },
        getNoteById(state, payload) {
            state.note = Object.assign({}, payload);
        },
        getDocumentTypes(state, payload) {
            state.documentTypes = Object.assign([], payload);
        },
        getDocuments(state, payload) {
            state.documents = Object.assign([], payload);
        },
        getCities(state, payload) {
            state.cities = Object.assign([], payload);
        }
    }
};