import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue';
import AppApartments from './pages/AppApartments.vue';
import LoadingMessage from './pages/LoadingMessage.vue';


import MessageMe from './pages/MessageMe.vue';
/* import MessageMe from './pages/MessageMe.Vue'; */
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
            component: AppApartments
            
        },
        {
        
            path:'/message-me',
            name:'message-me',
            component: MessageMe
        },
        {
        
            path:'/loading-message',
            name:'loading-message',
            component: LoadingMessage
        },
    ]
    
})

export {router};