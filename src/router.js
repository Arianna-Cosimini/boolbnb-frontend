import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue';

const router = createRouter({
    history:createWebHistory(),

    // array che contiene tutte le rotte della nostra applicazione 

    routes:[
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/apartments/:slug',
            name:'single-apartment',
            component: SingleApartment
        }
    ]
})

export {router};