import ApplicationService from '@/services/application.service';
import ApplicationDetailMain from "@/components/application/application-detail/ApplicationDetailMain";
import ApplicationDetailFileManagement
    from "@/components/application/application-detail/ApplicationDetailFileManagement";
import Form
    from "@/components/application/application-detail/Form";

import ApplicationNextMain from "@/components/application/application-next/ApplicationNextMain";
import ApplicationNextFileManagement
    from "@/components/application/application-next/ApplicationNextFileManagement";

import StatusAssignment from "@/components/application/application-detail/StatusAssignment";
import StatusAssignmentHistory from "@/components/application/application-detail/StatusAssignmentHistory";

import NewApplicationMain from "@/components/application/new-application/NewApplicationMain";
import NewApplicationEmployeeSearch from "@/components/application/new-application/NewApplicationEmployeeSearch";

const initialState = {
    showNewApplicationButton: false,
    statusAndAssignmentComponents: [
        {name: 'StatusAssignment', cmp: StatusAssignment},
        {name: 'StatusAssignmentHistory', cmp: StatusAssignmentHistory},
    ],
    currentStatusAndAssignmentComponent: StatusAssignment,
    currentStatusAndAssignmentComponentData: null,
    applicationDetailComponents: [
        {name: 'ApplicationDetailMain', cmp: ApplicationDetailMain},
        {name: 'ApplicationDetailFileManagement', cmp: ApplicationDetailFileManagement},
        {name: 'Form', cmp: Form},
    ],
    currentApplicationDetailComponent: ApplicationDetailMain,
    applicationNextComponents: [
        {name: 'ApplicationNextMain', cmp: ApplicationNextMain},
        {name: 'ApplicationNextFileManagement', cmp: ApplicationNextFileManagement},
    ],
    currentApplicationNextComponent: ApplicationNextMain,
    newApplicationComponents: [
        {name: 'NewApplicationMain', cmp: NewApplicationMain},
        {name: 'NewApplicationEmployeeSearch', cmp: NewApplicationEmployeeSearch},
    ],
    newApplicationCurrentComponent: NewApplicationMain,
    newApplicationCurrentComponentData: null,
    createdApplication: {},
    editedApplication: {},
    applicationParameters: {},
    applications: {
        liste: [],
        sayfalama: {}
    },
    phones: [],
    savedPhone: null,
    emails: [],
    savedEmail: null,
    applicationDetail: {},
    applicationStateAndAssignInfo: null,
    applicationStateAndAssignInfoHistory: [],
    createdAssign: null,
    notes: [],
    addedNote: null,
    editedNote: null,
    deletedNote: null,
    employeeListNewApplication: [],
    filterParameters: {},
    states: [],
    subStates: [],
    applicationAssignedList: [],
    stateAndAssignInfoDetail: {},
    stateAndAssignInfoStateDetail: {},
    redirectResult: {},
    selectedFileComponentId: 1,
    isNext: false,
    images: [],
    videos: [],
    files: [],
    formDepartmentData: {},
    duplicateForm: {},
}

