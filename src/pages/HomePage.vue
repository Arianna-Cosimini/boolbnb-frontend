<script>

import { store } from '../store.js';

import axios from 'axios';


export default {

    name: 'HomePage',

    data() {
        return {

            store,
            apartaments: [],
            apiLinks: [],
            apiPageNumber: 1,


        }
    },

    created() {

    },

    mounted() {

        this.apiCall();
    },


    methods: {

        apiCall() {

            axios.get(this.store.baseApiHome + 'apartments', {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {

                console.log(res)

                this.apartments = res.data.results.data;

                this.apiLinks = res.data.results.links;
            })
        },

        changeApiPage(pageNumber) {


            if (pageNumber == "&laquo; Previous" && this.apiPageNumber > 1) {


                this.apiPageNumber--;

            } else if (pageNumber == "Next &raquo;" && this.apiPageNumber < (this.apiLinks.length - 2)) {
                //this.apiLinks.length - 2 corrisponde alla lunghezza dell'array a cui sottraggo il previous and next(da qui il -2)

                this.apiPageNumber++;

            }

            if (!isNaN(pageNumber)) {

                this.apiPageNumber = pageNumber;
            }


            this.apiCall();

        },
    },

}
</script>



    <template>
        <div class="div">

            <router-link :to="{name: 'single-apartment'}" class="btn btn-outline-danger">
                Mostra
            </router-link>

        </div>
    </template>



<style lang="scss" scoped></style>
