<template>
    <div class="columns">
        <div class="column is-8">
            <router-link to="/"><font-awesome-icon icon="fa-solid fa-angle-double-left"></font-awesome-icon> Back</router-link>
            <section class="content">
                <h1 class="title is-2">
                    {{ details.name }}
                </h1>
                <div v-html="details.summary"></div>
            </section>

            <div v-for="season in schedule" :key="season.season">
                <h2 class="title is-4">Season {{ season.season }}</h2>

                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Number</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="show in season.episodes" :key="show.id">
                            <td>{{ show.airdate }}</td>
                            <td>{{ show.number }}</td>
                            <td>{{ show.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="column is-4">
            <img v-if="details.image" :src="details.image.original" :alt="details.name">
        </div>
    </div>
</template>

<script>
import Fetch from "@/library/Fetch";

export default {
    name: "ShowDetails",
    created() {
        // fetching the show details
        Fetch.get("/shows/" + this.$route.params.id)
        .then(resp => {
            this.details = resp;

            // download the image if it's exists
            if(this.details.image) {
                const regex = /uploads.*/;
                const path = this.details.image.original.match(regex);
                fetch("http://localhost:3002/tvmaze_statics/" + path)
                .then(data => data.blob())
                .then(image => {
                    this.details.image.original = URL.createObjectURL(image);
                });

            }
        });

        // fetching the episodes of the show
        Fetch.get("/shows/" + this.$route.params.id + "/episodes")
        .then(resp => {
            let schedule = {};

            resp.reverse().forEach(e => {
                let key = "season_" + e.season;

                if(!schedule[key]) {
                    schedule[key] = { episodes: [] };
                }

                schedule[key].season = e.season;
                schedule[key].episodes.unshift(e);  
            });
            this.schedule = schedule;
        });
    },
    data() {
        return {
            details: {},
            schedule: {},
        };
    },

}
</script>

<style>
    
</style>