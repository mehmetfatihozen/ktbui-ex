import ApplicationSettingsService from '@/services/application-settings.service';
import States from "@/components/application/settings/States";
import SubStates from "@/components/application/settings/SubStates";

import Topics from "@/components/application/settings/Topics";
import TopicDetail from "@/components/application/settings/TopicDetail";
import Sla from "@/components/application/settings/Sla";
import SlaHistory from "@/components/application/settings/SlaHistory";

const initialState = {
    states: [],
    subStates: [],
    priorities: [],
    types: [],
    locations: [],
    topics: [],
    slaList: [],
    slaHistoryList: [],
    topicDetails: {},
    stateComponents: [
        {name: 'StatesMain', cmp: States},
        {name: 'SubStates', cmp: SubStates},
    ],
    currentStateComponent: States,
    currentStateComponentData: null,
    topicComponents: [
        {name: 'Topics', cmp: Topics},
        {name: 'TopicDetail', cmp: TopicDetail},
        {name: 'Sla', cmp: Sla},
        {name: 'SlaHistory', cmp: SlaHistory},
    ],
    currentTopicComponent: Topics,
    currentTopicComponentData: null,
    details:[],
}

export const applicationSettings = {
    namespaced: true,
    state: initialState,
    actions: {
        changeStateComponent({commit}, payload) {
            commit('changeStateComponent', payload)
        },
        changeTopicComponent({commit}, payload) {
            commit('changeTopicComponent', payload)
        },
        getDetails({commit}){
            return ApplicationSettingsService.getDetails().then(res => {
                if (res.data.data)
                    commit('setDetails', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addDetails({commit}, payload) {
            return ApplicationSettingsService.addParameter(payload).then(res => {
                if (res.data.data)
                    commit('setDetails', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateDetails({commit}, payload) {
            return ApplicationSettingsService.updateParameter(payload).then(res => {
                if (res.data.data)
                    commit('setDetails', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStates({commit}) {
            return ApplicationSettingsService.getStates().then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addState({commit}, payload) {
            return ApplicationSettingsService.addParameter(payload).then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateState({commit}, payload) {
            return ApplicationSettingsService.updateParameter(payload).then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStates({commit}, payload) {
            return ApplicationSettingsService.getSubStates(payload).then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addSubState({commit}, payload) {
            return ApplicationSettingsService.addSubState(payload).then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSubState({commit}, payload) {
            return ApplicationSettingsService.updateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getPriorities({commit}) {
            return ApplicationSettingsService.getPriorities().then(res => {
                if (res.data.data)
                    commit('setPriorities', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addPriority({commit}, payload) {
            return ApplicationSettingsService.addParameter(payload).then(res => {
                if (res.data.data)
                    commit('setPriorities', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updatePriority({commit}, payload) {
            return ApplicationSettingsService.updateParameter(payload).then(res => {
                if (res.data.data)
                    commit('setPriorities', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTypes({commit}) {
            return ApplicationSettingsService.getTypes().then(res => {
                if (res.data.data)
                    commit('setTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addType({commit}, payload) {
            return ApplicationSettingsService.addParameter(payload).then(res => {
                if (res.data.data)
                    commit('setTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateType({commit}, payload) {
            return ApplicationSettingsService.updateParameter(payload).then(res => {
                if (res.data.data)
                    commit('setTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getLocations({commit}) {
            return ApplicationSettingsService.getLocations().then(res => {
                if (res.data.data)
                    commit('setLocations', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addLocation({commit}, payload) {
            return ApplicationSettingsService.addLocation(payload).then(res => {
                if (res.data.data)
                    commit('setLocations', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateLocation({commit}, payload) {
            return ApplicationSettingsService.updateLocation(payload).then(res => {
                if (res.data.data)
                    commit('setLocations', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTopics({commit}) {
            return ApplicationSettingsService.getTopics().then(res => {
                if (res.data.data)
                    commit('setTopics', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addTopic({commit}, payload) {
            return ApplicationSettingsService.addParameter(payload).then(res => {
                if (res.data.data)
                    commit('setTopics', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateTopic({commit}, payload) {
            return ApplicationSettingsService.updateParameter(payload).then(res => {
                if (res.data.data)
                    commit('setTopics', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTopicDetails({commit}, payload) {
            return ApplicationSettingsService.getTopicDetails(payload).then(res => {
                if (res.data.data)
                    commit('setTopicDetails', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveTopicDetail({commit}, payload) {
            return ApplicationSettingsService.saveTopicDetail(payload).then(res => {
                if (res.data.data)
                    commit('setTopicDetails', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSlaList({commit}, payload) {
            return ApplicationSettingsService.getSlaList(payload).then(res => {
                if (res.data.data)
                    commit('setSlaList', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSlaHistory({commit}, payload) {
            return ApplicationSettingsService.getSlaHistory(payload).then(res => {
                if (res.data.data)
                    commit('setSlaHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addSla({commit}, payload) {
            return ApplicationSettingsService.addSla(payload).then(res => {
                if (res.data.data)
                    commit('setSlaList', res.data.data);
                return Promise.resolve(res.data);
            })
        }
    },
    mutations: {
        changeStateComponent(state, payload) {
            const find = state.stateComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.currentStateComponent = find.cmp;
                state.currentStateComponentData = payload.data;
            }
        },
        changeTopicComponent(state, payload) {
            const find = state.topicComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.currentTopicComponent = find.cmp;
                state.currentTopicComponentData = payload.data;
            }
        },
        setStates(state, payload) {
            state.states = Object.assign([], payload);
        },
        setSubStates(state, payload) {
            state.subStates = Object.assign([], payload);
        },
        setPriorities(state, payload) {
            state.priorities = Object.assign([], payload);
        },
        setTypes(state, payload) {
            state.types = Object.assign([], payload);
        },
        setTopics(state, payload) {
            state.topics = Object.assign([], payload);
        },
        setTopicDetails(state, payload) {
            state.topicDetails = Object.assign({}, payload);
        },
        setSlaList(state, payload) {
            state.slaList = Object.assign([], payload);
        },
        setSlaHistory(state, payload) {
            state.slaHistoryList = Object.assign([], payload);
        },
        setLocations(state, payload) {
            state.locations = Object.assign([], payload);
        },
        setDetails(state, payload) {
            state.details = Object.assign([], payload);
        }
    }
};