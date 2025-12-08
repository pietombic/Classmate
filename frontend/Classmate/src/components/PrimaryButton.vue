<template>
    <button :disabled="isDisabled"  class="primaryButton">{{ text }}</button>
</template>
<script>
export default {
    name: "PrimaryButton",
    props: {
        text: {
            type: String,
            required: true
        },
        isDisabled:{
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.primaryButton {
    background-color: #FFD700;
    color: #1c1c1c;
    border: none;
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

.primaryButton:hover {
    background-color: #1c1c1c;
    color: #FFD700;
    transform: scale(1.05);
}

.primaryButton:active {
    background-color: #FFA500;
    border-color: #FFA500;
}
</style>
