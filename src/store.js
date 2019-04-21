import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
    },
    actions: {
        userJoin({ commit }, { email, password, displayName, photoFile }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    updateUserProfile(displayName, photoFile);
                    router.push('/myposts');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userLogin({ commit }, { email, password }) {
            firebase
                .auth() 
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/myposts');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        }                
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    },
});

function updateUserProfile(displayName, photoFile){
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
                        user.updateProfile({
                            displayName: displayName,
                            photoURL: photoUrl
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