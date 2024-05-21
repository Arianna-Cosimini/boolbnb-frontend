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
                    lon: this.store.lon,
                    rooms: this.store.rooms,
                    bathrooms: this.store.bathrooms
                });
                this.fetchApartments(); // Call the fetch method
            }
        },
        fetchApartments() {
            const { address, lat, lon, rooms, bathrooms } = this.store;
            const url = `${this.store.baseApiApartments}?address=${address}&lat=${lat}&lon=${lon}&rooms=${rooms}&bathrooms=${bathrooms}`;

            axios.get(url)
                .then(response => {
                    this.apartments = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching apartments:', error);
                });
        }
    }
}
</script>

<template>
    <section class="my-5 d-flex align-items-center" style="z-index: 1000;">
        <div class="container">
            <div class="row">
                <div id="first-section" class="position-relative mb-3 mt-3">
                    <form @submit.prevent="sendAddress">
                        <div class="my-research px-3 pb-3 shadow-sm">
                            <div class="mb-3 position-relative" @click.stop>
                                <label for="exampleFormControlInput1" class="form-label">Dove</label>
                                <input type="search" class="form-control radius" v-model="store.address" name="address"
                                    @click="store.addressListVisible = true" @input="controlModal()"
                                    id="exampleFormControlInput1" placeholder="Inserisci una destinazione"
                                    autocomplete="off">
                                <Searchbar v-if="store.addressListVisible" class="position-absolute card radius"
                                    style="width: 100%;" :class="activeAuto ? 'd-block' : 'd-none'"
                                    :itemsComplete="autocomplete" />
                            </div>

                            
                            <router-link :to="{ name: 'app-apartments' }" class="btn">
                                Cerca
                            </router-link>
                            <div v-if="store.addressListVisible">
                                <!-- <div v-if="autocomplete && autocomplete.length === 0">
                                    Nessun risultato
                                </div> -->
                            </div>
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

.btn-danger {
    background-color: #ff385c !important;
}

.searchbar-dropdown {
    z-index: 1050;
    background-color: white;
}
</style>
