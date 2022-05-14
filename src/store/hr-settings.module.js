import HrSettingsService from '../services/hr-settings.service'

const initialState = {
    employeeStates: [],
    employeeStateHistories: [],
    employeeSubStates: [],
    employeeSubStateHistories: [],
    employeeDocuments: [],
    parameterTypes: [],
    employeeTypes: [],
    relationTypes: [],
    salaryTypes: [],
    leavingReasons: [],
    titles: [],
    departmentStatuses: [],
    departmentStatusHistories: [],
    departmentCategories: [],
    departmentCategoryHistories: [],
    topDepartments: [],
    categoryParameters: [],
    statusParameters: [],
    topDepartmentHistories: [],
    linkedDepartments: [],
    linkedDepartmentHistories: [],
    subDepartments: [],
    subDepartmentHistories: [],
    selectedTopDepartment: {},
    selectedLinkedDepartment: {},
    selectedSubDepartment: {},
    departments: [],
    departmentHistories: [],
    departmentTitles: [],
    departmentTitlesLeft: [],
};

export const hrSettings = {
    namespaced: true,
    state: initialState,
    actions: {
        getParameterTypes({commit}) {
            return HrSettingsService.getParameterTypes().then(res => {
                if (res.data.data)
                    commit('setParameterTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeStates({commit}) {
            return HrSettingsService.getEmployeeStates().then(res => {
                if (res.data.data)
                    commit('setEmployeeStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addEmployeeState({commit}, payload) {
            return HrSettingsService.addEmployeeStateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateEmployeeState({commit}, payload) {
            return HrSettingsService.updateEmployeeStateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeStateHistory({commit}, payload) {
            return HrSettingsService.getEmployeeStateHistory(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeStateHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeSubStates({commit}, payload) {
            return HrSettingsService.getEmployeeSubStates(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addEmployeeSubState({commit}, payload) {
            return HrSettingsService.addEmployeeStateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateEmployeeSubState({commit}, payload) {
            return HrSettingsService.updateEmployeeStateSubState(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeSubStates', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeSubStateHistory({commit}, payload) {
            return HrSettingsService.getEmployeeStateHistory(payload).then(res => {
                if (res.data.data)
                    commit('getEmployeeSubStateHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeDocuments({commit}, payload) {
            return HrSettingsService.getGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeDocuments', res.data.data);
                return Promise.resolve(res.data);
            })

        },
        addEmployeeDocument({commit}, payload) {
            return HrSettingsService.addGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeDocuments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateEmployeeDocument({commit}, payload) {
            return HrSettingsService.updateGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeDocuments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getEmployeeTypes({commit}, payload) {
            return HrSettingsService.getGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeTypes', res.data.data);
                return Promise.resolve(res.data);
            })

        },
        addEmployeeTypes({commit}, payload) {
            return HrSettingsService.addGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateEmployeeTypes({commit}, payload) {
            return HrSettingsService.updateGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setEmployeeTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getRelationTypes({commit}, payload) {
            return HrSettingsService.getGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setRelationTypes', res.data.data);
                return Promise.resolve(res.data);
            })

        },
        addRelationTypes({commit}, payload) {
            return HrSettingsService.addGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setRelationTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateRelationTypes({commit}, payload) {
            return HrSettingsService.updateGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setRelationTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSalaryTypes({commit}, payload) {
            return HrSettingsService.getGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setSalaryTypes', res.data.data);
                return Promise.resolve(res.data);
            })

        },
        addSalaryTypes({commit}, payload) {
            return HrSettingsService.addGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setSalaryTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSalaryTypes({commit}, payload) {
            return HrSettingsService.updateGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setSalaryTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getLeavingReasons({commit}, payload) {
            return HrSettingsService.getGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setLeavingReasons', res.data.data);
                return Promise.resolve(res.data);
            })

        },
        addLeavingReason({commit}, payload) {
            return HrSettingsService.addGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setLeavingReasons', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateLeavingReason({commit}, payload) {
            return HrSettingsService.updateGeneralParameter(payload).then(res => {
                if (res.data.data)
                    commit('setLeavingReasons', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        searchTitles({commit}, payload) {
            return HrSettingsService.searchTitles(payload).then(res => {
                if (res.data.data)
                    commit('setTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTitles({commit}) {
            return HrSettingsService.getTitles().then(res => {
                if (res.data.data)
                    commit('setTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addTitle({commit}, payload) {
            return HrSettingsService.addTitle(payload).then(res => {
                if (res.data.data)
                    commit('setTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateTitle({commit}, payload) {
            return HrSettingsService.updateTitle(payload).then(res => {
                if (res.data.data)
                    commit('setTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentStatuses({commit}, payload) {
            return HrSettingsService.getDepartmentStatuses(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentStatuses', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addDepartmentStatus({commit}, payload) {
            return HrSettingsService.addDepartmentStatus(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentStatuses', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateDepartmentStatus({commit}, payload) {
            return HrSettingsService.updateDepartmentStatus(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentStatuses', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentStatusHistory({commit}, payload) {
            return HrSettingsService.getDepartmentStatusHistory(payload).then(res => {
                if (res.data.data)
                    commit('getDepartmentStatusHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentCategories({commit}) {
            return HrSettingsService.getDepartmentCategories().then(res => {
                if (res.data.data)
                    commit('setDepartmentCategories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addDepartmentCategory({commit}, payload) {
            return HrSettingsService.addDepartmentCategory(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentCategories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateDepartmentCategory({commit}, payload) {
            return HrSettingsService.updateDepartmentCategory(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentCategories', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentCategoryHistory({commit}, payload) {
            return HrSettingsService.getDepartmentCategoryHistory(payload).then(res => {
                if (res.data.data)
                    commit('getDepartmentCategoryHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getCategoryParameter({commit}) {
            return HrSettingsService.getCategoryParameter().then(res => {
                if (res.data.data)
                    commit('getCategoryParameter', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getStatusParameter({commit}) {
            return HrSettingsService.getStatusParameter().then(res => {
                if (res.data.data)
                    commit('getStatusParameter', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTopDepartments({commit}, payload) {
            return HrSettingsService.getDepartments(payload).then(res => {
                if (res.data.data)
                    commit('setTopDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addTopDepartment({commit}, payload) {
            return HrSettingsService.addDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setTopDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateTopDepartment({commit}, payload) {
            return HrSettingsService.updateDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setTopDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getTopDepartmentHistory({commit}, payload) {
            return HrSettingsService.getDepartmentHistory(payload).then(res => {
                if (res.data.data)
                    commit('getTopDepartmentHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getLinkedDepartments({commit}, payload) {
            return HrSettingsService.getDepartments(payload).then(res => {
                if (res.data.data)
                    commit('setLinkedDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addLinkedDepartment({commit}, payload) {
            return HrSettingsService.addDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setLinkedDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateLinkedDepartment({commit}, payload) {
            return HrSettingsService.updateDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setLinkedDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getLinkedDepartmentHistory({commit}, payload) {
            return HrSettingsService.getDepartmentHistory(payload).then(res => {
                if (res.data.data)
                    commit('getLinkedDepartmentHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubDepartments({commit}, payload) {
            return HrSettingsService.getDepartments(payload).then(res => {
                if (res.data.data)
                    commit('setSubDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addSubDepartment({commit}, payload) {
            return HrSettingsService.addDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setSubDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSubDepartment({commit}, payload) {
            return HrSettingsService.updateDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setSubDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubDepartmentHistory({commit}, payload) {
            return HrSettingsService.getDepartmentHistory(payload).then(res => {
                if (res.data.data)
                    commit('getSubDepartmentHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartments({commit}, payload) {
            return HrSettingsService.getDepartments(payload).then(res => {
                if (res.data.data)
                    commit('setDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addDepartment({commit}, payload) {
            return HrSettingsService.addDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateDepartment({commit}, payload) {
            return HrSettingsService.updateDepartment(payload).then(res => {
                if (res.data.data)
                    commit('setDepartments', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentHistory({commit}, payload) {
            return HrSettingsService.getDepartmentHistory(payload).then(res => {
                if (res.data.data)
                    commit('getDepartmentHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getDepartmentTitles({commit}, payload) {
            return HrSettingsService.getDepartmentTitles(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        searchDepartmentTitles({commit}, payload) {
            return HrSettingsService.searchDepartmentTitles(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentTitlesLeft', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveDepartmentTitle({commit}, payload) {
            return HrSettingsService.saveDepartmentTitle(payload).then(res => {
                if (res.data.data)
                    commit('setDepartmentTitles', res.data.data);
                return Promise.resolve(res.data);
            })
        }
    },
    mutations: {
        setParameterTypes(state, payload) {
            state.parameterTypes = Object.assign([], payload);
        },
        setEmployeeStates(state, payload) {
            state.employeeStates = Object.assign({}, payload);
        },
        setEmployeeDocuments(state, payload) {
            state.employeeDocuments = Object.assign([], payload);
        },
        setEmployeeTypes(state, payload) {
            state.employeeTypes = Object.assign([], payload);
        },
        setRelationTypes(state, payload) {
            state.relationTypes = Object.assign([], payload);
        },
        setSalaryTypes(state, payload) {
            state.salaryTypes = Object.assign([], payload);
        },
        setLeavingReasons(state, payload) {
            state.leavingReasons = Object.assign([], payload);
        },
        setTitles(state, payload) {
            state.titles = Object.assign([], payload);
        },
        setEmployeeStateHistory(state, payload) {
            state.employeeStateHistories = Object.assign([], payload);
        },
        setEmployeeSubStates(state, payload) {
            state.employeeSubStates = Object.assign([], payload);
        },
        getEmployeeSubStateHistory(state, payload) {
            state.employeeSubStateHistories = Object.assign([], payload);
        },
        setDepartmentStatuses(state, payload) {
            state.departmentStatuses = Object.assign([], payload);
        },
        getDepartmentStatusHistory(state, payload) {
            state.departmentStatusHistories = Object.assign([], payload);
        },
        setDepartmentCategories(state, payload) {
            state.departmentCategories = Object.assign([], payload);
        },
        getDepartmentCategoryHistory(state, payload) {
            state.departmentCategoryHistories = Object.assign([], payload);
        },
        setTopDepartments(state, payload) {
            state.topDepartments = Object.assign([], payload);
        },
        getCategoryParameter(state, payload) {
            state.categoryParameters = Object.assign([], payload);
        },
        getStatusParameter(state, payload) {
            state.statusParameters = Object.assign([], payload);
        },
        getTopDepartmentHistory(state, payload) {
            state.topDepartmentHistories = Object.assign([], payload);
        },
        setLinkedDepartments(state, payload) {
            state.linkedDepartments = Object.assign([], payload);
        },
        getLinkedDepartmentHistory(state, payload) {
            state.linkedDepartmentHistories = Object.assign([], payload);
        },
        setSubDepartments(state, payload) {
            state.subDepartments = Object.assign([], payload);
        },
        getSubDepartmentHistory(state, payload) {
            state.subDepartmentHistories = Object.assign([], payload);
        },
        setDepartments(state, payload) {
            state.departments = Object.assign([], payload);
        },
        getDepartmentHistory(state, payload) {
            state.departmentHistories = Object.assign([], payload);
        },
        setDepartmentTitles(state, payload) {
            state.departmentTitles = Object.assign([], payload);
        },
        setDepartmentTitlesLeft(state, payload) {
            state.departmentTitlesLeft = Object.assign([], payload);
        },
    }
};