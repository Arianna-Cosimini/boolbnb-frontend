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
        <ul v-if="itemsComplete.length > 1" class="list list-unstyled rounded-4 p-3">
            <!-- al click figlio  -->
            <li class="p-3" v-for="search in itemsComplete"
                @click="giveAddress(search.address.freeformAddress, search.position.lat, search.position.lon)">
                <i class="fa-solid fa-location-dot me-3"></i>{{ search.address.freeformAddress }}
            </li>
        </ul>
        <ul class="list list-unstyled rounded-4 p-3 no-data" v-else>
            <li class="p-3 no-data">No data</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
ul.list {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 1050;
}

ul.list li {
    padding: 10px;
    background-color: white;
    cursor: pointer;
    border-radius: 1.5rem
}

.no-data {
    pointer-events: none;
    cursor: default;
}

// ul.list li:first-child {
//     border-radius: 1.5rem 1.5rem 0 0;
// }

// ul.list li:last-child {
//     border-bottom: 0px;
//     border-radius: 0 0 1.5rem 1.5rem;
// }

ul.list li:hover {
    background-color: #f7f7f7;
}
</style>