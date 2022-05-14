import ParameterService from '../services/parameter.service';


const initialState = {
    districts: [],
    taxOffices: [],
    relationTypes: [],
    phoneTypes: [],
    emailTypes: [],
    addressTypes: [],
    countries: [],
    cities: [],
    subStates: [],
}

export const parameter = {
    namespaced: true,
    state: initialState,
    actions: {
        // eslint-disable-next-line no-unused-vars
        getDepartments({commit}, payload) {
            return ParameterService.getDepartments(payload).then(res => {
                return Promise.resolve(res.data);
            });
        },
        // eslint-disable-next-line no-unused-vars
        getEmployeeByDepartmentId({commit}, payload) {
            return ParameterService.getEmployeeByDepartmentId(payload).then(res => {
                return Promise.resolve(res.data);
            });
        },
        getDistrictsByCityId({commit}, payload) {
            return ParameterService.getDistrictsByCityId(payload).then(res => {
                if (res.data.data)
                    commit('getDistrictsByCityId', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getTaxOfficeByCityId({commit}, payload) {
            return ParameterService.getTaxOfficeByCityId(payload).then(res => {
                if (res.data.data)
                    commit('getTaxOfficeByCityId', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getRelationTypes({commit}) {
            return ParameterService.getRelationTypes().then(res => {
                if (res.data.data)
                    commit('getRelationTypes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getPhoneTypes({commit}) {
            return ParameterService.getPhoneTypes().then(res => {
                if (res.data.data)
                    commit('getPhoneTypes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getEmailTypes({commit}) {
            return ParameterService.getEmailTypes().then(res => {
                if (res.data.data)
                    commit('getEmailTypes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getAddressTypes({commit}) {
            return ParameterService.getAddressTypes().then(res => {
                if (res.data.data)
                    commit('getAddressTypes', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getCountries({commit}) {
            return ParameterService.getCountries().then(res => {
                if (res.data.data)
                    commit('getCountries', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getCities({commit}, payload) {
            return ParameterService.getCities(payload).then(res => {
                if (res.data.data)
                    commit('getCities', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getDistricts({commit}, payload) {
            return ParameterService.getDistricts(payload).then(res => {
                if (res.data.data)
                    commit('getDistrictsByCityId', res.data.data);
                return Promise.resolve(res.data);
            });
        },
        getSubStates({commit}, payload) {
            return ParameterService.getSubStates(payload).then(res => {
                if (res.data.data)
                    commit('getSubStates', res.data.data);
                return Promise.resolve(res.data);
            });
        }
    },
    mutations: {
        getDistrictsByCityId(state, payload) {
            state.districts = Object.assign([], payload);
        },
        getTaxOfficeByCityId(state, payload) {
            state.taxOffices = Object.assign([], payload);
        },
        getRelationTypes(state, payload) {
            state.relationTypes = Object.assign([], payload);
        },
        getPhoneTypes(state, payload) {
            state.phoneTypes = Object.assign([], payload);
        },
        getEmailTypes(state, payload) {
            state.emailTypes = Object.assign([], payload);
        },
        getAddressTypes(state, payload) {
            state.addressTypes = Object.assign([], payload);
        },
        getCountries(state, payload) {
            state.countries = Object.assign([], payload);
        },
        getCities(state, payload) {
            state.cities = Object.assign([], payload);
        },
        getSubStates(state, payload) {
            state.subStates = Object.assign([], payload);
        }
    }
};