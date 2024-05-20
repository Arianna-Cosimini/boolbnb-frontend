home page
<script>

import { store } from '../store.js';

import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import Searchbar from '../components/Searchbar.vue';
import AppHeader from '../components/AppHeader.vue';

// import AppApartments from '../pages/AppApartments.vue';



export default {

  name: 'HomePage',

  components: {
    ApartmentItem,
    Searchbar,
    AppHeader
    // AppApartments
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
      lat: '',
      lon: '',
      activeAuto: false,
      lastPage: '',
      totalItems: 0,
      addressFromSearch: '',
      apartments: null,
      userAddress: '',


    }
  },

  mounted() {


    this.apiCall();
  },


  created() {
    this.getApiApartments();
    // this.getApiHome()

  },


  methods: {
    getApiApartments() {
      if (this.autocomplete.length > 0) {
        this.store.lat = this.autocomplete[0].position.lat;
        this.store.lon = this.autocomplete[0].position.lon;
      }

      const address = this.store.address;
      const lat = this.store.lat;
      const lon = this.store.lon;
      const url = `${this.store.baseApiApartments}?address=${address}&lat=${lat}&lon=${lon}`;

      axios.get(url, {
        params: {
          'range': this.store.range,
          'lat': this.store.lat,
          'lon': this.store.lon,
        }
      })
        .then((response) => {
          if (response.data.success) {
            this.apartments = response.data.apartments;
            this.messageChecked = false;
          } else {
            this.messageChecked = true;
          }
        });
    },

    getUserLocation() {
      // Codice per ottenere la posizione geografica dell'utente
      // Ad esempio, puoi usare il navigatore web
      try {
        const position = this.getCurrentPosition();
        this.store.lat = position.coords.latitude;
        this.store.lon = position.coords.longitude;
      } catch (error) {
        console.error('Impossibile ottenere la posizione dell\'utente:', error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },

    filterApartmentsByDistance() {
      // Filtra gli appartamenti in base alla distanza massima consentita (20 km)
      const searchRadius = 20; // Raggio di ricerca di 20 km

      this.apartments = this.apartments.filter(apartment => {
        const distance = this.calculateDistance(this.store.lat, this.store.lon, apartment.position.lat, apartment.position.lon);
        return distance <= searchRadius;
      });
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      // Formula per calcolare la distanza tra due punti su una sfera (Haversine formula)
      const R = 6371; // Raggio medio della Terra in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    apiCall() {
      const url = `${this.store.baseApiHome}apartments`;
      console.log('URL chiamata API:', url);

      axios.get(url, {
        params: {
          page: this.apiPageNumber
        }
      }).then(res => {
        console.log(res)
        this.apartments = res.data.results.data;
        this.totalApartment = res.data.results.total;
        this.itemPage = res.data.results.per_page;
        this.lastPage = res.data.results.last_page;
        this.apiLinks = res.data.results.links;
      })
    },
    changeApiPage(pageNumber) {
      if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {
        this.apiPageNumber--;
      } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < (this.apiLinks.length - 2)) {
        this.apiPageNumber++;
      }

      if (!isNaN(pageNumber)) {
        this.apiPageNumber = pageNumber;
      }

      this.apiCall();
    },
    takeAddress(address) {
      this.activeAuto = false;
      this.store.address = address;
      this.getApiApartments(); // Update apartments based on new address
    },
    applyAddressFilter() {
      this.getApiApartments();
    }
  },

  computed: {

    filteredApartments() {
      if (!this.apartments || this.apartments.length === 0) {
        return [];
      }

      // Filtra gli appartamenti in base all'indirizzo fornito dall'utente
      return this.apartments.filter(apartment => {
        return apartment.address.includes(this.store.address);
      });
    }
  }




}
</script>


<template>

    <AppHeader></AppHeader>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-12 my_mini_jumbo d-flex flex-column align-content-center justify-content-center">
          <h1 class="center-content fs-1">I Nostri Appartamenti</h1>
        </div>
      </div>
    </div>



    <div class="container-fluid text-center mt-5">

      <div class="row px-5">
        <div v-for="apartment in apartments" class="col-2 mt-3 px-1">
          <div class="p-2">
            <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }"
              class="text-decoration-none">
              <div class="card border-0">
                <!-- controlla immagine -->
                <div class="">
                  <div class="overflow-hidden rounded-4">
                    <img v-if="apartment.cover_image" :src="'http://localhost:8000/storage/' + apartment.cover_image"
                      class="img-fluid rounded-4 my_img_size" alt="...">
                    <img v-else src="/Placeholder.png" class="img-fluid rounded-4 my_img_size" alt="...">
                  </div>
                </div>
                <div class="card-body p-0 pt-3 text-start">
                  <h6 class="card-title fw-medium mb-0">{{ apartment.name }}</h6>
                  <p class="text-black-50 mb-0">Nome host: {{ apartment.user.name }} {{ apartment.user.surname }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <template v-if="filteredApartments.length > 0">
            <ApartmentItem v-for="apartment in filteredApartments" :key="apartment.id" :apartment="apartment" />
          </template>
          <template v-else>
            <p>{{ message }}</p>
          </template>
        </div>
      </div>

      <nav class="button-nav d-flex justify-content-center">
        <vue-awesome-paginate :total-items="totalApartment" :items-per-page="itemPage" :max-pages-shown="lastPage"
          v-model="apiPageNumber" :on-click="changeApiPage" active-page-class="active-page"
          paginate-buttons-class="paginate-buttons" />
      </nav>
    </div>



</template>


<style lang="scss">
.my_mini_jumbo {
  height: 60vh;
}

.my_mini_jumbo {
  height: 60vh;
}

.button-nav {
  .button-nav {

    margin-top: 100px;
    padding-top: 20px;
    border-top: solid 1px gray;

    .pagination-container {
      display: flex;
      column-gap: 10px;
    }

    .paginate-buttons {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      cursor: pointer;
      background-color: rgba($color: #d6d6d6d6, $alpha: 0.3);
      border: 1px solid rgb(255, 255, 255);
      color: rgb(255, 255, 255);
    }

    .paginate-buttons:hover {
      background-color: #d8d8d8;
    }

    .active-page {
      background-color: #3498db;
      border: 1px solid #3498db;
      color: white;
    }

    .active-page:hover {
      background-color: #2988c8;
    }

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
