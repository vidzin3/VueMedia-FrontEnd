<template>
    <v-card
        class="mx-auto"
        max-width="500"
        >
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in cards" :cols="card.flex">
                    <v-card>
                        <v-img
                        :src="photo.photoId.url"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        cover
                        >
                            <v-card-title class="text-white" v-text="photo.photoId.title"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import {useRoute} from 'vue-router'
    import {albums} from '../store/albums'
    import {watch,onMounted,ref} from  'vue'
    export default {
        setup(){
            
            const route = useRoute()
            const photo = albums()

            watch(()=>route.params.id,
                async (newId) => {
                    try{
                        await photo.getPhoto(newId)
                    }catch(error){
                        console.log(error)
                    }
                },
                {
                    immediate: true
                }
            )

            const cards = [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            ]

            return {
                route,
                photo,
                cards
            }
        }
    }
</script>