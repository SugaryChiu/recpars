<template>
  <div class="dashboard">
    <h1 class="subheading primary--text">Recruiting studies</h1>
      <v-container class="my-5">

        <v-layout row class="mb-3">
          <v-tooltip top>
            <v-btn small flat class="primary" @click="sortBy('title')" slot="activator">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase"> by study name</span>
            </v-btn>
            <span>Sort projects by project name</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn small flat class="primary" @click="sortBy('group')" slot="activator">
              <v-icon left small>group</v-icon>
              <span class="caption text-lowercase"> by group</span>
            </v-btn>
            <span>Sort projects by group</span>
          </v-tooltip>
        </v-layout>

        <v-card flat v-for="study in studies" :key="study.title">
        <!-- TODO: dig here for `` and integral compensation sort -->
          <v-layout row wrap :class="`pa-3 study ${study.compensation}`">
            <v-flex xs12 md6>
              <div class="cpation primary--text">Study title</div>
              <div>{{study.title}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="cpation primary--text">Group</div>
              <div>{{study.group}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="cpation primary--text">Date</div>
              <div>{{study.date}}</div>
            </v-flex>
            <v-flex xs2 sm4 md2>
              <div class="right"> 
                <v-chip small :class="`${study.compensation} white--text cpation my-2`">{{ study.compensation }}</v-chip>
              </div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-container>
  </div>    
</template>

<script>
import db from '@/fb'

export default {
  data(){
    return {
      studies: []
    }
  },
  methods: {
    sortBy(prop){
      this.studies.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
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

<style>
.project.high{
  border-left: 4px solid #3cd1c2;
}
.project.medium{
  border-left: 4px solid orange;
}
.project.low{
  border-left: 4px solid tomato;
}
.v-chip.high{
  background: #3cd1c2;
}
.v-chip.medium{
  background: orange;
}
.v-chip.low{
  background: tomato;
}
</style>