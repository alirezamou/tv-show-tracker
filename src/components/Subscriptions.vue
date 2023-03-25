<template>
    <div>
        <ShowSearch :is_subscribed="(show) => is_subscribed(show)" @subscribe="subscribe" />

        <section class="section">
            <div class="columns">
                <div class="column is-3">
                    <nav class="panel">
                        <p class="panel-heading">Shows</p>

                        <div class="panel-block show-item" v-for="show in subscriptions" :key="show.id">
                            <router-link :to="'/shows/' + show.id">{{ show.showName }}</router-link>

                            <div>
                                <a @click="subscribe(show)"><font-awesome-icon icon="fa-solid fa-times"></font-awesome-icon></a>
                            </div>
                        </div>
                    </nav>
                </div>

                <div class="column is-9">
                    <h1 class="title is-3">Your schedule</h1>

                    <p v-if="subscriptions.length === 0">You don't have any subscriptions yet.
                    Search for shows above, then subscribe!</p>

                    <table class="is-striped-is-fullwidth">
                        <thead>
                            <tr>
                                <th>Show</th>
                                <th>Episode</th>

                                <template v-for="date in scheduleDates" :key="date">
                                    <thead>
                                        <tr>
                                            <th colspan="2">{{ date }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="show in schedule[date]" :key="show.episode.id">
                                            <td>{{ show.episode.name }}</td>
                                            <td>{{ show.episode.season }}x{{ show.episode.number }}: {{ show.show.showName }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import moment from "moment";
import Fetch from "@/library/Fetch";
import Database from "@/library/Database";

import ShowSearch from './ShowSearch.vue';

export default {
    name: "Subscriptions",
    components: {
        ShowSearch,
    },
    async created() {
        // check the result if it is an array

        const result = await Database.get_data()
        this.subscriptions = result;
    },
    data() {
        return {
            subscriptions: [],
            schedule: {},
        };
    },
    computed: {
        scheduleDates() {
            return Object.keys(this.schedule).sort((a, b) => moment(a).isBefore(b));
        }
    },
    watch: {
        subscriptions: {
            async handler(data) {
                this.get_schedule();
                await Database.set_data(data);
            },
            deep: true,
        },
    },
    methods: {
        is_subscribed(show) {
            return this.subscriptions.findIndex(e => e.id === show.id) !== -1;
        },
        subscribe(show) {
            if(this.is_subscribed(show)) {
                return this.subscriptions.splice(this.subscriptions.findIndex(e => e.id === show.id), 1);
            }
            this.subscriptions.push(show);
        },
        get_schedule() {
            this.schedule = {};

            this.subscriptions.forEach(show => {
                Fetch.get("/shows/" + show.id + "/episodes")
                .then(resp => {
                    resp.forEach(episode => {
                        if(moment().subtract(7, 'days').isBefore(episode.airdate)) {
                            if(this.schedule[episode.airdate] === undefined) 
                                this.schedule[episode.airdate] = [];
                            
                            this.schedule[episode.airdate].push({
                                episode,
                                show
                            });
                        }
                    })
                })
            })
        }
    }
}
</script>
<style>
    .show-item {
        justify-content: space-between;
    }
</style>