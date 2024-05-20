<script>

import { store } from '../store.js';

import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';
import Searchbar from '../components/Searchbar.vue';


export default {

  name: 'HomePage',

  components: {
    ApartmentItem,
    Searchbar,
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


    }
  },

  mounted() {

    this.apiCall();
  },


  methods: {

    getApiAddresses() {
      axios
        .get(`https://api.tomtom.com/search/2/search/${this.store.address}.json`, {
          params: {
            'key': 'RrNofIXHXhCLSto2sM1SEfvmA1AamCSs',
            'countrySet': 'IT',
            'lat': '44.4949',
            'lon': '11.3426',
            'radius': '20000',
            'limit': '5',
          }
        })
        .then(response => {
          this.autocomplete = response.data.results;
        });
    },

    getApiApartments() {
      if (this.autocomplete == '') {
      }
      else {
        this.store.lat = this.autocomplete[0].position.lat;
        this.store.lon = this.autocomplete[0].position.lon;
      }
      axios
        .get(store.baseApiApartments, {
          params: {
            'range': this.store.range,
            'lat': this.store.lat,
            'lon': this.store.lon,
          }
        })
        .then((response) => {

          if (response.data.success == true) {
            this.apartments = response.data.apartments;
            this.messageChecked = false;
            // //  pagination
            // this.numPages = response.data.apartments.last_page;
            // this.store.filteredMap = false;
            // this.cancelAddress();
          }
          else {
            this.message;
            this.messageChecked = true;
          }

        });
    },




    apiCall() {

      const url = this.store.baseApiHome + 'apartments';
      console.log('URL chiamata API:', url);

      axios.get(url, {
        params: {
          page: this.apiPageNumber
        }
      }).then(res => {

        console.log(res)


        this.apartments = res.data.results.data;

        // salvo il totale dei progetti
        this.totalApartment = res.data.results.total;
        this.itemPage = res.data.results.per_page;
        this.lastPage = res.data.results.last_page;


        this.apiLinks = res.data.results.links;
      })
    },

  },


  changeApiPage(pageNumber) {



    if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {



      this.apiPageNumber--;


      //this.apiLinks.length - 2 corrisponde alla lunghezza dell'array a cui sottraggo il previous and next(da qui il -2)
    } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < (this.apiLinks.length - 2)) {
      //this.apiLinks.length - 2 corrisponde alla lunghezza dell'array a cui sottraggo il previous and next(da qui il -2)


      this.apiPageNumber++;

    }

    if (!isNaN(pageNumber)) {

      this.apiPageNumber = pageNumber;
    }




    this.apiCall();

  },

  takeAddress(address) {
    this.activeAuto = false;
    return this.store.address = address;
  },



  created() {
    this.getApiApartments();

  }

}
</script>


<template>


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


  </div>


  <nav class="button-nav d-flex justify-content-center">

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
