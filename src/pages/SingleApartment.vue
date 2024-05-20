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
            <h1>
                {{ apartment.name }}
            </h1>
            <div class="img-container w-100 mb-4 position-relative">
                <img :src="'http://localhost:8000/storage/' + apartment.cover_image"
                    class=" card-img-top object-fit-cover w-100 overflow-hidden" alt="...">

                <!-- visibility -->
                <div class="visible-banner d-flex justify-content-end mb-0 ">

                    <p v-if="apartment.visible == 1"
                        class="my-visible-pill rounded-5 px-4 rounded-3 p-2 text-black mb-0">
                        Acquistabile
                    </p>
                    <p v-else-if="apartment.visible == 0"
                        class="my-visible-pill rounded-5 px-4 rounded-3 p-2 text-black mb-0">
                        Non Acquistabile
                    </p>

                </div>
            </div>
            <h2 class="mb-0 fs-4">Appartamento in {{ apartment.address }}</h2>
            <p class="mb-5 d-flex">
                {{ apartment.room_number }} {{ apartment.room_number == 1 ? 'camera' : 'camere' }} &middot;
                {{ apartment.bed_number }} {{ apartment.bed_number == 1 ? 'letto' : 'letti' }} &middot;
                {{ apartment.bathroom_number }} {{ apartment.bathroom_number == 1 ? 'bagno' : 'bagni' }}
            </p>
            <div class="mb-4">
                <label class="mb-3 fw-medium fs-4">Cosa troverai</label>
                <div class="row row-cols-1 d-flex gap-3">
                    <div v-for="(service, key) in apartment.services" :key="key" class="d-flex gap-3">
                        <i :class="service.icon" class="fs-5"></i>
                        <span>{{ service.title }}</span>

                    </div>
                    <div v-if:class="{ 'w-100': (key + 1) % 2 == 0 }">

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
    <div class="container">
        <router-link :to="{ name: 'message-me' }">Contattami</router-link>

    </div>

</template>

<style lang="sass" scoped>

</style>