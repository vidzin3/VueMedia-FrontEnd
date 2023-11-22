<template>
    <v-container fluid>
        <v-card color="black" class="mb-3">
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar rounded="0" image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                </template>
                <v-list-item-title>User</v-list-item-title>
                <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>
                <template v-slot:append>
                    <v-btn class="text-body-2" rounded="0">Follow</v-btn>
                </template>
            </v-list-item>
            <v-card-text>
                <p class="text-body-1">{{ post.postById.title }}</p>
            </v-card-text>
            <v-list-item>
                <template v-slot:prepend>
                    <p>{{ getDay }}</p>
                </template>
                <template v-slot:append>
                    <p>600K view</p>
                </template>
            </v-list-item>
            <v-list-item>
                <div class="justify-self-end">
                    <v-icon @click="toggle" color="red" :icon="isSelected"></v-icon>
                    <span class="subheading me-2">1M</span>
                    <span class="me-1">·</span>
                    <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                    <span class="subheading me-2">5</span>
                    <span class="me-1">·</span>
                    <v-icon class="me-1" icon="mdi-star"></v-icon>
                    <span class="subheading me-2">0</span>
                    <span class="me-1">·</span>
                    <v-icon class="me-1" icon="mdi-arrow-up"></v-icon>
                    <span class="subheading me-2">0</span>
                    <span class="me-1">·</span>
                </div>
            </v-list-item>
        </v-card>
        <v-row>
            <v-col v-for="comment in post.postIdComment" cols="12" lg="6">
                <v-card color="black">
                    <v-list-item>
                        <template v-slot:prepend>
                            <v-avatar image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                        </template>
                        <v-list-item-title class="text-body-2">{{ comment.name }}</v-list-item-title>
                        <v-list-item-subtitle><v-icon size="small">mdi-account</v-icon>{{ comment.email }}</v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="text-body-2" rounded="0">Follow</v-btn>
                        </template>
                    </v-list-item>
                    <v-card-text>
                        <p>{{ comment.body }}</p>
                    </v-card-text>
                    <v-list-item>
                        <div class="justify-self-end">
                            <v-icon color="red" :icon="isSelected"></v-icon>
                            <span class="subheading me-2">{{ count }}</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                            <span class="subheading me-2">5</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-star"></v-icon>
                            <span class="subheading me-2">0</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-arrow-up"></v-icon>
                            <span class="subheading me-2">0</span>
                            <span class="me-1">·</span>
                        </div>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>    
    </v-container>
</template>
<script>
    import {useRoute} from 'vue-router'
    import {posts} from '../store/post'
    import { onMounted, ref, watch } from 'vue'
    import { useDate } from 'vuetify'

    export default {
        setup(){
            const post = posts()
            const route = useRoute()
            const storeComment = ref(null)
            const date = useDate()
            const isSelected = ref("mdi-heart-outline");
            const count = ref(0)

            const toggle = () => {
                if(isSelected.value == "mdi-heart-outline"){
                    isSelected.value = "mdi-heart" 
                    count.value++
                }else{
                    isSelected.value = "mdi-heart-outline"
                    count.value--
                }
            }

            onMounted(async () => {
                await post.getComment()
            })

            const getDay = new Date().toLocaleString()

            watch(() => route.params.id,
                async (newId) => {
                    try{
                        await post.getComment()
                        await post.getpostById(newId)
                        await post.getPostIdComment(newId)
                        storeComment.value = post.comment.filter(index => index.postId == newId)
                    }catch(error){
                        console.log(error)
                    }
                },
                {
                    immediate: true
                }
            )

            return{
                route,
                post,
                storeComment,
                date,
                getDay,
                isSelected,
                toggle,
                count
            }   
        }
    }
</script>