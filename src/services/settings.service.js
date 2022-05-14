import axios from 'axios';
import authHeader from './auth-header'

class SettingsService {
    getParameters(id){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/tip-getir`,
            {
                params:{
                    id
                },
                headers: authHeader()
            });
    }
    addParameters(data){
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ekle`,
            {
                parametreTipId: data.parametreTipId,
                metin: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateParameters(data){
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/guncelle`,
            {
                id:data.id,
                parametreTipId: data.parametreTipId,
                metin: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    getYears(){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/yil-liste`,
            {
                headers: authHeader()
            });
    }
    addYear(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/yil-ekle`,
            {
                yil: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateYear(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/yil-guncelle`,
            {
                id: data.id,
                yil: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getHolidaysOfYear(id){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/resmi-tatil-liste`,

            {
                headers: authHeader(),
                params:{
                    id: id
                }
            });
    }
    addHoliday(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/resmi-tatil-ekle`,
            {
                yilId:data.yilId,
                resmiTatilId:data.resmiTatilId,
                baslangicTarihi: data.baslangicTarihi,
                bitisTarihi: data.bitisTarihi,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    addHolidaysOfYear(data){
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/resmi-tatil-ekle`,
            {
                yilId:data.yilId,
                resmiTatilId:data.resmiTatilId,
                baslangicTarihi: data.startDate,
                bitisTarihi: data.finishDate,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateHoliday(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/resmi-tatil-guncelle`,
            {
                id:data.id,
                yilId:data.yilId,
                resmiTatilId:data.resmiTatilId,
                baslangicTarihi: data.startDate,
                bitisTarihi: data.finishDate,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    getCountries(){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/ulke-liste`,
            {
                headers: authHeader()
            });
    }
    addCountry(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ulke-ekle`,
            {
                ulkeAdi: data.title,
                telefonKodu: data.telefonKodu,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateCountry(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ulke-guncelle`,
            {
                id: data.id,
                ulkeAdi: data.title,
                telefonKodu: data.telefonKodu,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    getCities(id){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/sehir-liste`,

            {
                headers: authHeader(),
                params:{
                    id: id
                }
            });
    }
    addCity(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/sehir-ekle`,
            {
                ulkeId: data.ulkeId,
                sehirAdi: data.title,
                plakaKodu: data.plakaKodu,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateCity(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/sehir-guncelle`,
            {
                id: data.id,
                sehirAdi: data.title,
                plakaKodu: data.plakaKodu,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    getDistrict(id){
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/ilce-liste`,

            {
                headers: authHeader(),
                params:{
                    id: id
                }
            });
    }
    addDistrict(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ilce-ekle`,
            {
                sehirId: data.sehirId,
                ilceAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateDistrict(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ilce-guncelle`,
            {
                id: data.id,
                ilceAdi: data.title,
                sehirId: data.sehirId,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    getMonths() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/ay-liste`,
            {
                headers: authHeader()
            });
    }
    addMonth(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ay-ekle`,
            {
                ay: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }
    updateMonth(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ay-guncelle`,
            {
                id: data.id,
                ay: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

}

export default new SettingsService();