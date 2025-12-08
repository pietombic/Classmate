<template>
    <div class="small_circle">
        <p class="center_text">{{ className }}</p>
    </div>
</template>
<script>
export default {
    name: "ClassCircle",
    props: {
        className: {
            type: String,
            default: ""
        }
    }
}
</script>
<style scoped>
.small_circle {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    background-color: #444;
    margin: 20px auto;
    display: grid;
    align-items: center;
}

.center_text {
    text-align: center;
    margin: 0 !important;
}
</style>