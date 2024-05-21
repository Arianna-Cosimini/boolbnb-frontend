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

</style>
