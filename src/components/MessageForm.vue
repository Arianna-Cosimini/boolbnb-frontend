<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'MessageForm',
    data() {
        return {
            // store,
            // apartment: [],
            // apartmentSlug: [],
            // baseApiMessage: 'http://127.0.0.1:8000/api/',
            // formData: {
            //     name: '',
            //     surname: '',
            //     address: '',
            //     message: '',
            // },
            // loading: false, // Variabile di stato per il loader
        }
    },

    // methods: {
    //     // Funzione per mandare il messaggio
    //     sendMessage() {
          

    //         const messageData = {
    //             ...this.formData,
    //             apartment_id: this.apartment?.id || null,
    //         };

    //         axios.post(this.baseApiMessage + 'new-message', messageData)
    //             .then(res => {
    //                 console.log(res);
    //                 // Esegui azioni aggiuntive se necessario
    //             })
    //             .catch(error => {
    //                 console.error('Errore durante la registrazione:', error);
    //             })
    //             .finally(() => {
    //                 this.loading = false; // Disattiva il loader dopo aver ricevuto la risposta o l'errore
    //             });
    //     }
    // }
}
</script>



<template>
    <!-- <div>
        <button class="btn p-0 mt-4 mb-3 rounded-5 ratio-1x1" @click="goBack">
            <i class="fa-solid fa-chevron-left p-3"></i>
        </button>

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
            </div>

            <div class="mb-4">
                <label for="message">Messaggio</label>
            </div>

            <div class="form-floating mb-4">
                <textarea class="form-control" placeholder="Inserisci il tuo messaggio" id="message" name="message"
                    style="height: 300px" v-model="formData.message" required></textarea>
            </div>

            <button class="btn btn-danger my-btn px-3">Invia messaggio <i class="fa-solid fa-paper-plane"></i></button>
        </form>

    </div> -->
</template>

<style lang="scss">


</style>
