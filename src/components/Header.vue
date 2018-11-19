<template>
  <div class="header">
      <div class="header-desk">
        <router-link class="logo-link" to="/home"><img src="@/assets/SHOES.png" alt="logo"/></router-link>
        
        <ul v-if="$mq === 'desktop'" class="menu">
            <li v-for="item in menu" v-bind:key="item.id"><a v-on:click="scrollToSection(item.scrollSection)">{{item.text}} </a></li>
            <li><router-link to="/shopping-basket">Mes Achats</router-link></li>
            <li v-on:click="logOut"><router-link to="/login">Se déconnecter</router-link></li>
        </ul>
        <ul v-else class="menu">
            <li><router-link to="/home"><font-awesome-icon class="icon-shopping-basket" icon="home" /></router-link></li>
            <li> <router-link to="/shopping-basket"><font-awesome-icon class="icon-shopping-basket" icon="shopping-basket" /></router-link></li>
            <li v-on:click="logOut"><router-link to="/login"><font-awesome-icon class="icon-shopping-basket" icon="power-off" /></router-link></li>
        </ul>
      </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    data () {
        return {
        currentURL: window.location.pathname,
        
        menu: [
            {id: 0,text: 'Accueil', scrollSection: 'home' },
            {id: 1,text: 'La Boutique', scrollSection: 'shop' }
            ]
        }
    },
    methods: {
        scrollToSection: function(el) {
            if(window.location.pathname != '/home'){
                this.$router.replace('home')

                if(window.location.pathname === '/home'){
                    setTimeout(function(){
                        document.getElementById('scrolling-div').scrollTo({
                            top: document.getElementById(el).offsetTop - 90,
                            behavior: 'smooth'
                        });
                    },300);
                }
            }else{
                console.log(document.getElementById(el).offsetTop)
                document.getElementById('scrolling-div').scrollTo({
                    top: document.getElementById(el).offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        },
        logOut: function(){
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        },
        shoppingBasket: function(){
            this.$router.replace('shopping-basket')
        }
    }
}
</script>

/*Not scoped*/

<style>

/* LOGO */
.logo-link {
        float: left;
}

.logo-link > img {
    height: 50px;
}


div.header{
    display: block;
    background-color: black;
    text-align: left;
}

/* STYLE DESKTOP */
div.header-desk > * {
    display: block;
}

div.header-desk {
    padding: 20px;
    height: 90px; 
}

/* TITLE */
div.header-desk > h1 {
    margin-top: 0;
}



/* MENU */
.menu {
    padding: 0px;
    margin: 0;
    float: right;
}

.menu > li {
    display: inline-flex;
    text-align: center;
    list-style: none;
    padding: 15px;
    margin: 5px;
    font-family: "Marker Felt", fantasy;
    font-size: 1.5em;
    
}

li > a {
    cursor: pointer;
    color: white;
}

/* MENU HOVER */
.menu a:hover, a:focus {
    text-decoration: none;
    color: white;
}


div.header-mobile > h1 {
    display: block;
    text-align: center;
}

.-inline--fa {
    font-size: 30px;
    position: absolute;
    margin: 10px;
    transform: translate(0, 50%)
    
}

.fa-shopping-basket {
    right: 15px;
    top:0;
}

.fa-bars {
    left: 15px;
    top: 0;
}

.btn-default {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    border-style: solid;
    border-color: #2bc43d;
}

.btn-default > a {
    text-decoration: none;
    color: #2bc43d;
    font-size: 16px;
}

.icon-shopping-basket {
    display: block;
    float: right;
}

@media screen and (max-width: 320px) {
        .menu {
            padding: 0px;
        }
        .menu > li {
            font-size: 1.5em;
            padding: 10px;
        }
    }
</style>


