
<script>

import { store } from '../store.js';

import axios from 'axios';


export default {

    name: 'ApartmentItem',

    props: {
        apartment: Object,
    },

    data() {
        return {



        }
    },

    created() {

    },

    mounted() {
        console.log('Apartment data:', this.apartment);
    },


    methods: {


    },

}
</script>


<template>



    <div class="col-4 mt-3">

        <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }" class="text-decoration-none">
            <div class="card">
                <!-- controlla immagine -->
                <div class="p-4">
                    <div class="overflow-hidden rounded-4">
                        <img v-if="apartment.cover_image"
                            :src="'http://localhost:8000/storage/' + apartment.cover_image"
                            class="img-fluid rounded-4 my_img_size" alt="...">
                        <img v-else src="/Placeholder.png" class="img-fluid rounded-4 my_img_size" alt="...">
                    </div>
                </div>
                <div class="card-body text-center ">
                    <h5 class="card-title">{{ apartment.name }}</h5>
                    <p class="card-text">{{ apartment.address }}</p>
                </div>
            </div>
        </router-link>


    </div>

</template>

<style lang="scss">
.card {

    cursor: pointer;

    .my_img_size {
        aspect-ratio: 2/1.3;

        &:hover {
            transform: scale(1.1);
        }
    }

    ;

    &:hover {
        background-color: rgba(238, 236, 236, 0.123);
    }

}
</style>
