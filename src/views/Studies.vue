<template>
  <div class="studies">
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
          <v-tooltip top>
            <v-btn small flat class="primary" @click="sortBy('compensation')" slot="activator">
              <v-icon left small>money</v-icon>
              <span class="caption text-lowercase"> by compensation</span>
            </v-btn>
            <span>Sort projects by compensation</span>
          </v-tooltip>
        </v-layout>

        <v-expansion-panel class="pa-0">
        <v-expansion-panel-content :class="`ma-0 pa-0 study ${compensationLevel(study.compensation)}`" flat v-for="study in studies" :key="study.title">
        <!-- TODO: dig here for `` and integral compensation sort -->
          <!-- <v-layout row wrap :class="`pa-3 study ${study.compensation}`"> -->
            <div wrap class="ma-0 pa-0" slot="header">
          <v-layout row wrap :class="`ma-0 pa-3`">
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
              <div class="cpation primary--text">Dollars/hour</div>
              <div class=""> 
                <v-chip small :class="`${compensationLevel(study.compensation)} white--text cpation my-2`">{{ study.compensation }} </v-chip>
              </div>
            </v-flex>
          </v-layout>
          </div>
        <v-card>
          <v-card-text class="px-4 primary--text">
            <div class="font-weight-bold">{{ study.date }}</div>
            <div>{{ study.content }}</div>
          </v-card-text>
        </v-card>
          <v-divider></v-divider>
        </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
  </div>    
</template>

<script>
import db from '@/fb'

export default {
  data(){
    return {
      studies: [],
      sortOrder: [-1, 1]
    }
  },
  methods: {
    sortBy(prop){
      var effectOrder = [this.sortOrder[1], this.sortOrder[0]];
      this.sortOrder = effectOrder;
      this.studies.sort((a,b) => a[prop] < b[prop] ? effectOrder[0] : effectOrder[1]);
    },
    compensationLevel(payment){
      if(payment >= 150) {
        return "high";
      }
      else if (payment >= 75) {
        return "medium";
      }
      else {
        return "low";
      }
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
.study.high{
  border-left: 4px solid #3cd1c2;
}
.study.medium{
  border-left: 4px solid orange;
}
.study.low{
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