import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from './auth.module';
import {general} from './general.module';
import {hr} from './hr.module';
import {ss} from './ss.module';
import {hrSettings} from './hr-settings.module';
import {role} from './role.module';
import {application} from './application.module';
import {applicationSettings} from './application-settings.module';
import {informationTechnologies} from './information-technologies.module';
import {supplierManagement} from './supplier-management.module';
import {inventory} from './inventory.module';
import {parameter} from './parameter.module';
import {settings} from './settings.module'
import {sp} from './sp.module'
import {spSettings} from './sp-settings.module'
import {budgetManagement} from "@/store/budget-management.module";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        general,
        hr,
        ss,
        hrSettings,
        role,
        inventory,
        application,
        applicationSettings,
        informationTechnologies,
        supplierManagement,
        budgetManagement,
        parameter,
        settings,
        sp,
        spSettings,
    }
})
