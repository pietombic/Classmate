<template>
    <!-- TODO: sistemare colore negli input box -->
    <!-- <SettingsPopUp/> -->


    <div class="flex_center">
        <p style="font-size: 20px; text-align: center;">Your settings</p>
        <label for="user_name">Name</label><input v-model="impostazioni.nome" id="user_name" type="text">
        <label for="user_surname">Surname</label><input v-model="impostazioni.cognome" id="user_surname" type="text">
        <label for="user_class">Class</label><input v-model="impostazioni.classe" id="user_class" type="text">
        <label for="user_cellular_number">Cellulare</label>
        <div class="inline_elements">
            <!-- TODO: sistemare il ToggleCellulare -->
            <input id="user_cellular_number" v-model="impostazioni.cellulare" type="tel"><button
                class="fancy_button">Show:
                T/F</button>

        </div>
        <!-- la scuola si può solo visualizzare, non si puo' modificare -->
        <label for="user_school">School</label><input v-model="impostazioni.nomeScuola" readonly id="user_school"
            type="text">
        <PrimaryButton v-on:click="saveChanges" text="Salva" />
    </div>
</template>


<style scoped>
input[type="text"] {
    display: block;
    background-color: var(--background-color-dark-mode-3);
    border: 1px solid var(--border-color-dark-mode);
    border-radius: 5px;
    margin-bottom: 30px;
    color: #fff !important;

}

.inline_elements * {
    display: inline !important;
    width: 50%;
}

.fancy_button {
    background-color: var(--background-color-dark-mode-3);
    border: none;
    color: var(--font-color-dark-mode);
    height: fit-content;
}

input[type="text"]:focus {
    outline: none !important;
    border: 1px solid var(--border-color-dark-mode-hover);

}

.flex_center {

    display: grid;
    align-items: center;
    width: 30%;
    margin: 0 auto;
    background-color: var(--background-color-dark-mode-2);
    padding: 20px;
}
</style>
<script>
import SettingsPopUp from "../components/SettingsPopUp.vue"
import PrimaryButton from "../components/PrimaryButton.vue"
import axios from "axios"
export default {
    data() {
        return {
            showCellular: true,
            impostazioni: null
        }
    },
    methods: {
        toggleCellular() {
            this.showCellular = !this.showCellular
        },
        async getProfileInformations() {
            let token = localStorage.getItem('token')

            let params = {
                email: //email,

            }

            await axios
                .get("http://localhost:3000/api/impostazioni", {
                    params: params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((risposta) => {
                    this.impostazioni = risposta.data.data;
                })
                .catch((err) => console.log("errore: ", err));

        },
        async saveChanges(){
            console.log("id: ", this.impostazioni.id)
            let token = localStorage.getItem('token')
            let data = {
                id: this.impostazioni.id,
                nome: this.impostazioni.nome,
                cognome: this.impostazioni.cognome,
                classe: this.impostazioni.classe,
                cellulare: this.impostazioni.cellulare
            };
            let headers = {
                Authorization: `Bearer ${token}`,
            }
        

            await axios({
                method: 'put',
                url: 'http://localhost:3000/api/impostazioni/edit',
                data,
                headers
                }
            )
            .then((response) => {
                console.log(response);
                location.reload()
            })
            .catch((error) => {
                console.log(error);
            });

            location.reload()
        }

    },
    components: {
        SettingsPopUp,
        PrimaryButton
    },
    beforeMount() {
        this.getProfileInformations()
    }
}
</script>