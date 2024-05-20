<script>
import axios from 'axios';

export default {
    name:'SingleApartment',

    data() {
        return {
            apartment : [],
            apartmentSlug : [],
            baseApiHome : 'http://127.0.0.1:8000/api',

            


        }
    },

    mounted() {
        // serach the id from the url
            // console.log(this.$route.params.slug)
        // save the id in a variable
        this.apartmentSlug = this.$route.params.slug
        axios.get(this.baseApiHome + '/apartments/' + this.apartmentSlug ).then(res =>{
            //console.log(res);

            if(res.data.apartment){

                this.apartment = res.data.apartment;
            }else{
                this.$router.push({name: 'home'})
            }
        })
    }
}
</script>

<template>
    <div class="container py-5">

        <div v-if="apartment">
            <h1>
                {{ apartment.name }}
            </h1>
            <img :src=" 'http://localhost:8000/storage/'  + apartment.cover_image " class=" card-img-top object-fit-cover w-100 overflow-hidden" alt="...">
            <h2 class="mb-0 fs-4">Appartamento in {{ apartment.address }}</h2>
            <p class="mb-5 d-flex">
                {{ apartment.room_number}}  {{ apartment.room_number == 1 ? 'camera' : 'camere' }} &middot;
                {{ apartment.bed_number }} {{ apartment.bed_number == 1 ? 'letto' : 'letti' }} &middot;
                {{ apartment.bathroom_number }} {{ apartment.bathroom_number == 1 ? 'bagno' : 'bagni' }}
            </p>  
        </div>
        <div v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>
</template> 

<style lang="sass" scoped>
</style>