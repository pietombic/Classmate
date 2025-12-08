<template>
    <!-- TODO: cambiare colore al border degli "attirbuti" (es. anno scolastico e nome professore) -->
    <div class="container-fluid">
        <!-- PARTE SINISTRA: filtri-->
        <div class="venticinque left_col" id="filters_col">
            <p id="filter_col_name_label" class="name_of_column">Filters</p>
            <br /><br /><br />
            <!-- numero appunti -->
            <p id="numero_appunti_visualizzati"></p>
            <br />

            <!-- anno scolastico-->
            <p>Anno scolastico:</p>
            <div id="anni_scolastici" class="filters">
                <div v-for="anni in filtri.anni" :key="anni">
                    <input class="filtro" :value="anni" v-model="anno" name="filtroAnno" type="radio" /><label>{{
                        anni
                        }}</label>
                </div>
            </div>

            <!-- materie -->
            <p>Materia:</p>
            <div id="materie" class="filters">
                <div v-for="sub in filtri.materie" :key="sub">
                    <input class="filtro" :value="sub" v-model="materia" name="filtroMateria" type="radio" /><label>{{
                        sub
                        }}</label>
                </div>
            </div>

            <!-- professori -->
            <p>Professori:</p>
            <div id="professori" class="filters">
                <div v-for="teac in filtri.professori" :key="teac">
                    <input class="filtro" :value="teac" v-model="professore" name="filtroProfessore"
                        type="radio" /><label>{{
                            teac
                        }}</label>
                </div>
            </div>
            <button id="apply_filters" class="custom-button" v-on:click="getAppunti">Apply Filters</button>
            <button id="apply_filters" class="custom-button" v-on:click="reset">Reset Filters</button>
        </div>

        <!-- PARTE DESTRA: appunti -->
        <div class="settantacinque right_col scrollable">
            <div class="cardsContainer">


                <VerticalCard v-for="note in appunti" componentLabel="Note" :imageSrc="note.foto"
                    :title="note.argomento" :subject="note.materia" :description="`${note.nome} ${note.cognome}`"
                    openButtonText="Open" editButtonText="Elimina" :link_for_button="note.foto"
                />

                <div v-if="appunti.length == 0" style="display: flex; flex-direction: column; justify-content: center; max-width: 500px; margin: 0 auto;">
                    <img src="../imgs/website-empty-pages-2.png" alt="Empty page image" style="width: 100%; object-fit: cover;">
                    <h4 style="text-align: center;">Niente da vedere qui</h4>

                </div>


                <!-- <div v-for="appunto in appunti" class="card counter" :key="appunto.id">
                    <div class="first_part_note">
                        <p class="subject-par" id="subject-note-storia">
                            {{ appunto.materia }}
                        </p>
                        <p id="topic-note-ripasso-informatica">
                            {{ appunto.argomento }}
                        </p>
                        <div class="cards_element">
                            <p>{{ appunto.anno }}</p>
                            <p>{{ appunto.professore }}</p>
                        </div>
                    </div>
                    <div class="second_part_note">
                        <p class="publisher_par" id="publisher-note-pietro-tombaccini">
                        <p>{{ appunto.nome }}</p>
                        <p>{{ appunto.cognome }}</p>
                        </p>
                        <button class="open_note_button">Open</button>
                    </div>
                </div> -->
                <!-- <p>Pagina: {{ pagina }}</p> -->
                <!-- <button v-on:click="nextPage">Next page</button>
                <button v-on:click="previousPage">Previous page</button> -->
                <PrimaryButton v-if="appunti.length !== 0" text="Next page" :isDisabled="fineAppunti" v-on:click="getAppunti"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-button {
    background-color: #FFD700; /* Giallo */
    color: #2a2a2a; /* Nero */
    border: 2px solid #2a2a2a; /* Bordo nero */
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.custom-button:hover {
    background-color: #2a2a2a; /* Nero */
    color: #FFD700; /* Giallo */
    transform: scale(1.05);
}

.custom-button:active {
    background-color: #FFA500; /* Arancione per l'effetto di clic */
    border-color: #FFA500;
}


input[type="checkbox"] {
    width: 1.3em;
    height: 1.3em;
    background-color: var(--background-color-dark-mode-3);
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid var(--border-color-dark-mode);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    transition: 0.4s ease-in-outs;
}

input[type="checkbox"]:checked {
    background-color: var(--background-color-checkbox);
}

.card {
    height: fit-content;
    width: 250px;
    border: 1px solid var(--border-color-dark-mode);
    padding: 10px;
    display: flex;
    flex-direction: column !important;
    border-radius: 17px;
    transition: ease-in-out 0.15s;
    background-color: var(--background-color-dark-mode-2) !important;
}

.card * {
    color: var(--font-color-dark-mode) !important;
}

.card:hover {
    transform: scale3d(1.04, 1.04, 1.04);
}

.cardsContainer {
    width: 70%;
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 4vh;
    padding: 60px 20px 20px 0;
    position: absolute;
    bottom: 0;
    height: 85vh;
    overflow: scroll;
    z-index: 1;
    right: 0;
}

.card p:nth-child(1) {
    height: 100%;
    font-size: 14px;
}

.card p:nth-child(2) {
    font-size: 23px;
}

.card p:nth-child(3) {
    font-size: 11px;
}

.cards_element {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    height: fit-content;
}

.cards_element p {
    font-size: 14px !important;
    border: 0.5px solid var(--border-color-dark-mode-hover);
    padding: 3px 10px;
    border-radius: 15px;
    transition: ease-in-out 0.2s;
}

.cards_element p:hover {
    background-color: #000;
    color: var(--font-color-dark-mode);
}

.publisher_par {
    font-size: 15px;
    margin: auto 0;
}

.open_note_button:hover {
    background-color: var(--background-color-dark-mode-3);
    color: var(--font-color-dark-mode);
}

.first_part_note {
    background-color: var(--background-color-dark-mode-3);
    padding: 10px;
    border-radius: 15px;
    height: fit-content;
}

.second_part_note {
    display: flex;
    justify-content: space-between;
    min-height: 25%;
    max-height: 25%;
    align-items: center;
    width: 90%;
    margin: 20px auto;
}

.name_of_column {
    font-size: 25px;
    margin: 0 auto;
    width: 100%;
    position: sticky;
    top: 0;
    text-align: center;
    padding: 20px;
    background: linear-gradient(0deg,
            transparent,
            var(--background-color-dark-mode) 90%);
}

#filters_col {
    width: 23%;
}

