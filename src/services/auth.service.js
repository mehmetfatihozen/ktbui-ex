import axios from 'axios';

class AuthService {
    login(user) {
        return axios
            .post(process.env.VUE_APP_USER_API_URL + 'personel/giris', {
                kullaniciAdi: user.userName,
                sifre: user.password
            })
            .then(response => {
                if (response.data.data) {
                    return response.data.data;
                } else {
                    return Promise.reject(response.data.errorMessage);
                }
            });
    }

    checkSms(userId, code) {
        return axios
            .post(process.env.VUE_APP_USER_API_URL + 'personel/sms-kodu-kontrol', {
                kullaniciId: userId,
                kod: code
            })
            .then(response => {
                if (response.data) {
                    return response.data;
                }
            });
    }
    checkEmail(userId, code) {
        return axios
            .post(process.env.VUE_APP_USER_API_URL + 'personel/eposta-kodu-kontrol', {
                kullaniciId: userId,
                kod: code
            })
            .then(response => {
                if (response.data) {
                    return response.data;
                }
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();