import axios from 'axios';
import authHeader from './auth-header';


class ParameterService {
    getDepartments(id = null) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birimler-sec-getir`, {
            params: {ustBirimId: id},
            headers: authHeader()
        });
    }

    getEmployeeByDepartmentId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-getir-birime-gore`, {
            params: {id},
            headers: authHeader()
        });
    }

    getCountries() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/ulke-parametre-sec-getir`, {
            headers: authHeader()
        });
    }

    getCities(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/sehir-parametre-sec-getir`, {
            params: {
                ulkeId: parseInt(id)
            },
            headers: authHeader()
        });
    }

    getDistricts(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/ilce-parametre-sec-getir`, {
            params: {
                sehirId: parseInt(id)
            },
            headers: authHeader()
        });
    }

    getDistrictsByCityId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/ilce-getir-sehire-gore`, {
            params: {
                id
            },
            headers: authHeader()
        });
    }

    getTaxOfficeByCityId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/vergi-daire-getir-sehire-gore`, {
            params: {
                id
            },
            headers: authHeader()
        });
    }

    getRelationTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}butce/parametre/iliski-tipleri-secim-getir`, {
            headers: authHeader()
        });
    }

    getPhoneTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/personel-telefon-tipleri-getir`, {
            headers: authHeader()
        });
    }

    getEmailTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/personel-email-tipleri-getir`, {
            headers: authHeader()
        });
    }

    getAddressTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/personel-adres-tipleri-getir`,
            {
                headers: authHeader()
            });
    }

    getSubStates(id){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-alt-durum-parametre-sec-getir`,
            {
                params:{
                    id
                },
                headers: authHeader()
            });
    }
}

export default new ParameterService();