<script>

import { store } from '../store.js';

export default {
    name: 'AppNav',

    data() {
        return {
            store,
        }
    },

}
</script>

<template>
    <nav class="navbar d-none d-md-block px-2 px-sm-3 px-md-4 px-lg-5 navbar-expand-md navbar-light bg-white">
        <div class="container-fluid">

            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <img src="/boolbnb.svg" alt="boolbnb logo" width="130px">
            </router-link>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav me-auto">
                    <!-- <router-link :to="{ name: 'home' }" class="navbar-brand">
                        <span>Home</span>
                    </router-link> -->
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <a class="nav-link" href="http://127.0.0.1:8000/login"><i
                                class="fa-regular fa-circle-user me-1"></i>Profilo</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

    <!-- bottom bar -->
    <div
        class="container-fluid bottom-bar d-md-none py-2 px-3 px-sm-3 px-md-4 px-lg-5 navbar-expand-md navbar-light bg-white d-flex justify-content-between align-items-center">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img src="/favicon.svg" alt="boolbnb logo" height="40px">
        </router-link>

        <a class="nav-link" href="http://127.0.0.1:8000/login"><i class="fa-regular fa-circle-user me-1"></i>Profilo</a>
    </div>
</template>


<style lang="scss" scoped></style>