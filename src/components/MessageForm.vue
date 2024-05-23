<script>
import axios from 'axios';
import { store } from '../store.js';
import { getCurrentInstance } from 'vue';

export default {
    name:'MessageForm',
    data() {
        return {
            store,
            baseApiMessage: 'http://127.0.0.1:8000/api/',
            formData: {
                name:'',
                surname:'',
                address:'',
                message:'',
            },
        }
    },

   

    methods: {
        //funzione per mandare il messaggio

        sendMessage() {
            //console.log('rotta : ', this.$router.push('/apartments' + ':' + this.slug) );
            //console.log(this.formData);
            axios.post('http://127.0.0.1:8000/api/new-message' ,this.formData).then(res => {
                console.log(res);
            })
           /*  .catch((error) => {
                console.error('Errore durante la registrazione:', error);
            }) */
        }

        
    }
    
}
</script>

<template>
    
    <form @submit.prevent="sendMessage()">

        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" name="name" v-model="formData.name">
        </div>
        
        <div class="mb-3">
            <label for="surname" class="form-label">Cognome</label>
            <input type="text" class="form-control" id="surname" name="surname" v-model="formData.surname">
        </div>
        
        <div class="mb-3">
            <label for="address" class="form-label">Indirizzo Email</label>
            <input type="email" class="form-control" id="address" name="address" aria-describedby="emailHelp" v-model="formData.address">
            <div id="emailHelp" class="form-text">La tua mail non sarà condivisa</div>
        </div>
        <div class="mb-3">
            <label for="message">Messaggio</label>
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Inserisci il tuo mesaggio" id="message" name="message" style="height: 300px" v-model="formData.message"></textarea>
        </div>

        <router-link :to="{ name: 'loading-message'}" class="btn my-btn px-4 py-2">Invia il messaggio</router-link>
</form>

</template>

<style>
.my-btn {
    background-color: #ff385c;
    color:white

}
</style>