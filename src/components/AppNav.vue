<script>

import { store } from '../store.js';

export default {
    name: 'AppNav',

    data() {
        return {
            user: null,
            store,
            isLoggedIn: false
        }
    },
    computed: {
    isLoggedIn() {
      // Access login state from store
      return store.getters['auth/isLoggedIn'];
        },
    },
    methods: {
        logout() {
        // Call logout method from store or API (implementation details depend on your backend setup)
        store.dispatch('auth/logout'); // Assuming a logout dispatch action in your store
        },
    },

}
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="">
                <div class="logo_laravel">
                    <img src="/boolbnb.svg" alt="boolbnb logo" width="130px">
                </div>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="">Home</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <template v-if="isLoggedIn">
                        <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            {{ user.name }}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                            <a class="dropdown-item" href="#" @click="logout">Logout</a>
                            </li>
                        </ul>
                        </li>
                    </template>


                <!-- Right Side Of Navbar -->
                <template v-else>
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <a class="nav-link" href="http://127.0.0.1:8000/login">Login</a>

                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="http://127.0.0.1:8000/register">Registrati</a>
                    </li>

                </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>