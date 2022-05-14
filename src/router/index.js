import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: 'Giriş Yap',
            layout: 'empty-layout'
        },
        component: Login
    },
    {
        name: 'dashboard',
        path: '/',
        meta: {
            title: 'KTB'
        },
        component: Dashboard
    },
    {
        path: '/application-management',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                path: '',
                meta: {
                    title: 'KTB | Başvuru Yönetimi'
                },
                component: () => import('../views/application-management/Dashboard.vue'),
            },
            {
                name: 'application-management/applications',
                path: 'applications',
                meta: {
                    title: 'KTB | Başvurular'
                },
                component: () => import('../views/application-management/Application.vue'),
            },
            {
                name: 'application-management/application-detail',
                path: 'applications/detail/:id',
                meta: {
                    title: 'KTB | Başvuru Detay'
                },
                component: () => import('../views/application-management/ApplicationDetail.vue'),
            },
            {
                name: 'application-management/application-next',
                path: 'applications/next/:id',
                meta: {
                    title: 'KTB | Başvuru Detay'
                },
                component: () => import('../views/application-management/ApplicationNext.vue'),
            },
            {
                name: 'application-management/new',
                path: 'applications/new',
                meta: {
                    title: 'KTB | Yeni Başvuru Girişi'
                },
                component: () => import('../views/application-management/NewApplication.vue')
            },
            {
                name: 'application-management/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/application-management/Settings.vue')
            },
        ]
    },
    {
        path: '/inventory-management',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                path: '',
                meta: {
                    title: 'KTB | Envanter Yönetimi'
                },
                component: () => import('../views/inventories/Dashboard.vue'),
            },
            {
                name: 'inventories',
                path: 'inventories',
                meta: {
                    title: 'KTB | Envanter Listesi'
                },
                component: () => import('../views/inventories/Inventories.vue'),
            },
            {
                name: 'inventories/new',
                path: 'inventories/new',
                meta: {
                    title: 'KTB | Yeni Envanter Girişi'
                },
                component: () => import('../views/inventories/NewInventory.vue'),
            },
            {
                name: 'inventories/detail',
                path: 'inventories/detail/:id',
                meta: {
                    title: 'KTB | Envanter Detay'
                },
                component: () => import('../views/inventories/InventoryDetail.vue'),
            },
            {

                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/inventories/Settings.vue'),
            },
        ]
    },
    {
        path: '/human-resources',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                name: 'human-resources',
                path: '',
                meta: {
                    title: 'KTB | İnsan Kaynakları'
                },
                component: () => import('../views/human-resources/Dashboard.vue'),
            },
            {
                name: 'human-resources/employee',
                path: 'employee',
                meta: {
                    title: 'KTB | Personel'
                },
                component: () => import('../views/human-resources/Employee.vue'),
            },
            {
                name: 'human-resources/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/human-resources/Settings.vue'),
            },
            {
                name: 'human-resources/employee-new',
                path: 'employee/new',
                meta: {
                    title: 'KTB | Yeni Personel Girişi'
                },
                component: () => import('../views/human-resources/NewEmployee.vue'),
            },
            {
                name: 'human-resources/employee-detail',
                path: 'employee/detail/:id',
                meta: {
                    title: 'KTB | Personel Bilgileri'
                },
                component: () => import('../views/human-resources/EmployeeDetail.vue'),
            }
        ]
    },
    {
        path: '/information-technologies',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                name: 'information-technologies',
                path: '',
                meta: {
                    title: 'KTB | Bilgi Teknolojileri'
                },
                component: () => import('../views/information-technologies/Dashboard.vue'),
            },
            {
                name: 'information-technologies/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/information-technologies/Settings.vue'),
            },
        ]
    },
    {
        path: '/supplier-management',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                name: 'supplier-management',
                path: '',
                meta: {
                    title: 'KTB | Tedarikçi Yönetimi'
                },
                component: () => import('../views/supplier-management/Dashboard.vue'),
            },
            {
                name: 'supplier-management/new',
                path: 'new',
                meta: {
                    title: 'KTB | Yeni Tedarikçi Girişi'
                },
                component: () => import('../views/supplier-management/NewSupplier.vue'),
            },
            {
                name: 'supplier-management/detail',
                path: 'detail/:id',
                meta: {
                    title: 'KTB | Tedarikçi Detay'
                },
                component: () => import('../views/supplier-management/SupplierDetail.vue'),
            },
            {
                name: 'supplier-management/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/supplier-management/Settings.vue'),
            },
        ]
    },
    {
        path: '/budget-management',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                name: 'budget-management/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/budget-management/Settings.vue'),
            },
        ]
    },
    {
        path: '/support-services',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                name: 'support-services',
                path: '',
                meta: {
                    title: 'KTB | Destek Hizmetleri'
                },
                component: () => import('../views/support-services/Dashboard.vue'),
            },
            {
                name: 'support-services/immovable/detail',
                path: 'immovable/detail/:id',
                meta: {
                    title: 'KTB | Taşınmaz Detayı'
                },
                component: () => import('../views/support-services/ImmovableDetail.vue'),
            }
        ]
    },
    {
        path: '/strategic-plans',
        component: () => import('../views/RouterView.vue'),
        children: [
            {
                path: '',
                meta: {
                    title: 'KTB | Stratejik Planlar'
                },
                component: () => import('../views/strategic-plans/StrategicPlans.vue'),
            },
            {
                name: 'strategic-plans/new',
                path: 'new',
                meta: {
                    title: 'KTB | Yeni Plan Girişi'
                },
                component: () => import('../views/strategic-plans/NewPlan.vue'),
            },
            {
                name: 'strategic-plans/detail',
                path: 'detail/:id',
                meta: {
                    title: 'KTB | Stratejik Plan Detayı'
                },
                component: () => import('../views/strategic-plans/StrategicPlanDetail.vue'),
            },
            {
                name: 'strategic-plans/monitoring',
                path: 'monitoring',
                meta: {
                    title: 'KTB | Stratejik Plan İzlemeleri'
                },
                component: () => import('../views/strategic-plans/Monitoring.vue'),
            },
            {
                name: 'strategic-plans/monitoring/new',
                path: 'monitoring/new',
                meta: {
                    title: 'KTB | Yeni Plan Dönem Açılışı'
                },
                component: () => import('../views/strategic-plans/NewPlanMonitoring.vue'),
            },
            {
                name: 'strategic-plans/monitoring/detail',
                path: 'monitoring/detail/:id',
                meta: {
                    title: 'KTB | Stratejik Plan Detayı'
                },
                component: () => import('../views/strategic-plans/MonitoringDetail.vue'),
            },
            {
                name: 'strategic-plans/settings',
                path: 'settings',
                meta: {
                    title: 'KTB | Ayarlar'
                },
                component: () => import('../views/strategic-plans/Settings.vue'),
            },
        ]
    },
    {
        name: 'settings',
        path: '/settings',
        meta: {
            title: 'KTB | Genel Ayarlar'
        },
        component: () => import('../views/Settings.vue')
    },
    {path: '*', redirect: '/'}
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next(`/login?returnUrl=${encodeURIComponent(to.fullPath)}`);
    }

    next(vm => {
        vm.prevRoute = from
    });
})
export default router
