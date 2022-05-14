import SettingsService from '../services/settings.service';
import VehicleBrandsMain from "@/components/settings/vehicle-brands/VehicleBrandsMain";
import VehicleModels from "@/components/settings/vehicle-brands/VehicleModels";
import CountriesAndCitiesMain from "@/components/settings/countries-and-cities/CountriesAndCitiesMain";
import CountriesAndCitiesCities from "@/components/settings/countries-and-cities/CountriesAndCitiesCities";
import District from "@/components/settings/countries-and-cities/District";
import YearsAndHolidaysMain from "@/components/settings/years-and-holidays/YearsAndHolidaysMain";
import YearsAndHolidaysHolidays from "@/components/settings/years-and-holidays/YearsAndHolidaysHolidays";

const initialState = {
    months: [],
    militaryStatus: [],
    genders: [],
    disability: [],
    banks: [],
    petTypes: [],
    adress: [],
    phones: [],
    emails: [],
    bloods: [],
    martialStatus: [],
    professions: [],
    educationStatus: [],
    currencies: [],
    vehicleBrands: [],
    vehicleComponents: [
        {
            name: 'VehicleBrandsMain',
            cmp: VehicleBrandsMain
        },
        {
            name: 'VehicleModels',
            cmp: VehicleModels
        },
    ],
    currentVehicleComponent: VehicleBrandsMain,
    selectedVehicleBrand: null,
    countries: [],
    CountriesAndCitiesComponents: [
        {
            name: 'CountriesAndCitiesMain',
            cmp: CountriesAndCitiesMain
        },
        {
            name: 'CountriesAndCitiesCities',
            cmp: CountriesAndCitiesCities
        },
        {
            name: 'Districts',
            cmp: District
        }
    ],
    currentCountriesAndCitiesComponent: CountriesAndCitiesMain,
    selectedCountry: null,
    selectedCountryName: '',
    cities: [],
    districts: [],
    selectedCity: null,
    selectedCityName: '',
    years: [],
    YearsAndHolidaysComponents: [
        {
            name: 'YearsAndHolidaysMain',
            cmp: YearsAndHolidaysMain
        },
        {
            name: 'YearsAndHolidaysHolidays',
            cmp: YearsAndHolidaysHolidays
        },
    ],
    currentYearsAndHolidaysComponent: YearsAndHolidaysMain,
    selectedYear: null,
    holidays: [],
    selectedYearTitle: '',
    holidaysOfYear:[],

}

