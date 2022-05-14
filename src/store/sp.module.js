import SpService from '../services/sp.service';
import GeneralInfo from "@/components/strategic-plans/GeneralInfo";

import Goals from "@/components/strategic-plans/Goals";
import GoalsMain from "@/components/strategic-plans/goals/GoalsMain";
import GoalDetails from "@/components/strategic-plans/goals/GoalDetails";


import Indicators from "@/components/strategic-plans/Indicators";
import IndicatorsMain from "@/components/strategic-plans/indicators/IndicatorsMain";
import IndicatorDetail from "@/components/strategic-plans/indicators/IndicatorDetail";

import StatusInfo from "@/components/strategic-plans/StatusInfo";
import Documents from "@/components/strategic-plans/Documents";
import Notes from "@/components/strategic-plans/Notes";


//Monitoring
import MonitoringGeneralInfo from "@/components/strategic-plans/monitoring/GeneralInfo";
import MonitoringGoals from "@/components/strategic-plans/monitoring/Goals";
import MonitoringGoalsMain from "@/components/strategic-plans/monitoring/goals/GoalsMain";
import MonitoringGoalDetails from "@/components/strategic-plans/monitoring/goals/GoalDetails";
import MonitoringIndicators from "@/components/strategic-plans/monitoring/Indicators";
import MonitoringIndicatorsMain from "@/components/strategic-plans/monitoring/indicators/IndicatorsMain";
import MonitoringIndicatorDetail from "@/components/strategic-plans/monitoring/indicators/IndicatorDetail";
import MonitoringStatusInfo from "@/components/strategic-plans/monitoring/StatusInfo";
import MonitoringDocuments from "@/components/strategic-plans/monitoring/Documents";
import MonitoringNotes from "@/components/strategic-plans/monitoring/Notes";

const initialState = {
    detail: {
        tabs: [
            {name: 'GeneralInfo', cmp: GeneralInfo},
            {name: 'Goals', cmp: Goals},
            {name: 'Indicators', cmp: Indicators},
            {name: 'StatusInfo', cmp: StatusInfo},
            {name: 'Documents', cmp: Documents},
            {name: 'Notes', cmp: Notes},
        ],
        currentTab: GeneralInfo,
        goalsComponents: [
            {name: 'GoalsMain', cmp: GoalsMain},
            {name: 'GoalDetails', cmp: GoalDetails},
        ],
        currentGoalsComponent: GoalsMain,
        indicatorComponents: [
            {name: 'IndicatorsMain', cmp: IndicatorsMain},
            {name: 'IndicatorDetail', cmp: IndicatorDetail},
        ],
        currentIndicatorComponent: IndicatorsMain,
    },
    monitoring: {
        tabs: [
            {name: 'MonitoringGeneralInfo', cmp: MonitoringGeneralInfo},
            {name: 'MonitoringGoals', cmp: MonitoringGoals},
            {name: 'MonitoringIndicators', cmp: MonitoringIndicators},
            {name: 'MonitoringStatusInfo', cmp: MonitoringStatusInfo},
            {name: 'MonitoringDocuments', cmp: MonitoringDocuments},
            {name: 'MonitoringNotes', cmp: MonitoringNotes},
        ],
        currentTab: MonitoringGeneralInfo,
        goalsComponents: [
            {name: 'MonitoringGoalsMain', cmp: MonitoringGoalsMain},
            {name: 'MonitoringGoalDetails', cmp: MonitoringGoalDetails},
        ],
        currentGoalsComponent: MonitoringGoalsMain,
        indicatorComponents: [
            {name: 'MonitoringIndicatorsMain', cmp: MonitoringIndicatorsMain},
            {name: 'MonitoringIndicatorDetail', cmp: MonitoringIndicatorDetail},
        ],
        currentIndicatorComponent: MonitoringIndicatorsMain,
    },
    listDropdown: [],
    monitoringYears: [],
    planList: {},
    showNewPlan: false,
    showNewPlanMonitoring: false,
    plan: {},
    purposeShortNames: [],
    purposes: [],
    purposeHistories: [],
    documents: [],
    documentTypes: [],
    notes: [],
    noteDetail: {},
    states: [],
    stateDropdown: [],
    subStateDropdown: [],
    monitoringDocuments: [],
    monitoringDocumentTypes: [],
    monitoringNotes: [],
    monitoringNoteDetail: {},
    monitoringStates: [],
    monitoringStateDropdown: [],
    monitoringSubStateDropdown: [],
    goals: [],
    selectedPurpose: {},
    goalShortNames: [],
    departments: [],
    selectedGoal: {},
    goalHistories: [],
    goalDetail: {},
    indicators: [],
    indicatorShortNames: [],
    indicatorHistories: [],
    indicatorDetail: [],
    indicatorDetailYears: [],
    indicatorDetailForm: {},
    indicatorDetailHistories: [],
    openPurposeAccordionId: null,
    planMonitoringList: [],
    planMonitoringDetail: {},
    monitoringPurposes: [],
    monitoringGoalDetail: {},
    duplicateForm: {},
    monitoringDuplicateForm: {},
}

