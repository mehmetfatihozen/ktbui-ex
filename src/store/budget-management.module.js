import BudgetService from "@/services/budget.services";
import annulBudgetStateTransitionsUserAssignmentMain
    from "@/components/budget-management/settings/  annul-budget-state-transitions-user-assignment/annulBudgetStateTransitionsUserAssignmentMain";
import stateTransitions
    from "@/components/budget-management/settings/  annul-budget-state-transitions-user-assignment/stateTransitions";
import authorizedUsers
    from "@/components/budget-management/settings/  annul-budget-state-transitions-user-assignment/authorizedUsers";
import CompositionGroupsMain
    from "@/components/budget-management/settings/CompositionGroupsMain";
import CompositionGroupHistory
    from "@/components/budget-management/settings/CompositionGroupHistory";
import CompositionGroupsMainCompositionSubGroups
    from "@/components/budget-management/settings/CompositionGroupsMainCompositionSubGroups";
import CompositionSubGroupsTableRow
    from "@/components/budget-management/settings/CompositionSubGroupsTableRow";


const initialState = {
    settings: {
        compositionGroupsComponents: [
            {
                name: 'CompositionGroupsMain',
                component: CompositionGroupsMain
            },
            {
                name: 'CompositionGroupHistory',
                component: CompositionGroupHistory
            },
            {
                name: 'CompositionGroupsMainCompositionSubGroups',
                component: CompositionGroupsMainCompositionSubGroups
            },
            {
                name: 'CompositionSubGroupsTableRow',
                component: CompositionSubGroupsTableRow
            }
        ],

        currentCompositionGroupsComponent: null,
        currentCompositionGroupsComponentData: null,

        currentCompositionSubGroupModalData: null,

        currentBasicParameterComponentData: {}
    },

    budgetBasicParameters: [],
    budgetBasicParameter: {},

    compositionGroups: [],
    compositionGroupHistory: [],
    compositionSubGroups: [],
    compositionGroup: {},

    annualBudgetStates: [],
    currentAnnualBudgetStateTransitionsUserAssignment: annulBudgetStateTransitionsUserAssignmentMain,
    annualBudgetYears: [],
    AnnualBudgetStateTransitionsUserAssignmentComponents: [
        {
            name: "annulBudgetStateTransitionsUserAssignmentMain",
            cmp: annulBudgetStateTransitionsUserAssignmentMain
        },
        {
            name: "stateTransitions",
            cmp: stateTransitions
        },
        {
            name: "authorizedUsers",
            cmp: authorizedUsers
        }
    ],
    subStates: [],
    selectedSubState: null,
    selectedSubStateTransition: null,
    subStatePermissions: {},
    subStateTransitions: {},
    subStateTransitionsSelect: {},
    subStateTransitionsSelectList: [],
};

