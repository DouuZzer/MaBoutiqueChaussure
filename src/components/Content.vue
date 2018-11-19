<template>
    <div>
        <section class="content-section" v-for="item in sections" v-bind:key="item.id" v-bind:id="item.id">

            <div class="bloc-accueil" v-if="item.title === 'Accueil'">
                <img class="img-accueil" src="../assets/images/SHOES-LOGO.png" alt="">
                <h1 class="main-title" > Bienvenue {{prenom}} </h1>
                <p class="intro-accueil">Commencez vos achats dès maintenant !</p>
            </div>
            
            
            <h1 v-else>{{item.title}}</h1>
            <div class="item-bloc col-sm-12" v-if="item.additionalEl != null">
                <div class="item-shoes" v-for="itemShoes in paginatedData" v-bind:key="itemShoes['.key']">
                    
                    <p>{{itemShoes.marque}} <span>- {{itemShoes.modele}}</span> à {{itemShoes.prix}} €</p>
                    <div class="bloc-img">
                        <font-awesome-icon class="add-icon" @click="addInShoppingBasket(itemShoes)" :id="itemShoes['.key']" icon="plus" />
                        <img class="img-shoes" :src="itemShoes.img" :alt="itemShoes.modele" />
                    </div>
                </div>
            </div>
            <div class="btn-bloc" v-if="item.additionalEl != null">
                <button class="btn-default btn-pagination" @click="prevPage">
                    <font-awesome-icon class="icon-pagination" icon="angle-double-left" />
                </button>
                <button class="btn-default btn-pagination" @click="goToPageByNumber(n)" v-for="n in pageCount" :key="n['.key']" > {{n}} </button>
                <button class="btn-default btn-pagination" @click="nextPage">
                    <font-awesome-icon class="icon-pagination" icon="angle-double-right" />
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
const fb = require('../firebaseConfig.js')

export default {
    props: { 
        size: { 
            type: Number, 
            required: true, 
            default: 8
        },
        prenom: String
    },    
    data(){
        return {
            sections: [
            {id: "home", title: "Accueil", additionalEl: null},
            {id: "shop", title: "La Boutique", additionalEl: "Mon Shop"}
            ],
            pageNumber: 0
        }
    },
    firebase: {
        shoes: fb.shopCollection
    },
    methods:{
        nextPage: function(){
            console.log(this.pageCount)
            if(this.pageNumber < this.pageCount - 1){
                this.pageNumber++;
            }
        },
        prevPage: function(){
            console.log(this.pageNumber)
            if(this.pageNumber > 0){
                this.pageNumber--;
            }
        },
        goToPageByNumber: function(n){
            this.pageNumber = n - 1
            console.log(this.pageNumber)
        },
        addInShoppingBasket: function(itemPanier) {
            var ID = itemPanier.marque.substring(0,3).toUpperCase() + "-" + new Date().toLocaleDateString('fr-EU', {year: 'numeric',month: 'numeric',day: 'numeric',hour: 'numeric',minute: 'numeric',second: 'numeric'}).replace(/\D/g, "")
            fb.usersCollection.doc(this.$store.state.currentUser.uid).collection('panier').doc(ID).set({
                id: ID,
                marque: itemPanier.marque,
                modele: itemPanier.modele,
                img: itemPanier.img,
                prix: itemPanier.prix
            }).then( ref => {
                alert( itemPanier.marque + " - " + itemPanier.modele + " a été ajouté au panier.");
                console.log('Ajout réussi en base de donnée')
                this.$store.dispatch('fetchUserPanier')
            }).catch( err => {
                console.log(err)
            })

            console.log(this.$store.state.userPanier )
            //this.$store.dispatch('getPanier')
            //console.log(this.$store.state.userPanier)
            
        }
    },
    computed: {
        paginatedData() {
            
            const start = this.pageNumber * this.size, end = start + this.size;
            return this.shoes.slice (start, end); 
        },
        pageCount(){
            let l = this.shoes.length, s = this.size;
            return Math.ceil(l/s);
        },
        ...mapState(['userProfile'])
  
    }
}
</script>

<style scoped> 
    

    .item-bloc {
        margin-top: 15vh;
    }

    .item-shoes {
        display: inline-block;
    }
    .bloc-img {
        position: relative;
        height: 200px;
        width: 200px;
        display: inline-block;
        overflow: hidden;
        border: solid 1px #2bc43d;
    }
    .bloc-img:hover {
        filter: opacity(50%);
    }
    .img-shoes {

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: block;
        max-width: 100%;
        margin: auto;
    }

    /* BLOC BOUTON */
    .btn-bloc {
        margin-top: 50px;
        display: inline-flex;
        text-align: center;
    }

        /* BOUTON DE PAGINATION */
        .btn-pagination {
                color: #2bc43d;
                padding: 0;
                font-size: 30px;
                height: 40px;
                width: 40px;
                border: 0px;
        }
            /* SURVOL DES BOUTONS */
            .btn-pagination:hover {
                background-color: #DAF7A6;
                
            }

            /* SURVOL DES BOUTONS */
            .btn-pagination:focus {
                outline: none;
                
            }

        /* ICON FLECHES */
        .icon-pagination {
            display: block;
            position: inherit;
            margin: auto;
            transform: none;
            
        }

    /* ACCUEIL BLOC */
    div.bloc-accueil {
        color: white;
    }
    .img-accueil {
        margin-top: 15vh;
        width: 30%;
    }
    
    .main-title {
        font-size: 10vw;
        font-family: "Marker Felt", fantasy
    }

    .intro-accueil {
        font-size: 4vw;
        font-style: italic;
        font-family: "Marker Felt", fantasy;
        color:beige;
    }

    .add-icon {
        position: absolute;
        display: none;
        top: 10px;
        right: 10px;
        color: #2bc43d;
        font-size: 30px;
        z-index: 5;
    }

    .bloc-img:hover .add-icon {
        display: block;
    }


    

</style>


