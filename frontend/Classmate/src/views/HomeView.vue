<template>
    <div class="container-fluid" style="width: 95%;">
        <div class="grid_home_view">
            <div class="card" style="border-radius: 35px 7px 7px 7px !important;">
                <p>Last notes published</p>
            </div>

            <div class="grid_events_header">
                <div class="card" style="border-radius: 7px 7px 7px 7px !important;">
                    <p>Last events</p>
                </div>
                <button class="card" style="border-radius: 7px 7px 7px 7px !important;">Official</button>
                <button class="card" style="border-radius:  7px 35px 7px 7px !important;">Unofficial</button>
            </div>

            <div class="card grid_notes" style="border-radius:  7px  7px  7px 35px !important;">




                <VerticalCard v-for="note in appunti" componentLabel="Note" :imageSrc="note.foto"
                    :title="note.argomento" :subject="note.materia" :description="`${note.nome} ${note.cognome}`"
                    openButtonText="Open" editButtonText="Elimina" :link_for_button="note.foto" />





            </div>
            <div class="grid_elements_events_profile_discover">
                <div class="card grid_events"
                    style="grid-column: span 2; width: 100% !important; border-radius:  7px  7px 7px 7px  !important;">


                    <!-- TODO: togliere la possibilità di aprire gli eventi -->
                    <VerticalCard v-for="event in eventi" componentLabel="Event" :imageSrc="event.foto"
                        :title="event.titolo" :description="`${event.nome} ${event.cognome}`" openButtonText="Open" />


                </div>


                <div class="card"
                    style="display: grid; align-items: center; grid-template-rows: 1fr 1fr; border-radius:  7px  7px 7px 7px  !important;">
                    <ProfilePicture :name="account.nome" :imageSrc="account.foto" />
                </div>
                <div class="card" style="border-radius:  7px  7px 35px 7px  !important;">
                    <router-link to="/events">
                        <img aria-label="eventi" src="../imgs/two-athletes-posing-in-action.png" alt="">
                        <p style="text-align: center; text-decoration: none !important;">Eventi</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* FUNZIONI */
button[class="card"]:hover {
    border: 1px solid var(--border-color-dark-mode-hover);
}

.grid_home_view {
    display: grid;
    align-items: center;
    width: 100%;
    height: 85vh;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 9fr;
    gap: 10px;
    margin: auto 0;
    box-sizing: border-box;
}

.grid_events_header {
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    gap: 10px;
    height: 100%;
    width: 100%;
}

.grid_events {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 20px;
    height: 100%;
    width: 100%;
}

.grid_elements_events_profile_discover {
    display: grid;
    height: 100%;
    width: 100%;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

.grid_notes {
    padding: 30px;
    gap: 30px;
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

/* CONTENITORE delle card + CARD */

.card {
    height: 100%;
    width: 100%;
    background-color: var(--background-color-dark-mode-2);
    border: 1px solid var(--border-color-dark-mode);
}

.card p {
    margin: 0 !important;
}
</style>
<script>
import VerticalCard from '../components/VerticalCard.vue'
import ProfilePicture from '../components/ProfilePicture.vue'
import axios from 'axios'

export default {
    name: 'HomeView',
    data() {
        return {
            eventi: null,
            appunti: null,
            account: null
        }
    },
    methods: {
        getEvents() {
            let token = localStorage.getItem('token')

            let params = {
                email: //email,
                skip: 0,
                _official: false
            };

            axios
                .get("http://localhost:3000/api/eventi", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((risposta) => {
                    this.eventi = risposta.data.eventi;
                    console.log(risposta.data.eventi);
                })
                .catch((err) => console.log("errore: ", err));
        },
        async getAppunti() {
            let token = localStorage.getItem('token')

            let params = {
                email: //email,
                pagina: 0
            };

            axios
                .get("http://localhost:3000/api/appunti", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((risposta) => {
                    this.appunti = risposta.data.data.appunti;
                    console.log(risposta.data.data.appunti);
                })
                .catch((err) => console.log("errore: ", err));

        },
        async getProfileInformations() {
            let token = localStorage.getItem('token')

            let params = {
                email: //email
            };

            await axios
                .get("http://localhost:3000/api/account", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((risposta) => {
                    this.account = risposta.data.data.account;
                    console.log(risposta.data.data.account);
                })
                .catch((err) => console.log("errore: ", err));

        }
    },
    components: {
        VerticalCard,
        ProfilePicture
    },
    async beforeMount() {
        await this.getEvents()
        await this.getAppunti()
        await this.getProfileInformations()
    }
}
</script>