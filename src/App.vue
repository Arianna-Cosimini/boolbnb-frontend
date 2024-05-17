<script>
import axios from 'axios';

import { store } from './store.js';
import AppHeader from "./components/AppHeader.vue";
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';


export default {

  components: {

    AppHeader,
    AppNav,
    AppFooter,


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
  <AppHeader></AppHeader>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped></style>
