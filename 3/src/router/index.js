// router.js
import Vue from 'vue';
import Router from 'vue-router';
import Routes from './config';

Vue.use(Router);

export function createRouter() {
    let createRoute = new Router({
        mode: 'history',
        routes: Routes,
    });
    if (global.Window) {
        createRoute.beforeEach((to, from, next) => {
            next();
        });
    }
    return createRoute;
}
