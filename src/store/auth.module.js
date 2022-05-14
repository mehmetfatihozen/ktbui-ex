import AuthService from '../services/auth.service';
import Login from "@/components/login/Login";
import SmsLogin from "@/components/login/SmsLogin";
import EmailLogin from "@/components/login/EmailLogin";

const initialState = {
    status: {loggedIn: false},
    user: null,
    loginForm: {
        userName: '',
        password: ''
    },
    components: [
        {type: 1, value: Login},
        {type: 'Sms', value: SmsLogin},
        {type: 'Eposta', value: EmailLogin},
    ],
    activeComponent: Login,
    showOverlay: false,
}

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    localStorage.setItem('user', JSON.stringify(user));
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        // eslint-disable-next-line no-unused-vars
        checkSms({commit}, payload) {
            return AuthService.checkSms(payload.userId, payload.code).then(res => {
                return Promise.resolve(res);
            });
        },
        // eslint-disable-next-line no-unused-vars
        checkEmail({commit}, payload) {
            return AuthService.checkEmail(payload.userId, payload.code).then(res => {
                return Promise.resolve(res);
            });
        },
        updateToken({commit}, payload) {
            localStorage.setItem('token',payload);
            commit('updateToken', payload);
        },
        logout({commit}) {
            AuthService.logout();
            commit('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('menu');
            localStorage.removeItem('activeMenu');
            localStorage.removeItem('permissions');
            window.location.reload();
        },
        updateLoginComponent({commit}, payload) {
            commit('updateLoginComponent', payload);
        },
        resetLoginState({commit}) {
            commit('resetLoginState');
        }
    },
    mutations: {
        updateToken(state, token) {
            state.user.token = token;
        },
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            // state.user = null;
        },
        updateLoginComponent(state, payload) {
            const find = state.components.find(c => c.type === payload);
            if (find) state.activeComponent = find.value;
        },
        resetLoginState(state) {
            state.activeComponent = Login;
        }
    }
};