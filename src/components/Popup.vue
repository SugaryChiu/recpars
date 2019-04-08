<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">Add new study</v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Study</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Description" v-model="content" prepend-icon="pencil" :rules="inputRules"></v-textarea>
                    <v-text-field label="Compensation" v-model="compensation" prepend-icon="money" :rules="inputRules"></v-text-field>
                    <v-menu>
                        <v-text-field :rules="inputRules" :value="formattedDate" slot="activator" label="Date" prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add study</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'

export default {
    data() {
        return {
            title: '',
            content: '',
            compensation: '',
            date: null,
            inputRules:[
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            loading: false,
            dialog: false
        }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()){
                this.loading = true;

                const study = {
                    title: this.title,
                    content: this.content,
                    date: format(this.due, 'Do MMM YYYY'),
                    group: 'Runjia Zhao',
                    compensation: 'high',
                }

                db.collection('studies').add(study).then( () => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('studyAdded')
                })
            }
        }
    },
    computed: {
        formattedDate(){
            return this.due ? format(this.due,'Do MMM YYYY') : ''
        }
    }
}
</script>
