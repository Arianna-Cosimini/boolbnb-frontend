

<script>
import axios from 'axios';

import { store } from './store.js';
import AppHeader from "./components/AppHeader.vue";
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';
import Searchbar from './components/Searchbar.vue';
import Categories from './components/Categories.vue';


export default {

  components: {

    AppHeader,
    AppNav,
    AppFooter,
    Searchbar,
    Categories,

  },


  data() {
    return {

      store,

    }
  },

  created() {

  },

  mounted() {

  },


  methods: {


  }
}
</script>

<template>
  <AppNav></AppNav>
  <!-- <AppHeader></AppHeader> -->

  <Categories></Categories>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped></style>
