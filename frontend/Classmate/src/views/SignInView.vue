<template>

    <div class="flex_center">
        <h5 style="text-align: center; margin: 40px 0"> <strong style="color: #a7f">Create your account</strong> to
            start exploring new opportunities</h5>
        <form>
            <InputBoxText text="Email scolastica" type="text" v-model="email" />
            <InputBoxText text="Password" type="password" v-model="password"/>
            <PrimaryButton style="padding: 10px 30px" text="Sign in" v-on:click="login" />
        </form>
    </div>

</template>
<script>

import InputBoxText from '../components/InputBoxText.vue'
import PrimaryButton from '../components/PrimaryButton.vue'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
export default {
    components: {
        InputBoxText,
        PrimaryButton
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            // Your web app's Firebase configuration
            const firebaseConfig = {
                apiKey: //api-key,
                authDomain: //domain,
                projectId: //project,
                storageBucket: //bucket,
                messagingSenderId: //id,
                appId: //appId,
                measurementId: //measurement
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.accessToken)
                localStorage.setItem("token", user.accessToken)
                router.push({ path: '/' })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
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