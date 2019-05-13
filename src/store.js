import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/fb'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        displayName: "",
        photoUrl: "profile_default.png"
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setPhotoUrl(state, payload) {
            state.photoUrl = payload;
        },
        resetPhotoUrl(state) {
            state.photoUrl = "profile_default.png";
        },
        setDisplayName(state, payload) {
            state.displayName = payload;
        },
        resetDisplayName(state) {
            state.displayName = "";
        }
    },
    actions: {
        userJoin({ commit }, { email, password, displayName, direction, photoFile }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    updateUserProfile(this, displayName, direction, photoFile);
                    router.push('/myposts');
                })
                // .catch(() => {
                //     commit('setUser', null);
                //     commit('setIsAuthenticated', false);
                //     router.push('/');
                // })
                ;
        },
        userInfoComplete({ commit }, { photoUrl, displayName }) {
            commit('setPhotoUrl', photoUrl);
            commit('setDisplayName', displayName);
        },
        userInfoClear({ commit }) {
            commit('resetPhotoUrl');
            commit('resetDisplayName');
        },
        userLogin({ commit }, { email, password }) {
            firebase
                .auth() 
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    queryUserProfile(this);
                    router.push('/myposts');
                })
                // .catch(() => {
                //     commit('setUser', null);
                //     commit('setIsAuthenticated', false);
                //     router.push('/');
                // })
                ;
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    commit('resetPhotoUrl');
                    commit('resetDisplayName');
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    commit('resetPhotoUrl');
                    commit('resetDisplayName');
                    router.push('/');
                });
        }                
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        },
        authenticatedUser(state) {
            return state.user;
        },
        userPhotoUrl(state) {
            return state.photoUrl;
        },
        userDisplayName(state) {
            return state.displayName;
        },
    },
});

function updateUserProfile(store, displayName, direction, photoFile){
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            // var user = firebase.auth().currentUser;
            // User is signed in.
            var photoExt = photoFile.name.split('.').pop();
            var storageRef = firebase.storage().ref();
            var usersRef = storageRef.child('users');
            var photoRef = usersRef.child(user.uid.concat('/profile.',photoExt));
            var photoUrl = '';
    
            var uploadTask = photoRef.put(photoFile);
            uploadTask.on('state_changed', 
                function(snapshot){},
                function(error){},
                function(){
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        photoUrl = downloadURL;
                        //------------- Store user information in authentication ----------------
                        // user.updateProfile({
                        //     displayName: displayName,
                        //     photoURL: photoUrl
                        // });    
                        //------------- Store user information in database collection ------------
                        const userInfo = {
                            displayName: displayName,
                            direction: direction,
                            photoURL: photoUrl,
                            uid: user.uid
                        }
                        db.collection("users").doc(user.uid).set(userInfo).then();
                        
                        store.dispatch('userInfoComplete', {
                            photoUrl: photoUrl,
                            displayName: displayName
                        });
                    });
                });
    
            // photoRef.put(photoFile)
            //     .then( snapshot => {
            //         snapshot.getDownloadURL().then( url => {
            //             photoUrl = url;
            //         });
            //     })
            //     .catch( () => {
            //         photoUrl = '';
            //     });
            // var message = 'This is my message.';
            // pictureRef.putString(message).then(function(snapshot){
            //     console.log('String uploaded!');
            // });                            
            
        } else {
            // No user is signed in.
        }
    });
}

function queryUserProfile(store) {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            var docRef = db.collection("users").doc(user.uid);
            docRef.get().then( function(doc) {
                store.dispatch('userInfoComplete', {
                    photoUrl: doc.data().photoURL,
                    displayName: doc.data().displayName
                });
            }).catch( function(error) {
                store.dispatch('userInfoClear');
            });            
        } else {
            store.dispatch('userInfoClear');
        }
    });
}