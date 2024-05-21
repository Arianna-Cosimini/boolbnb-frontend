<script>
import { store } from '../store.js';
import axios from 'axios';

import AppHeader from '../components/AppHeader.vue';
import Categories from '../components/Categories.vue';

export default {
  name: 'HomePage',
  components: {
   
    AppHeader,
    Categories,
  },
  data() {
    return {
      
    }
  },
  mounted() {
   
  },
  methods: {

  },
  computed: {
    
  }
}
</script>

<template>
  <div>
    <AppHeader></AppHeader>
  </div>
  <Categories></Categories>


  <!-- <div class="container-fluid text-center mt-5">
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
  </nav> -->
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
