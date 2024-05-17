import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import {router} from "./router"

createApp(App).use(router).use(VueAwesomePaginate).mount('#app')
