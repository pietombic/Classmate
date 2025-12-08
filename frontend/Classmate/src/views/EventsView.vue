<template>
    <div class="container-fluid grid_two_parts">
        <div>
            <div class="left_col" style="display: grid; align-items: center;">

                <div id="div_inserisci_nuovo_evento">
                    <img src="../imgs/people-and-technology.png" style="width: 50%; object-fit: cover;" alt="">
                    <h5 style="text-align: center;">Publish a new <strong style="color: #FEC930;">event!</strong></h5>
                    <label for="file_event">Select a file</label>
                    <input type="file" id="file_event" @change="file" />
                    <label for="nome_event">Title</label>
                    <input v-model="titolo" type="text" id="nome_event" />
                    <label for="description_event">Description</label>
                    <textarea v-model="descrizione" class="input_area_description" id="description_event"></textarea>
                    <PrimaryButton class="padding-10" text="Publish" v-on:click="postEventi" />
                </div>
            </div>
        </div>

        <div class="right_col scrollable">

            <Transition>
                <div v-if="visible" class="events_container" :class="[visible ? 'on_top' : '']">
                    <!-- <Card imageSrc="https://via.placeholder.com/150" title="Titolo degli appunti" subject="Materia"
                        professor="Professore" studentName="Nome" studentSurname="Cognome" tipo="Notes"
                        deletable="true" />
                    <Card imageSrc="https://via.placeholder.com/150" title="Titolo degli appunti" subject="Materia"
                        professor="Professore" studentName="Nome" studentSurname="Cognome" tipo="Notes"
                        deletable="true" />
                    <Card imageSrc="https://via.placeholder.com/150" title="Titolo degli appunti" subject="Materia"
                        professor="Professore" studentName="Nome" studentSurname="Cognome" tipo="Notes"
                        deletable="true" />
                    <Card imageSrc="https://via.placeholder.com/150" title="Titolo degli appunti" subject="Materia"
                        professor="Professore" studentName="Nome" studentSurname="Cognome" tipo="Notes"
                        deletable="true" />
                    <Card imageSrc="https://via.placeholder.com/150" title="Titolo degli appunti" subject="Materia"
                        professor="Professore" studentName="Nome" studentSurname="Cognome" tipo="Notes"
                        deletable="true" /> -->
                    <!-- <Card imageSrc="https://via.placeholder.com/150" title="Evento di prova" professor="Professore"
                        studentName="Nome" studentSurname="Cognome" tipo="Evento" deletable="true" />
                    <Card imageSrc="https://via.placeholder.com/150" title="Evento di prova" professor="Professore"
                        studentName="Nome" studentSurname="Cognome" tipo="Evento" deletable="true" /> -->


                    <!-- <Card v-for="event in eventi" :imageSrc="event.foto" tipo="Evento" :title="event.testo"
                        :studentName="event.nome" :studentSurname="event.cognome" /> -->
                        <Card v-for="event in eventi" :key="event.ide" :imageSrc="event.foto" :title="event.titolo" 
                        :studentName="event.nome" :studentSurname="event.cognome" :description="event.testo" professor="ciao" :official="event.official == 1" tipo="Evento"  /> 
                    

                    <!-- <div v-for="event in eventi" :key="event.ide" class="card">
                        <div class="first_part_card padding_small">
                            <img :src="event.foto" alt="FotoEvento" />
                        </div>
                        <div class="second_part_card">
                            <p v-if="event.official == 1" class="official_event_icon bg-primary">
                                Official
                            </p>
                            <p class="event_name">{{ event.titolo }}</p>
                            <p class="event_description">
                                {{ event.testo }}
                            </p>
                            <p class="event_pulisher">
                                {{ event.nome }}
                                {{ event.cognome }}
                            </p>
                        </div>
                    </div> -->



                    <div class="pagination_controls">
                        <PrimaryButton class="flex-1" v-on:click="getEventi" :isDisabled="fineEventi" text="Carica altro" />
                    </div>
                </div>
            </Transition>


        </div>
        <!--Test-->
        <!-- <div class="loader" v-if="loading">
            <p>loading</p>
            <pulse-loader :loading="loading" :loaderColor="loaderColor"></pulse-loader>
        </div> -->

        <!-- <Transition>

        </Transition> -->

    </div>
</template>

<script>
import PrimaryButton from "../components/PrimaryButton.vue"
import axios from 'axios'
import Card from "../components/Card.vue"
import CancelButton from "../components/CancelButton.vue"
import pulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { onBeforeMount } from "vue"