export const settings = {
    namespaced: true,
    state: initialState,
    actions: {
        changeVehicleComponent({commit}, payload) {
            commit('changeVehicleComponent', payload)
        },
        changeCountriesAndCitiesComponent({commit}, payload) {
            commit('changeCountriesAndCitiesComponent', payload)
        },
        changeDistrictComponents({commit}, payload) {
            commit('changeDistrictComponents', payload)
        },
        changeYearsAndHolidaysComponent({commit}, payload) {
            commit('changeYearsAndHolidaysComponents', payload)
        },

        getHolidaysOfYear({commit},payload){
            return SettingsService.getHolidaysOfYear(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidaysOfYear', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addHolidaysOfYear({commit}, payload) {
            return SettingsService.addHolidaysOfYear(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidaysOfYear', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateHolidaysOfYear({commit}, payload) {
            return SettingsService.updateHoliday(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidaysOfYear', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getHolidays({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidays', res.data.data);
                    return Promise.resolve(res.data);
                })
        },

        addHoliday({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidays', res.data.data);
                    return Promise.resolve(res.data);
                })
        },

        updateHoliday({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setHolidays', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getYears({commit}, payload) {
            return SettingsService.getYears(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setYears', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addYear({commit}, payload) {
            return SettingsService.addYear(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setYears', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateYear({commit}, payload) {
            return SettingsService.updateYear(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setYears', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getCities({commit}, payload) {
            return SettingsService.getCities(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCities', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addCity({commit}, payload) {
            return SettingsService.addCity(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCities', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateCity({commit}, payload) {
            return SettingsService.updateCity(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCities', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getDistrict({commit}, payload) {
            return SettingsService.getDistrict(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDistrict', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addDistrict({commit}, payload) {
            return SettingsService.addDistrict(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDistrict', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateDistrict({commit}, payload) {
            return SettingsService.updateDistrict(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDistrict', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getCountries({commit}, payload) {
            return SettingsService.getCountries(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCountries', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addCountry({commit}, payload) {
            return SettingsService.addCountry(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCountries', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateCountry({commit}, payload) {
            return SettingsService.updateCountry(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCountries', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getVehicleBrands({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setVehicleBrands', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addVehicleBrands({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setVehicleBrands', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateVehicleBrands({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setVehicleBrands', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getMonths({commit}) {
            return SettingsService.getMonths()
                .then(res => {
                    if (res.data.data)
                        commit('setMonths', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addMonth({commit}, payload) {
            return SettingsService.addMonth(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMonths', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateMonth({commit}, payload) {
            return SettingsService.updateMonth(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMonths', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getMilitaryStatus({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMilitaryStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addMilitaryStatus({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMilitaryStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateMilitaryStatus({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMilitaryStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getGenders({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setGenders', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addGender({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setGenders', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateGenders({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setGenders', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getDisabilityStatus({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDisabilityStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addDisabilityStatus({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDisabilityStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateDisabilityStatus({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setDisabilityStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getBankNames({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBankNames', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addBankNames({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBankNames', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateBankNames({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBankNames', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getPetTypes({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPetTypes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addPetTypes({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPetTypes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updatePetTypes({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setPetTypes', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getContactTypeAdress({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeAdress', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addContactTypeAdress({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeAdress', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateContactTypeAdress({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeAdress', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getContactTypePhone({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypePhone', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addContactTypePhone({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypePhone', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateContactTypePhone({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypePhone', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getContactTypeEmail({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeEmail', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addContactTypeEmail({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeEmail', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateContactTypeEmail({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setContactTypeEmail', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getBloodGroups({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBloodGroups', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addBloodGroups({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBloodGroups', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateBloodGroups({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setBloodGroups', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getMartialStatus({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMartialStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addMartialStatus({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMartialStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateMartialStatus({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setMartialStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getProfessions({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setProfessions', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addProfessions({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setProfessions', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateProfessions({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setProfessions', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getEducationStatus({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setEducationStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addEducationStatus({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setEducationStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateEducationStatus({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setEducationStatus', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        getCurrencies({commit}, payload) {
            return SettingsService.getParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCurrencies', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        addCurrencies({commit}, payload) {
            return SettingsService.addParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCurrencies', res.data.data);
                    return Promise.resolve(res.data);
                })
        },
        updateCurrencies({commit}, payload) {
            return SettingsService.updateParameters(payload)
                .then(res => {
                    if (res.data.data)
                        commit('setCurrencies', res.data.data);
                    return Promise.resolve(res.data);
                })
        },


    },
    mutations: {
        changeVehicleComponent(state, payload) {
            const find = state.vehicleComponents.find(c => c.name === payload);
            if (find) {
                state.currentVehicleComponent = find.cmp;

            }
        },
        changeCountriesAndCitiesComponent(state, payload) {
            const find = state.CountriesAndCitiesComponents.find(c => c.name === payload);
            if (find) {
                state.currentCountriesAndCitiesComponent = find.cmp;
            }
        },
        changeDistrictComponents(state, payload) {
            const find = state.CountriesAndCitiesComponents.find(c => c.name === payload);
            if (find) {
                state.currentCountriesAndCitiesComponent = find.cmp;
            }
        },
        changeYearsAndHolidaysComponents(state, payload) {
            const find = state.YearsAndHolidaysComponents.find(c => c.name === payload);
            if (find) {
                state.currentYearsAndHolidaysComponent = find.cmp;
            }
        },
        setYears(state, payload) {
            state.years = Object.assign([], payload)
        },
        setHolidays(state, payload) {
            state.holidays = Object.assign([], payload)
        },
        setHolidaysOfYear(state, payload) {
            state.holidaysOfYear = Object.assign([], payload)
        },
        setCountries(state, payload) {
            state.countries = Object.assign([], payload)
        },
        setCities(state, payload) {
            state.cities = Object.assign([], payload)
        },
        setDistrict(state, payload) {
            state.districts = Object.assign([], payload)
        },
        setVehicleBrands(state, payload) {
            state.vehicleBrands = Object.assign([], payload)
        },
        setMonths(state, payload) {
            state.months = Object.assign([], payload)
        },
        setMilitaryStatus(state, payload) {
            state.militaryStatus = Object.assign([], payload)
        },
        setGenders(state, payload) {
            state.genders = Object.assign([], payload)
        },
        setDisabilityStatus(state, payload) {
            state.disability = Object.assign([], payload)
        },
        setBankNames(state, payload) {
            state.banks = Object.assign([], payload)
        },
        setPetTypes(state, payload) {
            state.petTypes = Object.assign([], payload)
        },
        setContactTypeAdress(state, payload) {
            state.adress = Object.assign([], payload)
        },
        setContactTypePhone(state, payload) {
            state.phones = Object.assign([], payload)
        },
        setContactTypeEmail(state, payload) {
            state.emails = Object.assign([], payload)
        },
        setBloodGroups(state, payload) {
            state.bloods = Object.assign([], payload)
        },
        setMartialStatus(state, payload) {
            state.martialStatus = Object.assign([], payload)
        },
        setProfessions(state, payload) {
            state.professions = Object.assign([], payload)
        },
        setEducationStatus(state, payload) {
            state.educationStatus = Object.assign([], payload)
        },
        setCurrencies(state, payload) {
            state.currencies = Object.assign([], payload)
        }

    }
};