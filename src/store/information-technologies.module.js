import RoleTypes from "@/components/information-technologies/settings/RoleTypes";
import RoleTypesHistory from "@/components/information-technologies/settings/RoleTypesHistory";

import RoleTypePermission from "@/components/information-technologies/settings/RoleTypePermission";
import RoleTypePermissionDetail from "@/components/information-technologies/settings/RoleTypePermissionDetail";
import RoleTypePermissionDetailHistory
    from "@/components/information-technologies/settings/RoleTypePermissionDetailHistory";

import RoleTypeUser from "@/components/information-technologies/settings/RoleTypeUser";
import RoleTypeUserDetail from "@/components/information-technologies/settings/RoleTypeUserDetail";
import RoleTypeUserDetailHistory from "@/components/information-technologies/settings/RoleTypeUserDetailHistory";
import RoleTypeUserDetailSearch from "@/components/information-technologies/settings/RoleTypeUserDetailSearch";

import UserSpecialPermission from "@/components/information-technologies/settings/UserSpecialPermission";
import UserSpecialPermissionDetail from "@/components/information-technologies/settings/UserSpecialPermissionDetail";
import UserSpecialPermissionDetailHistory
    from "@/components/information-technologies/settings/UserSpecialPermissionDetailHistory";
import UserSpecialPermissionPermissions
    from "@/components/information-technologies/settings/UserSpecialPermissionPermissions";
import UserSpecialPermissionPermissionsHistory
    from "@/components/information-technologies/settings/UserSpecialPermissionPermissionsHistory";

import SystemLoginPermission from "@/components/information-technologies/settings/SystemLoginPermission";
import SystemLoginPermissionHistory from "@/components/information-technologies/settings/SystemLoginPermissionHistory";
import SystemLoginPermissionDetail from "@/components/information-technologies/settings/SystemLoginPermissionDetail";
import SystemLoginPermissionDetailHistory
    from "@/components/information-technologies/settings/SystemLoginPermissionDetailHistory";
import ItService from "@/services/it.service";

const initialState = {
    settings: {
        roleTypesComponents: [
            {name: 'RoleTypes', cmp: RoleTypes},
            {name: 'RoleTypesHistory', cmp: RoleTypesHistory},
        ],
        currentRoleTypes: RoleTypes,
        currentRoleTypesData: null,
        roleTypePermissionComponents: [
            {name: 'RoleTypePermission', cmp: RoleTypePermission},
            {name: 'RoleTypePermissionDetail', cmp: RoleTypePermissionDetail},
            {name: 'RoleTypePermissionDetailHistory', cmp: RoleTypePermissionDetailHistory},
        ],
        currentRoleTypePermissionComponent: RoleTypePermission,
        currentRoleTypePermissionComponentData: null,
        roleTypeUserComponents: [
            {name: 'RoleTypeUser', cmp: RoleTypeUser},
            {name: 'RoleTypeUserDetail', cmp: RoleTypeUserDetail},
            {name: 'RoleTypeUserDetailHistory', cmp: RoleTypeUserDetailHistory},
            {name: 'RoleTypeUserDetailSearch', cmp: RoleTypeUserDetailSearch},
        ],
        currentRoleTypeUserComponent: RoleTypeUser,
        currentRoleTypeUserComponentData: null,
        userSpecialPermissionComponents: [
            {name: 'UserSpecialPermission', cmp: UserSpecialPermission},
            {name: 'UserSpecialPermissionDetail', cmp: UserSpecialPermissionDetail},
            {name: 'UserSpecialPermissionDetailHistory', cmp: UserSpecialPermissionDetailHistory},
            {name: 'UserSpecialPermissionPermissions', cmp: UserSpecialPermissionPermissions},
            {name: 'UserSpecialPermissionPermissionsHistory', cmp: UserSpecialPermissionPermissionsHistory},
        ],
        currentUserSpecialPermissionComponent: UserSpecialPermission,
        currentUserSpecialPermissionComponentData: null,
        systemLoginPermissionComponents: [
            {name: 'SystemLoginPermission', cmp: SystemLoginPermission},
            {name: 'SystemLoginPermissionHistory', cmp: SystemLoginPermissionHistory},
            {name: 'SystemLoginPermissionDetail', cmp: SystemLoginPermissionDetail},
            {name: 'SystemLoginPermissionDetailHistory', cmp: SystemLoginPermissionDetailHistory},
        ],
        currentSystemLoginPermissionComponent: SystemLoginPermission,
        currentSystemLoginPermissionComponentData: null,
    },
    roles: [],
    roleHistories: [],
    addedRole: {},
    updatedRole: {},
    rolePermissions: [],
    roleTypeUsers: [],
    roleTypeUserHistories: [],
    roleTypeUserSearchList: [],
    selectedUserRoles: [],
    systemLoginEmployeeList: [],
    blockedUser: {},
    loginUser: {},
    blockedUserHistories: [],
    specialPermissionParameters: {},
    specialPermissionUsers: [],
    specialPermissionUserInfo: {},
    specialPermissionUserInfos: [],
    specialPermissionDetailHistories: [],
    specialPermissionPermissions: [],
    permissionHistories: [],
    userSpecialPermissionPermissionsHistories: [],
    updateRoleTypeUser: {},
    systemMessageTypes: [],
    systemMessages: [],
    systemLoginCount: null,
    systemLoginHistories: [],
    duplicateForm: {},
};

