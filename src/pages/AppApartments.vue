<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import AppHeader from '../components/AppHeader.vue';
import Categories from '../components/Categories.vue';
import Map from '../components/Map.vue';

export default {
    name: 'HomePage',
    components: {
        ApartmentItem,
        AppHeader,
        Categories,
        Map
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
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },

        updateThumbPosition() {
            const range = document.getElementById('km');
            if (range) {
                const thumbWidth = getComputedStyle(range).getPropertyValue('--thumb-width');
                const thumbPosition = `${((range.value - range.min) / (range.max - range.min)) * 100}%`;
                this.thumbPosition = `calc(${thumbPosition} - ${thumbWidth} / 2)`;
            }
        },

        getApartments() {
            const lat = this.store.lat || 44.4949; // Usare latitudine di default
            const lon = this.store.lon || 11.3426; // Usare longitudine di default

            // Assicurati di avere definito il valore di `range`
            const range = this.range || 20; // Usa il raggio di ricerca attuale o un valore di default

            // Definisci la variabile params
            const params = {
                range: range,
                lat: lat,
                lon: lon,
                page: this.apiPageNumber
            };

            console.log('Parametri della richiesta:', params); // Stampa i parametri della richiesta

            const url = `${this.store.baseApiApartments}`;
            axios.get(url, { params })
                .then(res => {
                    this.apartments = res.data.results.data;
                    this.services = res.data.services;
                    this.apiLinks = res.data.results.links;
                    this.total_items = res.data.results.total;
                    this.per_page = res.data.results.per_page;
                    this.last_page = res.data.results.last_page;
                    console.log('Appartamenti ottenuti:', this.apartments);
                    this.filterApartmentsByRoomsAndBeds();
                })
                .catch((error) => {
                    console.error('Errore durante la ricerca degli appartamenti:', error);
                    this.message = 'Errore durante la ricerca degli appartamenti.';
                });
        },

        filterApartmentsByRoomsAndBeds() {
            const url = `http://127.0.0.1:8000/api/filter`;
            // const serviceIds = this.selectedServices.join(',');
            // console.log('servizi:',serviceIds);

            const params = {
                bed_number: this.bedsNumber,
                room_number: this.roomsNumber,
            };

            if (this.selectedServices.length > 0) {
                params.services = this.selectedServices.join(',');
            };

            axios.get(url, {params})
            .then(res => {
                const filteredByRoomsAndBeds = res.data.results;

                console.log('Appartamenti filtrati per stanze e letti:', this.filteredApartments);
                // Filtra ulteriormente gli appartamenti ottenuti dall'API precedente per numero di stanze e letti
                this.filteredApartments = this.apartments.filter(apartment =>
                    filteredByRoomsAndBeds.some(filteredApartment => filteredApartment.id === apartment.id)
                );
            }).catch((error) => {
                console.error('Errore durante il filtraggio degli appartamenti:', error);
                this.message = 'Errore durante il filtraggio degli appartamenti.';
            });
        },

        filterApartmentsByServices() {
            // Se non ci sono servizi selezionati, restituisci tutti gli appartamenti
            if (this.selectedServices.length === 0) {
                this.filteredApartments = this.apartments;
                return;
            }

            // Filtra gli appartamenti in base ai servizi selezionati
            this.filteredApartments = this.apartments.filter(apartment => {
                // Estrai gli ID dei servizi associati all'appartamento corrente
                let aptServicesId = apartment.services.map(service => service.id);
                // Controlla se tutti i servizi selezionati sono presenti negli servizi dell'appartamento
                return this.selectedServices.every(selectedService => aptServicesId.includes(selectedService));
            });
        },

        clearFilters() {
            // Reimposta le variabili dei filtri ai valori predefiniti
            this.range = 20;
            this.roomsNumber = 1;
            this.bedsNumber = 1;
            this.selectedServices = [];

            // Richiama il metodo per ottenere gli appartamenti senza applicare i filtri
            this.getApartments();

            // Chiudi il modal dopo aver cancellato i filtri
        },




        // Aggiungi questa funzione per gestire l'applicazione dei filtri quando viene cliccato il pulsante "Applica filtri"
        applyFilters() {
            this.getApartments();
            console.log('Applicazione dei filtri completata.');
            // Chiudi il modal dopo aver applicato i filtri
            this.showModal = false;
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

            console.log(finalFilteredApartments)
            

            // Check if any services are selected
            if (this.selectedServices.length === 0) {
                // No services selected, filter by address only
                return finalFilteredApartments;
            }
            
            return finalFilteredApartments.filter( apartment => 
                apartment.services.some(apartmentService =>
                    this.selectedServices.includes(apartmentService.id) // Adjust property name based on your data
                ));

        }
    },
    mounted() {
        this.getApartments();
        console.log('Tutti gli appartamenti: ', this.apartments);
        console.log('Tutti gli appartamenti: ', this.apartments);
        console.log('Servizi disponibili: ', this.services);
    },
}
</script>


