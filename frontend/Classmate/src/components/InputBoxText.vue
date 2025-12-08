<template>
    <label>{{ text }}</label><input :type="type">
</template>
<script>
export default {
    name: 'InputBoxText',
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        }
    }
}
</script>
<style scoped>
input[type="text"]:focus,
input[type="passworda"]:focus {
    outline: none !important;
    border: 1px solid var(--border-color-dark-mode-hover);

}

input[type="text"],
input[type="password"] {
    display: block;
    background-color: var(--background-color-dark-mode-3);
    border: 1px solid var(--border-color-dark-mode);
    border-radius: 5px;
    margin-bottom: 30px;
    color: #fff !important;

}
</style>