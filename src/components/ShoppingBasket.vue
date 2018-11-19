<template>
    <section id="panier" class="content-section">
        <h1>Panier de {{prenom}} </h1> 
            <table v-if="Total != 0" class="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Marque</th>
                    <th>Modele</th>
                    <th>Prix</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in panier" :key="item['.key']" :id="this">
                        <td> {{ item.id }}</td>
                        <td> {{ item.marque }}</td>
                        <td> {{ item.modele }}</td>
                        <td> {{ item.prix }} €</td>
                        <td><button class="btn btn-danger" @click="deletItem(item.id)"> Supprimer </button></td>
                    </tr>
                    <tr>
                        <td><strong>TOTAL</strong></td>
                        <td></td>
                        <td></td>
                        <td><strong>{{Total}} €</strong> </td> 
                        <td></td>
                        
                    </tr>
                </tbody>
            </table>
            <p v-else> Aucun article dans le panier </p>
    </section>
</template>

<script>
const fb = require('../firebaseConfig.js')

console.log('Je suis dans le panier du user : ')


export default {
    props: {
        prenom: String,
        panier: {},
        total: { 
            type: Number, 
            required: false, 
            default: 0
        },
        idPanier: {
            type: Number,
            default: 0
        }
    },
    data() { 
        return{

        }
    },
    methods:{
          deletItem: function(id){
            fb.usersCollection.doc(this.$store.state.currentUser.uid).collection('panier').doc(id).delete().then( ref => {
                console.log('Suppression réussie')
                this.$store.dispatch('fetchUserPanier')
            }).catch( err => {
                console.log(err)
            })
        }
    },
    computed: {
        Total() {
            var total = 0
            console.log(this.panier.length)
            for( var i = 0; i < this.panier.length; i++ ) {
                total += parseFloat(this.panier[i].prix)
            }
            return Math.round(total.toFixed(2)*100)/100
        },
        incrementTotal: function(el) {
            total += Number(el)
        },
        getIdPanier(){
            
            return this.idPanier++
        }
    }
}
</script>

<style scoped>

h1 {

color: #2bc43d;
}
.table {
    width: 80%;
    margin: 50px auto;
}

td {
    text-align: left;
}
.shopping-basket {
    overflow: auto
}
.item-panier {
    display: block;
    text-align: left
}

.item-panier > * {
    display: inline-block;
    color: black;
}
img {
    width: 100%;
}
</style>


