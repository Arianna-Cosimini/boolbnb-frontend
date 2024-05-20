appapartments

<script>
import { store } from '../store.js';
import ApartmentItem from '../components/ApartmentItem.vue';

export default {
    name: 'AppApartments',

    props: {
        apartments: Array,
    },

    data() {
        return {
            store,

        }
    },
    components: {
        ApartmentItem,

    },
    methods: {


    },
    computed: {
        filteredApartments() {
            if (!this.apartments || this.apartments.length === 0) {
                return [];
            }

            const userAddress = this.store.address; // Ottieni l'indirizzo fornito dall'utente

            return this.apartments.filter((apartment) => {
                // Filtra gli appartamenti in base all'indirizzo fornito dall'utente
                return apartment.address.toLowerCase().includes(userAddress.toLowerCase());
            });
        }
    },

    // ...
};
</script>

<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-md-12 my_mini_jumbo d-flex flex-column align-content-center justify-content-center">
                <h1 class="center-content fs-1">I Nostri Appartamenti</h1>
            </div>
        </div>
    </div>

    <div class="row">
        <template v-if="apartments && apartments.length > 0">
            <ApartmentItem v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
        </template>
        <template v-else>
            <p>Nessun risultato</p>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>