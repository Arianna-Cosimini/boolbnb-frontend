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
            filteredApartments: [],
            apiLinks: [],
            apiPageNumber: 1,
            message: 'Non ci sono appartamenti da visualizzare',
            query: '',
            autocomplete: [],
            address: '',
            activeAuto: false,
            currentPage: 1,
            per_page: 1,
            last_page: 1,
            total_items: 1,
            addressFromSearch: '',
            userAddress: '',
            services: [],
            selectedServices: [],
            roomsNumber: 1,
            bedsNumber: 1,
            showModal: false,
        }
    },
    mounted() {
        this.getApartments();
        console.log('Tutti gli appartamenti: ', this.apartments);
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },

        getApartments() {
            // Assicurarsi che lat e lon abbiano valori
            const lat = this.store.lat || 44.4949; // Usare latitudine di default
            const lon = this.store.lon || 11.3426; // Usare longitudine di default

            const url = `${this.store.baseApiApartments}`;
            axios.get(url, {
                params: {
                    range: 20,
                    lat: lat,
                    lon: lon,
                }
            }).then(res => {
                this.apartments = res.data.results.data;
                this.total_items = res.data.results.total;
                this.per_page = res.data.results.per_page;
                this.last_page = res.data.results.last_page;

                // Dopo aver ottenuto gli appartamenti entro il raggio, applica ulteriori filtri locali
                this.filterApartmentsByRoomsAndBeds();
            }).catch((error) => {
                console.error('Errore durante la ricerca degli appartamenti:', error);
                this.message = 'Errore durante la ricerca degli appartamenti.';
            });
        },

        filterApartmentsByRoomsAndBeds() {
            const url = `http://127.0.0.1:8000/api/filter`;
            axios.get(url, {
                params: {
                    bed_number: this.bedsNumber,
                    room_number: this.roomsNumber
                }
            }).then(res => {
                const filteredByRoomsAndBeds = res.data.results;

                // Filtra ulteriormente gli appartamenti ottenuti dall'API precedente per numero di stanze e letti
                this.filteredApartments = this.apartments.filter(apartment =>
                    filteredByRoomsAndBeds.some(filteredApartment => filteredApartment.id === apartment.id)
                );
            }).catch((error) => {
                console.error('Errore durante il filtraggio degli appartamenti:', error);
                this.message = 'Errore durante il filtraggio degli appartamenti.';
            });
        },

        changeApiPage(pageNumber) {
            if (pageNumber === "&laquo; Previous" && this.currentPage > 1) {
                this.currentPage--;
            } else if (pageNumber === "Next &raquo;" && this.currentPage < this.last_page) {
                this.currentPage++;
            }

            this.apiPageNumber = this.currentPage;
            this.getApartments();
        },
    },

    computed: {
        finalFilteredApartments() {
            if (!this.filteredApartments || this.filteredApartments.length === 0) {
                console.log('Nessun dato sugli appartamenti disponibile.');
                return [];
            }

            let finalFilteredApartments = this.filteredApartments;

            if (this.selectedServices.length > 0) {
                finalFilteredApartments = finalFilteredApartments.filter(apartment =>
                    apartment.services.some(apartmentService =>
                        this.selectedServices.includes(apartmentService.id)
                    )
                );
            }

            return finalFilteredApartments;
        }
    },
}
</script>


<template>
    <div>
        <div class="container d-flex align-items-center mt-3 gap-3">
            <AppHeader class="flex-grow-1"></AppHeader>
            <div class="btn-container" v-if="$route.name !== 'home'">
                <button type="button" class="my-black-btn btn btn-primary border-0" @click="toggleModal">
                    <i class="fa-solid fa-sliders me-2"></i>Ricerca avanzata
                </button>
            </div>
        </div>

        <Categories></Categories>
        <form @submit.prevent="filterApartmentsByRoomsAndBeds()">
            <!-- Modal -->
            <div class="modal" :class="{ 'is-active': showModal }">
                <div class="modal-background" @click="toggleModal"></div>
                <div class="modal-content container rounded-4">
                    <div class="container mt-2">
                        <div class="fs-5 mb-3 fw-medium">Ricerca avanzata</div>
                        <div class="number-filters d-flex gap-3 mb-3">
                            <div class="mb-3 w-50">
                                <label for="rooms" class="form-label">Camere</label>
                                <input type="number" id="rooms" class="form-control" v-model="roomsNumber" min="1"
                                    max="5" />
                            </div>
                            <div class="mb-3 w-50">
                                <label for="bedrooms" class="form-label">Posti letto</label>
                                <input type="number" id="bedrooms" class="form-control" v-model="bedsNumber" min="1"
                                    max="5" />
                            </div>
                        </div>
                        <div class="d-flex justify-content-center "></div>
                        <label class="form-label">Servizi</label>
                        <div class="d-flex gap-2 row mb-5">
                            <div v-for="service in services" :key="service.id" class="col-4">
                                <input type="checkbox" :id="service.id" class="my-checkbox checkbox"
                                    v-model="selectedServices" :value="service.id">
                                <label :for="service.id" class="form-label user-select-none ms-2">{{ service.title
                                    }}</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary border-0 my-red-btn mb-3"
                            @click="toggleModal">Applica
                            filtri</button>
                    </div>
                </div>
                <button class="modal-close is-large" @click="toggleModal" aria-label="close"></button>
            </div>
        </form>

        <div class="container-fluid text-center mt-5">
            <div class="row px-5">
                <template v-if="this.filteredApartments.length > 0">
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
    </div>
</template>


<style lang="scss">
.my_mini_jumbo {
    height: 60vh;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal.is-active {
    display: block;
}

.modal-content {
    position: relative;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
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

.my-red-btn {
    background-color: #ff385c;

    &:hover {
        background-color: #de1361 !important;
    }
}

.my-black-btn {
    background-color: #222 !important;

    &:hover {
        background-color: black !important;
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

    .card-title,
    .card-body p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}



.my-checkbox {
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 4px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    outline: none;

    &:checked {
        background-color: #ff385c;
        border-color: #ff385c;
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 7px;
        width: 4px;
        height: 8px;
        scale: 1.5;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
}
</style>
