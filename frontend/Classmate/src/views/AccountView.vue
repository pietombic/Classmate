<template>
    <div class="container_account_page">
        <div class="account_card">
            <p>Il tuo account</p>
        </div>
        <div class="grid_layout">
            <div class="account_card normal_border">
                <p>I tuoi appunti</p>
            </div>
            <button v-on:click="toggleShowAggiungiAppunti" class="account_card normal_border publish_button">
                Pubblica degli appunti
            </button>
            <div class="account_card custom_border">
                <p style="text-align: center;">{{ account.numeroAppuntiCaricati }}</p>
            </div>
        </div>
        <div class="account_card grid_template">
            <div></div>
            <div class="center_items">
                <ProfilePicture :imageSrc="account.foto" :name="account.nome" />
            </div>
            <div>
                <ClassCircle :className="account.classe" />
            </div>
            <div class="center_items full_width">
                <p class="secondary">Bio:</p>
                <!-- <p class="biografia justify_text">{{  }}</p> -->
                <textarea style="height: 100px; width: 100%;"  v-model="account.biografia" type="text"></textarea>
                <button class="simple_button">Modifica</button>
            </div>
            <div class="contact_info">
                <div>
                    <p class="secondary">Il tuo cellulare:</p>
                    <p class="biografia">{{ account.cellulare }}</p>
                </div>
                <div>
                    <p class="secondary">Stato:</p>
                    <p class="biografia">hardcodato</p>
                </div>
            </div>
        </div>
        <div class="account_card scrollable">

            <div v-if="showAppunti" style="display: flex; flex-direction: column; gap: 4vh">
                
                <Card v-for="note in appunti" :key="note.id" :imageSrc="note.foto" :title="note.argomento"
                    :studentName="note.nome" :studentSurname="note.cognome" 
                    :professor="note.professore" :subject="note.materia"  tipo="Notes" />
                <div class="pagination_controls">
                    <PrimaryButton class="flex-1" v-on:click="getAppunti" :isDisabled="fineAppunti"
                        text="Carica altro" />
                </div>
            </div>


            <div v-if="!showAppunti"
                style="width: 40%; height: fit-content; background-color: #222; margin: 0 auto; border-radius: 10px;"
                class="aggiungiAppunti">
                <p style="margin-bottom: 20px;">Pubblica degli appunti</p>
                <label for="file_appunti">Seleziona il file:</label><input class="input_file_profile_picture"
                    accept=".pdf, .jpg, .png, .jpeg" id="file_appunti" type="file" @change="file">

                <label for="argomento_appunti">Argomento</label><input maxlength="300" id="argomento_appunti"
                    type="text" v-model="argomento">

                <label for="materia_appunti">Materia</label>
                <select name="materia" id="materia_appunti" v-model="materia">
                    <option value=""></option>
                    <option v-for="materia in materie">{{ materia }}</option>
                </select>

                <label for="anno_appunti">Anno</label>
                <select name="anno" id="anno_appunti" v-model="anno">
                    <option value=""></option>
                    <option v-for="anno in anni">{{ anno }}</option>
                </select>

                <label for="professore_appunti">Professore</label>
                <select name="anno" id="professore_appunti" v-model="professore">
                    <option value=""></option>
                    <option v-for="prof in professori">{{ prof }}</option>
                </select>
                <PrimaryButton style="margin-top: 40px; height: 50px;" v-on:click="postAppunti" text="Pubblica" />
                <PrimaryButton style="margin-top: 40px; height: 50px;" v-on:click="toggleShowAggiungiAppunti"
                    text="Annulla" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.aggiungiAppunti * {
    display: block;

}

.new_notes .element {
    padding: 10px;
    display: flex;
}

.element img {
    border-radius: 10px;
}

.aggiungiAppunti p,
.aggiungiAppunti label {
    text-align: center;
    margin-top: 10px;
}

.aggiungiAppunti {
    display: grid;
    align-items: center;
    padding: 30px;
}

.notes_container_account {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
}


.container_account_page {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 9fr;
    gap: 7px;
    height: 87vh;
    width: 100%;
    padding: 0 30px;
}

