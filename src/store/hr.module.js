import HrService from '../services/hr.service'
import InstitutionMain from "@/components/human-resources/settings/InstitutionMain";
import InstitutionMainHistory from "@/components/human-resources/settings/InstitutionMainHistory";
import LinkedInstitutions from "@/components/human-resources/settings/LinkedInstitutions";
import LinkedInstitutionsHistory from "@/components/human-resources/settings/LinkedInstitutionsHistory";
import LinkedTitles from "@/components/human-resources/settings/LinkedTitles";
import SubInstitutions from "@/components/human-resources/settings/SubInstitutions";
import SubInstitutionsHistory from "@/components/human-resources/settings/SubInstitutionsHistory";
import Institutions from "@/components/human-resources/settings/Institutions";
import InstitutionsHistory from "@/components/human-resources/settings/InstitutionsHistory";

import InstitutionCategoriesMain from "@/components/human-resources/settings/InstitutionCategoriesMain";
import InstitutionCategoriesMainHistory from "@/components/human-resources/settings/InstitutionCategoriesMainHistory";

import InstitutionStatusesMain from "@/components/human-resources/settings/InstitutionStatusesMain";
import InstitutionStatusesMainHistory from "@/components/human-resources/settings/InstitutionStatusesMainHistory";

import EmployeeStatusesMain from "@/components/human-resources/settings/EmployeeStatusesMain";
import EmployeeStatusesMainHistory from "@/components/human-resources/settings/EmployeeStatusesMainHistory";
import EmployeeSubStatuses from "@/components/human-resources/settings/EmployeeSubStatuses";
import EmployeeSubStatusesHistory from "@/components/human-resources/settings/EmployeeSubStatusesHistory";

import EmployeeGeneralInfo from "@/components/human-resources/EmployeeGeneralInfo";
import EmployeeDocuments from "@/components/human-resources/EmployeeDocuments";
import EmployeeNotes from "@/components/human-resources/EmployeeNotes";


const initialState = {
    employees: {
        personeller: [],
        sayfalama: {}
    },
    showNewEmployeeButton: false,
    settings: {
        institutionComponents: [
            {name: 'InstitutionMain', cmp: InstitutionMain},
            {name: 'InstitutionMainHistory', cmp: InstitutionMainHistory},
            {name: 'LinkedInstitutions', cmp: LinkedInstitutions},
            {name: 'LinkedInstitutionsHistory', cmp: LinkedInstitutionsHistory},
            {name: 'LinkedTitles', cmp: LinkedTitles},
            {name: 'SubInstitutions', cmp: SubInstitutions},
            {name: 'SubInstitutionsHistory', cmp: SubInstitutionsHistory},
            {name: 'Institutions', cmp: Institutions},
            {name: 'InstitutionsHistory', cmp: InstitutionsHistory},
        ],
        currentInstitutionComponent: InstitutionMain,
        currentInstitutionComponentData: null,
        institutionCategoryComponents: [
            {name: 'InstitutionCategoriesMain', cmp: InstitutionCategoriesMain},
            {name: 'InstitutionCategoriesMainHistory', cmp: InstitutionCategoriesMainHistory},
        ],
        currentInstitutionCategoryComponent: InstitutionCategoriesMain,
        currentInstitutionCategoryComponentData: null,

        institutionStatusComponents: [
            {name: 'InstitutionStatusesMain', cmp: InstitutionStatusesMain},
            {name: 'InstitutionStatusesMainHistory', cmp: InstitutionStatusesMainHistory},
        ],
        currentInstitutionStatusComponent: InstitutionStatusesMain,
        currentInstitutionStatusComponentData: null,

        employeeStatusComponents: [
            {name: 'EmployeeStatusesMain', cmp: EmployeeStatusesMain},
            {name: 'EmployeeStatusesMainHistory', cmp: EmployeeStatusesMainHistory},
            {name: 'EmployeeSubStatuses', cmp: EmployeeSubStatuses},
            {name: 'EmployeeSubStatusesHistory', cmp: EmployeeSubStatusesHistory},
        ],
        currentEmployeeStatusComponent: EmployeeStatusesMain,
        currentEmployeeStatusComponentData: null,

    },
    detail: {
        tabs: [
            {name: 'EmployeeGeneralInfo', cmp: EmployeeGeneralInfo},
            {name: 'EmployeeDocuments', cmp: EmployeeDocuments},
            {name: 'EmployeeNotes', cmp: EmployeeNotes},
        ],
        currentTab: EmployeeGeneralInfo
    },
    parameters: [],
    createdEmployee: null,
    employeeGeneralInfo: {},
    employeeStates: [],
    states: [],
    employeePhones: [],
    employeeEmails: [],
    employeeUserInfos: [],
    addedEmployeeUserInfo: {},
    userInfoParameters: {},
    userInfoDetailParameters: {},
    departmentHistories: {},
    addresses: [],
    addressParameters: {},
    documents: [],
    documentTypes: [],
    notes: [],
    noteDetail: {},
    filterParameters: {},
    addedProfilePhoto: {},
    removedProfilePhoto: {},
    identity: {},
    ebysDocuments: [],
    duplicateForm: {},
    titles: [],
};

