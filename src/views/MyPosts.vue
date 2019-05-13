<template>
  <div class="myposts">
    <h1 class="subheading primary--text">My Posts</h1>
  <v-container class="my-5">
    <v-expansion-panel>
      <v-expansion-panel-content v-for="post in myPosts()" :key="post.title">
        <div slot="header">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <div>
                {{ post.title }}
              </div>
            </v-flex>
            <v-flex right>
              <div>
                <v-btn flat class="second" @click="deleteStudy(post.id)">
                  <v-icon>delete</v-icon>
                </v-btn>                
              </div>
            </v-flex>
          </v-layout>
        </div>
        <v-card>
          <v-card-text class="px-4 primary--text">
            <div class="font-weight-bold">{{ post.date }}</div>
            <div>{{ post.content }}</div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
  </div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
import { isNull } from 'util';

export default {
  data(){
    return{
      studies: []
    }
  },
  computed: {
  },
  created(){
    db.collection('studies').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type == 'added'){
          this.studies.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if(change.type == 'removed'){
          // ------------- splice works ---------------
          // for(var i = 0; i < this.studies.length; i++) {
          //   if( this.studies[i].id == change.doc.id ) {
          //     this.studies.splice(i, 1);
          //     break;
          //   }
          // }
          // -------------- filter also works ----------------
          this.studies = this.studies.filter(study => {
            return study.id != change.doc.id;
          });
        }
      })
    })
  },
  methods: {
    authenticatedUser() {
        var user = firebase.auth().currentUser;
        if (user !== null && user !== undefined) {
            return user;
        } else {
            return null;
        }
    },
    myPosts(){
      var user = this.authenticatedUser();
      var uid = null;
      if(user !== null){
        uid = user.uid;
        return this.studies.filter(study => {
          return study.uid === uid;
        });      
      } else {
        return [];
      }
    },
    deleteStudy(id){
      db.collection('studies').doc(id).delete().then();
    }
  }
}
</script>
