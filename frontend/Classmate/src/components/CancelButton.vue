<template>
    <img class="img_pointer" src="../imgs/x-sign.png" alt="Cancel">
</template>
<style>
.img_pointer {
    cursor: pointer;
    height: 150px;
    transition: all 0.2s ease-in-out;
}

.img_pointer:hover {
    transform: scale(0.85);
}
</style>
<script>
export default {
    name: "CancelButton"
}
</script>