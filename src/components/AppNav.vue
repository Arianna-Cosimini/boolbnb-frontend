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
    <nav class="navbar px-5 navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container-fluid">

            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <img src="/boolbnb.svg" alt="boolbnb logo" width="130px">
            </router-link>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="">
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
                        <a class="nav-link" href="http://127.0.0.1:8000/login">Login</a>

                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="http://127.0.0.1:8000/register">Registrati</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>