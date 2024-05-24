<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import AppHeader from '../components/AppHeader.vue';
import Categories from '../components/Categories.vue';
import Map from '../components/Map.vue';
// import Map from '../components/Map.vue';

export default {
    name: 'AppApartments',
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
            range: '10',
            selectedCategory: null,
        }
    },

    computed: {
        shouldShowPagination() {
            return this.total_items > this.per_page;
        }
    },

    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },

        handleCategorySelected(categoryId) {
            this.selectedCategory = categoryId;
            this.getApartments();
        },

        getApartments() {
            const lat = this.store.lat || 44.4949; // Usare latitudine di default
            const lon = this.store.lon || 11.3426; // Usare longitudine di default

            // Assicurati di avere definito il valore di `range`
            const range = this.range || 20; // Usa il raggio di ricerca attuale o un valore di default

            // Definisci la variabile params
            const params = {
                lat: lat,
                lon: lon,
                range: range,
                bed_number: this.bedsNumber,
                room_number: this.roomsNumber,
                page: this.apiPageNumber
            };

            if (this.selectedServices.length > 0) {
                params.services = this.selectedServices.join(',');
            };

            if (this.selectedCategory !== null) {
                params.categories = this.selectedCategory;
            }

            console.log('Parametri della richiesta:', params); // Stampa i parametri della richiesta


            const url = `http://127.0.0.1:8000/api/filter`;


            axios.get(url, { params })
                .then(res => {
                    this.apartments = res.data.results.data;
                    this.services = res.data.services;
                    this.apiLinks = res.data.results.links;
                    this.total_items = res.data.results.total;
                    this.per_page = res.data.results.per_page;
                    this.last_page = res.data.results.last_page;
                    console.log('Appartamenti ottenuti:', this.apartments);

                    this.filteredApartments = this.apartments.filter(apartment =>
                        this.apartments.some(filteredApartment => filteredApartment.id === apartment.id)
                    );

                })
                .catch((error) => {
                    console.error('Errore durante la ricerca degli appartamenti:', error);
                    this.message = 'Errore durante la ricerca degli appartamenti.';
                });
        },

        clearFilters() {
            // Reimposta le variabili dei filtri ai valori predefiniti
            this.range = 10;
            this.roomsNumber = 1;
            this.bedsNumber = 1;
            this.selectedServices = [];

            this.updateRangeOutput();

            // Richiama il metodo per ottenere gli appartamenti senza applicare i filtri
            this.getApartments();

        },

        updateRangeOutput() {
            const rangeInput = document.querySelector('input[type="range"]');
            const rangeOutput = rangeInput.nextElementSibling;
            rangeOutput.value = rangeInput.value;
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

        handleAddressSelected(data) {
            this.store.address = data.address;
            this.store.lat = data.lat;
            this.store.lon = data.lon;
            this.getApartments();
        },
    },


    watch: {
        // Aggiunto un watcher su store.address per monitorare i cambiamenti all'indirizzo e aggiornare i risultati degli appartamenti 
        'store.address': function (newAddress, oldAddress) {
            if (newAddress !== oldAddress) {
                this.getApartments();
            }
        },

        // watcher per l'output del range quando i filtri vengono resettati'
        range(newVal) {
            this.updateRangeOutput();
        },

    },
    mounted() {
        this.getApartments();
        console.log('Tutti gli appartamenti: ', this.apartments);
        console.log('Servizi disponibili: ', this.services);
    },
}
</script>

