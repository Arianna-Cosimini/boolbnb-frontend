<script>
import { store } from '../store.js';
import Searchbar from '../components/Searchbar.vue';
import axios from 'axios';

export default {
    name: "AppHeader",
    data() {
        return {
            query: '',
            autocomplete: [],
            activeAuto: false,
            store,
            lat: '',
            lon: '',
            apartments: null,
        };
    },
    components: {
        Searchbar,
    },
    methods: {
        getApiProjects() {
            axios.get(`https://api.tomtom.com/search/2/search/${this.store.address}.json`, {
                params: {
                    'key': 'RrNofIXHXhCLSto2sM1SEfvmA1AamCSs',
                    'countrySet': 'IT',
                    'lat': '44.4949',
                    'lon': '11.3426',
                    'radius': '20000',
                    'limit': '5',
                }
            })
                .then(response => {
                    this.autocomplete = response.data.results;
                    if (this.autocomplete.length === 0) {
                        console.log('Nessun risultato');
                    }
                    this.autocomplete = response.data.results;
                });
        },
        controlModal() {
            if (this.store.address.length == 0)
                this.activeAuto = false
            else {
                if (this.store.address.length > 2)
                    this.getApiProjects()
                this.activeAuto = true
            }
        },
        sendAddress() {
            if (this.autocomplete.length > 0) {
                const selectedPlace = this.autocomplete[0];
                this.store.lat = selectedPlace.position.lat;
                this.store.lon = selectedPlace.position.lon;
                this.$emit('address-selected', {
                    address: this.store.address,
                    lat: this.store.lat,
                    lon: this.store.lon
                });
            }
        }
    }
}
</script>

<template>
    <section class="d-flex align-items-center" style="z-index: 1000;">
        <div class="container">
            <div class="row">
                <div id="first-section" class="position-relative mb-3 mt-3">
                    <form @submit.prevent="sendAddress">
                        <div
                            class="my-research bg-white rounded-5 mt-3 ps-5 pe-2 py-2 shadow-lg d-flex justify-content-between align-items-center gap-5">
                            <div class="position-relative flex-grow-1" @click.stop>
                                <!-- <label for="exampleFormControlInput1" class="form-label">Dove</label> -->
                                <input type="search" class="form-control custom-focus border-0 radius"
                                    v-model="store.address" name="address" @click="store.addressListVisible = true"
                                    @input="controlModal()" id="exampleFormControlInput1"
                                    placeholder="Inserisci una destinazione" autocomplete="off">
                                <Searchbar v-if="store.addressListVisible"
                                    class="position-absolute card border-0 rounded-5 radius shadow-lg"
                                    style="width: 100%;" :class="activeAuto ? 'd-block' : 'd-none'"
                                    :itemsComplete="autocomplete" />
                            </div>
                            <router-link :to="{ name: 'app-apartments' }"
                                class="my-search-btn btn btn-danger rounded-circle">
                                <i class="fas fa-search"></i>
                            </router-link>
                            <!-- <div v-if="store.addressListVisible">
                                    <div v-if="autocomplete && autocomplete.length === 0">
                                        Nessun risultato
                                    </div>
                                </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.text-gray {
    color: lightgray;
}

.custom-focus:focus {
    border-color: transparent;
    /* Cambia il colore del bordo */
    box-shadow: none;
    /* Aggiungi un'ombra */
    outline: none;
    /* Rimuovi il bordo predefinito */
}

.image-container {
    width: 100%;

    img {
        width: 100%;
        object-fit: cover;
    }
}

.jumbo {
    margin-top: 4rem;

    .my-research {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(-50%, -50%);
        background-color: white;
    }

    .image-container {
        min-height: 500px;

        img {
            min-height: 550px;
        }
    }
}

.form-label {
    font-size: 12px;
    font-weight: 500;
}

.my-search-btn {
    width: 48px;
    height: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.btn-danger {
    background-color: #ff385c !important;

    &:hover {
        background-color: #DE1361 !important;
    }
}


.searchbar-dropdown {
    z-index: 1050;
    background-color: white;
}
</style>