.grid_layout {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    column-gap: 10px;
}

.grid_template {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

.account_card {
    background-color: var(--background-color-dark-mode-2);
    border: 1px solid var(--border-color-dark-mode);
    padding: 20px;
    border-radius: 7px;
    display: grid;
    align-items: center;
}

.center_items {
    display: grid;
    align-items: center;
}

.center_text {
    text-align: center;
}

.justify_text {
    text-align: justify;
}

.biografia {
    font-size: 17px !important;
}

.account_card p {
    font-size: 20px;
    margin: 0;
}

.simple_button {
    background-color: transparent;
    border: none;
    margin: 0;
    color: #8b8b8b;
    padding: 10px;
    border-radius: 7px;
}

.secondary {
    color: #636363;
    font-size: 14px !important;
}

.normal_border {
    border-radius: 7px !important;
}

.publish_button {
    border: 1px solid var(--border-color-dark-mode-hover);
    color: #fff;
    font-size: 20px;
    margin: 0;
}

.custom_border {
    border-radius: 7px 20px 7px 7px;
    display: grid;
    align-items: center;
    padding: 5px;
}

.circle {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    background-color: #444;
    margin: 20px auto;
}

.small_circle {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    background-color: #444;
    margin: 20px auto;
    display: grid;
    align-items: center;
}

.full_width {
    grid-column: span 3;
    padding: 0 20px;
}

.contact_info {
    grid-column: span 3;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    gap: 40px;
    justify-content: center;
}

.account_card:nth-of-type(1) {
    border-radius: 20px 7px 7px 7px;
}

.account_card:nth-of-type(2) {
    border-radius: 7px 20px 7px 7px;
}

.account_card:nth-of-type(3) {
    border-radius: 7px 7px 7px 20px;
}

.account_card:nth-of-type(4) {
    border-radius: 7px 7px 20px 7px;
}
</style>
<script>
import Card from '../components/Card.vue'
import PrimaryButton from '../components/PrimaryButton.vue'
import ClassCircle from '../components/ClassCircle.vue'
import ProfilePicture from '../components/ProfilePicture.vue'
import axios from 'axios'
export default {

    data() {
        return {
            showAppunti: true,
            account: null,
            appunti: [],
            skip: 0,
            fineAppunti: false,
            materie: [],
            anni: [],
            professori: [],

            //caricamento appunti:
            argomento: null,
            materia: null,
            anno: null,
            professore: null,
            foto: null
        }
    },
    methods: {
        toggleShowAggiungiAppunti() {
            this.showAppunti = !this.showAppunti;
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
                    this.materie = risposta.data.data.opzioni.materie
                    this.professori = risposta.data.data.opzioni.professori
                    this.anni = risposta.data.data.opzioni.anni
                })
                .catch((err) => console.log("errore: ", err));
        },
        async getAppunti() {
            let token = localStorage.getItem('token')

            let params = {
                _id: this.account.id
            };

            if (this.appunti.length != undefined) {
                this.skip = this.appunti.length;
            }
            params.skip = this.skip

            await axios
                .get("http://localhost:3000/api/appunti/account", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(risposta => {
                    if (risposta.data.data.length < 2) {
                        if (risposta.data.data.length > 0) {
                            this.appunti.push(...risposta.data.data);
                        }
                        this.fineAppunti = true
                    }
                    else {
                        this.appunti.push(...risposta.data.data);
                    }
                })
                .catch((err) => console.log("errore: ", err));
        },
        async postAppunti() {
            let token = localStorage.getItem('token')
            let params = {
                email: //email,
                materia: this.materia,
                professore: this.professore,
                anno: this.anno,
                argomento: this.argomento,
                fotoappunti: this.foto
            };
            console.log(params)

            await axios.post('http://localhost:3000/api/appunti/upload',
                params,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                location.reload()
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        file(event) {
            this.foto = event.target.files[0]
        }
    },
    components: {
        Card,
        PrimaryButton,
        ClassCircle,
        ProfilePicture
    },
    beforeMount() {
        this.getProfileInformations()
        this.getAppunti()
    }
}
</script>