<template>
    <div>
        <div class="container d-flex align-items-center mt-3 gap-3">
            <AppHeader class="flex-grow-1" @address-selected="handleAddressSelected"></AppHeader>
            <div class="btn-container" v-if="$route.name !== 'home'">
                <button type="button" class="my-black-btn btn btn-primary border-0 py-2" @click="toggleModal">
                    <i class="fa-solid fa-sliders me-2"></i>Filtri
                </button>
            </div>
        </div>

        <hr style="color: #c1c1c1;">

        <Categories @category-selected="handleCategorySelected"></Categories>
        <form @submit.prevent="applyFilters()">
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

                        <div class="distance-range mb-3 w-100">
                            <div class="fs-5 mb-3 fw-medium">Distanza<span class="ms-1 fs-6 fw-normal">(km)</span></div>
                            <input type="range" id="customRange3" class="form-range mb-4" v-model="range" min="0.1"
                                max="20" step="0.1" oninput="this.nextElementSibling.value = this.value"
                                @input="updateThumbPosition" />
                            <output>{{ range }}</output>
                            <label for="customRange3" class="form-label"></label>

                            <Map class="my-4" :apiKey="store.apiKey" :lat="store.lat" :long="store.lon"></Map>

                        </div>

                        <!-- <div class="mb-3 w-100">
                            <div class="fs-5 mb-3 fw-medium">Distanza</div>
                            <input type="range" id="km" class="form-range mb-4" v-model="range" min="0.1" max="20"
                                step="0.1" oninput="this.nextElementSibling.value = this.value"
                                @input="updateThumbPosition" />
                            <output>10</output> <label for="km" class="form-label">(km)</label> -->

                        <!-- <Map :apiKey="store.apiKey" :lat="store.latitude" :long="store.longitude"></Map> -->
                        <!-- <Map :apikey="store.apikey" :apartments="apartments" :long="long" :lat="lat"></Map> -->
                        <!-- </div> -->

                        <hr style="color: grey;" class="mb-3">

                        <div class="fs-5 mb-3 fw-medium">Stanze e letti</div>
                        <div class="number-filtersmb-3">
                            <p for="rooms" class="form-label mb-2">Camere da letto</p>
                            <div class="mb-3">
                                <div class="btn-group d-flex gap-3" role="group" aria-label="Numero di camere da letto">
                                    <input type="radio" id="rooms1" class="btn-check" v-model="roomsNumber" :value="1"
                                        name="room">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': roomsNumber === 1 }" for="rooms1">1</label>


                                    <input type="radio" id="rooms2" class="btn-check" v-model="roomsNumber" :value="2"
                                        name="room">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': roomsNumber === 2 }" for="rooms2">2</label>

                                    <input type="radio" id="rooms3" class="btn-check" v-model="roomsNumber" :value="3"
                                        name="room">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': roomsNumber === 3 }" for="rooms3">3</label>

                                    <input type="radio" id="rooms4" class="btn-check" v-model="roomsNumber" :value="4"
                                        name="room">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': roomsNumber === 4 }" for="rooms4">4</label>

                                    <input type="radio" id="rooms5" class="btn-check" v-model="roomsNumber" :value="5"
                                        name="room">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': roomsNumber === 5 }" for="rooms5">5+</label>
                                </div>
                            </div>
                            <p for="bedrooms" class="form-label mb-2">Letti</p>
                            <div class="mb-4">
                                <div class="btn-group d-flex gap-3" role="group" aria-label="Numero di letti">
                                    <input type="radio" id="beds1" class="btn-check" v-model="bedsNumber" :value="1"
                                        name="bed">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': bedsNumber === 1 }" for="beds1">1</label>

                                    <input type="radio" id="beds2" class="btn-check" v-model="bedsNumber" :value="2"
                                        name="bed">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': bedsNumber === 2 }" for="beds2">2</label>

                                    <input type="radio" id="beds3" class="btn-check" v-model="bedsNumber" :value="3"
                                        name="bed">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': bedsNumber === 3 }" for="beds3">3</label>

                                    <input type="radio" id="beds4" class="btn-check" v-model="bedsNumber" :value="4"
                                        name="bed">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': bedsNumber === 4 }" for="beds4">4</label>

                                    <input type="radio" id="beds5" class="btn-check" v-model="bedsNumber" :value="5"
                                        name="bed">
                                    <label
                                        class="my-radio-btn btn btn-secondary rounded-5 bg-white border border-1 border-secondary-subtle text-black"
                                        :class="{ 'checked': bedsNumber === 5 }" for="beds5">5+</label>
                                </div>
                            </div>
                        </div>

                        <hr style="color: grey;" class="mb-3">

                        <div class="d-flex justify-content-center "></div>
                        <p class="fs-5 mb-3 fw-medium">Servizi</p>
                        <div class="d-flex gap-2 row mb-4">
                            <div v-for="service in services" :key="service.id" class="col-4">
                                <input type="checkbox" :id="service.id" class="my-checkbox checkbox"
                                    v-model="selectedServices" :value="service.id">
                                <label :for="service.id" class="form-label user-select-none ms-2">{{
                                    service.title }}</label>
                            </div>
                        </div>



                    </div>
                    <div class="modal-footer d-flex justify-content-between align-items-center">
                        <button type="button" class="btn border-0 mb-2" @click="clearFilters">Cancella tutto</button>

                        <button type="submit" class="btn btn-primary border-0 my-red-btn mb-2"
                            @click="toggleModal">Applica filtri
                        </button>
                    </div>
                </div>
                <button class="modal-close is-large" @click="toggleModal" aria-label="close"></button>
            </div>
        </form>


        <div class="container-fluid text-center">
            <div class="row px-5">
                <template v-if="this.filteredApartments.length > 0">
                    <ApartmentItem v-for="apartment in filteredApartments" :key="apartment.id" :apartment="apartment" />
                </template>
                <template v-else>
                    <div class="container text-start mt-5">
                        <p class="fs-4 mb-0">{{ message }}</p>
                        <p style="font-weight: 300;">Prova a modificare o rimuovere alcuni filtri o a cambiare l'area di
                            ricerca.</p>
                    </div>
                </template>
            </div>
        </div>

        <nav v-if="shouldShowPagination" class="button-nav d-flex justify-content-center" style="margin-bottom: 100px;">
            <vue-awesome-paginate :total-items="total_items" :items-per-page="per_page" :max-pages-shown="last_page"
                v-model="currentPage" :on-click="changeApiPage" active-page-class="active-page"
                paginate-buttons-class="paginate-buttons" />
        </nav>

        <nav v-else class="button-nav d-flex justify-content-center" style="margin-bottom: 100px;">

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

