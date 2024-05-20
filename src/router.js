import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue';
import AppApartments from './pages/AppApartments.vue';


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
        },
        {
            path:'/apartments',
            name: 'app-apartments',
            component: AppApartments,
            
        },
        
    ]
})

export {router};