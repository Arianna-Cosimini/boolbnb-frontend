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

    </template>

</template>

<style lang="scss" scoped></style>
