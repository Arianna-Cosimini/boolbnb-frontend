import { reactive } from 'vue'

import axios from 'axios';
export const store = reactive({

    baseUrl: "http://127.0.0.1:8000/",
    baseApiHome: 'http://127.0.0.1:8000/api/',
    baseApiApartments: "http://127.0.0.1:8000/api/apartments/",
    apiKey: "RrNofIXHXhCLSto2sM1SEfvmA1AamCSs",
    addressListVisible: true,
    lat: '',
    lon: '',
    address: '',
    range: 20,
    filteredMap: false,
    user_name: 'Accedi',
    user_surname: '',
    user_email: '',

});