<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'Categories',

    data() {
        return {
            store,
            categories: [],
            selectedCategory: null,
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
        selectCategory(categoryId) {
            this.selectedCategory = categoryId === 'all' ? null : categoryId;
            this.$emit('category-selected', categoryId === 'all' ? null : categoryId);
        }
    }
}
</script>

<template>
    <div class="container-fluid mt-3 px-2 px-sm-3 px-md-4 px-lg-5 py-2">
        <div class="categories d-flex gap-5 align-items-end px-3 overflow-x-auto">
            <div class="all-categories text-black-50 d-flex flex-column align-items-center gap-1"
                :class="{ selected: selectedCategory === null }" @click="selectCategory('all')">

                <img class="icons" src="/icons/all.svg" alt="">
                <span class="category-title">Qualsiasi</span>

            </div>
            <div v-for="category in categories" :key="category.id"
                class="category text-black-50 d-flex flex-column align-items-center gap-1"
                :class="{ selected: selectedCategory === category.id }" @click="selectCategory(category.id)">

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
    font-weight: 500;
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

.selected {
    color: black !important;
    /* Aggiunge il colore nero per il testo selezionato */
}
</style>
