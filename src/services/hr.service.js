import axios from 'axios';
import authHeader from './auth-header';


class HrService {
    createEmployee(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-ekle`,
            {
                personelTipId: parseInt(data.staffType),
                ad: data.name,
                soyad: data.surname,
                tcKimlikNo: data.tckn,
                sicilNo: data.registrationNumber,
                cinsiyetId: parseInt(data.gender),
                uyrukId: parseInt(data.nationality),
                medeniDurumId: parseInt(data.maritalStatus),
                askerlikDurumuId: parseInt(data.militaryStatus),
                kanGrubuId: parseInt(data.bloodGroup),
                ogrenimDurumuId: parseInt(data.educationStatus),
                engelliDurumuId: parseInt(data.disabledStatus),
                dogumTarihi: data.birthDate,
                babaAdi: data.fatherName,
                tecilTarihi: data.registrationDate,
                personelDurumParametreId: parseInt(data.state),
                personelAltDurumParametreId: parseInt(data.subState),
                durumTarihi: data.stateDate,
                personelKullaniciTipId: parseInt(data.systemLoginType)
            }, {
                headers: authHeader()
            })
    }

    updateEmployee(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-guncelle`,
            data, {
                headers: authHeader()
            })
    }

    getEmployeeGeneralInfo(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-genel-bilgi-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getEmployeeFilterParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-yonetimi-listele-form`,
            {
                headers: authHeader()
            });

    }

    getAllEmployee(payload) {
        const data = payload.data;
        const paging = payload.paging;
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-yonetimi-listele`,
            {
                sicilNo: data.registrationNumber,
                tcKimlikNo: data.identityNumber,
                adSoyad: data.nameSurname,
                kanGrubuId: parseInt(data.bloodGroup),
                durumId: parseInt(data.state),
                altDurumId: parseInt(data.subState),
                personelTipId: parseInt(data.employeeType),
                ustBirimId: parseInt(data.topDepartment),
                bagliBirimId: parseInt(data.linkedDepartment),
                altBirimId: parseInt(data.subDepartment),
                birimId: parseInt(data.department),
                sayfaNo: parseInt(paging.currentPage),
                sayfaBuyukluk: parseInt(paging.pageSize)
            },
            {
                headers: authHeader()
            });
    }

    updateStatus(payload) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-durum-guncelle`,
            payload,
            {
                headers: authHeader()
            });
    }

    getParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-parametreleri`,
            {
                headers: authHeader()
            });
    }

    getStates() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personelparametre/personel-durum-parametre-sec-getir`,
            {
                headers: authHeader()
            });
    }

    getSubStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-alt-durumlari`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getEmployeeStates(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-durum/personel-durum-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addEmployeeState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel-durum/personel-durum-ekle`,
            {
                personelId: data.employeeId,
                durumId: parseInt(data.state),
                altDurumId: parseInt(data.subState),
                durumTarihi: data.stateDate
            },
            {
                headers: authHeader()
            });
    }

    updateEmployeeState(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel-durum/guncelle`,
            {
                id: data.id,
                personelId: data.employeeId,
                durumId: parseInt(data.state),
                altDurumId: parseInt(data.subState),
                durumTarihi: data.stateDate
            },
            {
                headers: authHeader()
            });
    }

    removeEmployeeState(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-durum/personel-durum-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getEmployeePhones(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-telefon-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    getEmployeeEmails(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-email-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    addPhone(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/personel-telefon-ekle`,
            {
                personelId: data.employeeId,
                telefon: data.phone,
                dahili: data.internal,
                iletisimTip: parseInt(data.phoneType),
                varsayilan: data.default
            },
            {
                headers: authHeader()
            });
    }

    updatePhone(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-telefon-guncelle`,
            {
                personelAdresId: data.id,
                telefon: data.phone,
                dahiliAdres: data.internal,
                iletisimTip: data.phoneType,
                varsayilan: data.default
            },
            {
                headers: authHeader()
            });
    }

    addEmail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/personel-email-ekle`,
            {
                personelId: data.employeeId,
                email: data.email,
                iletisimTip: parseInt(data.emailType),
                varsayilan: data.default
            },
            {
                headers: authHeader()
            });
    }

    updateEmail(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-email-guncelle`,
            {
                personelAdresId: data.id,
                email: data.email,
                iletisimTip: data.emailType,
                varsayilan: data.default
            },
            {
                headers: authHeader()
            });
    }

    getEmployeeUserInfos(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-birimler-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });

    }

    addEmployeeUserInfo(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-birim-ekle`,
            {
                personelId: data.employeeId,
                ustYonetimId: parseInt(data.topDepartmentId),
                bagliBirimId: parseInt(data.linkedDepartmentId),
                altBirimId: parseInt(data.subDepartmentId),
                birimId: parseInt(data.departmentId),
                unvanId: parseInt(data.titleId),
                baslamaTarihi: data.startDate
            },
            {
                headers: authHeader()
            });
    }

    getUserInfoParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-birim-ekle-form`,
            {
                headers: authHeader()
            });
    }

    getUserInfoDetailParameters(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-birim-guncelle-form`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    updateEmployeeUserInfo(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-birim-guncelle`,
            {
                personelId: data.personelId,
                altBirimId: parseInt(data.altBirimId),
                birimId: parseInt(data.birimId),
                unvanId: parseInt(data.unvanId),
                ayrilmaNedeniId: parseInt(data.ayrilmaNedeniId),
                cikisTarihi: data.cikisTarihi,
                cikisNedeni: data.cikisNedeni
            },
            {
                headers: authHeader()
            });
    }

    getDepartmentHistory(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-birim-tarihce-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    getAddress(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-adres-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    addAddress(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}parametre/personel-adres-ekle`,
            {
                personelId: data.employeeId,
                adres: data.address,
                varsayilan: data.default,
                iletisimTip: parseInt(data.addressTypeId),
                ilceId: parseInt(data.districtId),
                postaKodu: data.postCode
            },
            {
                headers: authHeader()
            });
    }

    getAddressParameters(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-adres-guncelle-form`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    updateAddress(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-adres-guncelle`,
            {
                personelAdresId: parseInt(data.id),
                adres: data.adres,
                varsayilan: data.varsayilan,
                iletisimTip: parseInt(data.iletisimTipId),
                ilceId: parseInt(data.ilceId),
                postaKodu: data.postaKodu
            },
            {
                headers: authHeader()
            });
    }

    removeAddress(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-adres-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getDocuments(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-dokuman/personel-dokuman-getir`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    getDocumentParameters() {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-dokuman/dokuman-parametre-getir`,
            {
                headers: authHeader()
            });
    }

    addDocument(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel-dokuman/personel-dokuman-ekle`,
            data,
            {
                headers: {
                    Token: authHeader().Token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    }

    deleteDocument(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-dokuman/personel-dokuman-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getNotes(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-not/personel-not-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    addNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel-not/personel-not-ekle`,
            {
                konu: data.title,
                personelId: data.employeeId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    deleteNote(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-not/personel-not-sil`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    getNoteDetail(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel-not/personel-not-guncelle-form`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

    updateNote(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel-not/personel-not-guncelle`,
            {
                id: parseInt(data.id),
                konu: data.title,
                personelId: data.employeeId,
                not: data.description,
                hatirlatma: data.remind,
                hatirlatmaTarihi: data.dateTime,
                alici: data.receiverToString,
                aliciCC: data.receiverCcString
            },
            {
                headers: authHeader()
            });
    }

    addProfilePhoto(data) {
        return axios.post(`${process.env.VUE_APP_USER_API_URL}personel/personel-profil-resmi-guncelle`,
            data,
            {
                headers: {
                    Token: authHeader().Token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    }

    removeProfilePhoto(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/personel-profil-resmi-sil`,
            {
                params: {
                    personelId: id
                },
                headers: authHeader()
            });
    }

    checkIdentity(identity) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}personel/kutuk-sorgula`,
            {
                params: {
                    tckn: identity
                },
                headers: authHeader()
            });
    }



    getTitlesByDepartmentId(id) {
        return axios.get(`${process.env.VUE_APP_USER_API_URL}birim/birime-gore-unvan-getir`,
            {
                params: {
                    id
                },
                headers: authHeader()
            });
    }

}

export default new HrService();