<script>
import { store } from '../store.js';
import axios from 'axios';

import AppHeader from '../components/AppHeader.vue';
import ApartmentItem from '../components/ApartmentItem.vue';


export default {
  name: 'HomePage',
  components: {
    AppHeader,
    ApartmentItem,
  },
  data() {
    return {
        store,
        apartment: {},
        apartments: [],
        filteredApartments: [],
        apiLinks: [],
        apiPageNumber: 1,
        message: 'Non ci sono appartamenti da visualizzare',
        query: '',
        currentPage: 1,
        per_page: 1,
        last_page: 1,
        total_items: 1,
    }
  },
  mounted() {
    this.getApartments();
  },
  methods: {
      changeApiPage(pageNumber) {
          if (pageNumber === "&laquo; Previous" && this.currentPage > 1) {
              this.currentPage--;
          } else if (pageNumber === "Next &raquo;" && this.currentPage < this.last_page) {
              this.currentPage++;
          }

          this.apiPageNumber = this.currentPage;
          this.getApartments();
      },

        getApartments() {
            // Definisci la variabile params
            const params = {
                page: this.apiPageNumber
            };

            console.log('Parametri della richiesta:', params); // Stampa i parametri della richiesta


            const url = `http://127.0.0.1:8000/api/apartments`;


            axios.get(url, { params })
                .then(res => {
                    this.apartments = res.data.results.data;
                    this.services = res.data.services;
                    this.apiLinks = res.data.results.links;
                    this.total_items = res.data.results.total;
                    this.per_page = res.data.results.per_page;
                    this.last_page = res.data.results.last_page;
                    console.log('Appartamenti ottenuti:', this.apartments);

                    this.filteredApartments = this.apartments.filter(apartment =>
                        this.apartments.some(filteredApartment => filteredApartment.id === apartment.id)
                    );

                })
                .catch((error) => {
                    console.error('Errore durante la ricerca degli appartamenti:', error);
                    this.message = 'Errore durante la ricerca degli appartamenti.';
                });
        },
  },
  computed: {
    shouldShowPagination() {
            return this.total_items > this.per_page;
        }
  }
}
</script>

<template>
  <div class="jumbotron">
    <AppHeader></AppHeader>
    <div class="container mt-5">
      <h1 class="text-white display-1 py-5">Dove inizia la tua<br> prossima avventura</h1>
      <a href="" class="my-white-btn btn btn-lg px-4">Parti ora</a>
    </div>
  </div>

    <div v-if="filteredApartments.length > 0">
      <div class="mb-5 pb-5">
        <div class="sponsored-apartments container-fluid p-5">
      <h2 class="fs-2">
        In evidenza
      </h2>
    </div>
  
    <div class="container-fluid text-center">
      <div class="row px-5">
            <ApartmentItem v-for="apartment in filteredApartments" :key="apartment.id" :apartment="apartment" />
      </div>
    </div>
  
      <nav v-if="shouldShowPagination" class="button-nav d-flex justify-content-center" style="margin-bottom: 100px;">
          <vue-awesome-paginate :total-items="total_items" :items-per-page="per_page" :max-pages-shown="last_page"
              v-model="currentPage" :on-click="changeApiPage" active-page-class="active-page"
              paginate-buttons-class="paginate-buttons" />
      </nav>
      </div>
    </div>
    <div v-else></div>
</template>

<style lang="scss">


.jumbotron {
  height: 600px;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;

  h1 {
    line-height: 100%;
  }

  .my-white-btn {
    background-color: white !important;

    &:hover {
      color: white !important;
      background-color: black !important;
    }
  }
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
</style>
