'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

import {
    RouteConfig,
} from 'vue-router/types/router';

import Popup from './Popup.vue';
import Index from './pages/Index.vue';

Vue.use(VueRouter);

(window as any).root = render();

function render (): Popup {
    const routes: RouteConfig[] = [{
        path: '/',
        component: Index,
    }, ];

    const router: VueRouter = new VueRouter({
        routes,
    });

    return new Popup({
        router,
    }).$mount('#app');
}
