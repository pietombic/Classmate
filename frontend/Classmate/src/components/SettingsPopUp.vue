<template>
    <div class="flex_center">
        <p style="font-size: 20px; text-align: center;">Your settings</p>
        <label for="user_name">Name</label><input id="user_name" type="text">
        <label for="user_surname">Surname</label><input id="user_surname" type="text">
        <label for="user_class">Class</label><input id="user_class" type="text">
        <label for="user_cellular_number">Cellular</label>
        <div class="inline_elements">
            <!-- TODO: sistemare il ToggleCellulare -->
            <input id="user_cellular_number" type="text"><button class="fancy_button">Show:
                T/F</button>

        </div>
        <!-- la scuola si può solo visualizzare, non si puo' modificare -->
        <label for="user_school">School</label><input readonly id="user_school" type="text">
        <PrimaryButton text="Salva" />
    </div>
</template>

<script>
import PrimaryButton from "../components/PrimaryButton.vue"
export default {
    name: "SettingsPopUp",

    components: {
        PrimaryButton
    }
}
</script>


<style scoped>
input[type="text"] {
    display: block;
    background-color: var(--background-color-dark-mode-3);
    border: 1px solid var(--border-color-dark-mode);
    border-radius: 5px;
    margin-bottom: 30px;
    color: var(--font-color-dark-mode) !important;
    height: 40px;
    padding: 10px;
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