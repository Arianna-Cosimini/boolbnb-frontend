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
<router-view></router-view>
</template>

<style lang="scss" scoped>

</style>