export const hr = {
    namespaced: true,
    state: initialState,
    actions: {
        createEmployee({commit}, payload) {
            return HrService.createEmployee(payload).then(res => {
                if (res.data.data)
                    commit('createdEmployee', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateEmployee({commit}, payload) {
            return HrService.updateEmployee(payload).then(res => {
                if (res.data.data)
                    commit('updateEmployee', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeGeneralInfo({commit}, payload) {
            return HrService.getEmployeeGeneralInfo(payload).then(res => {
                if (res.data.data)
                    commit('getEmployeeGeneralInfo', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getParameters({commit}) {
            return HrService.getParameters().then(res => {
                if (res.data.data)
                    commit('getParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getStates({commit}) {
            return HrService.getStates().then(res => {
                if (res.data.data)
                    commit('getStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSubStates({commit}, payload) {
            return HrService.getSubStates(payload).then(res => {
                if (res.data.data)
                    commit('getSubStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        changeInstitutionComponent({commit}, payload) {
            commit('changeInstitutionComponent', payload);
        },
        changeInstitutionCategoryComponent({commit}, payload) {
            commit('changeInstitutionCategoryComponent', payload);
        },
        changeInstitutionStatusComponent({commit}, payload) {
            commit('changeInstitutionStatusComponent', payload);
        },
        changeEmployeeStatusComponent({commit}, payload) {
            commit('changeEmployeeStatusComponent', payload);
        },
        changeDetailTab({commit}, payload) {
            commit('changeDetailTab', payload);
        },
        getAllEmployee({commit}, payload) {
            return HrService.getAllEmployee(payload).then(res => {
                    if (res.data.data)
                        commit('getAllEmployee', res.data.data);
                    return Promise.resolve(res.data);
                }
            );
        },
        getEmployeeFilterParameters({commit}, payload) {
            return HrService.getEmployeeFilterParameters(payload).then(res => {
                    if (res.data.data)
                        commit('getEmployeeFilterParameters', res.data.data);
                    return Promise.resolve(res.data.data);
                }
            );
        },
        // eslint-disable-next-line no-unused-vars
        updateStatus({commit}, payload) {
            return HrService.updateStatus(payload).then(res => {
                return Promise.resolve(res.data);
            });
        },
        resetState({commit}) {
            commit('resetState')
        },
        getEmployeeStates({commit}, payload) {
            return HrService.getEmployeeStates(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addEmployeeState({commit}, payload) {
            return HrService.addEmployeeState(payload).then(res => {
                if (res.data.data) {
                    commit('setEmployeeStates', res.data.data.durumlar);
                    commit('getEmployeeGeneralInfo', res.data.data.genelBilgi);
                }
                return Promise.resolve(res.data);
            });
        },
        updateEmployeeState({commit}, payload) {
            return HrService.updateEmployeeState(payload).then(res => {
                if (res.data.data) {
                    commit('setEmployeeStates', res.data.data.durumlar);
                    commit('getEmployeeGeneralInfo', res.data.data.genelBilgi);
                }
                return Promise.resolve(res.data);
            });
        },
        removeEmployeeState({commit}, payload) {
            return HrService.removeEmployeeState(payload).then(res => {
                if (res.data.data) {
                    commit('setEmployeeStates', res.data.data.durumlar);
                    commit('getEmployeeGeneralInfo', res.data.data.genelBilgi);
                }
                return Promise.resolve(res.data);
            });
        },
        getEmployeePhones({commit}, payload) {
            return HrService.getEmployeePhones(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeePhones', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getEmployeeEmails({commit}, payload) {
            return HrService.getEmployeeEmails(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeEmails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addPhone({commit}, payload) {
            return HrService.addPhone(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeePhones', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updatePhone({commit}, payload) {
            return HrService.updatePhone(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeePhones', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addEmail({commit}, payload) {
            return HrService.addEmail(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeEmails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateEmail({commit}, payload) {
            return HrService.updateEmail(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeEmails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getEmployeeUserInfos({commit}, payload) {
            return HrService.getEmployeeUserInfos(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeUserInfos', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addEmployeeUserInfo({commit}, payload) {
            return HrService.addEmployeeUserInfo(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeUserInfos', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getUserInfoParameters({commit}) {
            return HrService.getUserInfoParameters().then(res => {
                if (res.data.data)
                    commit('getUserInfoParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getUserInfoDetailParameters({commit}, payload) {
            return HrService.getUserInfoDetailParameters(payload).then(res => {
                if (res.data.data)
                    commit('getUserInfoDetailParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateEmployeeUserInfo({commit}, payload) {
            return HrService.updateEmployeeUserInfo(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeUserInfos', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDepartmentHistory({commit}, payload) {
            return HrService.getDepartmentHistory(payload).then(res => {
                if (res.data.data)
                    commit('getDepartmentHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getAddress({commit}, payload) {
            return HrService.getAddress(payload).then(res => {
                if (res.data.data)
                    commit('setAddress', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addAddress({commit}, payload) {
            return HrService.addAddress(payload).then(res => {
                if (res.data.data)
                    commit('setAddress', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateAddress({commit}, payload) {
            return HrService.updateAddress(payload).then(res => {
                if (res.data.data)
                    commit('setAddress', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getAddressParameters({commit}, payload) {
            return HrService.getAddressParameters(payload).then(res => {
                if (res.data.data)
                    commit('getAddressParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        removePhone({commit}, payload) {
            return HrService.removeAddress(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeePhones', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        removeEmail({commit}, payload) {
            return HrService.removeAddress(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeEmails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        removeAddress({commit}, payload) {
            return HrService.removeAddress(payload).then(res => {
                if (res.data.data)
                    commit('setAddress', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDocuments({commit}, payload) {
            return HrService.getDocuments(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDocumentParameters({commit}) {
            return HrService.getDocumentParameters().then(res => {
                if (res.data.data)
                    commit('getDocumentParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addDocument({commit}, payload) {
            return HrService.addDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteDocument({commit}, payload) {
            return HrService.deleteDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getNotes({commit}, payload) {
            return HrService.getNotes(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addNote({commit}, payload) {
            return HrService.addNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteNote({commit}, payload) {
            return HrService.deleteNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getNoteDetail({commit}, payload) {
            return HrService.getNoteDetail(payload).then(res => {
                if (res.data.data)
                    commit('getNoteDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateNote({commit}, payload) {
            return HrService.updateNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addProfilePhoto({commit}, payload) {
            return HrService.addProfilePhoto(payload).then(res => {
                if (res.data.data)
                    commit('addProfilePhoto', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        removeProfilePhoto({commit}, payload) {
            return HrService.removeProfilePhoto(payload).then(res => {
                if (res.data.data)
                    commit('removeProfilePhoto', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        checkIdentity({commit}, payload) {
            return HrService.checkIdentity(payload).then(res => {
                if (res.data.data)
                    commit('setIdentity', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getTitlesByDepartmentId({commit}, payload) {
            return HrService.getTitlesByDepartmentId(payload).then(res => {
                if (res.data.data)
                    commit('setTitlesByDepartmentId', res.data.data);
                return Promise.resolve(res.data);
            });
        }
    },
    mutations: {
        createdEmployee(state, payload) {
            state.createdEmployee = Object.assign({}, payload);
        },
        updateEmployee(state, payload) {
            state.updatedEmployee = Object.assign({}, payload);
        },
        getEmployeeGeneralInfo(state, payload) {
            state.employeeGeneralInfo = Object.assign({}, payload);
        },
        getParameters(state, payload) {
            state.parameters = Object.assign([], payload);
        },
        getStates(state, payload) {
            state.states = Object.assign([], payload);
        },
        getSubStates(state, payload) {
            state.parameters = Object.assign([], state.parameters, {altDurum: payload});
        },
        changeInstitutionComponent(state, payload) {
            const find = state.settings.institutionComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentInstitutionComponent = find.cmp;
                state.settings.currentInstitutionComponentData = payload.data;
            }
        },
        changeInstitutionCategoryComponent(state, payload) {
            const find = state.settings.institutionCategoryComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentInstitutionCategoryComponent = find.cmp;
                state.settings.currentInstitutionCategoryComponentData = payload.data;
            }
        },
        changeInstitutionStatusComponent(state, payload) {
            const find = state.settings.institutionStatusComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentInstitutionStatusComponent = find.cmp;
                state.settings.currentInstitutionStatusComponentData = payload.data;
            }
        },
        changeEmployeeStatusComponent(state, payload) {
            const find = state.settings.employeeStatusComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentEmployeeStatusComponent = find.cmp;
                state.settings.currentEmployeeStatusComponentData = payload.data;
            }
        },
        changeDetailTab(state, payload) {
            const find = state.detail.tabs.find(c => c.name === payload);
            if (find) {
                state.detail.currentTab = find.cmp;
            }
        },
        getAllEmployee(state, payload) {
            state.employees = Object.assign({}, payload);
        },
        resetState(state) {
            state.showNewEmployeeButton = false;
        },
        setEmployeeStates(state, payload) {
            state.employeeStates = Object.assign([], payload);
        },
        setEmployeePhones(state, payload) {
            state.employeePhones = Object.assign([], payload);
        },
        setEmployeeEmails(state, payload) {
            state.employeeEmails = Object.assign([], payload);
        },
        setEmployeeUserInfos(state, payload) {
            state.employeeUserInfos = Object.assign([], payload);
        },
        getUserInfoParameters(state, payload) {
            state.userInfoParameters = Object.assign({}, payload);
        },
        getUserInfoDetailParameters(state, payload) {
            state.userInfoDetailParameters = Object.assign({}, payload);
        },
        getDepartmentHistory(state, payload) {
            state.departmentHistories = Object.assign([], payload);
        },
        setAddress(state, payload) {
            state.addresses = Object.assign([], payload);
        },
        getAddressParameters(state, payload) {
            state.addressParameters = Object.assign({}, payload);
        },
        setDocuments(state, payload) {
            state.documents = Object.assign([], payload);
        },
        getDocumentParameters(state, payload) {
            state.documentTypes = Object.assign([], payload);
        },
        setNotes(state, payload) {
            state.notes = Object.assign([], payload);
        },
        getNoteDetail(state, payload) {
            state.noteDetail = Object.assign({}, payload);
        },
        getEmployeeFilterParameters(state, payload) {
            state.filterParameters = Object.assign({}, payload);
        },
        addProfilePhoto(state, payload) {
            state.addedProfilePhoto = Object.assign({}, payload);
        },
        removeProfilePhoto(state, payload) {
            state.removedProfilePhoto = Object.assign({}, payload);
        },
        setIdentity(state, payload) {
            state.identity = Object.assign({}, payload);
        },
        setTitlesByDepartmentId(state, payload) {
            state.titles = Object.assign([], payload);
        }
    }
};