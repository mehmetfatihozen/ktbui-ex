import SpSettingsService from "@/services/sp-settings.service";
import StatePermission from "@/components/strategic-plans/settings/StatePermission";
import SubStates from "@/components/strategic-plans/settings/state-permission/SubStates";
import SubStateTransitions from "@/components/strategic-plans/settings/state-permission/SubStateTransitions";
import SubStateTransitionsSelect
    from "@/components/strategic-plans/settings/state-permission/SubStateTransitionsSelect";
import AuthorizedUsers from "@/components/strategic-plans/settings/state-permission/AuthorizedUsers";
import AuthorizedUsersSelect from "@/components/strategic-plans/settings/state-permission/AuthorizedUsersSelect";

const initialState = {
    documents: [],
    documentHistories: [],
    subStates: [],
    subStateHistories: [],
    calculateTypes: [],
    calculateTypeHistories: [],
    statePermissions: [],
    stateComponents: [
        {name: 'StatePermission', cmp: StatePermission},
        {name: 'SubStates', cmp: SubStates},
        {name: 'SubStateTransitions', cmp: SubStateTransitions},
        {name: 'SubStateTransitionsSelect', cmp: SubStateTransitionsSelect},
        {name: 'AuthorizedUsers', cmp: AuthorizedUsers},
        {name: 'AuthorizedUsersSelect', cmp: AuthorizedUsersSelect},
    ],
    currentStateComponent: StatePermission,
    selectedSubState: null,
    selectedSubStateTransition: null,
    subStatePermissions: {},
    subStateTransitions: [],
    subStateTransitionsSelect: {},
    subStateTransitionsSelectList: [],
    titles: [],
}

export const spSettings = {
    namespaced: true,
    state: initialState,
    actions: {
        changeStatePermissionCmp({commit}, payload) {
            commit('changeStatePermissionCmp', payload);
        },
        getDocuments({commit}) {
            return SpSettingsService.getDocuments().then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addDocument({commit}, payload) {
            return SpSettingsService.addDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateDocument({commit}, payload) {
            return SpSettingsService.updateDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDocumentHistory({commit}, payload) {
            return SpSettingsService.getDocumentHistory(payload).then(res => {
                if (res.data.data)
                    commit('setDocumentHistories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStates({commit}) {
            return SpSettingsService.getSubStates().then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addSubState({commit}, payload) {
            return SpSettingsService.addSubState(payload).then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSubState({commit}, payload) {
            return SpSettingsService.updateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateHistory({commit}, payload) {
            return SpSettingsService.getSubStateHistory(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateHistories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getCalculateTypes({commit}) {
            return SpSettingsService.getCalculateTypes().then(res => {
                if (res.data.data)
                    commit('setCalculateTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addCalculateType({commit}, payload) {
            return SpSettingsService.addCalculateType(payload).then(res => {
                if (res.data.data)
                    commit('setCalculateTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateCalculateType({commit}, payload) {
            return SpSettingsService.updateCalculateType(payload).then(res => {
                if (res.data.data)
                    commit('setCalculateTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getCalculateTypeHistory({commit}, payload) {
            return SpSettingsService.getCalculateTypeHistory(payload).then(res => {
                if (res.data.data)
                    commit('setCalculateTypeHistories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStatePermission({commit}, payload) {
            return SpSettingsService.getStatePermission(payload).then(res => {
                if (res.data.data)
                    commit('setStatePermission', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStatePermissions({commit}, payload) {
            return SpSettingsService.getSubStatePermissions(payload).then(res => {
                if (res.data.data)
                    commit('setSubStatePermissions', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveSubStatePermission({commit}, payload) {
            return SpSettingsService.saveSubStatePermission(payload).then(res => {
                if (res.data.data)
                    commit('setSubStatePermissions', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateTransitions({commit}, payload) {
            return SpSettingsService.getSubStateTransitions(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitions', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateTransitionsSelect({commit}, payload) {
            return SpSettingsService.getSubStateTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelect', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateTransitionsSelectList({commit}, payload) {
            return SpSettingsService.getSubStateTransitionsSelectList(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelectList', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveSubStateTransitionsSelect({commit}, payload) {
            return SpSettingsService.saveSubStateTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelect', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveAuthorizeTransitionsSelect({commit}, payload) {
            return SpSettingsService.saveAuthorizeTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelectList', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTitlesByDepartmentId({commit}, payload) {
            return SpSettingsService.getTitlesByDepartmentId(payload).then(res => {
                if (res.data.data)
                    commit('setTitlesByDepartmentId', res.data.data);
                return Promise.resolve(res.data);
            })
        },
    },
    mutations: {
        changeStatePermissionCmp(state, payload) {
            const find = state.stateComponents.find(c => c.name === payload);
            if (find) {
                state.currentStateComponent = find.cmp;
            }
        },
        setDocuments(state, payload) {
            state.documents = Object.assign([], payload);
        },
        setDocumentHistories(state, payload) {
            state.documentHistories = Object.assign([], payload);
        },
        setSubStates(state, payload) {
            state.subStates = Object.assign([], payload);
        },
        setSubStateHistories(state, payload) {
            state.subStateHistories = Object.assign([], payload);
        },
        setCalculateTypes(state, payload) {
            state.calculateTypes = Object.assign([], payload);
        },
        setCalculateTypeHistories(state, payload) {
            state.calculateTypeHistories = Object.assign([], payload);
        },
        setStatePermission(state, payload) {
            state.statePermissions = Object.assign([], payload);
        },
        setSubStatePermissions(state, payload) {
            state.subStatePermissions = Object.assign({}, payload);
        },
        setSubStateTransitions(state, payload) {
            state.subStateTransitions = Object.assign([], payload);
        },
        setSubStateTransitionsSelect(state, payload) {
            state.subStateTransitionsSelect = Object.assign({}, payload);
        },
        setTitlesByDepartmentId(state, payload) {
            state.titles = Object.assign({}, payload);
        },
        setSubStateTransitionsSelectList(state, payload) {
            state.subStateTransitionsSelectList = Object.assign([], payload);
        }
    }
};