export const sp = {
    namespaced: true,
    state: initialState,
    actions: {
        changeDetailTab({commit}, payload) {
            commit('changeDetailTab', payload);
        },
        changeGoalsComponent({commit}, payload) {
            commit('changeGoalsComponent', payload);
        },
        changeIndicatorComponent({commit}, payload) {
            commit('changeIndicatorComponent', payload);
        },
        changeMonitoringTab({commit}, payload) {
            commit('changeMonitoringTab', payload);
        },
        changeMonitoringGoalsComponent({commit}, payload) {
            commit('changeMonitoringGoalsComponent', payload);
        },
        changeMonitoringIndicatorComponent({commit}, payload) {
            commit('changeMonitoringIndicatorComponent', payload);
        },
        resetState({commit}) {
            commit('resetState')
        },
        getListDropdown({commit}, payload) {
            return SpService.getListDropdown(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setListDropdown', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getMonitoringYears({commit}, payload) {
            return SpService.getMonitoringYears(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMonitoringYears', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getPlanList({commit}, payload) {
            return SpService.getPlanList(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPlanList', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        // eslint-disable-next-line no-unused-vars
        addPlan({commit}, payload) {
            return SpService.addPlan(payload)
                .then(res => {
                    return Promise.resolve(res.data);
                })
        },
        updatePlan({commit}, payload) {
            return SpService.updatePlan(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPlan', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getPlan({commit}, payload) {
            return SpService.getPlan(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPlan', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        // eslint-disable-next-line no-unused-vars
        deletePlan({commit}, payload) {
            return SpService.deletePlan(payload)
                .then(res => {
                    return Promise.resolve(res.data);
                })
        },
        getPurposeShortNames({commit}, payload) {
            return SpService.getPurposeShortNames(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPurposeShortNames', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getPurposes({commit}, payload) {
            return SpService.getPurposes(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPurposes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addPurpose({commit}, payload) {
            return SpService.addPurpose(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPurposes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        removePurpose({commit}, payload) {
            return SpService.removePurpose(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPurposes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getPurposeHistory({commit}, payload) {
            return SpService.getPurposeHistory(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPurposeHistories', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getDocuments({commit}, payload) {
            return SpService.getDocuments(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDocumentParameters({commit}) {
            return SpService.getDocumentParameters().then(res => {
                if (res.data.data)
                    commit('getDocumentParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addDocument({commit}, payload) {
            return SpService.addDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteDocument({commit}, payload) {
            return SpService.deleteDocument(payload).then(res => {
                if (res.data.data)
                    commit('setDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getNotes({commit}, payload) {
            return SpService.getNotes(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setNotes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getNoteDetail({commit}, payload) {
            return SpService.getNoteDetail(payload).then(res => {
                if (res.data.data)
                    commit('getNoteDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addNote({commit}, payload) {
            return SpService.addNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateNote({commit}, payload) {
            return SpService.updateNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteNote({commit}, payload) {
            return SpService.deleteNote(payload).then(res => {
                if (res.data.data)
                    commit('setNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getStates({commit}, payload) {
            return SpService.getStates(payload).then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addState({commit}, payload) {
            return SpService.addState(payload).then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateState({commit}, payload) {
            return SpService.updateState(payload).then(res => {
                if (res.data.data)
                    commit('setStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getStateDropdown({commit}, payload) {
            return SpService.getStateDropdown(payload).then(res => {
                if (res.data.data)
                    commit('setStateDropdown', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSubStateDropdown({commit}, payload) {
            return SpService.getSubStateDropdown(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateDropdown', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getGoals({commit}, payload) {
            return SpService.getGoals(payload).then(res => {
                if (res.data.data)
                    commit('setGoals', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateSelectedPurpose({commit}, payload) {
            commit('updateSelectedPurpose', payload);
        },
        updateSelectedGoal({commit}, payload) {
            commit('updateSelectedGoal', payload);
        },
        getGoalShortNames({commit}, payload) {
            return SpService.getGoalShortNames(payload).then(res => {
                if (res.data.data)
                    commit('setGoalShortNames', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDepartments({commit}) {
            return SpService.getDepartments().then(res => {
                if (res.data.data)
                    commit('setDepartments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addGoal({commit}, payload) {
            return SpService.addGoal(payload).then(res => {
                if (res.data.data)
                    commit('setGoals', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateGoal({commit}, payload) {
            return SpService.updateGoal(payload).then(res => {
                if (res.data.data)
                    commit('setGoals', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteGoal({commit}, payload) {
            return SpService.deleteGoal(payload).then(res => {
                if (res.data.data)
                    commit('setGoals', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getGoalHistory({commit}, payload) {
            return SpService.getGoalHistory(payload).then(res => {
                if (res.data.data)
                    commit('setGoalHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getGoalDetail({commit}, payload) {
            return SpService.getGoalDetail(payload).then(res => {
                if (res.data.data)
                    commit('setGoalDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addGoalDetail({commit}, payload) {
            return SpService.addGoalDetail(payload).then(res => {
                if (res.data.data)
                    commit('setGoalDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteGoalDetail({commit}, payload) {
            return SpService.deleteGoalDetail(payload).then(res => {
                if (res.data.data)
                    commit('setGoalDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicators({commit}, payload) {
            return SpService.getIndicators(payload).then(res => {
                if (res.data.data)
                    commit('setIndicators', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addIndicator({commit}, payload) {
            return SpService.addIndicator(payload).then(res => {
                if (res.data.data)
                    commit('setIndicators', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorShortNames({commit}, payload) {
            return SpService.getIndicatorShortNames(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorShortNames', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteIndicator({commit}, payload) {
            return SpService.deleteIndicator(payload).then(res => {
                if (res.data.data)
                    commit('setIndicators', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorHistory({commit}, payload) {
            return SpService.getIndicatorHistory(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorDetail({commit}, payload) {
            return SpService.getIndicatorDetail(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addIndicatorDetail({commit}, payload) {
            return SpService.addIndicatorDetail(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteIndicatorDetail({commit}, payload) {
            return SpService.deleteIndicatorDetail(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorDetailForm({commit}, payload) {
            return SpService.getIndicatorDetailForm(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetailForm', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorDetailYears({commit}, payload) {
            return SpService.getIndicatorDetailYears(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetailYears', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getIndicatorDetailHistory({commit}, payload) {
            return SpService.getIndicatorDetailHistory(payload).then(res => {
                if (res.data.data)
                    commit('setIndicatorDetailHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        // eslint-disable-next-line no-unused-vars
        addPlanMonitoring({commit}, payload) {
            return SpService.addPlanMonitoring(payload)
                .then(res => {
                    return Promise.resolve(res.data);
                })
        },
        getPlanMonitoringList({commit}, payload) {
            return SpService.getPlanMonitoringList(payload).then(res => {
                if (res.data.data)
                    commit('setPlanMonitoringList', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getPlanMonitoringDetail({commit}, payload) {
            return SpService.getPlanMonitoringDetail(payload).then(res => {
                if (res.data.data)
                    commit('setPlanMonitoring', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        // eslint-disable-next-line no-unused-vars
        deletePlanMonitoring({commit}, payload) {
            return SpService.deletePlanMonitoring(payload)
                .then(res => {
                    return Promise.resolve(res.data);
                })
        },
        getMonitoringDocuments({commit}, payload) {
            return SpService.getMonitoringDocuments(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringDocumentParameters({commit}) {
            return SpService.getMonitoringDocumentParameters().then(res => {
                if (res.data.data)
                    commit('getMonitoringDocumentParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addMonitoringDocument({commit}, payload) {
            return SpService.addMonitoringDocument(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteMonitoringDocument({commit}, payload) {
            return SpService.deleteMonitoringDocument(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringNotes({commit}, payload) {
            return SpService.getMonitoringNotes(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMonitoringNotes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getMonitoringNoteDetail({commit}, payload) {
            return SpService.getMonitoringNoteDetail(payload).then(res => {
                if (res.data.data)
                    commit('getMonitoringNoteDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addMonitoringNote({commit}, payload) {
            return SpService.addMonitoringNote(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateMonitoringNote({commit}, payload) {
            return SpService.updateMonitoringNote(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        deleteMonitoringNote({commit}, payload) {
            return SpService.deleteMonitoringNote(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringNotes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringStates({commit}, payload) {
            return SpService.getMonitoringStates(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addMonitoringState({commit}, payload) {
            return SpService.addMonitoringState(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        updateMonitoringState({commit}, payload) {
            return SpService.updateMonitoringState(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringStates', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringStateDropdown({commit}, payload) {
            return SpService.getMonitoringStateDropdown(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringStateDropdown', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringSubStateDropdown({commit}, payload) {
            return SpService.getMonitoringSubStateDropdown(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringSubStateDropdown', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringPurposes({commit}, payload) {
            return SpService.getMonitoringPurposes(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringPurposes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getMonitoringGoalDetail({commit}, payload) {
            return SpService.getMonitoringGoalDetail(payload).then(res => {
                if (res.data.data)
                    commit('setMonitoringGoalDetail', res.data.data);
                return Promise.resolve(res.data);
            });
        },
    },
    mutations: {
        changeDetailTab(state, payload) {
            const find = state.detail.tabs.find(c => c.name === payload);
            if (find) {
                state.detail.currentTab = find.cmp;
            }
        },
        changeGoalsComponent(state, payload) {
            const find = state.detail.goalsComponents.find(c => c.name === payload);
            if (find) {
                state.detail.currentGoalsComponent = find.cmp;
            }
        },
        changeIndicatorComponent(state, payload) {
            const find = state.detail.indicatorComponents.find(c => c.name === payload);
            if (find) {
                state.detail.currentIndicatorComponent = find.cmp;
            }
        },
        changeMonitoringTab(state, payload) {
            const find = state.monitoring.tabs.find(c => c.name === payload);
            if (find) {
                state.monitoring.currentTab = find.cmp;
            }
        },
        changeMonitoringGoalsComponent(state, payload) {
            const find = state.monitoring.goalsComponents.find(c => c.name === payload);
            if (find) {
                state.monitoring.currentGoalsComponent = find.cmp;
            }
        },
        changeMonitoringIndicatorComponent(state, payload) {
            const find = state.monitoring.indicatorComponents.find(c => c.name === payload);
            if (find) {
                state.monitoring.currentIndicatorComponent = find.cmp;
            }
        },
        resetState(state) {
            state.showNewPlan = false;
            state.showNewPlanMonitoring = false;
        },
        setListDropdown(state, payload) {
            state.listDropdown = Object.assign([], payload);
        },
        setMonitoringYears(state, payload) {
            state.monitoringYears = Object.assign([], payload);
        },
        setPlanList(state, payload) {
            state.planList = Object.assign({}, payload);
        },
        setPurposeShortNames(state, payload) {
            state.purposeShortNames = Object.assign([], payload);
        },
        setPurposes(state, payload) {
            state.purposes = Object.assign([], payload);
        },
        setPurposeHistories(state, payload) {
            state.purposeHistories = Object.assign([], payload);
        },
        setPlan(state, payload) {
            state.plan = Object.assign({}, payload);
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
        setStates(state, payload) {
            state.states = Object.assign([], payload);
        },
        setStateDropdown(state, payload) {
            state.stateDropdown = Object.assign([], payload);
        },
        setSubStateDropdown(state, payload) {
            state.subStateDropdown = Object.assign([], payload);
        },
        setGoals(state, payload) {
            state.goals = Object.assign([], payload);
        },
        updateSelectedPurpose(state, payload) {
            state.selectedPurpose = Object.assign({}, payload);
        },
        updateSelectedGoal(state, payload) {
            state.selectedGoal = Object.assign({}, payload);
        },
        setGoalShortNames(state, payload) {
            state.goalShortNames = Object.assign([], payload);
        },
        setDepartments(state, payload) {
            state.departments = Object.assign([], payload);
        },
        setGoalHistory(state, payload) {
            state.goalHistories = Object.assign([], payload);
        },
        setGoalDetail(state, payload) {
            state.goalDetail = Object.assign({}, payload);
        },
        setIndicators(state, payload) {
            state.indicators = Object.assign([], payload);
        },
        setIndicatorShortNames(state, payload) {
            state.indicatorShortNames = Object.assign([], payload);
        },
        setIndicatorHistory(state, payload) {
            state.indicatorHistories = Object.assign([], payload);
        },
        setIndicatorDetail(state, payload) {
            state.indicatorDetail = Object.assign({}, payload);
        },
        setIndicatorDetailForm(state, payload) {
            state.indicatorDetailForm = Object.assign({}, payload);
        },
        setIndicatorDetailYears(state, payload) {
            state.indicatorDetailYears = Object.assign([], payload);
        },
        setIndicatorDetailHistory(state, payload) {
            state.indicatorDetailHistories = Object.assign([], payload);
        },
        setPlanMonitoringList(state, payload) {
            state.planMonitoringList = Object.assign([], payload);
        },
        setPlanMonitoring(state, payload) {
            state.planMonitoringDetail = Object.assign({}, payload);
        },
        setMonitoringDocuments(state, payload) {
            state.monitoringDocuments = Object.assign([], payload);
        },
        getMonitoringDocumentParameters(state, payload) {
            state.monitoringDocumentTypes = Object.assign([], payload);
        },
        setMonitoringNotes(state, payload) {
            state.monitoringNotes = Object.assign([], payload);
        },
        getMonitoringNoteDetail(state, payload) {
            state.monitoringNoteDetail = Object.assign({}, payload);
        },
        setMonitoringStates(state, payload) {
            state.monitoringStates = Object.assign([], payload);
        },
        setMonitoringStateDropdown(state, payload) {
            state.monitoringStateDropdown = Object.assign([], payload);
        },
        setMonitoringSubStateDropdown(state, payload) {
            state.monitoringSubStateDropdown = Object.assign([], payload);
        },
        setMonitoringPurposes(state, payload) {
            state.monitoringPurposes = Object.assign([], payload);
        },
        setMonitoringGoalDetail(state, payload) {
            state.monitoringGoalDetail = Object.assign({}, payload);
        },
    }
};