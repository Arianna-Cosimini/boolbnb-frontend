<script>
import { store } from '../store.js';
import axios from 'axios';


export default {
    name: 'Categories',

    data() {
        return {
            store,
            categories: [],
        }
    },

    mounted() {

        this.apiCall();
    },

    methods: {

        apiCall() {

            axios.get(this.store.baseApiHome + 'categories', {

            }).then(res => {

                console.log(res)

                this.categories = res.data.results;

            })
        },

    }
}
</script>

<template>
    <div class="container-fluid px-5 py-2">
        <div class="categories d-flex gap-5 px-3">
            <div v-for="category in categories" class="category text-black-50 d-flex flex-column">
                <i :class="category.icon"></i>
                <span class="category-title">{{ category.title }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.category {
    color: #6a6a6a;

    &:hover {
        color: black !important;
        cursor: pointer;
    }
}

.category-title {
    font-size: 12px;
}
</style>
