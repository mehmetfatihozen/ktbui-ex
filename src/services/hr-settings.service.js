import axios from 'axios';
import authHeader from './auth-header';


class HrSettingsService {
    getParameterTypes() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}parametre/parametre-tipleri-enum-liste`,
            {
                headers: authHeader()
            });
    }

    getEmployeeStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-durum-parametreleri`,
            {
                headers: authHeader()
            });
    }

    addEmployeeStateSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-durum-ve-alt-durum-ekle`,
            {
                durum: data.state,
                ustPersonelDurumParametreId: parseInt(data.parentId),
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateEmployeeStateSubState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-durum-ve-alt-durum-guncelle`,
            {
                id: parseInt(data.id),
                durum: data.state,
                ustPersonelDurumParametreId: parseInt(data.parentId),
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getEmployeeStateHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-durum-altDurum-tarihce-parametre-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getEmployeeSubStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-alt-durum-parametreleri`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getGeneralParameter(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}genelparametre/tip-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addGeneralParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/ekle`,
            {
                parametreTipId: parseInt(data.parameterTypeId),
                metin: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateGeneralParameter(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}genelparametre/guncelle`,
            {
                id: data.id,
                parametreTipId: data.parameterTypeId,
                metin: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    searchTitles(title) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}unvan/unvan-arama`,
            {
                params: {
                    unvan: title,
                },
                headers: authHeader()
            });
    }

    getTitles() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}unvan/unvanlari-getir`,
            {
                headers: authHeader()
            });
    }

    addTitle(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}unvan/ekle`,
            {
                unvanAdi: data.title,
                gorevKodu: data.taskCode,
                hitapKodu: data.appealCode,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateTitle(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}unvan/guncelle`,
            {
                id: data.id,
                unvanAdi: data.title,
                gorevKodu: data.taskCode,
                hitapKodu: data.appealCode,
                pasif: data.passive,
                aramaMetni: data.searchText
            },
            {
                headers: authHeader()
            });
    }

    getDepartmentStatuses() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/statu-liste-getir`,
            {
                headers: authHeader()
            });
    }

    addDepartmentStatus(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personelparametre/statu-ekle`,
            {
                statuAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateDepartmentStatus(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personelparametre/statu-guncelle`,
            {
                id: data.id,
                statuAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getDepartmentStatusHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/statu-tarihce-getir`,
            {
                params: {
                    statuId: id
                },
                headers: authHeader()
            });
    }

    getDepartmentCategories() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}kategori/kategori-liste-getir`,
            {
                headers: authHeader()
            });
    }

    addDepartmentCategory(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}kategori/kategori-ekle`,
            {
                kategoriAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    updateDepartmentCategory(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}kategori/kategori-guncelle`,
            {
                id: data.id,
                kategoriAdi: data.title,
                pasif: data.passive
            },
            {
                headers: authHeader()
            });
    }

    getDepartmentCategoryHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}kategori/kategori-tarihce-getir`,
            {
                params: {
                    kategoriId: id
                },
                headers: authHeader()
            });
    }

    addDepartment(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}birim/ekle`,
            {
                ustBirimId: data.parentId,
                birimAdi: data.departmentName,
                detsisKodu: data.detsis,
                kurumKodu: data.departmentCode,
                kategoriId: data.categoryId,
                statuId: data.statusId,
                pasif: data.passive,
                kisaAdi: data.shortName
            },
            {
                headers: authHeader()
            });
    }

    updateDepartment(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}birim/guncelle`,
            {
                id: data.id,
                ustBirimId: data.parentId,
                birimAdi: data.departmentName,
                detsisKodu: data.detsis,
                kurumKodu: data.departmentCode,
                kategoriId: data.categoryId,
                statuId: data.statusId,
                pasif: data.passive,
                kisaAdi: data.shortName
            },
            {
                headers: authHeader()
            });
    }

    getCategoryParameter() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}kategori/kategori-secim-liste-getir`,
            {
                headers: authHeader()
            });
    }

    getStatusParameter() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/statu-secim-liste-getir`,
            {
                headers: authHeader()
            });
    }

    getDepartments(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birimler-getir-liste`,
            {
                params: {
                    ustBirimId: id
                },
                headers: authHeader()
            });
    }

    getDepartmentHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birim-tarihce-getir`,
            {
                params: {
                    birimId: id
                },
                headers: authHeader()
            });
    }

    getDepartmentTitles(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birim-unvan-select`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }
    searchDepartmentTitles(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}birim/birim-unvan-select-ara`,
            {
                id: data.id,
                aramaMetni: data.searchText
            },
            {
                headers: authHeader()
            });
    }
    saveDepartmentTitle(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}birim/birim-unvan-select-ekle`,
            {
                unvanIds: data.list,
                birimId: data.id,
                aramaMetni: data.text
            },
            {
                headers: authHeader()
            });
    }
}

export default new HrSettingsService();