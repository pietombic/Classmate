<script>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>

    <div style="display: flex; justify-content: center">
        <nav class="navbar">
            <ul>
                <li>
                    <RouterLink class="centerVertical" to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink class="centerVertical" to="/notes">Notes</RouterLink>
                </li>
                <li>
                    <RouterLink class="centerVertical" to="/events">Events</RouterLink>
                </li>
                <li class="classmate-visible">
                    <p class="centerVertical no_border" to="/classmate">CLASSMATE</p>
                </li>
                <li>
                    <RouterLink class="centerVertical" to="/settings">Settings</RouterLink>
                </li>
                <li>
                    <RouterLink class="centerVertical" to="/account">Account</RouterLink>
                </li>
                <li>
                    <RouterLink class="centerVertical" to="/logout">Log out</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.navbar {
    background-color: var(--background-color-dark-mode-2);
    border-radius: 10px;
    border: 1px solid var(--border-color-dark-mode);
    height: 7vh;
    display: flex;
    align-items: center;
    transition: width 0.2s ease-in-out;
    overflow: hidden;
    margin: 20px 0;
}

.navbar {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

.no_border {
    border: none;
}

.navbar li {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 14%;
    text-align: center;
    margin: 0 10px;
}

.navbar ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    height: 100%;
}

.navbar a {
    color: var(--font-color-dark-mode);
    text-decoration: none;
    padding: 0 10px;
    border-radius: 7px;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    transition: ease-in-out 0.2s;
    border: 1px solid var(--border-color-dark-mode);
}

.navbar a:hover {
    color: var(--font-color-dark-mode);
    border: 1px solid var(--border-color-dark-mode-hover);
}
</style>