.distance-range {

    /* Stilizzare l'input range */
    input[type="range"].form-range {
        width: 100%;
        height: 8px;
        /* Altezza del range slider */
        background: #ddd;
        /* Colore dello sfondo */
        border-radius: 5px;
        /* Angoli arrotondati */
        outline: none;
        transition: background 0.3s;
    }

    /* Cambiare il colore della barra di riempimento per Webkit browsers */
    input[type="range"].form-range::-webkit-slider-runnable-track {
        background: black;
        /* Colore della barra di riempimento */
        border-radius: 5px;
    }

    /* Thumb per Webkit browsers */
    input[type="range"].form-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 32px;
        /* Larghezza del thumb */
        height: 32px;
        /* Altezza del thumb */
        background: white;
        /* Colore del thumb */
        border-radius: 50%;
        /* Thumb circolare */
        cursor: pointer;
        transition: background 0.3s;

        border: 1px solid lightgrey;

        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.202);

        transform: translateY(-8px);

    }


    /* Cambiare il colore della barra di riempimento per Firefox */
    input[type="range"].form-range::-moz-range-track {
        background: #007bff;
        /* Colore della barra di riempimento */
        border-radius: 5px;
    }

    /* Thumb per Firefox */
    input[type="range"].form-range::-moz-range-thumb {
        width: 32px;
        height: 32px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s;

        border: 1px solid lightgrey;

        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.202);

        transform: translateY(-8px);

    }


    /* Cambiare il colore della barra di riempimento per Internet Explorer */
    input[type="range"].form-range::-ms-track {
        background: transparent;
        /* Necessario per rimuovere uno sfondo predefinito */
        border-color: transparent;
        color: transparent;
        width: 100%;
        height: 8px;
    }

    input[type="range"].form-range::-ms-fill-lower {
        background: black;
        /* Colore della barra di riempimento */
        border-radius: 5px;
    }

    input[type="range"].form-range::-ms-fill-upper {
        background: #ddd;
        /* Colore dello sfondo */
        border-radius: 5px;
    }

    /* Thumb per Internet Explorer */
    input[type="range"].form-range::-ms-thumb {
        width: 32px;
        height: 32px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s;
        border: 1px solid lightgrey;

        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.202);

        transform: translateY(-8px);
    }

    /* Stilizzare l'output */
    output {
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        /* Spazio tra il range e l'output */
        font-size: 1rem;
        /* Dimensione del font dell'output */
        font-weight: 500;
        /* Grassetto per l'output */
        background-color: black;
        padding: 4px 8px;
        color: white;
        width: 60px;
        border-radius: 4px;
        user-select: none;
    }

    /* Stilizzare il label */
    .form-label {
        margin-left: 5px;
        /* Spazio tra l'output e il label */
        font-size: 1rem;
        /* Dimensione del font del label */
    }
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

.my-radio-btn:hover {
    border: 1px solid black !important;
}


.my-radio-btn.checked {
    background-color: black !important;
    border-color: black !important;
    color: white !important;
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