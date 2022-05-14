import InventoryState from "@/components/inventories/settings/InventoryState";
import InventoryDeviceType from "@/components/inventories/settings/InventoryDeviceType";
import InventoryHistory from "@/components/inventories/settings/InventoryHistory";
import InventoryBrand from "@/components/inventories/settings/InventoryBrand";


const initialState = {
    employees: [],
    showNewInventory: false,
    settings: {
        inventoryComponents: [
            {name: 'InventoryState', cmp: InventoryState},
            {name: 'InventoryHistory', cmp: InventoryHistory},
            {name: 'InventoryDeviceType', cmp: InventoryDeviceType},
            {name: 'InventoryBrand', cmp: InventoryBrand},
        ],
        currentInventoryStateComponent: InventoryState,
        currentInventoryDeviceTypeComponent: InventoryDeviceType,
        currentInventoryBrandComponent: InventoryBrand,
    }
};

export const inventory = {
    namespaced: true,
    state: initialState,
    actions: {
        changeInventoryComponent({commit}, payload) {
            commit('changeInventoryComponent', payload);
        },
        changeDetailTab({commit},payload){
          commit('changeDetailTab',payload);
        },
        resetState({commit}) {
            commit('resetState')
        }
    },
    mutations: {
        changeInventoryComponent(state, payload) {
            const find = state.settings.inventoryComponents.find(c => c.name === payload);
            if (find) {
                state.settings.currentInventoryStateComponent = find.cmp;
            }
        },
        changeDetailTab(state,payload){
            const find = state.detail.tabs.find(c => c.name === payload);
            if (find) {
                state.detail.currentTab = find.cmp;
            }
        },
        resetState(state) {
            state.showNewInventory = false;
        }
    }
};