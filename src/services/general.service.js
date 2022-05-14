import axios from 'axios';
import authHeader from './auth-header';


class GeneralService {
    getSystemMessages() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/hata-mesaji-liste`,
            {
                headers: authHeader()
            });
    }
    checkEbysDocuments(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}ebys/evrak-sorgula`,
            {
                evrakNo: data.ebysNo,
                baslangicTarihiStr: data.startDate,
                bitisTarihiStr: data.endDate
            },
            {
                headers: authHeader()
            });
    }
}

export default new GeneralService();