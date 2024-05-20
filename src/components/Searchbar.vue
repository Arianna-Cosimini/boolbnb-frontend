<script>
import { store } from '../store.js';

export default {
    name: 'Searchbar',
    data() {
        return {
            search: null,
            menuAutoComplete: null,
            menuAutoCompleteClass: null,
            ulList: null,
            latitude: null,
            longitude: null,
            lat: '44.4949',  
            lon: '11.3426',  
            radius: 20000  
        };
    },
    mounted() {
        this.search = document.getElementById('address');
        this.menuAutoComplete = document.getElementById('menuAutoComplete');
        this.menuAutoCompleteClass = this.menuAutoComplete.classList;
        this.ulList = document.querySelector('ul.list');
        this.latitude = document.getElementById('latitude');
        this.longitude = document.getElementById('longitude');

        this.search.addEventListener('input', () => {
            this.addRemoveClass();
            if (this.search.value) {
                this.getApiProjects(this.search.value);
            }
        });
        document.addEventListener('click', this.handleDocumentClick);
    },
    methods: {
        addRemoveClass() {
            if (this.search.value === '')
                this.menuAutoCompleteClass.add('d-none');
            else
                this.menuAutoCompleteClass.remove('d-none');
        },
        getApiProjects(address) {
            const keyApi = store.apiKey;  // Recupera la chiave API dallo store 

            if (!keyApi) {
                console.error('Chiave API mancante o non valida');
                return;
            }

            fetch(
                `https://api.tomtom.com/search/2/search/${address}.json?key=${keyApi}&countrySet=IT&limit=5&lat=${this.lat}&lon=${this.lon}&radius=${this.radius}`
            )
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    this.ulList.innerHTML = '';
                    if (data.results) {
                        data.results.forEach((currentValue) => {
                            const li = document.createElement('li');
                            li.append(currentValue.address.freeformAddress);
                            li.addEventListener('click', () => {
                                this.search.value = currentValue.address.freeformAddress;
                                this.menuAutoCompleteClass.add('d-none');
                                const risultatoCorrispondente = data.results.find(result => result.address.freeformAddress === currentValue.address.freeformAddress);
                                if (risultatoCorrispondente) {
                                    this.latitude.value = risultatoCorrispondente.position.lat;
                                    this.longitude.value = risultatoCorrispondente.position.lon;
                                }
                            });
                            this.ulList.appendChild(li);
                        });
                    } else {
                        console.log("Nessun risultato trovato per", address);
                    }
                })
                .catch(error => {
                    console.error('Errore nella richiesta API:', error);
                });
        },
        validateForm() {
            const inputAddress = this.search.value;
            const suggestions = document.querySelectorAll("#menuAutoComplete ul.list li");
            let addressMatched = false;
            suggestions.forEach((suggestion) => {
                if (suggestion.textContent.trim().toLowerCase() === inputAddress.trim().toLowerCase()) {
                    addressMatched = true;
                }
            });
            if (!addressMatched) {
                document.getElementById('address-error').textContent = "L'indirizzo inserito non corrisponde a uno dei suggerimenti.";
                return false;
            } else {
                document.getElementById('address-error').textContent = "";
            }
            return true;
        },
        handleDocumentClick(event) {
            if (!this.menuAutoComplete.contains(event.target)) {
                this.menuAutoCompleteClass.add('d-none');
            }
        }
    }
};
</script>

<template>
    <form @submit.prevent="validateForm">
        <div class="form-floating mb-3 position-relative">
            <input type="text" class="form-control" id="address" name="address" placeholder="Indirizzo" autocomplete="off">
            <span id="address-error" class="text-danger"></span>
            <div id="menuAutoComplete" class="card position-absolute w-100 radius d-none" style="z-index: 1000;">
                <ul class="list"></ul>
            </div>
        </div>
        <div class="d-none">
            <input type="text" id="latitude" name="latitude">
            <input type="text" id="longitude" name="longitude">
        </div>
    </form>
</template>

<style lang="scss" scoped></style>
