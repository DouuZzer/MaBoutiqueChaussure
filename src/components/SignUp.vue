<template>
    <div class="sign-up">
        <img src="@/assets/SHOES.png" alt="logo"/>
        <h2>Inscription</h2>
        <form @submit.prevent>
  
            <input v-model="signupForm.nom" type="text" placeholder="Nom" id="nom" />
        
            <input v-model="signupForm.prenom" type="text" placeholder="Prénom" id="prenom" />
          
            <input v-model="signupForm.email" type="text" placeholder="you@email.com" id="email" />

            <input v-model="signupForm.password" type="password" placeholder="min 6 characters" id="password" />

            <button v-on:click="signUp">S'inscrire</button>
            <span>ou retour à la page de <router-link to='/login'>connexion</router-link>.</span>
        </form>
      
        
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    name: 'signUp',
    data: function() {
        return{
            performingRequest: false,
            signupForm: {
                nom: '',
                prenom: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signUp: function(){
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(credential => {
                
                this.$store.commit('setCurrentUser', credential.user)

                // create user obj
                fb.usersCollection.doc(credential.user.uid).set({
                    nom: this.signupForm.nom,
                    prenom: this.signupForm.prenom,
                    email: this.signupForm.email
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    this.$store.dispatch('fetchUserPanier')
                    this.$router.replace('/home')
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.sign-up {
    background:  rgba(0,0,0,60%);
    height: 100%;
    padding: 10%;
}

h2, label, p, span {
    color: white;
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

form > * {
    display: block;
    margin: 10px auto;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>

