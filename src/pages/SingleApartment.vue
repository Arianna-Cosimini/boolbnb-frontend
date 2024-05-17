<script>
import axios from 'axios';

export default {
    name: 'SingleApartment',

    data() {
        return {
            apartment: null,
            baseApiHome : "http://127.0.0.1:8000/api"
        }
    },
    mounted(){
        axios.get(this.baseApiHome + '/apartments/casa-tuauol1z33nvv').then(res=> {
            console.log(res.data.apartment);
            this.apartment = res.data.apartment
        })
    }
}
</script>
<template>
    <div class="container my-3">
        <div v-if="apartment"> <!-- v-if per vedere se esitono appartamenti -->

            <h1>{{ apartment.name }}</h1>
            <h2 class="mb-0 fs-4">Appartamento in {{ apartment.address }}</h2>
            <p class="mb-5 d-flex">
                {{ apartment.room_number}}  {{ apartment.room_number == 1 ? 'camera' : 'camere' }} &middot;
                {{ apartment.bed_number }} {{ apartment.bed_number == 1 ? 'letto' : 'letti' }} &middot;
                {{ apartment.bathroom_number }} {{ apartment.bathroom_number == 1 ? 'bagno' : 'bagni' }}
            </p>    
            
        </div>
        
        </div>
</template>

<style lang="scss">
</style>