#filters_col label {
    display: inline-block;
    align-items: center;
    margin: 5px 10px;
    color: var(--font-color-dark-mode);
    /*    margin-left: 10px;*/
}

.filters {
    padding: 10px;
    border-radius: 15px;
    height: fit-content;
    width: 100%;
    margin-bottom: 25px;
}

#filters_col p {
    margin-bottom: 5px;
}

#reset_filters {
    width: 100%;
    color: var(--font-color-dark-mode);
    border: 1px solid var(--border-color-dark-mode-hover);
    border-radius: 15px;
    background-color: transparent;
}
</style>

<script>
import axios from 'axios'
import VerticalCard from '../components/VerticalCard.vue'
import PrimaryButton from '../components/PrimaryButton.vue';

export default {
    name: "NotesView",
    data() {
        return {
            appunti: [],
            filtri: [],
            //binding
            anno: null,
            materia: null,
            professore: null,
            //pagina
            pagina: 0,
            skip: 0,
            fineAppunti: false
        };
    },
    beforeMount() {
        this.getAppunti()
    },
    components: {
        VerticalCard,
        PrimaryButton
    },
    methods: {
        async getAppunti() {
            let params = {
                email: //email,
            }
            
            //Filtri
            if (this.anno != null) {
                params._anno = this.anno 
                this.appunti = []
            }
            if (this.professore != null) {
                params._professore = this.professore
                this.appunti = []
            }
            if (this.materia != null) {
                params._materia = this.materia
                this.appunti = []
            }

            if (this.appunti.length != undefined) {
                this.skip = this.appunti.length;
            }
            params.pagina = this.skip;

            let token = localStorage.getItem('token')
            await axios.get('http://localhost:3000/api/appunti',
                {
                    params: params,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                .then(risposta => {
                    if (risposta.data.data.appunti.length < 2) {
                        if(risposta.data.data.appunti.length > 0) {
                            this.appunti.push(...risposta.data.data.appunti);
                            this.filtri = risposta.data.data.filtri
                        }
                        this.fineAppunti = true
                    }
                    else {
                        this.appunti.push(...risposta.data.data.appunti);
                        this.filtri = risposta.data.data.filtri
                    }
                })
                .catch(err => (console.log("errore: ", err)))
        },
        reset() {
            this.anno = null,
            this.materia = null,
            this.professore = null;
            this.getAppunti()
        },
        nextPage() {
            this.pagina += 1;
            this.getAppunti();
        },
        previousPage() {
            if (this.pagina > 0) {
                this.pagina -= 1;
                this.getAppunti();
            }
        }
    }
};
</script>


<!-- {
    "data": {
        "appunti": [
            {
                "id": 55,
                "materia": "italiano",
                "anno": 1,
                "argomento": "Pascoli",
                "professore": "brunella tombetti",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_55.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=2706cc2286df7b1f717e568fae8984a11f34d29f8a8f9e831f1355c230bef28f&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Giuliano",
                "cognome": "Manzi"
            },
            {
                "id": 13,
                "materia": "informatica",
                "anno": 3,
                "argomento": "C#",
                "professore": "toni greco",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_13.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=de98c0a4ae56d38026bda15d30056af7210aaf9746d131aa579ec322b0c808e1&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Mario",
                "cognome": "Rossi"
            },
            {
                "id": 10,
                "materia": "informatica",
                "anno": 5,
                "argomento": "blazor",
                "professore": "toni greco",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_10.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=e97cdb4e95cea5ae8cc21f7475643fafb8f9289d248d2e9db43dcaeac47443a7&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Giuliano",
                "cognome": "Manzi"
            },
            {
                "id": 11,
                "materia": "italiano",
                "anno": 4,
                "argomento": "leopardi",
                "professore": "brunella tombetti",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=e45f285acf7d57cba6ffd0cdf148a2cde5d28fdeb0b8bfe4665b776368f6a517&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Mario",
                "cognome": "Rossi"
            },
            {
                "id": 15,
                "materia": "sistemi e reti",
                "anno": 3,
                "argomento": "Server",
                "professore": "francesco tappi",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_15.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=5949a5e223d814e24d2dff5f6679963ba69662e35035d72cfe979d00f6131407&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Giuliano",
                "cognome": "Manzi"
            },
            {
                "id": 14,
                "materia": "informatica",
                "anno": 3,
                "argomento": "HTML",
                "professore": "francesco tappi",
                "foto": "https://class-mate.s3.eu-north-1.amazonaws.com/appunti/appunti_14.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODUZEUQ2A2DDDHB%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240529T103736Z&X-Amz-Expires=3600&X-Amz-Signature=17b4eaaaf7f65b55981dde21be620806cad5b6094e6dd47a6fe2ffc9c701089e&X-Amz-SignedHeaders=host&x-id=GetObject",
                "nome": "Giuliano",
                "cognome": "Manzi"
            }
        ],
        "filtri": {
            "materie": [
                "informatica",
                "italiano",
                "sistemi e reti"
            ],
            "professori": [
                "brunella tombetti",
                "francesco tappi",
                "toni greco"
            ],
            "anni": [
                1,
                3,
                4,
                5
            ]
        }
    }
} -->