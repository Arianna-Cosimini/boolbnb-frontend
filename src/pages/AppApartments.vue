<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import AppHeader from '../components/AppHeader.vue';


export default {
    name: 'HomePage',
    components: {
        ApartmentItem,
        AppHeader,
       
    },
    data() {
        return {
            store,
            apartment: {},
            apartments: [],
            apiLinks: [],
            apiPageNumber: 1,
            message: 'Non ci sono appartamenti da visualizzare',
            query: '',
            autocomplete: [],
            address: '',
            lat: '',
            lon: '',
            activeAuto: false,
            lastPage: '',
            totalItems: 0,
            addressFromSearch: '',
            userAddress: '',
        }
    },
    mounted() {
        this.apiCall();
    },
    methods: {


        getApiApartments(pageNumber = 1, apartments = []) {
            const { address, lat, lon } = this.store;
            const url = `${this.store.baseApiApartments}?address=${address}&lat=${lat}&lon=${lon}`;

            axios.get(url, {
                params: {
                    'page': pageNumber,
                    'fullAddress': address // Include full address for street-level filtering
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        apartments = apartments.concat(response.data.apartments);
                        if (pageNumber < response.data.last_page) {
                            this.getApiApartments(pageNumber + 1, apartments);
                        } else {
                            // Filtra gli appartamenti per distanza e indirizzo completo
                            this.apartments = apartments.filter(apartment => {
                                return apartment.distance <= 20000 && // 20 km in meters
                                    apartment.address.includes(this.store.address); // Match full address
                            });
                            this.messageChecked = false;
                        }
                    } else {
                        this.messageChecked = true;
                    }
                })
                .catch(error => {
                    console.error('Errore nel recupero degli appartamenti:', error);
                    // Gestisci l'errore come preferisci
                });
        },

        apiCall(pageNumber = 1, apartments = []) {
            const url = `${this.store.baseApiHome}apartments`;
            axios.get(url, {
                params: {
                    page: pageNumber
                }
            }).then(res => {
                apartments = apartments.concat(res.data.results.data);
                if (pageNumber < res.data.results.last_page) {
                    this.apiCall(pageNumber + 1, apartments);
                } else {
                    this.apartments = apartments;
                    this.totalApartment = apartments.length;
                    this.lastPage = res.data.results.last_page;
                }
            });
        },
        changeApiPage(pageNumber) {
            if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {
                this.apiPageNumber--;
            } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < this.lastPage) {
                this.apiPageNumber++;
            }

            if (!isNaN(pageNumber)) {
                this.apiPageNumber = pageNumber;
            }

            this.apiCall();
        },

    },
    computed: {
        filteredApartments() {
            if (!this.apartments || this.apartments.length === 0) {
                return [];
            }
            return this.apartments.filter(apartment => {
                return apartment.address.includes(this.store.address);
            });
        }
    }
}
</script>

<template>
    <AppHeader></AppHeader>
    <div class="container-fluid text-center mt-5">
        <div class="row px-5">
            <template v-if="filteredApartments.length > 0">
                <ApartmentItem v-for="apartment in filteredApartments" :key="apartment.id" :apartment="apartment" />
            </template>
            <template v-else>
                <p>{{ message }}</p>
            </template>
        </div>
    </div>

    <nav class="button-nav d-flex justify-content-center mb-5">
        <vue-awesome-paginate :total-items="totalApartment" :items-per-page="itemPage" :max-pages-shown="lastPage"
            v-model="apiPageNumber" :on-click="changeApiPage" active-page-class="active-page"
            paginate-buttons-class="paginate-buttons" />
    </nav>
</template>

<style lang="scss" scoped></style>