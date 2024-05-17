<script>
import axios from 'axios';

import { store } from '../store.js';



export default {

    name: 'HomePage',

    components: {



    },


    data() {
        return {

            store,
            apartaments: [],
            apiLinks: [],
            isLoading: false,
            apiPageNumber: 1,

        }
    },

    created() {

    },

    mounted() {

        this.apiCall();
    },


    methods: {

        apiCall() {

            axios.get(this.store.baseApiUrl + '/apartments', {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {

                this.apartments = res.data.results.data;

                this.apiLinks = res.data.results.links;
            })
        },

    }
}
</script>

<template>

    <template>
        <div class="container py-5 ">
            <h1 class="pb-4 text-center fw-bold text-uppercase">Progetti</h1>

            <div v-if="!isLoading" class="row gap-4 justify-content-center">
                <ApartmentItem class="col-auto" v-for="currentApartment in apartments" :project="currentApartment">
                </ApartmentItem>

                <div id="pagination" class="d-flex justify-content-center p-0">

                    <ul class="d-flex gap-2 p-0">

                        <li v-for="link in apiLinks" v-html="link.label" @click="changeApiPage(link.label)"
                            :class="link.label == apiPageNumber ? 'active' : ''">

                        </li>

                    </ul>

                </div>

            </div>
            <div v-else>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        </div>

    </template>

</template>

<style lang="scss" scoped></style>