export const informationTechnologies = {
    namespaced: true,
    state: initialState,
    actions: {
        resetState({commit}) {
            commit('resetState');
        },
        changeRoleTypes({commit}, payload) {
            commit('changeRoleTypes', payload);
        },
        changeRoleTypePermissionComponent({commit}, payload) {
            commit('changeRoleTypePermissionComponent', payload);
        },
        changeRoleTypeUserComponent({commit}, payload) {
            commit('changeRoleTypeUserComponent', payload);
        },
        changeUserSpecialPermissionComponent({commit}, payload) {
            commit('changeUserSpecialPermissionComponent', payload);
        },
        changeSystemLoginPermissionComponent({commit}, payload) {
            commit('changeSystemLoginPermissionComponent', payload);
        },
        getRoles({commit}) {
            return ItService.getRoles().then(res => {
                if (res.data.data)
                    commit('setRoles', res.data.data.roller);
                return Promise.resolve(res.data);
            });
        },
        getRoleHistory({commit}, payload) {
            return ItService.getRoleHistory(payload).then(res => {
                if (res.data.data)
                    commit('setRoleHistories', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addRole({commit}, payload) {
            return ItService.addRole(payload).then(res => {
                if (res.data.data)
                    commit('setRoles', res.data.data.roller);
                return Promise.resolve(res.data);
            });
        },
        updateRole({commit}, payload) {
            return ItService.updateRole(payload).then(res => {
                if (res.data.data)
                    commit('setRoles', res.data.data.roller);
                return Promise.resolve(res.data);
            });
        },
        getRolePermissions({commit}, payload) {
            return ItService.getRolePermissions(payload).then(res => {
                if (res.data.data)
                    commit('setRolePermissions', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        savePermissions({commit}, payload) {
            return ItService.savePermissions(payload).then(res => {
                if (res.data.data)
                    commit('setRolePermissions', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getRoleTypeUsers({commit}, payload) {
            return ItService.getRoleTypeUsers(payload).then(res => {
                if (res.data.data)
                    commit('setRoleTypeUsers', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getRoleTypeUserHistory({commit}, payload) {
            return ItService.getRoleTypeUserHistory(payload).then(res => {
                if (res.data.data)
                    commit('getRoleTypeUserHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        searchRoleTypeUser({commit}, payload) {
            return ItService.searchRoleTypeUser(payload).then(res => {
                if (res.data.data)
                    commit('setSearchRoleTypeUsers', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        saveSelectedUserRoles({commit}, payload) {
            return ItService.saveSelectedUserRoles(payload).then(res => {
                if (res.data.data)
                    commit('setSearchRoleTypeUsers', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        systemLoginEmployeeSearch({commit}, payload) {
            return ItService.systemLoginEmployeeSearch(payload).then(res => {
                if (res.data.data)
                    commit('systemLoginEmployeeSearch', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        blockUser({commit}, payload) {
            return ItService.blockUser(payload).then(res => {
                if (res.data.data)
                    commit('blockUser', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        loginPermission({commit}, payload) {
            return ItService.loginPermission(payload).then(res => {
                if (res.data.data)
                    commit('loginUser', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        blockedUserHistory({commit}, payload) {
            return ItService.blockedUserHistory(payload).then(res => {
                if (res.data.data)
                    commit('blockedUserHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSpecialPermissionParameters({commit}) {
            return ItService.getSpecialPermissionParameters().then(res => {
                if (res.data.data)
                    commit('getSpecialPermissionParameters', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        searchSpecialPermissionUsers({commit}, payload) {
            return ItService.searchSpecialPermissionUsers(payload).then(res => {
                if (res.data.data)
                    commit('searchSpecialPermissionUsers', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSpecialPermissionUserInfo({commit}, payload) {
            return ItService.getSpecialPermissionUserInfo(payload).then(res => {
                if (res.data.data)
                    commit('getSpecialPermissionUserInfo', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSpecialPermissionDetailHistory({commit}, payload) {
            return ItService.getSpecialPermissionDetailHistory(payload).then(res => {
                if (res.data.data)
                    commit('getSpecialPermissionDetailHistory', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSpecialPermissionPermissions({commit}, payload) {
            return ItService.getSpecialPermissionPermissions(payload).then(res => {
                if (res.data.data)
                    commit('setSpecialPermissionPermissions', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getPermissionHistories({commit}, payload) {
            return ItService.getPermissionHistories(payload).then(res => {
                if (res.data.data)
                    commit('getPermissionHistories', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        addUserSpecialPermission({commit}, payload) {
            return ItService.addUserSpecialPermission(payload).then(res => {
                if (res.data.data)
                    commit('setSpecialPermissionPermissions', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getUserSpecialPermissionPermissionsHistories({commit}, payload) {
            return ItService.getUserSpecialPermissionPermissionsHistories(payload).then(res => {
                if (res.data.data)
                    commit('getUserSpecialPermissionPermissionsHistories', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        roleTypeUserRoleDetailUpdate({commit}, payload) {
            return ItService.roleTypeUserRoleDetailUpdate(payload).then(res => {
                if (res.data.data)
                    commit('roleTypeUserRoleDetailUpdate', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSystemMessageTypes({commit}) {
            return ItService.getSystemMessageTypes().then(res => {
                if (res.data.data)
                    commit('getSystemMessageTypes', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSystemMessages({commit}) {
            return ItService.getSystemMessages().then(res => {
                if (res.data.data)
                    commit('setSystemMessages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        addSystemMessage({commit}, payload) {
            return ItService.addSystemMessage(payload).then(res => {
                if (res.data.data)
                    commit('setSystemMessages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSystemMessage({commit}, payload) {
            return ItService.updateSystemMessage(payload).then(res => {
                if (res.data.data)
                    commit('setSystemMessages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSystemLoginCount({commit}) {
            return ItService.getSystemLoginCount().then(res => {
                if (res.data.data)
                    commit('getSystemLoginCount', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        getSystemLoginHistory({commit}) {
            return ItService.getSystemLoginHistory().then(res => {
                if (res.data.data)
                    commit('getSystemLoginHistory', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        updateSystemLoginCount({commit}, payload) {
            return ItService.updateSystemLoginCount(payload).then(res => {
                if (res.data.data)
                    commit('getSystemLoginCount', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        setDuplicateForm({commit}, payload) {
            commit('setDuplicateForm', payload);
        }
    },
    mutations: {
        resetState(state) {
            state.settings.currentRoleTypes = RoleTypes;
            state.settings.currentRoleTypesData = null;
            state.settings.currentRoleTypePermissionComponent = RoleTypePermission;
            state.settings.currentRoleTypePermissionComponentData = null;
            state.settings.currentRoleTypeUserComponent = RoleTypeUser;
            state.settings.currentRoleTypeUserComponentData = null;
            state.settings.currentUserSpecialPermissionComponent = UserSpecialPermission;
            state.settings.currentUserSpecialPermissionComponentData = null;
            state.settings.currentSystemLoginPermissionComponent = SystemLoginPermission;
            state.settings.currentSystemLoginPermissionComponentData = null;
        },
        changeRoleTypes(state, payload) {
            const find = state.settings.roleTypesComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentRoleTypes = find.cmp;
                state.settings.currentRoleTypesData = payload.data;
            }
        },
        changeRoleTypePermissionComponent(state, payload) {
            const find = state.settings.roleTypePermissionComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentRoleTypePermissionComponent = find.cmp;
                state.settings.currentRoleTypePermissionComponentData = payload.data;
            }
        },
        changeRoleTypeUserComponent(state, payload) {
            const find = state.settings.roleTypeUserComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentRoleTypeUserComponent = find.cmp;
                state.settings.currentRoleTypeUserComponentData = payload.data;
            }
        },
        changeUserSpecialPermissionComponent(state, payload) {

            const find = state.settings.userSpecialPermissionComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentUserSpecialPermissionComponent = find.cmp;

                state.settings.currentUserSpecialPermissionComponentData = payload.data;
            }
        },
        changeSystemLoginPermissionComponent(state, payload) {
            const find = state.settings.systemLoginPermissionComponents.find(c => c.name === payload.cmp);
            if (find) {
                state.settings.currentSystemLoginPermissionComponent = find.cmp;
                state.settings.currentSystemLoginPermissionComponentData = payload.data;
            }
        },
        setRoles(state, payload) {
            state.roles = Object.assign({}, payload);
        },
        setRoleHistories(state, payload) {
            state.roleHistories = Object.assign({}, payload);
        },
        setRolePermissions(state, payload) {
            state.rolePermissions = Object.assign([], payload);
        },
        setRoleTypeUsers(state, payload) {
            state.roleTypeUsers = Object.assign([], payload);
        },
        getRoleTypeUserHistory(state, payload) {
            state.roleTypeUserHistories = Object.assign([], payload);
        },
        setSearchRoleTypeUsers(state, payload) {
            state.roleTypeUserSearchList = Object.assign([], payload);
        },
        systemLoginEmployeeSearch(state, payload) {
            state.systemLoginEmployeeList = Object.assign([], payload);
        },
        blockUser(state, payload) {
            state.blockedUser = Object.assign({}, payload);
        },
        loginUser(state, payload) {
            state.loginUser = Object.assign({}, payload);
        },
        blockedUserHistory(state, payload) {
            state.blockedUserHistories = Object.assign([], payload);
        },
        getSpecialPermissionParameters(state, payload) {
            state.specialPermissionParameters = Object.assign({}, payload);
        },
        searchSpecialPermissionUsers(state, payload) {
            state.specialPermissionUsers = Object.assign([], payload);
        },
        getSpecialPermissionUserInfo(state, payload) {
            state.specialPermissionUserInfos = Object.assign([], payload);
        },
        getSpecialPermissionDetailHistory(state, payload) {
            state.specialPermissionDetailHistories = Object.assign([], payload);
        },
        setSpecialPermissionPermissions(state, payload) {
            state.specialPermissionPermissions = Object.assign([], payload);
        },
        getPermissionHistories(state, payload) {
            state.permissionHistories = Object.assign([], payload);
        },
        getUserSpecialPermissionPermissionsHistories(state, payload) {
            state.userSpecialPermissionPermissionsHistories = Object.assign([], payload);
        },
        roleTypeUserRoleDetailUpdate(state, payload) {
            state.updateRoleTypeUser = Object.assign({}, payload);
        },
        getSystemMessageTypes(state, payload) {
            state.systemMessageTypes = Object.assign([], payload);
        },
        setSystemMessages(state, payload) {
            state.systemMessages = Object.assign([], payload);
        },
        getSystemLoginCount(state, payload) {
            state.systemLoginCount = payload;
        },
        getSystemLoginHistory(state, payload) {
            state.systemLoginHistories = Object.assign([], payload);
        },
        setDuplicateForm(state, payload) {
            state.duplicateForm = Object.assign({}, payload);
        }
    },
};