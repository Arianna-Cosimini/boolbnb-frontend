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
        // console.log('Apartment data:', this.apartment);
    },


    methods: {
        openInNewTab(slug) {
            const url = this.$router.resolve({ name: 'single-apartment', params: { slug } }).href;
            window.open(url, '_blank');
        }

    },

}
</script>


<template>



    <div class="col-2 mt-3 px-1" :class="['apartment-item', { 'sponsored': apartment.sponsorships }]">

        <div class="p-2">
            <a href="#" @click.prevent="openInNewTab(apartment.slug)" class="text-decoration-none">
                <div class="card border-0">
                    <!-- controlla immagine -->
                    <div>
                        <div class="overflow-hidden rounded-4 position-relative">
                            <img v-if="apartment.cover_image"
                                :src="'http://localhost:8000/storage/' + apartment.cover_image"
                                class="img-fluid rounded-4 my_img_size" alt="...">
                            <img v-else src="/Placeholder.png" class="img-fluid rounded-4 my_img_size" alt="...">
                            <div class="sponsored-label d-none"><i class="fa-solid fa-rocket me-2"></i>sponsorizzato
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0 pt-3 text-start">
                        <h6 class="card-title fw-medium mb-0">{{ apartment.name }}</h6>
                        <p class="text-black-50 mb-0">{{ apartment.address }}</p>
                        <span class="me-1" style="font-size: 14px;">
                            {{ apartment.room_number }} {{ apartment.room_number === 1 ? 'stanza' : 'stanze' }}
                        </span>
                        <span class="m-0 ">&middot;</span>
                        <span class="ms-1" style="font-size: 14px;">
                            {{ apartment.bed_number }} {{ apartment.bed_number === 1 ? 'letto' : 'letti' }}
                        </span>
                    </div>

                </div>
            </a>
        </div>

    </div>

</template>

<style lang="scss" scoped>
.card {

    cursor: pointer;

    .my_img_size {
        width: 100%;
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
        font-size: 15px;
    }
}



.sponsored .sponsored-label {
    display: block !important;
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 12px 4px 8px;
    border-radius: 50px;
    color: white;
    background-color: #FF385C;
    font-size: 14px;
}
</style>
