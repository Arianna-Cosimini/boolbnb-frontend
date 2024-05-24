<script>
import axios from 'axios';
import { store } from '../store.js';
import { getCurrentInstance } from 'vue';

export default {
    name: 'MessageForm',
    data() {
        return {
            store,
            apartment: [],
            apartmentSlug: [],
            baseApiMessage: 'http://127.0.0.1:8000/api/',
            formData: {
                name: '',
                surname: '',
                address: '',
                message: '',
            },
        }
    },



    methods: {
        //funzione per mandare il messaggio

        sendMessage() {
            //console.log('rotta : ', this.$router.push('/apartments' + ':' + this.slug) );
            //console.log(this.formData);
            axios.post('http://127.0.0.1:8000/api/new-message', this.formData).then(res => {
                console.log(res);
                this.$router.push('loading-message');
            })
            /*  .catch((error) => {
                 console.error('Errore durante la registrazione:', error);
             }) */
        },

        goBack() {
            this.$router.go(-1);
        },


    },


}
</script>

<template>

    <button class="btn p-0 mt-4 mb-3 rounded-5 ratio-1x1" @click="goBack"><i
            class="fa-solid fa-chevron-left p-3"></i></button>

    <h1 class="fs-4 mb-1">Contatta</h1>
    <p class="thin-text mb-4">Di solito risponde entro un giorno</p>

    <hr style="color: grey;" class="mb-4">


    <form @submit.prevent="sendMessage()">

        <div class="mb-4">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" name="name" v-model="formData.name" required>
        </div>

        <div class="mb-4">
            <label for="surname" class="form-label">Cognome</label>
            <input type="text" class="form-control" id="surname" name="surname" v-model="formData.surname" required>
        </div>

        <div class="mb-4">
            <label for="address" class="form-label">Indirizzo Email</label>
            <input type="email" class="form-control" id="address" name="address" aria-describedby="emailHelp"
                v-model="formData.address" required>
            <div id="emailHelp" class="form-text">La tua mail non sarà condivisa</div>
        </div>
        <div class="mb-4">
            <label for="message">Messaggio</label>
        </div>
        <div class="form-floating mb-4">
            <textarea class="form-control" placeholder="Inserisci il tuo mesaggio" id="message" name="message"
                style="height: 300px" v-model="formData.message" required></textarea>
        </div>

        <button class="my-btn">Invia messaggio <i class="fa-solid fa-paper-plane"></i> </button>

        <!-- <router-link :to="{ name: 'loading-message' }" class="btn my-btn px-4 py-2">Invia
            messaggio</router-link> -->
    </form>

</template>

<style>
.my-btn {
    background-color: #ff385c;
    border: 1px solid #ff385c;
    border-radius: 10px;
    color:white;
    padding: 6px;

    &:hover {
        background-color: white;
        border: 1px solid #ff385c;
        color: #ff385c;
    }
}

.thin-text {
    font-weight: 300;
    color: #6a6a6a;
}
</style>