import axios from 'axios';
import authHeader from './auth-header';


class ItService {
    getRoles() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}rol/rolleri-getir`, {
            headers: authHeader()
        });
    }

    getRoleHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}rol/rol-tarihce-liste`, {
            params: {
                id
            },
            headers: authHeader()
        });
    }

    addRole(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}rol/ekle`, {
            rolAdi: data.role,
            pasif: data.passive
        }, {
            headers: authHeader()
        });
    }

    updateRole(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}rol/guncelle`, {
            id: data.id,
            rolAdi: data.role,
            pasif: data.passive
        }, {
            headers: authHeader()
        });
    }

    getRolePermissions(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/rol-tipleri-yetkiler`, {
            params: {
                rolId: id
            },
            headers: authHeader()
        });
    }

    savePermissions(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/izin-rol-ekle`, {
            rolId: parseInt(data.roleId),
            list: data.list
        }, {
            headers: authHeader()
        });
    }

    getRoleTypeUsers(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/rol-tip-kullanici-ara`, {
            params: {
                rolId: id
            },
            headers: authHeader()
        });
    }

    getRoleTypeUserHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/kullanici-rol-tarihce`, {
            params: {
                personelId: id
            },
            headers: authHeader()
        });
    }

    searchRoleTypeUser(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/kullanici-kimlik-ara`, {
            rolId: parseInt(data.id),
            kullaniciAdi: data.userName,
            tckn: data.identityNumber,
            adSoyad: data.nameSurname
        }, {
            headers: authHeader()
        });
    }

    saveSelectedUserRoles(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/rol-tip-kullanici-ekle`, {
            rolId: parseInt(data.id),
            personelIds: data.list
        }, {
            headers: authHeader()
        });
    }

    systemLoginEmployeeSearch(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/sistem-giris-personel-ara`, {
            adSoyad: data.nameSurname,
            kullaniciAdi: data.userName,
            sicilNo: data.registrationNumber
        }, {
            headers: authHeader()
        });
    }

    blockUser(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-bloke-degistir`, {
            kullaniciId: data.id,
            bloke: data.blocked,
        }, {
            headers: authHeader()
        });
    }

    loginPermission(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-giris-yetki-degistir`, {
            kullaniciId: data.id,
            giris: data.login,
        }, {
            headers: authHeader()
        });
    }

    blockedUserHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-bloke-tarihce`, {
            params: {
                personelId: id
            },
            headers: authHeader()
        });
    }

    getSpecialPermissionParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/ozel-yetki-arama-form`, {
            headers: authHeader()
        });
    }

    searchSpecialPermissionUsers(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/ozel-yetki-personel-ara`, {
            adSoyad: data.nameSurname,
            kullaniciAdi: data.userName,
            sicilNo: data.registrationNumber,
            personelDurumId: parseInt(data.state),
            personelTipiId: parseInt(data.type)
        }, {
            headers: authHeader()
        });
    }

    getSpecialPermissionUserInfo(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-ozel-yetki-detay`, {
            params: {
                personelId: id
            },
            headers: authHeader()
        });
    }

    getSpecialPermissionDetailHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-ozel-yetki-detay-tarihce`, {
            params: {
                personelRolId: id
            },
            headers: authHeader()
        });
    }

    getSpecialPermissionPermissions(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-ozel-yetkiler`, {
            params: {
                personelRolId: id
            },
            headers: authHeader()
        });
    }

    getPermissionHistories(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/rol-tipleri-izin-tarihce`, {
            params: {
                rolId: parseInt(data.roleId),
                izinId: parseInt(data.permissionId)
            },
            headers: authHeader()
        });

    }

    addUserSpecialPermission(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-ozel-izin-ekle`, {
            kullaniciId: data.userId,
            list: data.list
        }, {
            headers: authHeader()
        });

    }

    getUserSpecialPermissionPermissionsHistories(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}izinrol/personel-ozel-izin-tarihce`, {
            params: {
                //personelId: data.userId,
                personelRolId:parseInt(data.personelRolId),
                izinId: parseInt(data.permissionId)
            },
            headers: authHeader()
        });

    }

    roleTypeUserRoleDetailUpdate(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}izinrol/kullanici-rol-detay-guncelle`, {
            "id": data.id,
            "rolId": data.rolId,
            "pasif": data.rolPasif
        }, {
            headers: authHeader()
        });
    }

    getSystemMessageTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/hata-mesaji-uyari-dropdown`,
            {
                headers: authHeader()
            });
    }

    getSystemMessages() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/hata-mesaji-liste`,
            {
                headers: authHeader()
            });
    }

    addSystemMessage(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/hata-mesaji-ekle`, {
            uyariTipiId: data.type,
            mesaj: data.message,
            pasif: data.passive
        }, {
            headers: authHeader()
        });
    }

    updateSystemMessage(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/hata-mesaji-guncelle`, {
            id: data.id,
            uyariTipiId: data.type,
            mesaj: data.message,
            pasif: data.passive
        }, {
            headers: authHeader()
        });
    }

    getSystemLoginCount() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}giris-deneme/getir`,
            {
                headers: authHeader()
            });
    }
    getSystemLoginHistory() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}giris-deneme/tarihce-getir`,
            {
                headers: authHeader()
            });
    }

    updateSystemLoginCount(data) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}giris-deneme/ekle`,
            {
                params: {
                    sayi: data
                },
                headers: authHeader()
            });
    }
}

export default new ItService();