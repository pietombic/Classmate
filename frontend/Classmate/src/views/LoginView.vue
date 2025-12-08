<template>

    <div class="flex_center">
        <h5 style="text-align: center; margin: 40px 0">Welcome! <strong style="color: #a7f">Log in</strong> to start exploring new
            possibilities</h5>
        <InputBoxText text="Email" type="text" />
        <InputBoxText text="Password" type="password" />
        <PrimaryButton style="padding: 10px 30px" text="Login" />
    </div>

</template>
<script>

import InputBoxText from '../components/InputBoxText.vue'
import PrimaryButton from '../components/PrimaryButton.vue'
export default {
    components: {
        InputBoxText,
        PrimaryButton
    }
}
</script>
<style scoped>
.flex_center {

    display: grid;
    align-items: center;
    width: 30%;
    margin: 0 auto;
    background-color: var(--background-color-dark-mode-2);
    padding: 20px;
}
</style>