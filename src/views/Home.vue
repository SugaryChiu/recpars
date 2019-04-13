<template>
    <div class="home">
        <h1 class="display-1 white--text mt-5 ml-3" row wrap>Why RecruitParticipants?</h1>
        <v-container class="mt-3 mb-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 ma-3 v-for="benefit in benefits" :key="benefit.title">
                    <v-card>
                        <v-responsive>
                            <v-img
                                :src="benefit.image"
                                aspect-ratio="1.7778"
                            ></v-img>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{ benefit.title }}</h3>
                                    <div> {{ benefit.text }} </div>
                                </div>
                            </v-card-title>
                        </v-responsive>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        
        <div>
            <h1 class="display-1 primary--text text-md-center mt-5 ml-3">Featured Stories</h1>
            <v-container class="my-3">
                <v-layout row wrap align-center>
                    <v-flex xs12 sm12 md12 lg10 offset-lg1 xl10 offset-xl1>
                        <v-carousel active-class height="600" interval="2000">
                            <v-carousel-item v-for="story in stories" :key="story.title" :src="story.src" cycle="true">
                                <v-sheet color="rgb(0,0,0,0.2)" fill-height>
                                    <sheet-footer class="white--text">
                                        <span class="heading display-1 ml-1">{{ story.title }}</span>                                        
                                    </sheet-footer>
                                </v-sheet>
                            </v-carousel-item>
                        </v-carousel>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            benefits: [
                { title: 'Contribution', text: ' Share your time with your community to contribute to science together', image: 'home/vrglasses.jpg'},
                { title: 'Interests', text: ' Involve in various tasks to experience scientific investigation methods', image: 'home/videogame.jpg'},
                { title: 'Compensation', text: 'Get paid at your spare time. Payment varies $15-$300 depending on project', image: 'home/money.jpg'}
            ],
            stories: [
                { title: 'Vascular MRI helps senior communities reduce health risks', src: 'home/oldpeople.jpg'},
                { title: 'Advanced imaging technology boosted by volunteers', src: 'home/imaging.jpg'},
                { title: 'Psychology and stronger education', src: 'home/education.jpg'},
            ]
        }
    }
}
</script>
