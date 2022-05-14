import axios from 'axios';
import authHeader from './auth-header';


class UserService {
    updateSocketId(soketId) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-soket-id-guncelle`,{soketId}, {headers: authHeader()});
    }
    signoutUser(userId) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-sistemden-at`,
            {
                params: {kullaniciId: userId},
                headers: authHeader()
            });
    }
}

export default new UserService();