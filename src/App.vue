<template>
  <div id="app">
    <myLoader></myLoader>
    <myHeader v-if="currentUser"></myHeader>
    <div id="scrolling-div" class="content-page">
      <router-view :prenom="userProfile.prenom" :panier="userPanier"></router-view>
    </div>    
  </div>
</template>

<script>
import { mapState } from 'vuex'

import myHeader from '@/components/Header.vue'
import myLoader from '@/components/MyLoader.vue'
import firebase from 'firebase'

export default  {
  name: 'App',
  components: {
    myHeader,
    myLoader
  },
  computed: {
      ...mapState(['currentUser', 'userProfile', 'userPanier'])
  }
}

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-image: url("./assets/accueil-img.jpg");
  background-size: cover;
  overflow: hidden;
}

h1, h2, h3 {
  font-family: "Marker Felt", fantasy;
}

body {
  margin: 0px;
}

div.class-content:nth-child(){
  background-color: darkslategrey;
}

div.content-page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}

section.content-section {
        height: calc(100vh - 90px);
        background-color:white;
        padding: 20px;
    }

    #home {
        background-color: rgba(0,0,0,60%)
    }

    section.content-section:last-child {
        height: calc(100vh);
    }

    section.content-section:nth-child(even) {
        background-color: white;
    }

    section.content-section:nth-child(even) > h1 {
        color: #2bc43d;
    }

    section.content-section > h1 {
        color: white;
        font-size: 60px;
        margin: 0;
    }

    #panier > h1 {
      color: #2bc43d;
    }

    #panier {
      height: calc(100vh - 90px);
      overflow: auto;
      width: 100%
    }

    .item-shoes {
      width: 25%;
    }

    @media (min-width: 320px) and (max-width: 1024px) {
       
        #app {
          overflow: auto;
        }
        .item-shoes {
            width: 50%;
        }

        div.bloc-img {
          width: 30vw !important;
          height: 30vw !important;
        }

        #scrolling-div {
          overflow: auto;
        }

        section.content-section {
            min-height: calc(100vh - 90px) !important;
            height: auto !important;
        }
    }

    @media (min-width: 0px) and (max-width: 320px) {
      div.item-shoes {
            width: 50%;
        }

        section.content-section {
            min-height: calc(100vh - 90px) !important;
            height: auto !important;
        }
        
        
    }

</style>
