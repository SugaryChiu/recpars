<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign up</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="mail_outline" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                                          type="password" required v-model="password" :rules="passwordRules">
                            </v-text-field>
                            <v-text-field prepend-icon="person" name="name" label="Name" id="name"
                                          type="name" required v-model="name" :rules="nameRules">
                            </v-text-field>
                            <v-flex>
                                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                                <v-text-field prepend-icon='attach_file' name = "picture" label="Select Profile Picture" id="picture"
                                            v-model="imageName" @click='pickFile'>                          
                                </v-text-field>
                                <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/*"
                                    @change="onFilePicked"
                                >                                
                            </v-flex>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <span class="grey--darken-1--text">Existing user?</span>
                        <v-btn flat class="primary--text" to="/signin">Sign in</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit">Add user</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            name: '',
            imageUrl: '',
            imageName: '',
            imageFile: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v =>
                    v.length >= 3 ||
                    'Name must be greater than 3 characters'
            ]
        };
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},                
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password,
                    displayName: this.name,
                    photoFile: this.imageFile
                });
            }
        },
    }    
}
</script>