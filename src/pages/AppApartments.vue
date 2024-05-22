<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import AppHeader from '../components/AppHeader.vue';
import Categories from '../components/Categories.vue';

export default {
    name: 'HomePage',
    components: {
        ApartmentItem,
        AppHeader,
        Categories,
    },
    data() {
        return {
            store,
            apartment: {},
            apartments: [],
            apiLinks: [],
            apiPageNumber: 1,
            message: 'Non ci sono appartamenti da visualizzare',
            query: '',
            autocomplete: [],
            address: '',
            activeAuto: false,
            lastPage: '',
            totalItems: 0,
            addressFromSearch: '',
            userAddress: '',
            roomsValue: 0,
            bathsValue: 0,
        };
    },
    mounted() {
        this.apiCall();
        console.log('Initial apartments data:', this.apartments);
    },
    methods: {
        getApiApartments() {
            const url = `${this.store.baseApiApartments}?range=${this.store.range}&lat=${this.store.lat}&lon=${this.store.lon}`;

            axios
                .get(url, {
                })
                .then((response) => {
                    if (response.data.success) {
                        this.apartments = response.data.apartments.data;
                        console.log('Ricevuto dati con successo:', this.apartments);
                    } else {
                        console.error('Error in API response:', response.data);
                        this.message; 
                    }
                })
                .catch((error) => {
                    console.error('Error during API call:', error);
                    
                });
        },
        apiCall(pageNumber = 1, apartments = []) {
            const url = `${this.store.baseApiHome}apartments`;
            axios
                .get(url, {
                    params: {
                        page: pageNumber,
                    },
                })
                .then((res) => {
                    apartments = apartments.concat(res.data.results.data);
                    if (pageNumber < res.data.results.last_page) {
                        this.apiCall(pageNumber + 1, apartments);
                    } else {
                        this.apartments = apartments;
                        this.totalApartment = apartments.length;
                        this.lastPage = res.data.results.last_page;
                    }
                });
        },
        changeApiPage(pageNumber) {
            if (pageNumber == '&laquo; Previous' && this.apiPageNumber > 1) {
                this.apiPageNumber--;
            } else if (pageNumber == 'Next &raquo;' && this.apiPageNumber < this.lastPage) {
                this.apiPageNumber++;
            }

            if (!isNaN(pageNumber)) {
                this.apiPageNumber = pageNumber;
            }

            this.apiCall();
        },
    },
    computed: {
        filteredApartments() {
            if (!this.apartments || this.apartments.length === 0) {
                console.log('No apartment data available.');
                return [];
            }


            let filteredApartments = this.apartments;
            return filteredApartments;
        },
    },
};


</script>

<template>
    <AppHeader></AppHeader>
    <Categories></Categories>
    <div class="container">
        <div class="mb-3">
            <label for="rooms" class="form-label">Camere</label>
            <select class="form-select cursor_pointer" aria-label="Default select example" v-model="roomsValue">
                <option selected value="0">Scegli...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="bathrooms" class="form-label">Bagni</label>
            <select class="form-select cursor_pointer" aria-label="Default select example" v-model="bathsValue">
                <option selected value="0">Scegli...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    </div>
    <div class="container-fluid text-center mt-5">
        <div class="row px-5">
            <template v-if="filteredApartments.length > 0">
                <ApartmentItem v-for="apartment in filteredApartments" :key="apartment.id" :apartment="apartment" />
            </template>
            <template v-else>
                <p>{{ message }}</p>
            </template>
        </div>
    </div>

    <nav class="button-nav d-flex justify-content-center mb-5">
        <vue-awesome-paginate :total-items="totalApartment" :items-per-page="itemPage" :max-pages-shown="lastPage"
            v-model="apiPageNumber" :on-click="changeApiPage" active-page-class="active-page"
            paginate-buttons-class="paginate-buttons" />
    </nav>
</template>

<style lang="scss">
.my_mini_jumbo {
    height: 60vh;
}

.button-nav {

    margin-top: 20px;
    padding-top: 20px;

    .pagination-container {
        display: flex;
        column-gap: 10px;
    }

    .paginate-buttons {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid rgb(255, 255, 255);
        color: rgb(0, 0, 0);
    }

    .paginate-buttons:hover {
        background-color: #f7f7f7;
    }

    .active-page {
        background-color: black;
        border: 1px solid black;
        color: white;
        pointer-events: none;
    }

    .active-page:hover {
        background-color: black;
    }

}

.card {

    cursor: pointer;

    .my_img_size {
        aspect-ratio: 1;
        object-fit: cover;

        &:hover {
            transform: scale(1.1);
            transition: .3s ease;
        }

        &:not(:hover) {
            transform: scale(1);
            transition: .3s ease;
        }
    }

    ;

    .card-title,
    .card-body p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


}
</style>