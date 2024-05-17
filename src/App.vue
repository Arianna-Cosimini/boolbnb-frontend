<script>
import axios from 'axios';

import { store } from './store.js';
import AppHeader from "./components/AppHeader.vue";



export default {

  components: {

    AppHeader,


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

<AppHeader></AppHeader>
<router-link ></router-link>

</template>

<style lang="scss" scoped>

</style>
