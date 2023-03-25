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
            <div class="column is-2" v-for="show in searchResult" :key="show.id">
                <div class="card">
                    <router-link :to="'/shows/' + show.id">
                        <div class="card-image">
                            <img v-if="show.showImage"
                              :src="show.showImage" 
                              :alt="show.showName"
                            >
                        </div>
                    </router-link>
                    <div class="card-content">
                        <router-link :to="'/shows/' + show.id">
                            <p class="title is-4">
                                {{ show.showName }}
                            </p>
                        </router-link>
                        <p class="subtitle is-6" v-if="show.showNetwork">
                            Running on {{ show.showNetwork.name }}
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <a v-if="!is_subscribed(show)" @click="subscribe(show)">
                                <font-awesome-icon icon="fa-solid fa-rss"></font-awesome-icon> Subscribe
                            </a>
                            <a class="has-text-success" v-if="is_subscribed(show)" @click="subscribe(show)">
                                <font-awesome-icon icon="fa-solid fa-rss"></font-awesome-icon> Subscribed!
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Fetch from "@/library/Fetch";
import { mergeShowData } from "@/utils/transformers";

export default {
    name: "ShowSearch",
    props: {
        is_subscribed: {
            type: Function,
        }
    },
    data() {
        return {
            searchInput: "",
            searchResult: [],
            searchError: false, 
        };
    },
    methods: {
        subscribe(show) {
            this.$emit("subscribe", show);
        },
        search() {
            // clear the old results
            this.searchResult = [];
            this.searchError = false; 
            Fetch.get("/search/shows?q=" + this.searchInput)
            .then(resp => {
                if(resp.length > 0) {
                    const transformedData = [];

                    // transform data to my format
                    mergeShowData(transformedData, resp);
                    transformedData.forEach((show, index) => {
                        const regex = /uploads.*/;
                        if(show.showImage) {
                            // download the image
                            const path = show.showImage.match(regex);
                            fetch("http://localhost:3002/tvmaze_statics/" + path)
                            .then(data => data.blob())
                            .then(image => {
                                transformedData[index].showImage = URL.createObjectURL(image);
                                this.searchResult.push(transformedData[index]);
                            })
                            .catch(error => console.log(error));
                        }
                    })
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