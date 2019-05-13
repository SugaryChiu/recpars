<template>
    <v-dialog v-if="isAuthenticated" max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">Add new study</v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Study</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Description" v-model="content" prepend-icon="pencil" :rules="inputRules"></v-textarea>
                    <v-text-field label="Compensation" v-model="compensation" prefix="$" suffix="/hour" placeholder="30" prepend-icon="money" :rules="compRules"></v-text-field>
                    <v-menu>
                        <v-text-field :rules="inputRules" :value="formattedDate" slot="activator" label="Date" prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="date"></v-date-picker>
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
import firebase from 'firebase'

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
            compRules:[
                v => v.length >=1 || 'At least 1-digit number'
            ],
            loading: false,
            dialog: false
        }
    },
    methods: {
        submit() {
            var user = this.authenticatedUser();
            if(this.$refs.form.validate() && user!==null){
                this.loading = true;

                const study = {
                    title: this.title,
                    content: this.content,
                    date: format(this.date, 'Do MMM YYYY'),
                    group: this.$store.getters.userDisplayName,
                    compensation: Number(this.compensation),
                    uid: user.uid
                }

                db.collection('studies').add(study).then( () => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('studyAdded')
                })
            }
        },
        authenticatedUser() {
            var user = firebase.auth().currentUser;
            if (user !== null && user !== undefined) {
                return user;
            } else {
                return null;
            }
        }
    },
    computed: {
        formattedDate(){
            return this.date ? format(this.date,'Do MMM YYYY') : ''
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
    },
}
</script>
