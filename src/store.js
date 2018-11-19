import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const fb = require('./firebaseConfig.js')

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        userPanier: {},
        shopShoes: {}
    },
    actions: {
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        fetchUserPanier({commit, state}) {
            fb.usersCollection.doc(state.currentUser.uid).collection('panier').get().then( querySnapshot => {
                commit('setUserPanier', querySnapshot.docs.map( doc => doc.data()))
            });
        },
        clearData({commit}) {
            commit('setCurrentUser', null)
            commit('setUserPanier', {})
            commit('setUserProfile', {})
        },
        getUserProfile({state}){
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                return res.data() 
            }).catch(err => {
                console.log(err)
            })
        },
        getPanier({state }){
            fb.usersCollection.doc(state.currentUser.uid).collection('panier').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
        },

    }, 
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setUserPanier(state, val) {
            state.userPanier = val
        },
        addProductInShoppingBasket(state, val){
            state.userProfile.panier.add(val['.key'])
        }
    }
})