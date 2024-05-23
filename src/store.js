import { reactive } from 'vue'

import axios from 'axios';
export const store = reactive({

    baseUrl: "http://127.0.0.1:8000/",
    baseApiHome: 'http://127.0.0.1:8000/api/',
    baseApiApartments: "http://127.0.0.1:8000/api/apartments/",
    baseApiMessage: "http://127.0.0.1:8000/api/new-message",
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
    rooms:'',
    bathrooms:'',
    postalCode: '',
    localName: '',

});


// export function getApiApartments(baseApiApartments, range, lat, lon) {
//     const url = `${baseApiApartments}?range=${range}&lat=${lat}&lon=${lon}`;
//     return axios.get(url);
// }