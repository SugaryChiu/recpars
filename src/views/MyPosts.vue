<template>
  <div class="myposts">
    <h1 class="subheading primary--text">My Posts</h1>
  <v-container class="my-5">
    <v-expansion-panel>
      <v-expansion-panel-content v-for="post in myPosts" :key="post.title">
        <div slot="header">{{ post.title }}</div>
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

export default {
  data(){
    return{
      studies: []
    }
  },
  computed: {
    myPosts(){
      return this.studies.filter(study => {
        return study.group === 'Runjia Zhao'
      })
    }
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
      })
    })
  }
}
</script>
