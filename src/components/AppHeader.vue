<script>
import ApartmentItem from '../components/ApartmentItem.vue';

import { store } from '../store.js';

import Searchbar from '../components/Searchbar.vue';

// Axios
import axios from 'axios';

export default {
    name: "AppHeader",
    data() {
        return {
            query: '',
            autocomplete: [],
            activeAuto: false,
            store,
            apartments: null,
            lat: '',
            lon: ''
        };
    },
    components: {
        ApartmentItem,
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
                    // Controlla se non ci sono risultati
                    if (this.autocomplete.length === 0) {
                        console.log('Nessun risultato');
                    }
                    this.autocomplete = response.data.results;
                });
        },
        getApiHome() {
            axios.get(`${this.store.baseApiHome}apartments`)
                .then(response => {
                    this.apartments = response.data.apartments;
                }
                );
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
            this.store.lat = this.autocomplete[0].position.lat;
            this.store.lon = this.autocomplete[0].position.lon;
        }
    },
    created() {
        this.getApiHome()
    }
}
</script>

<template>
    <section class="my-5 min-vh-md-100 d-flex align-items-center">
        <div class="container">
            <div class="row">

                <!-- Jumbotron con sezione di ricerca appartamenti -->
                <div id="first-section"
                    class=" position-relative col-12 col-lg-8 offset-lg-4 col-xl-8 offset-xl-3 mb-3 mt-3">
                    <form submit.prevent>

                        <div class=" my-research p-4 p-md-5 shadow-lg">

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

                            <router-link :to="{ name: 'app-apartments', params: { apartments: apartments } }"
                                class="btn">
                                Cerca
                            </router-link>


                            <div v-if="store.addressListVisible">
                                <div v-if="apartments && apartments.length === 0">
                                    Nessun risultato
                                </div>
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
</style>