export default {
    data() {
        return {
            visible: true,
            eventi: [],
            skip: 0,
            off: false,
            loading: true,
            loaderColor: 'white',
            fineEventi: false,
            //post eventi
            descrizione: null,
            titolo: null,
            fotoEvento: null
        };
    },
    async beforeMount() {
        await this.getEventi()
    },
    components: {
        PrimaryButton,
        Card,
        CancelButton,
        pulseLoader
    },
    mounted() {
        //window.addEventListener('scroll', this.handleScroll)
    },
    unmounted() {
        //window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
    
        // handleScroll() {
        //     const {
        //         scrollTop,
        //         scrollHeight,
        //         clientHeight
        //     } = document.documentElement;

        //     console.log("st: ", scrollTop)
        //     if ((scrollTop + clientHeight >= scrollHeight - 5) && this.eventi.length <  && !this.loading) {
        //         this.loading = true
        //         this.getEventi()
        //     }
        // },
        toggleEvents() {
            this.visible = !this.visible;
        },
        async getEventi() {
            let token = localStorage.getItem('token')

            let params = {
                email: //email,
            };

            if (this.eventi.length != undefined) {
                this.skip = this.eventi.length;
            }

            params._official = this.off;
            params.skip = this.skip

            console.log("params: ", params)
            await axios
                .get("http://localhost:3000/api/eventi", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(risposta => {
                    if (risposta.data.eventi.length < 2) {
                        if(risposta.data.eventi.length > 0) {
                            this.eventi.push(...risposta.data.eventi);
                        }
                        this.fineEventi = true
                    }
                    else {
                        this.eventi.push(...risposta.data.eventi);
                    }
                })
                .catch((err) => console.log("errore: ", err));
        },
        async postEventi() {
            let token = localStorage.getItem('token')
            let params = {
                email: //email,
                testo: this.descrizione,
                titolo: this.titolo,
                fotoevento: this.fotoEvento
            };

            await axios.post('http://localhost:3000/api/eventi/upload',
                params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response);
                location.reload()
            })
            .catch((error) => {
                console.log(error);
            });
        },
        official() {
            this.off = !this.off;
            this.getEventi();
        },
        file(event) {
            this.fotoEvento = event.target.files[0]
        }
    },
};
</script>

<style>
.padding-10 {
    padding: 10px;
}

.right_col {
    /* Assicura che la colonna destra non esca dai limiti */

    max-width: 100%;
    /*overflow-x: hidden;*/
    padding: 20px;
    box-sizing: border-box;
}

.pagination_controls {
    /* Modifica qui */
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 60px;
    gap: 20px;
}

/*Test*/
.loader p {
    color: white;
    font-size: 32px
}

.publish_event_ui {
    display: flex;
    width: auto;
    justify-content: center;
    align-items: center;
    margin-top: 0;
}

.flex-1 {
    flex: 1;
}

.on_top {
    z-index: 1000;
    width: 100%;
}

.left_col {
    display: inline-block;
    width: 100%;
}

.left_col button {
    background-color: var(--background-color-dark-mode-3);
    border: none;
    padding: 20px;
    border-radius: 10px;
    transition: 0.2s linear;
}

.left_col button:hover {
    background-color: var(--border-color-dark-mode-hover);
}

.event_name {
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.event_description {
    font-size: 15px;
}

.event_pulisher {
    font-size: 15px;
}

.first_part_card {
    width: 30%;
    height: 90%;
    display: inline-block;
    margin: 0;
    justify-content: center;
}

.second_part_card {
    width: 70%;
    height: 90%;
    display: inline-block;
    margin: 0;
    padding: 20px;
}

.official_event_icon {
    width: fit-content;
    padding: 10px 30px;
    border-radius: 100px;
}

.card {
    height: fit-content;
    padding: 0 8px;
    border-radius: 17px;
    transition: ease-in-out 0.15s;
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color-dark-mode-2);
}

.card * {
    color: var(--font-color-dark-mode);
}

@media screen and (max-width: 900px) {
    .card {
        flex-direction: column !important;
        max-height: 200px;
    }

    .card img {
        width: 200px;
    }
}

.card img {
    width: 100%;
    border-radius: 10px;
}

.padding_medium {
    padding: 20px;
}

.padding_small {
    padding: 10px;
}

.events_container {
    /* Imposta un layout flessibile per il contenitore degli eventi */
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px !important;
    padding: 20px;
    /*overflow-y: auto;*/
    max-height: 80vh;
    box-sizing: border-box;

}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

#div_inserisci_nuovo_evento {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 100%;
}

#div_inserisci_nuovo_evento input::file-selector-button {
    background: var(--border-color-dark-mode-hover);
    color: var(--font-color-dark-mode);
    border: none;
    cursor: pointer;
}

#div_inserisci_nuovo_evento input,
textarea {
    display: block;
    width: 80%;
    height: 2rem;
    border-radius: 5px;
    border: none;
    background-color: var(--background-color-dark-mode-3);
    color: var(--font-color-dark-mode);
    margin-top: 0;
    resize: none;
}

#div_inserisci_nuovo_evento label {
    margin-top: 40px;
}

.input_area_description {
    height: 5rem;
}

#div_inserisci_nuovo_evento button {
    margin: 30px;
}



</style>