export const application = {
    namespaced: true,
    state: initialState,
    actions: {
        getEmployeeStates({commit}) {
            return ApplicationService.getStates().then(res => {
                if (res.data.data)
                    commit('getEmployeeStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getEmployeeSubStates({commit}, payload) {
            return ApplicationService.getSubStates(payload).then(res => {
                if (res.data.data)
                    commit('getEmployeeSubStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getStateAndAssignInfo({commit}, payload) {
            return ApplicationService.getStateAndAssignInfo(payload).then(res => {
                if (res.data.data)
                    commit('getStateAndAssignInfo', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStateAndAssignInfoHistory({commit}, payload) {
            return ApplicationService.getStateAndAssignInfoHistory(payload).then(res => {
                if (res.data.data)
                    commit('getStateAndAssignInfoHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        changeNewApplicationComponent({commit}, payload) {
            commit('changeNewApplicationComponent', payload);
        },
        changeDetailComponent({commit}, payload) {
            commit('changeDetailComponent', payload);
        },
        changeNextComponent({commit}, payload) {
            commit('changeNextComponent', payload);
        },
        changeStatusAssignmentComponent({commit}, payload) {
            commit('changeStatusAssignmentComponent', payload);
        },
        resetState({commit}) {
            commit('resetState')
        },
        createApplication({commit}, payload) {
            return ApplicationService.createApplication(payload).then(res => {
                if (res.data.data)
                    commit('createApplication', res.data.data);
                return Promise.resolve(res.data);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        // eslint-disable-next-line no-unused-vars
        removeApplication({commit}, payload) {
            return ApplicationService.removeApplication(payload).then(res => {
                return Promise.resolve(res.data);
            })
        },
        // eslint-disable-next-line no-unused-vars
        sendApplication({commit}, payload) {
            return ApplicationService.sendApplication(payload).then(res => {
                return Promise.resolve(res.data);
            })
        },
        // eslint-disable-next-line no-unused-vars
        cancelApplication({commit}, payload) {
            return ApplicationService.cancelApplication(payload).then(res => {
                return Promise.resolve(res.data);
            })
        },
        createApplicationAssign({commit}, payload) {
            return ApplicationService.createApplicationAssign(payload).then(res => {
                if (res.data.data)
                    commit('createApplicationAssign', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        editApplication({commit}, payload) {
            return ApplicationService.editApplication(payload).then(res => {
                if (res.data.data)
                    commit('editApplication', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getApplicationParameters({commit}) {
            return ApplicationService.getApplicationParameters().then(res => {
                if (res.data.data)
                    commit('getApplicationParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getApplicationTopicDetailDd({commit}, payload) {
            return ApplicationService.getApplicationTopicDetailDd(payload).then(res => {
                if (res.data.data)
                    commit('getApplicationTopicDetailDd', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getApplications({commit}, payload) {
            return ApplicationService.getApplications(payload).then(res => {
                if (res.data.data)
                    commit('getApplications', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getPhones({commit}, payload) {
            return ApplicationService.getPhones(payload).then(res => {
                if (res.data.data)
                    commit('getPhones', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        savePhone({commit}, payload) {
            return ApplicationService.savePhone(payload).then(res => {
                if (res.data.data)
                    commit('savePhone', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getEmails({commit}, payload) {
            return ApplicationService.getEmails(payload).then(res => {
                if (res.data.data)
                    commit('getEmails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        saveEmail({commit}, payload) {
            return ApplicationService.saveEmail(payload).then(res => {
                if (res.data.data)
                    commit('saveEmail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDetail({commit}, payload) {
            return ApplicationService.getDetail(payload).then(res => {
                if (res.data.data)
                    commit('getDetail', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getNotes({commit}, payload) {
            return ApplicationService.getNotes(payload).then(res => {
                if (res.data.data)
                    commit('getNotes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addNote({commit}, payload) {
            return ApplicationService.addNote(payload).then(res => {
                if (res.data.data)
                    commit('addNote', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        editNote({commit}, payload) {
            return ApplicationService.editNote(payload).then(res => {
                if (res.data.data)
                    commit('editNote', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        deleteNote({commit}, payload) {
            return ApplicationService.deleteNote(payload).then(res => {
                if (res.data.data)
                    commit('deleteNote', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        employeeSearchForNewApplication({commit}, payload) {
            return ApplicationService.employeeSearchForNewApplication(payload).then(res => {
                if (res.data.data)
                    commit('employeeSearchForNewApplication', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getFilterParameters({commit}) {
            return ApplicationService.getFilterParameters().then(res => {
                if (res.data.data)
                    commit('getFilterParameters', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getAssignedApplicationList({commit}, payload) {
            return ApplicationService.getAssignedApplicationList(payload).then(res => {
                if (res.data.data)
                    commit('getAssignedApplicationList', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStateAndAssignInfoDetail({commit}, payload) {
            return ApplicationService.getStateAndAssignInfoDetail(payload).then(res => {
                if (res.data.data)
                    commit('getStateAndAssignInfoDetail', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStateAndAssignInfoStateDetail({commit}, payload) {
            return ApplicationService.getStateAndAssignInfoStateDetail(payload).then(res => {
                if (res.data.data)
                    commit('getStateAndAssignInfoStateDetail', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        redirectApplication({commit}, payload) {
            return ApplicationService.redirectApplication(payload).then(res => {
                if (res.data.data)
                    commit('redirectApplication', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getImages({commit}, payload) {
            return ApplicationService.getImages(payload).then(res => {
                if (res.data.data)
                    commit('setImages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeImage({commit}, payload) {
            return ApplicationService.removeFile(payload).then(res => {
                if (res.data.data)
                    commit('setImages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeImagesMultiple({commit}, payload) {
            return ApplicationService.removeFilesMultiple(payload).then(res => {
                if (res.data.data)
                    commit('setImages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getVideos({commit}, payload) {
            return ApplicationService.getVideos(payload).then(res => {
                if (res.data.data)
                    commit('setVideos', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeVideo({commit}, payload) {
            return ApplicationService.removeFile(payload).then(res => {
                if (res.data.data)
                    commit('setVideos', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeVideosMultiple({commit}, payload) {
            return ApplicationService.removeFilesMultiple(payload).then(res => {
                if (res.data.data)
                    commit('setVideos', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getFiles({commit}, payload) {
            return ApplicationService.getFiles(payload).then(res => {
                if (res.data.data)
                    commit('setFiles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeFile({commit}, payload) {
            return ApplicationService.removeFile(payload).then(res => {
                if (res.data.data)
                    commit('setFiles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        removeFilesMultiple({commit}, payload) {
            return ApplicationService.removeFilesMultiple(payload).then(res => {
                if (res.data.data)
                    commit('setFiles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getFormDepartment({commit},payload){
            return ApplicationService.getFormDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setFormDepartment', res.data.data);
                return Promise.resolve(res.data);
            })
        }
    },
    mutations: {
        getEmployeeStates(state, payload) {
            state.states = Object.assign([], payload);
        },
        getEmployeeSubStates(state, payload) {
            state.subStates = Object.assign([], payload);
        },
        getStateAndAssignInfo(state, payload) {
            state.applicationStateAndAssignInfo = Object.assign([], payload);
        },
        getStateAndAssignInfoHistory(state, payload) {
            state.applicationStateAndAssignInfoHistory = Object.assign([], payload);
        },
        changeNewApplicationComponent(state, payload) {
            const find = state.newApplicationComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.newApplicationCurrentComponent = find.cmp;
                state.newApplicationCurrentComponentData = payload.data;
            }
        },
        changeDetailComponent(state, payload) {
            const find = state.applicationDetailComponents.find(c => c.name === payload);
            if (find) {
                state.currentApplicationDetailComponent = find.cmp;
            }
        },
        changeNextComponent(state, payload) {
            const find = state.applicationNextComponents.find(c => c.name === payload);
            if (find) {
                state.currentApplicationNextComponent = find.cmp;
            }
        },
        changeStatusAssignmentComponent(state, payload) {
            const find = state.statusAndAssignmentComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.currentStatusAndAssignmentComponent = find.cmp;
                state.currentStatusAndAssignmentComponentData = payload.data;
            }
        },
        // eslint-disable-next-line no-unused-vars
        resetState(state) {
            state.showNewApplicationButton = false;
            // state.applications = Object.assign({}, {liste: [], sayfalama: {}});
        },
        createApplication(state, payload) {
            state.createdApplication = Object.assign({}, payload);
        },
        createApplicationAssign(state, payload) {
            state.createdAssign = Object.assign({}, payload);
        },
        editApplication(state, payload) {
            state.editedApplication = Object.assign({}, payload);
        },
        getApplicationParameters(state, payload) {
            state.applicationParameters = Object.assign({}, payload);
        },
        getApplicationTopicDetailDd(state, payload) {
            state.applicationParameters = Object.assign({}, state.applicationParameters, {basvuruDetaylari: payload});
        },
        getApplications(state, payload) {
            state.applications = Object.assign({}, payload);
        },
        getPhones(state, payload) {
            state.phones = Object.assign([], payload);
        },
        savePhone(state, payload) {
            state.savedPhone = payload;
        },
        getEmails(state, payload) {
            state.emails = Object.assign([], payload);
        },
        saveEmail(state, payload) {
            state.savedEmail = payload;
        },
        getDetail(state, payload) {
            state.applicationDetail = Object.assign({}, payload);
        },
        getNotes(state, payload) {
            state.notes = Object.assign([], payload);
        },
        addNote(state, payload) {
            state.addedNote = Object.assign({}, payload);
        },
        editNote(state, payload) {
            state.editedNote = Object.assign({}, payload);
        },
        deleteNote(state, payload) {
            state.deletedNote = Object.assign({}, payload);
        },
        employeeSearchForNewApplication(state, payload) {
            state.employeeListNewApplication = Object.assign([], payload);
        },
        getFilterParameters(state, payload) {
            state.filterParameters = Object.assign({}, payload);
        },
        getAssignedApplicationList(state, payload) {
            state.applicationAssignedList = Object.assign([], payload);
        },
        getStateAndAssignInfoDetail(state, payload) {
            state.stateAndAssignInfoDetail = Object.assign({}, payload);
        },
        getStateAndAssignInfoStateDetail(state, payload) {
            state.stateAndAssignInfoStateDetail = Object.assign({}, payload);
        },
        redirectApplication(state, payload) {
            state.redirectResult = Object.assign({}, payload);
        },
        setImages(state, payload) {
            state.images = Object.assign({}, payload);
        },
        setVideos(state, payload) {
            state.videos = Object.assign({}, payload);
        },
        setFiles(state, payload) {
            state.files = Object.assign({}, payload);
        },
        setFormDepartment(state, payload) {
            state.formDepartmentData = Object.assign({}, payload);
        }
    },
    getters: {
        isApplicationCancelled: state => {
            return state.applicationDetail.basvuruIptalEdildi;
        }
    }
};