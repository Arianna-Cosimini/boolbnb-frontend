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
        <ul v-if="itemsComplete.length > 1">
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

</style>