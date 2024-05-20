<script>

import { store } from '../store.js';

import axios from 'axios';
import ApartmentItem from '../components/ApartmentItem.vue';


export default {

  name: 'HomePage',

  components: {
    ApartmentItem,
  },

  data() {
    return {

      store,
      apartments: [],
      apiLinks: [],
      apiPageNumber: 1,


    }
  },

  created() {

  },

  mounted() {

    this.apiCall();
  },


  methods: {

    apiCall() {

      axios.get(this.store.baseApiHome + 'apartments', {
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

    changeApiPage(pageNumber) {


      if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {


        this.apiPageNumber--;

      } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < (this.apiLinks.length - 2)) {
        //this.apiLinks.length - 2 corrisponde alla lunghezza dell'array a cui sottraggo il previous and next(da qui il -2)

        this.apiPageNumber++;

      }

      if (!isNaN(pageNumber)) {

        this.apiPageNumber = pageNumber;
      }


      this.apiCall();

    },
  },

}
</script>


<template>


  <div class="container text-center">
    <div class="row">
      <div class="col-md-12 my_mini_jumbo d-flex flex-column align-content-center justify-content-center">
        <h1 class="center-content fs-1">I Nostri Appartamenti</h1>
      </div>
    </div>
  </div>



  

    <div class="row">
      <ApartmentItem v-for="currentApartment in apartments" :apartment="currentApartment" :key="currentApartment.id">
      </ApartmentItem>
    </div>





  <!-- {{ $apartment->cover_image ? asset('storage/' . $apartment->cover_image) : asset('placeholder/Placeholder.png') }} -->

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

  ;

  &:hover {
    background-color: rgba(238, 236, 236, 0.123);
  }

}
</style>
