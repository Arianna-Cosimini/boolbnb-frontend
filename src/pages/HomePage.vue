<script>
import { store } from '../store.js';
import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import Searchbar from '../components/Searchbar.vue';
import AppHeader from '../components/AppHeader.vue';

export default {
  name: 'HomePage',
  components: {
    ApartmentItem,
    Searchbar,
    AppHeader
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
      userAddress: '',
    }
  },
  mounted() {
    this.apiCall();
  },
  methods: {


    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Raggio medio della Terra in chilometri
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distanza in chilometri
      return distance;
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    getApiApartments(pageNumber = 1, apartments = []) {
      const { address, lat, lon } = this.store;
      const url = `${this.store.baseApiApartments}?address=${address}&lat=${lat}&lon=${lon}`;

      axios.get(url, {
        params: {
          'range': 20000, // Imposta la distanza massima a 20 km
          'lat': lat,
          'lon': lon,
          'page': pageNumber
        }
      })
        .then((response) => {
          if (response.data.success) {
            // Filtra gli appartamenti in base alla distanza massima
            const filteredApartments = response.data.apartments.filter(apartment => {
              // Calcola la distanza tra l'appartamento e l'indirizzo inserito
              const distance = this.calculateDistance(lat, lon, apartment.latitude, apartment.longitude);
              return distance <= this.store.range;// Filtra gli appartamenti entro 20 km
            });

            apartments = apartments.concat(filteredApartments);
            if (pageNumber < response.data.last_page) {
              this.getApiApartments(pageNumber + 1, apartments);
            } else {
              this.apartments = apartments;
              this.messageChecked = false;
            }
          } else {
            this.messageChecked = true;
          }
        });
    },
    apiCall(pageNumber = 1, apartments = []) {
      const url = `${this.store.baseApiHome}apartments`;
      axios.get(url, {
        params: {
          page: pageNumber
        }
      }).then(res => {
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
      if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {
        this.apiPageNumber--;
      } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < this.lastPage) {
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
      this.getApiApartments();
    },
    applyAddressFilter() {
      this.getApiApartments();
    },
    handleAddressSelected({ address, lat, lon }) {
      this.store.address = address;
      this.store.lat = lat;
      this.store.lon = lon;
      this.getApiApartments();
    }
  },
  computed: {
    filteredApartments() {
      if (!this.apartments || this.apartments.length === 0) {
        return [];
      }
      return this.apartments.filter(apartment => {
        return apartment.address.includes(this.store.address);
      });
    }
  }
}
</script>

<template>
  <div>
    <AppHeader @address-selected="handleAddressSelected"></AppHeader>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-12 my_mini_jumbo d-flex flex-column align-content-center justify-content-center">
          <h1 class="center-content fs-1">I Nostri Appartamenti</h1>
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

.card {
  cursor: pointer;

  .my_img_size {
    aspect-ratio: 2/1.3;

    &:hover {
      transform: scale(1.1);
    }
  }

  &:hover {
    background-color: rgba(238, 236, 236, 0.123);
  }
}
</style>
