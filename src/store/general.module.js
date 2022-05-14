import GeneralService from "@/services/general.service";

import Main from "@/components/menu/Main";
import ApplicationMenu from "@/components/menu/ApplicationMenu";
import HrMenu from "@/components/menu/HrMenu";
import InformationTechnologiesMenu from "@/components/menu/InformationTechnologiesMenu";
import SmMenu from "@/components/menu/SmMenu";
import SsMenu from "@/components/menu/SsMenu";
import ImsMenu from "@/components/menu/ImsMenu";
import SpMenu from "@/components/menu/SpMenu";
import BmMenu from "@/components/menu/BmMenu";

const initialState = {
    menuComponentList: [
        {name: 'Main', value: Main, menuTitle: ''},
        {name: 'ApplicationMenu', value: ApplicationMenu, menuTitle: 'Başvuru Yönetimi'},
        {name: 'HrMenu', value: HrMenu, menuTitle: 'İnsan Kaynakları'},
        {name: 'InformationTechnologiesMenu', value: InformationTechnologiesMenu, menuTitle: 'Bilgi Teknolojileri'},
        {name: 'SmMenu', value: SmMenu, menuTitle: 'Tedarikçi Yönetimi'},
        {name: 'SsMenu', value: SsMenu, menuTitle: 'Destek Hizmetleri'},
        {name: 'ImsMenu', value: ImsMenu, menuTitle: 'Envanter Yönetimi'},
        {name: 'SpMenu', value: SpMenu, menuTitle: 'Stratejik Planlar'},
        {name: 'BmMenu', value: BmMenu, menuTitle: 'Bütçe Yönetimi'}
    ],
    currentMenu: Main,
    menuTitle: '',
    menu: [],
    subMenu: [],
    connection: null,
    connectionId: null,
    showOverlay: false,
    showPopup: false,
    modal: {},
    showMenu: true,
    activeMenuId: null,
    systemMessages: [],
    ebysDocuments: [],
};

export const general = {
    namespaced: true,
    state: initialState,
    actions: {
        changeMenu({commit}, menuName) {
            localStorage.setItem('activeMenu', menuName);
            commit('changeMenu', menuName);
        },
        updateMenu({commit}, payload) {
            localStorage.setItem('menu', JSON.stringify(payload));
            commit('updateMenu', payload);
        },
        showModal({commit}, payload) {
            commit('showModal', payload);
        },
        toggleMenu({commit}) {
            commit('toggleMenu');
        },
        getSystemMessages({commit}) {
            return GeneralService.getSystemMessages().then(res => {
                if (res.data.data)
                    commit('setSystemMessages', res.data.data);
                return Promise.resolve(res.data);
            })
        },
        resetState({commit}) {
            commit('resetState');
        },
        checkEbysDocuments({commit}, payload) {
            return GeneralService.checkEbysDocuments(payload).then(res => {
                if (res.data.data)
                    commit('setEbysDocuments', res.data.data);
                return Promise.resolve(res.data);
            });
        }
    },
    mutations: {
        changeMenu(state, menuName) {
            const find = state.menuComponentList.find(m => m.name === menuName);
            if (find) {
                state.currentMenu = find.value;
                state.menuTitle = find.menuTitle;
                const findSub = state.menu.find(m => m.menuBilesen === find.name);
                if (findSub)
                    state.subMenu = Object.assign([], findSub.altMenuler)
            } else {
                state.currentMenu = Main;
                state.menuTitle = '';
            }
        },
        updateMenu(state, payload) {
            state.menu = Object.assign([], payload);
        },
        showModal(state, payload) {
            state.showPopup = true;
            state.modal = payload;
        },
        toggleMenu(state) {
            state.showMenu = !state.showMenu;
        },
        setSystemMessages(state, payload) {
            state.systemMessages = Object.assign([], payload);
        },
        resetState(state) {
            state.showMenu = false;
        },
        setEbysDocuments(state, payload) {
            state.ebysDocuments = Object.assign([], payload);
        }
    },
    getters: {
        getMessage: state => id => {
            const find = state.systemMessages.find(m => m.id === id);
            if (find)
                return `${find.mesaj} (${find.id}) `
        }
    }
};
