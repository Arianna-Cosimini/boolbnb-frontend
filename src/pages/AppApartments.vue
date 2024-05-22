<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import AppHeader from '../components/AppHeader.vue';
import Categories from '../components/Categories.vue';


export default {
    name: 'HomePage',
    components: {
        ApartmentItem,
        AppHeader,
        Categories,

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
            currentPage: 1,
            per_page: 1,
            last_page: 1,
            total_items:1,
            addressFromSearch: '',
            userAddress: '',
            services: [],
            selectedServices: [],
            roomsNumber: 0,
            bedsNumber: 0,
        }
    },
    mounted() {
        this.apiCall();
        console.log('Initial apartments data:', this.apartments);
    },
    methods: {


        getApiApartments(apartments = []) {
            const { address, lat, lon } = this.store;
            const url = `${this.store.baseApiApartments}?address=${address}&lat=${lat}&lon=${lon}`;

            axios.get(url, {
                params: {
                    'page': this.apiPageNumber,
                    'fullAddress': address // Include full address for street-level filtering
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        apartments = apartments.concat(response.data.apartments);
                        // if (pageNumber < response.data.last_page) {
                        //     this.getApiApartments(pageNumber + 1, apartments);
                        // } else {
                            // Filtra gli appartamenti per distanza e indirizzo completo
                            this.apartments = apartments.filter(apartment => {
                                return apartment.distance <= 20000 && // 20 km in meters
                                    apartment.address.includes(this.store.address); // Match full address
                            });
                            this.messageChecked = false;
                        // }
                    } else {
                        this.messageChecked = true;
                    }
                })
                .catch(error => {
                    console.error('Errore nel recupero degli appartamenti:', error);
                    // Gestisci l'errore come preferisci
                });
        },

        apiCall() {
            const url = `${this.store.baseApiHome}apartments`;
            axios.get(url, {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {
                // apartments = apartments.concat(res.data.results.data);
                // const services = res.data.services;

                // if (pageNumber < res.data.results.last_page) {
                //     this.apiCall(pageNumber + 1, apartments);
                // } else {
                //     this.apartments = apartments;
                //     this.services = services;
                //     this.totalApartment = res.data.results.total;
                //     this.itemPage = res.data.results.per_page;
                //     this.lastPage = res.data.results.last_page;
                // }
                    this.apartments = res.data.results.data;
                    this.services = res.data.services;
                    this.apiLinks = res.data.results.links;
                    this.total_items = res.data.results.total;
                    this.per_page = res.data.results.per_page;
                    this.last_page = res.data.results.last_page;
            });


        },
        changeApiPage(pageNumber) {
            if (pageNumber == "&laquo; Previous" && this.currentPage > 1) {
                this.currentPage--;
            } else if (pageNumber == "Next &raquo;" && this.currentPage < this.last_page) {
                this.currentPage++;
            }

            // if (!isNaN(pageNumber)) {
            //     this.apiPageNumber = pageNumber;
            // }
            this.apiPageNumber = this.currentPage;

            this.apiCall();
        },

},
computed: {

        filteredApartments() {
            if (!this.apartments || this.apartments.length === 0) {
            return [];
            }

           

            let filteredApartments = this.apartments.filter(apartment => {
                let matchesAddress = true;
                let matchesRooms = true;
                let matchesBeds = true;
            
            
                if (this.store && this.store.address) {
                    matchesAddress = apartment.address.includes(this.store.address);
                }
            
            
                if (this.roomsNumber > 0) {
                    matchesRooms = apartment.room_number >= this.roomsNumber;
                }
            
            
                if (this.bedsNumber > 0) {
                    matchesBeds = apartment.bed_number >= this.bedsNumber;
                }
            
                console.log(`Apartment: ${apartment.id}, Address: ${matchesAddress}, Rooms: ${matchesRooms}, Baths: ${matchesBeds}`);
                return matchesAddress && matchesRooms && matchesBeds;
            });
            
            console.log('Filtered apartments:', filteredApartments);
            return filteredApartments;

             // Check if any services are selected
             if (this.selectedServices.length === 0) {
            // No services selected, filter by address only
            return this.apartments.filter(apartment => apartment.address.includes(this.store.address));
            }

                        // All selected services must be present in the apartment's services
                        return this.apartments.filter(apartment =>
            apartment.address.includes(this.store.address) && // Filter by address first
            apartment.services.some(apartmentService =>
                this.selectedServices.includes(apartmentService.id) // Adjust property name based on your data
            ))
        }
    }
}

</script>

<template>
    <AppHeader></AppHeader>
    <Categories></Categories>
    <div class="container">
    <div class="mb-3">
        <label for="rooms" class="form-label">Nº Stanze</label>
        <select class="form-select cursor_pointer" aria-label="Default select example" v-model="roomsNumber">                                               
            <option selected value="0">Scegli un numero minimo di stanze</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="bedrooms" class="form-label">Nº Bagni</label>
        <select class="form-select cursor_pointer" aria-label="Default select example" v-model="bedsNumber">                                               
            <option selected value="0">Scegli un numero minimo di posti letto</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
        </select>
    </div>
</div>

    <div>
        <h2>Servizi</h2>
        <div class="d-flex">
            <div v-for="service in services" :key="service.id">
                <input type="checkbox" v-model="selectedServices" :value="service.id">
                {{ service.title }}
            </div>
        </div>
    </div>

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
        <vue-awesome-paginate :total-items="total_items" :items-per-page="per_page" :max-pages-shown="last_page"
            v-model="currentPage" :on-click="changeApiPage" active-page-class="active-page"
            paginate-buttons-class="paginate-buttons" />
    </nav>
</template>

<style lang="scss">
.my_mini_jumbo {
    height: 60vh;
}

.button-nav {

    margin-top: 20px;
    padding-top: 20px;

    .pagination-container {
        display: flex;
        column-gap: 10px;
    }

    .paginate-buttons {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid rgb(255, 255, 255);
        color: rgb(0, 0, 0);
    }

    .paginate-buttons:hover {
        background-color: #f7f7f7;
    }

    .active-page {
        background-color: black;
        border: 1px solid black;
        color: white;
        pointer-events: none;
    }

    .active-page:hover {
        background-color: black;
    }

}

.card {

    cursor: pointer;

    .my_img_size {
        aspect-ratio: 1;
        object-fit: cover;

        &:hover {
            transform: scale(1.1);
            transition: .3s ease;
        }

        &:not(:hover) {
            transform: scale(1);
            transition: .3s ease;
        }
    }

    ;

    .card-title,
    .card-body p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


}
</style>