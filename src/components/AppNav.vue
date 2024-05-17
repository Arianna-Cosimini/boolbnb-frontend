<script>
export default {
    name: 'AppNav',

    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="">
                <div class="logo_laravel">
                    <img src="/public/boolbnb.svg" alt="boolbnb logo" width="130px">
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

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <a class="nav-link" href="">Login</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="">Registrati</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>