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
            lastPage: '',
            totalItems: 0,
            addressFromSearch: '',
            userAddress: '',
            roomsValue: 0,
            bathsValue: 0,
        }
    },
    mounted() {
        this.apiCall();
        console.log('Initial apartments data:', this.apartments);
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

            let filteredApartments = this.apartments.filter(apartment => {
                let matchesAddress = true;
                let matchesRooms = true;
                let matchesBaths = true;


                if (this.store && this.store.address) {
                    matchesAddress = apartment.address.includes(this.store.address);
                }


                if (this.roomsValue > 0) {
                    matchesRooms = apartment.room_number >= this.roomsValue;
                }


                if (this.bathsValue > 0) {
                    matchesBaths = apartment.bathroom_number >= this.bathsValue;
                }

                console.log(`Apartment: ${apartment.id}, Address: ${matchesAddress}, Rooms: ${matchesRooms}, Baths: ${matchesBaths}`);
                return matchesAddress && matchesRooms && matchesBaths;
            });

            console.log('Filtered apartments:', filteredApartments);
            return filteredApartments;
        }

    }
}

</script>

<template>
    <AppHeader></AppHeader>
    <Categories></Categories>
    <div class="mb-3">
        <label for="rooms" class="form-label">Camere</label>
        <input type="number" class="form-control" v-model="roomsValue" id="rooms" min="1">
    </div>
    <div class="mb-3">
        <label for="bathrooms" class="form-label">Bagni</label>
        <input type="number" class="form-control" v-model="bathsValue" id="bathrooms" min="1">
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
        <vue-awesome-paginate :total-items="totalApartment" :items-per-page="itemPage" :max-pages-shown="lastPage"
            v-model="apiPageNumber" :on-click="changeApiPage" active-page-class="active-page"
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