<template>
  <div class="groups">
    <h1 class="subheading primary--text">Researchers</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="group in groups" :key="group.uid">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="primary lighten-2">
                <img :src="group.photoURL">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ group.displayName }}</div>
              <div class="grey--text">{{ group.direction }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat class="primary">
                <v-icon small left>message</v-icon>
                <span>contact</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/fb'

export default {
  data(){
    return{
        groups: [
            // uid, name, direction, avatar
            // database fields: uid, displayName, direction, photoURL
            // { name: 'Runjia Zhao', direction: 'Cognitive science', avatar: 'profile1.jpeg' },
            // { name: 'MRI group', direction: 'Medical imaging', avatar: 'MRI.png' },
            // { name: 'Psychology group', direction: 'Developmental psychology', avatar: 'baby.jpeg' },
        ]
    }
  },
  created(){
    db.collection('users').onSnapshot( res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type == 'added'){
          this.groups.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  },
  methods: {
  }
}
</script>
