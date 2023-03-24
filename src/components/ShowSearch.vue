<template>
    <div>
        <form id="search" @submit.prevent="search">
            <div class="field has-addons">
                <div class="control is-expanded has-icons-left has-icons-right">
                    <input type="text" class="input" placeholder="Search for shows ..." v-model="searchInput">

                    <span class="icon is-left is-small"><font-awesome-icon icon="fa-solid fa-search"></font-awesome-icon></span>
                </div>
                <div class="control">
                    <button type="submit" class="button is-success is-right">
                        <font-awesome-icon icon="fa-solid fa-search"></font-awesome-icon>
                    </button>
                </div>
            </div>
        </form>

        <a @click="clear_search" v-if="searchResult.length > 0" class="pull-left">
            Clear Search <font-awesome-icon icon="fa-solid fa-times"></font-awesome-icon>
        </a>

        <p v-if="searchError">No results found.</p>

        <div class="columns is-multiline">
            <div class="column is-2" v-for="show in searchResult" :key="show.show.id">
                <div class="card">
                    <div class="card-image">
                        <img v-if="show.show.image"
                          :src="show.show.image.medium" 
                          :alt="show.show.name"
                        >
                    </div>
                    <div class="card-content">
                        <p class="title is-4">
                            {{ show.show.name }}
                        </p>
                        <p class="subtitle is-6" v-if="show.show.network">
                            Running on {{ show.show.network.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Fetch from "@/library/Fetch";

export default {
    data() {
        return {
            searchInput: "",
            searchResult: [],
            searchError: false,
        };
    },
    methods: {
        search() {
            this.searchResult = [];
            this.searchError = false; 
            Fetch.get("/search/shows?q=" + this.searchInput)
            .then(resp => {
                if(resp.length > 0) {
                    this.searchResult = resp;
                } else {
                    this.searchError = true;
                }
            });
        },
        clear_search() {
            this.searchInput = "";
            this.searchError = false;
            this.searchResult = [];
        }
    }
}
</script>
<style lang="">
    
</style>