<template>
    <div>
        <div class="container d-flex align-items-center mt-3 gap-3">
            <AppHeader class="flex-grow-1"></AppHeader>
            <div class="btn-container" v-if="$route.name !== 'home'">
                <button type="button" class="my-black-btn btn btn-primary border-0 py-2" @click="toggleModal">
                    <i class="fa-solid fa-sliders me-2"></i>Filtri
                </button>
            </div>
        </div>

        <hr style="color: #c1c1c1;">

        <Categories></Categories>
        <form @submit.prevent="applyFilters()">
            <!-- Modal -->
            <div class="modal" :class="{ 'is-active': showModal }">
                <div class="modal-background" @click="toggleModal"></div>
                <div class="modal-content container rounded-4 p-0" style="max-width: 780px;">
                    <div
                        class="modal-header text-center d-flex justify-content-center align-items-center position-relative">
                        <h6 class="fw-semibold mb-0">Filtri</h6>
                        <button type="button" class="btn border-0 position-absolute" style="right: 12px;"
                            @click="toggleModal"><i class="fa-solid fa-xmark"></i></button>
                    </div>

                    <div class="modal-body container mt-2 px-4 overflow-y-auto" style="max-height: 70vh;">

                        <div class="mb-3 w-50">
                            <div class="fs-5 mb-3 fw-medium">Distanza</div>

                            <label for="radius" class="form-label">Raggio (km)</label>
                            <input type="number" id="radius" class="form-control mb-4" v-model="range" min="1"
                                max="50" />
                        </div>

                        <hr style="color: grey;" class="mb-3">

                        <div class="fs-5 mb-3 fw-medium">Stanze e letti</div>
                        <div class="number-filters d-flex gap-3 mb-3">
                            <div class="mb-3 w-50">
                                <label for="rooms" class="form-label">Camere da letto</label>
                                <input type="number" id="rooms" class="form-control" v-model="roomsNumber" min="1"
                                    max="5" />
                            </div>
                            <div class="mb-3 w-50">
                                <label for="bedrooms" class="form-label">Letti</label>
                                <input type="number" id="bedrooms" class="form-control" v-model="bedsNumber" min="1"
                                    max="5" />
                            </div>
                        </div>

                        <hr style="color: grey;" class="mb-3">

                        <div class="d-flex justify-content-center "></div>
                        <label class="fs-5 mb-3 fw-medium">Servizi</label>
                        <div class="d-flex gap-2 row mb-4">
                            <div v-for="service in services" :key="service.id" class="col-4">
                                <input type="checkbox" :id="service.id" class="my-checkbox checkbox"
                                    v-model="selectedServices" :value="service.id">
                                <label :for="service.id" class="form-label user-select-none ms-2">{{ service.title
                                    }}</label>
                            </div>
                        </div>



                    </div>
                    <div class="modal-footer d-flex justify-content-between align-items-center">
                        <button type="button" class="btn border-0 mb-2" @click="clearFilters">Cancella tutto</button>

                        <button type="submit" class="btn btn-primary border-0 my-red-btn mb-2"
                            @click="toggleModal">Applica
                            filtri</button>
                    </div>
                </div>
                <button class="modal-close is-large" @click="toggleModal" aria-label="close"></button>
            </div>
        </form>

        <!-- mappa da inserire
        <div class="mb-3 px-5">

            <Map v-if="filteredApartments.length > 0" :lat="filteredApartments[0].latitude"
                :long="filteredApartments[0].longitude" :apartments="filteredApartments" :apiKey="store.apiKey"
                class="rounded" ref="Map"></Map>

        </div> -->

        <div class="container-fluid text-center">
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
    background-color: #222;

    &:hover {
        background-color: black !important;
    }
}

.my-black-btn {
    background-color: #222 !important;
    font-size: 12px;

    .fa-sliders {
        font-size: 14px;
    }

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
        background-color: black;
        border-color: black;
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
