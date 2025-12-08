<template>
    <a :href="link" class="linkButton">{{ text }}</a>
</template>
<script>
export default {
    name: "LinkButton",
    props: {
        text: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
.linkButton {
    background-color: #FFD700;
    color: #1c1c1c;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
}

.linkButton:hover {
    background-color: #1c1c1c;
    color: #FFD700;
    transform: scale(1.05);
}

.linkButton:active {
    background-color: #FFA500;
    border-color: #FFA500;
}
</style>
