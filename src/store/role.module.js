import Main from "@/components/parameter/role/Main";
import Permissions from "@/components/parameter/role/Permissions";

const initialState = {
    components: [
        {name: 'Main', value: Main},
        {name: 'Permissions', value: Permissions},
    ],
    component: Main,
};

export const role = {
    namespaced: true,
    state: initialState,
    actions: {
        changeComponent({commit}, cmpName) {
            commit('changeComponent', cmpName)
        },
    },
    mutations: {
        changeComponent(state, cmpName) {
            const find = state.components.find(c => c.name === cmpName);
            state.component = find ? find.value : Main;
        },
    }
};