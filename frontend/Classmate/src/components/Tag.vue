<template>
    <p class="tag">{{ text }}</p>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
            default: ""
        }
    }
}
</script>
<style scoped>
.tag {
    padding: 5px 10px;
    background-color: var(--background-color-dark-mode-4);
    border-radius: 10px;
}
</style>