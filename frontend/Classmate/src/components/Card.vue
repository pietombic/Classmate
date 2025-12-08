<template>
    <div>
        <header class="note-header">
            <h4 class="no_margin">{{ tipo }}</h4>
        </header>
        <div class="new_notes">
            <div class="element">
                <img class="image" :src="imageSrc" alt="Nota Immagine">
            </div>
            <div class="element">
                <h3>{{ title }}</h3>
                <p v-if="official" class="official_event_icon bg-primary">Official</p>
                <p v-if="description !== null">{{ description }}</p>
                
                <div v-if="professor != null && subject != null" class="tag_container">
                    
                    <Tag v-if="professor != null" :text="professor" />
                    <Tag v-if="subject != null" :text="subject" />
                </div>
                <p>{{ studentName }} {{ studentSurname }}</p>
            </div>
            <div class="functions" style="display: flex; flex-direction: column; gap: 10px; padding: 30px 10px">
                <LinkButton v-if="canOpen" text="Open" link="https://pietrotombaccini.com" class="flex-1 btn btn-dark"
                    @click="openNote"></LinkButton>
                <PrimaryButton v-if="deletable" class="flex-1 btn btn-dark" text="Delete"></PrimaryButton>
            </div>
        </div>
    </div>
</template>

<script>
import PrimaryButton from "../components/PrimaryButton.vue"
import LinkButton from "../components/LinkButton.vue"
import Tag from "../components/Tag.vue"
export default {
    name: 'Card',
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        professor: {
            type: String,
            required: true
        },
        studentName: {
            type: String,
            required: true
        },
        studentSurname: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        canOpen: {
            type: Boolean,
            required: true
        },
        deletable: {
            type: Boolean,
            required: true
        },
        official:{
            type: Boolean,
            required: true
        },
        description:{
            type: String,
            required: false
        }
    },
    methods: {
        openNote() {
            // Azione per aprire la nota
            console.log('Nota aperta:', this.title);
        },
        deleteNote() {
            // Azione per eliminare la nota
            console.log('Nota eliminata:', this.title);
        }
    },
    components: {
        PrimaryButton,
        LinkButton,
        Tag
    }
}
</script>

<style scoped>
.image {
    max-height: 200px;
    object-fit: cover;
    border-radius: 7px;
}

.note-header {
    padding: 0 20px;
    background-color: var(--background-color-dark-mode-3);
    border-bottom: 1px solid var(--border-color-dark-mode-hover);
    border-radius: 10px 10px 0 0;
    color: white;

}

.new_notes {
    width: 100%;
    height: fit-content;
    display: grid !important;
    grid-template-columns: 350px 2fr 1fr;
    transition: .2s ease-in-out;
    position: relative;
    border-radius: 0 0 10px 10px;
    background-color: var(--background-color-dark-mode-3);

}

.no_margin {
    margin: 0 !important;
    padding: 10px 0px;
}

.new_notes img {
    width: 100% !important;
}

.flex-1 {
    flex: 1;
}

.new_notes .element {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-around;
}

.tag_container {
    display: flex;
    gap: 20px;
}
.official_event_icon {
    width: fit-content;
    padding: 10px 30px;
    border-radius: 100px;
}
</style>