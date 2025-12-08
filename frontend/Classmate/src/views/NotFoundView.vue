<template>
    <div id="not_found_div">
        <img width="500px" src="../imgs/website-empty-pages.png">
        <h2>Oops! The page you're looking for <strong>doesn't exist.</strong></h2>
        <h5>It looks like you've lost your way. Go back to the
            <router-link class="no_underline" to="/">homepage</router-link>
            or try searching again.
        </h5>

    </div>
</template>
<style scoped>
#not_found_div {
    width: 80%;
    height: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
}

.no_underline {
    text-decoration: none !important;
}
</style>