export const budgetManagement = {
    namespaced: true,
    state: initialState,
    actions: {
        changeAnnualBudgetStateTransitionsUserAssignment({commit}, payload) {
            commit('changeAnnualBudgetStateTransitionsUserAssignment', payload)
        },
        getAnnualBudgetYears({commit}, payload) {
            return BudgetService.getAnnualBudgetYears(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetYears', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addAnnualBudgetYears({commit}, payload) {
            return BudgetService.addAnnualBudgetYears(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetYears', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateAnnualBudgetYears({commit}, payload) {
            return BudgetService.updateAnnualBudgetYears(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetYears', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getAnnualBudgetStates({commit}, payload) {
            return BudgetService.getAnnualBudgetStates(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetStates', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addAnnualBudgetState({commit}, payload) {
            return BudgetService.addAnnualBudgetState(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetStates', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateAnnualBudgetState({commit}, payload) {
            return BudgetService.updateAnnualBudgetState(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setAnnualBudgetStates', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getSubStateTransitions({commit}, payload) {
            return BudgetService.getSubStateTransitions(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitions', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateTransitionsSelect({commit}, payload) {
            return BudgetService.getSubStateTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelect', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSubStateTransitionsSelectList({commit}, payload) {
            return BudgetService.getSubStateTransitionsSelectList(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelectList', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveSubStateTransitionsSelect({commit}, payload) {
            return BudgetService.saveSubStateTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelect', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        saveAuthorizeTransitionsSelect({commit}, payload) {
            return BudgetService.saveAuthorizeTransitionsSelect(payload).then(res => {
                if (res.data.data)
                    commit('setSubStateTransitionsSelectList', res.data.data);
                return Promise.resolve(res.data);
            })
        },

        getBudgetBasicParameters({commit}, payload) {
            return BudgetService.getBudgetBasicParametersByTypeId(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setBudgetBasicParameters', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addBudgetBasicParameter({commit}, payload) {
            return BudgetService.addBudgetBasicParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setBudgetBasicParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateBudgetBasicParameter({commit}, payload) {
            return BudgetService.updateBudgetBasicParameter(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setBudgetBasicParameter', res.data.data.parametre);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },

        changeCompositionGroupsComponent({commit}, payload) {
            commit('changeCompositionGroupsComponent', payload);
        },

        getCompositionGroups({commit}) {
            return BudgetService.getCompositionGroups().then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionGroups', res.data.data.tertipGrubuListesi);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addCompositionGroup({commit}, payload) {
            return BudgetService.addCompositionGroup(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionGroup', res.data.data.tertipGrubu);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateCompositionGroup({commit}, payload) {
            return BudgetService.updateCompositionGroup(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionGroup', res.data.data.tertipGrubu);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getCompositionGroupHistory({commit}, payload) {
            return BudgetService.getCompositionGroupHistory(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionGroupHistory', res.data.data);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        getCompositionSubGroups({commit}, payload) {
            return BudgetService.getCompositionSubGroups(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionSubGroups', res.data.data.tertipGrubuListesi);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        addCompositionSubGroup({commit}, payload) {
            return BudgetService.addCompositionSubGroup(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionSubGroups', res.data.data.tertipGrubuListesi);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        updateCompositionSubGroup({commit}, payload) {
            return BudgetService.updateCompositionSubGroup(payload).then(res => {
                if (res.data.hasError) {
                    return Promise.reject(res.data.errorMessage);
                } else {
                    commit('setCompositionSubGroups', res.data.data.tertipGrubuListesi);
                    return Promise.resolve(res.data);
                }
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        changeCompositionSubGroupModalData({commit}, payload) {
            commit('changeCompositionSubGroupModalData', payload);
        },
    },
    mutations: {
        changeAnnualBudgetStateTransitionsUserAssignment(state, payload) {
            const find = state.AnnualBudgetStateTransitionsUserAssignmentComponents.find(c => c.name === payload);
            if (find) {
                state.currentAnnualBudgetStateTransitionsUserAssignment = find.cmp;
            }
        },
        setAnnualBudgetYears(state, payload) {
            state.annualBudgetYears = Object.assign([], payload);
        },
        setAnnualBudgetStates(state, payload) {
            state.annualBudgetStates = Object.assign([], payload);
        },

        setBudgetBasicParameters(state, payload) {
            state.budgetBasicParameters = Object.assign([], payload);
        },
        setBudgetBasicParameter(state, payload) {
            state.budgetBasicParameter = Object.assign({}, payload);
        },

        changeCompositionGroupsComponent(state, payload) {
            const find = state.settings.compositionGroupsComponents.find(c => c.name === payload.component);
            if (find) {
                state.settings.currentCompositionGroupsComponent = find.component;
                state.settings.currentCompositionGroupsComponentData = payload.data;
            }
        },
        setCompositionGroups(state, payload) {
            state.compositionGroups = Object.assign([], payload);
        },
        setCompositionGroup(state, payload) {
            state.compositionGroup = Object.assign({}, payload);
        },
        setCompositionGroupHistory(state, payload) {
            state.compositionGroupHistory = Object.assign([], payload);
        },
        setCompositionSubGroups(state, payload) {
            state.compositionSubGroups = Object.assign([], payload);
        },
        changeCompositionSubGroupModalData(state, payload) {
            state.settings.currentCompositionSubGroupModalData = payload
        },

        setSubStateTransitions(state, payload) {
            state.subStateTransitions = Object.assign({}, payload);
        },
        setSubStateTransitionsSelect(state, payload) {
            state.subStateTransitionsSelect = Object.assign({}, payload);
        },
    }
};