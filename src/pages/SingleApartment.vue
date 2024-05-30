<script>
import axios from 'axios';
import { store } from '../store.js';
import Map from '../components/Map.vue';


export default {
    name: 'MessageForm',
    components: {
        Map,
    },

    data() {
        return {
            store,
            apartment: [],
            apartmentSlug: [],
            baseApiHome: 'http://127.0.0.1:8000/api',
            showModal: false,
            baseApiMessage: 'http://127.0.0.1:8000/api/',
            formData: {
                name: '',
                surname: '',
                address: '',
                message: '',
            },
            loading: false, // Variabile di stato per il loader
        }
    },

    mounted() {
        this.apartmentSlug = this.$route.params.slug;
        axios.get(this.baseApiHome + '/apartments/' + this.apartmentSlug).then(res => {
            if (res.data.apartment) {
                this.apartment = res.data.apartment;
            } else {
                this.$router.push({ name: 'home' });
            }
        });

        axios.get("https://api.ipify.org?format=json").then(res => {
            let ipAddress = res.data.ip;
            axios.post("http://127.0.0.1:8000/api/views", {
                apartment_id: this.apartment.id,
                ip_address: ipAddress,
            }).then(res => {
                console.log(res.data);
            })
        });
    },

    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },

        sendMessage() {
            this.loading = true; // Attiva il loader prima di inviare il messaggio

            const messageData = {
                ...this.formData,
                apartment_id: this.apartment?.id || null,
            };
            axios.post(this.baseApiMessage + 'new-message', messageData)
                .then(res => {
                    console.log(res);
                    this.$router.push({ name: 'loading-message' });
                })
                .catch((error) => {
                    console.error('Errore durante l\'invio del messaggio:', error);
                })
                .finally(() => {
                    this.loading = false; // Disattiva il loader dopo aver ricevuto la risposta o l'errore
                });
        }
    },

    computed: {
        distance() {
            return parseFloat(this.apartment.distance) || 0;
        },
        roundedDistance() {
            return this.distance.toFixed(1);
        }
    }
}
</script>


