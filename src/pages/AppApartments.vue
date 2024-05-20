<script>
import { store } from '../store.js';
import ApartmentItem from '../components/ApartmentItem.vue';

export default {
    name: 'AppApartments',
    
    data() {
        return {
            store,
        }
    },
    components: {
        ApartmentItem,
    },
    methods: {


    }
}
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
            <ApartmentItem v-for="currentApartment in apartments" :apartment="currentApartment"
                :key="currentApartment.id">
            </ApartmentItem>
        </template>
        <template v-else>
            <p>Nessun risultato</p>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>