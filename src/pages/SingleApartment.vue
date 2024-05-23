<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'SingleApartment',

    data() {
        return {
            store,
            apartment: [],
            apartmentSlug: [],
            baseApiHome: 'http://127.0.0.1:8000/api',


        }
    },

    mounted() {
        // serach the id from the url
        // console.log(this.$route.params.slug)
        // save the id in a variable
        this.apartmentSlug = this.$route.params.slug
        axios.get(this.baseApiHome + '/apartments/' + this.apartmentSlug).then(res => {
            //console.log(res);

            if (res.data.apartment) {

                this.apartment = res.data.apartment;
            } else {
                this.$router.push({ name: 'home' })
            }
        })
    }
}
</script>

<template>
    <div class="container py-5">

        <div v-if="apartment">
            <h1 class="fs-3 mb-4">
                {{ apartment.name }}
            </h1>
            <div class="img-container w-100 mb-4 position-relative">
                <img :src="'http://localhost:8000/storage/' + apartment.cover_image"
                    class=" card-img-top object-fit-cover w-100 rounded-3 overflow-hidden" alt="...">

            </div>
            <h2 class="mb-0 fs-4">Appartamento in {{ apartment.address }}</h2>
            <p class="mb-1 d-flex">
                {{ apartment.room_number }} {{ apartment.room_number == 1 ? 'camera' : 'camere' }} &middot;
                {{ apartment.bed_number }} {{ apartment.bed_number == 1 ? 'letto' : 'letti' }} &middot;
                {{ apartment.bathroom_number }} {{ apartment.bathroom_number == 1 ? 'bagno' : 'bagni' }}
            </p>
            <div class="reviews mb-4 d-flex align-items-baseline">
                <i class="fa-solid fa-star me-1"></i>
                <span class="text-reviews mb-0">Ancora nessuna recensione</span>
            </div>

            <hr class="mb-4">




            <!-- Dati Host -->
            <div class="host mb-4 d-flex align-items-center gap-3" v-if="apartment.user">
                <div class="host-img-container">
                    <img src="https://placehold.co/40x40" alt="">
                </div>
                <div class="host-text">
                    <p class="host-name mb-0">Nome dell'host: {{ apartment.user.name }} {{ apartment.user.surname
                        }}</p>
                    <p class="host-exp mb-0">16 anni di esperienza come host</p>
                </div>
            </div>

            <hr class="mb-5">

            <!-- Descrizione -->
            <p class="service-title mb-5 col-6">{{ apartment.description }}</p>

            <hr class="mb-4">

            <!-- Servizi -->
            <div class="mb-4">
                <p class="mb-3 fw-medium fs-4">Cosa troverai</p>
                <div class="row d-flex gap-3">
                    <div v-for="(service, key) in apartment.services" :key="key"
                        class="col-3 d-flex flex-wrap gap-3 align-items-center">
                        <img :src="service.icon" class="service-icon fs-5"></img>
                        <span class="service-title">{{ service.title }} </span>

                    </div>
                    <div v-if:class="{ 'w-100': (key + 1) % 2 == 0 }">

                    </div>
                </div>
            </div>

            <hr class="mb-4">

            <!-- Contatto dell'Host' -->
            <div class="host-info mb-5">
                <p class="mb-3 fw-medium fs-4">Informazioni sull'Host</p>
                <div class="row info-container rounded-4 p-4">
                    <h3 class="host-details fs-5">Dettagli dell'host</h3>
                    <div class="col-6">
                        <p class="service-title">Lingue: olandese, inglese, francese, tedesco e italiano</p>
                        <router-link :to="{ name: 'message-me' }" class="my-black-btn btn px-4 py-2">Invia un messaggio
                            all'host</router-link>
                    </div>
                    <div class="col-6">
                        <p class="service-title mb-0">Tasso di risposta: 93%</p>
                        <p class="service-title mb-3">Risponde entro un giorno</p>
                    </div>

                </div>
            </div>


        </div>
        <div v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped>
.card-img-top {
    height: 600px;
}

.reviews {
    font-size: 17px;
    font-weight: 300;
}

.host-name {
    font-weight: 500;
}

.host-exp {
    font-size: 14px;
    color: #8a8a8a;
    font-weight: 300;
}

.service-title {
    font-weight: 300;
}

.service-icon {
    width: 40px;
}

.info-container {
    background-color: #F0EFE9;
}

.host-details {
    font-weight: 500;
}

.my-black-btn {
    background-color: #222;
    color: white;
    font-size: 16px;

    &:hover {
        background-color: black;
    }
}
</style>