<template>
    <div class="container py-5" style="margin-bottom: 50px;">
        <div v-if="apartment">
            <h1 class="fs-3 mb-4">
                {{ apartment.name }}
            </h1>
            <div class="img-container w-100 mb-4 position-relative">
                <img :src="'http://localhost:8000/storage/' + apartment.cover_image"
                    class="card-img-top object-fit-cover w-100 rounded-3 overflow-hidden" alt="...">
            </div>
            <h2 class="mb-0 fs-4">Appartamento in {{ apartment.address }}</h2>
            <p class="mb-1 d-flex">
                {{ apartment.room_number }} {{ apartment.room_number == 1 ? 'camera' : 'camere' }} &middot;
                {{ apartment.bed_number }} {{ apartment.bed_number == 1 ? 'letto' : 'letti' }} &middot;
                {{ apartment.bathroom_number }} {{ apartment.bathroom_number == 1 ? 'bagno' : 'bagni' }}
            </p>
            <div class="d-flex justify-content-between">
                <div class="reviews mb-4 d-flex align-items-baseline">
                    <i class="fa-solid fa-star me-1"></i>
                    <span class="text-reviews mb-0">Ancora nessuna recensione</span>
                </div>
                <div>
                    <p>
                        {{ roundedDistance }} Km dal centro
                    </p>
                </div>
            </div>

            <hr class="mb-4">

            <!-- Dati Host -->
            <div class="host mb-4 d-flex align-items-center gap-3" v-if="apartment.user">
                <div class="host-img-container">
                    <img src="https://placehold.co/40x40" alt="">
                </div>
                <div class="host-text">
                    <p class="host-name mb-0">Nome dell'host: {{ apartment.user.name }} {{ apartment.user.surname }}</p>
                    <p class="host-exp mb-0">16 anni di esperienza come host</p>
                </div>
            </div>

            <hr class="mb-5">

            <!-- Descrizione -->
            <p class="service-title mb-5 col-12 col-md-6">{{ apartment.description }}</p>

            <hr class="mb-3">

            <!-- Servizi -->
            <div class="mb-4">
                <p class="mb-3 fw-medium fs-4">Cosa troverai</p>
                <div class="row d-flex gap-3">
                    <div v-for="(service, key) in apartment.services" :key="key"
                        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap-3 flex-wrap align-items-center">
                        <img :src="service.icon" class="service-icon fs-5"></img>
                        <span class="service-title">{{ service.title }} </span>
                    </div>
                </div>
            </div>

            <hr class="mb-3">

            <div class="row">
                <div class="col mb-4">
                    <h5 id="dovetitroverai" class="mb-3 fw-medium fs-4">Dove sarai</h5>
                    <p class="mb-3" style="font-weight: 300;">{{ apartment.address }}</p>
                    <!-- !! MAPPA !! -->
                    <div class="mb-3" v-if="apartment.latitude != null && apartment.longitude != null">

                        <Map :apiKey="store.apiKey" :lat="apartment.latitude" :long="apartment.longitude"></Map>
                    </div>
                    <p class="mb-0" style="font-weight: 300;">Abbiamo verificato l'accuratezza della posizione di questo
                        alloggio.</p>
                </div>
            </div>

            <hr class="mb-3">

            <!-- Contatto dell'Host -->
            <div class="container host-info mb-5">
                <p class="mb-3 fw-medium fs-4">Informazioni sull'Host</p>
                <div class="row info-container rounded-4 p-4">
                    <h3 class="host-details fs-5">Dettagli dell'host</h3>
                    <div class="col-12 col-md-6">
                        <p class="service-title">Lingue: olandese, inglese, francese, tedesco e italiano</p>
                        <button @click="openModal" class="my-black-btn btn mb-4 mb-md-0 px-4 py-2">Invia un messaggio
                            all'host</button>
                    </div>
                    <div class="col-12 col-md-6">
                        <p class="service-title mb-0">Tasso di risposta: 93%</p>
                        <p class="service-title mb-3">Risponde entro un giorno</p>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal" :class="{ 'is-active': showModal }">
                <div class="modal-background" @click="closeModal"></div>
                <div class="modal-content container rounded-4 p-0" style="max-width: 780px;">
                    <div
                        class="modal-header text-center d-flex justify-content-center align-items-center position-relative">
                        <h6 class="fw-semibold mb-0">Contatta Host</h6>
                        <button type="button" class="btn border-0 position-absolute" style="right: 12px;"
                            @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                    </div>

                    <div class="modal-body container mt-2 px-4 pb-4 overflow-y-auto" style="max-height: 70vh;">
                        <form @submit.prevent="sendMessage()">
                            <div class="mb-4">
                                <label for="name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="name" v-model="formData.name" required>
                            </div>

                            <div class="mb-4">
                                <label for="surname" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="surname" v-model="formData.surname"
                                    required>
                            </div>

                            <div class="mb-4">
                                <label for="address" class="form-label">Indirizzo Email</label>
                                <input type="email" class="form-control" id="address" v-model="formData.address"
                                    required>
                            </div>
                            <div class="form-label">
                                <label for="message">Messaggio</label>
                            </div>
                            <div class="form-floating mb-4">
                                <textarea class="form-control" placeholder="Inserisci il tuo messaggio" id="message"
                                    style="height: 300px" v-model="formData.message" required></textarea>
                            </div>

                            <button class="btn btn-danger my-btn px-3">Invia messaggio <i
                                    class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loader Overlay -->
        <div v-show="loading" id="loader-overlay"
            style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.5); z-index: 9999;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div class="spinner"></div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.card-img-top {
    height: 600px;
}

.reviews {
    font-size: 17px;
    font-weight: 300;
}

.host-name {
    font-weight: 500;
}

.host-exp {
    font-size: 14px;
    color: #8a8a8a;
    font-weight: 300;
}

.service-title {
    font-weight: 300;
}

.service-icon {
    width: 40px;
}

.info-container {
    background-color: #F0EFE9;
}

.host-details {
    font-weight: 500;
}

.my-black-btn {
    background-color: #222;
    color: white;
    font-size: 16px;

    &:hover {
        background-color: black;
    }
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
}

.modal-content {
    position: relative;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
}

.spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.my-btn {
    background-color: #222;
    border: 1px solid #222;
    border-radius: 10px;
    color: white;
    padding: 6px;

    &:hover {
        background-color: black;
        border: 1px solid black;
        color: white;
    }
}

.thin-text {
    font-weight: 300;
    color: #6a6a6a;
}
</style>
