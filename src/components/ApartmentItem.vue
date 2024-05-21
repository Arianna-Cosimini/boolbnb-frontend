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



    <div class="col-2 mt-3 px-1">

        <div class="p-2">
            <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }"
                class="text-decoration-none">
                <div class="card border-0">
                    <!-- controlla immagine -->
                    <div>
                        <div class="overflow-hidden rounded-4">
                            <img v-if="apartment.cover_image"
                                :src="'http://localhost:8000/storage/' + apartment.cover_image"
                                class="img-fluid rounded-4 my_img_size" alt="...">
                            <img v-else src="/Placeholder.png" class="img-fluid rounded-4 my_img_size" alt="...">
                        </div>
                    </div>
                    <div class="card-body p-0 pt-3 text-start">
                        <h5 class="card-title fw-medium mb-0">{{ apartment.name }}</h5>
                        <p class="text-black-50 mb-0">{{ apartment.address }}</p>
                    </div>
                </div>
            </router-link>
        </div>

    </div>

</template>

<style lang="scss">
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
