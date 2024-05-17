<script>
import axios from 'axios';

import { store } from './store.js';
import AppHeader from "./components/AppHeader.vue";
import AppNav from './components/AppNav.vue';


export default {

  components: {

    AppHeader,
    AppNav,


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
</template>

<style lang="scss" scoped></style>
