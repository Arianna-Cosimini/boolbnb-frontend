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
            axios.get(this.store.baseApiHome + 'categories')
                .then(res => {
                    console.log(res);
                    this.categories = res.data.results;
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
    }
}
</script>

<template>
    <div class="container-fluid mt-3 px-5 py-2">
        <div class="categories d-flex gap-5 align-items-end px-3 overflow-x-auto">
            <div class="all-categories text-black-50 d-flex flex-column align-items-center gap-2">
                <img class="icons" src="/icons/all.svg" alt="">
                <span class="category-title">Qualsiasi</span>
            </div>
            <div v-for="category in categories" :key="category.id"
                class="category text-black-50 d-flex flex-column align-items-center gap-2">
                <img class="icons" :src="category.icon" :alt="category.title">
                <span class="category-title">{{ category.title }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.category,
.all-categories {
    color: #6a6a6a;
    text-align: center;

    &:hover {
        color: black !important;
        cursor: pointer;
    }
}

.category-title {
    font-size: 12px;
    white-space: nowrap;
}

.icons {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.categories {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
}

.categories::-webkit-scrollbar {
    height: 8px;
}

.categories::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

.categories::-webkit-scrollbar-thumb:hover {
    background: #999;
}
</style>
