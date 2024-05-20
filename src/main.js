import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import '@fortawesome/fontawesome-free/css/all.css';

import '@fortawesome/fontawesome-free/js/all.js';

import {router} from "./router"

createApp(App).use(router).use(VueAwesomePaginate).mount('#app')
