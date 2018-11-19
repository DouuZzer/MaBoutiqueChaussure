<template>        
    <div class="login">
            <img src="@/assets/SHOES.png" alt="logo"/>
            <form @submit.prevent>
                <h2>Se connecter</h2>
                <input type="text" v-model="email" placeholder="Email"><br>
                <input type="password" v-model="password" placeholder="Password"><br>
                <button v-on:click="signIn">Connection</button>
                <p>Vous n'avez pas de compte ? Vous pouvez en <router-link to="/sign-up">créer un</router-link>.</p>
            </form>
        
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    name: 'login',
    data: function() {
        return{
            email: '',
            password: ''
        }
    },
    methods: {
        signIn: function(){
            fb.auth.signInWithEmailAndPassword(this.email, this.password).then(creadential => {
                this.$store.commit('setCurrentUser', creadential.user)
                // Récupération des données sur cloud firestore
                this.$store.dispatch('fetchUserProfile')
                this.$store.dispatch('fetchUserPanier')
                this.$router.replace('/home')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.login {
    background:  rgba(0,0,0,60%);
    height: 100%;
    padding: 10%;
}
input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
    min-width: 200px;
}

button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
    min-width: 100px;
}

h2 {
    color: white;
}

p {
    margin-top: 40px;
    font-size: 13px;
    color: white;
}

p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
