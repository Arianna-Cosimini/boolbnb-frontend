<script>
import { store } from '../store.js';
export default {
    name: 'Searchbar',
    data() {
        return {
            store,
        }
    },
    props: {
        itemsComplete: Array
    },
    methods: {

        giveAddress(address, lat, lon) {
            this.store.address = address;
            this.store.lat = lat;
            this.store.lon = lon;
            this.store.addressListVisible = false;

        }
    }
}
</script>

<template>
    <div>
        <ul v-if="itemsComplete.length > 1" class="list list-unstyled">
            <!-- al click figlio  -->
            <li class="p-3" v-for="search, index in itemsComplete"
                @click="giveAddress(search.address.freeformAddress, search.position.lat, search.position.lon)">
                {{ search.address.freeformAddress }}
            </li>
        </ul>
        <p class="p-3" v-else>
            No data
        </p>
    </div>
</template>

<style lang="scss" scoped>
ul.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

ul.list li {
    padding: 10px;
    background-color: white;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
}

ul.list li:first-child {
    border-radius: 0.375rem 0.375rem 0 0;
}

ul.list li:last-child {
    border-bottom: 0px;
    border-radius: 0 0 0.375rem 0.375rem;
}

ul.list li:hover {
    background-color: #f7f7f7;
}
</style>