<script>
import { store } from '../store.js';
import axios from 'axios';

import AppHeader from '../components/AppHeader.vue';

export default {
  name: 'HomePage',
  components: {

    AppHeader,
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
  <div class="jumbotron">
    <AppHeader></AppHeader>
    <div class="container mt-5">
      <h1 class="text-white display-1 py-5">Dove inizia la tua<br> prossima avventura</h1>
      <a href="" class="my-white-btn btn btn-lg px-4">Parti ora</a>
    </div>
  </div>

  <div class="sponsored-apartments container-fluid p-5">
    <h2 class="fs-2">
      In evidenza
    </h2>
  </div>


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
</style>
