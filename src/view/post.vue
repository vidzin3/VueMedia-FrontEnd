    <template>
        <v-container fluid>
            <v-overlay
            v-if="loading"
                :model-value="overlay"
                class="align-center justify-center"
                >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
            <v-row v-else>
                <v-col v-for="(poststate,i) in post.postStore" cols="12" md="6" lg="4" :key="i">
                    <v-card
                        :style="{backgroundColor:randomeColor()}"
                        max-width="400"
                        prepend-icon="mdi-twitter"
                        :title="poststate.title"
                    >
                        <template v-slot:prepend>
                            <v-icon size="x-large"></v-icon>
                        </template>

                        <v-card-text @click="router.push(`/post/${poststate.id}`)" class="text-h5 py-2" style="cursor: pointer;">
                        "{{ poststate.body }}"
                        </v-card-text>

                        <v-card-actions>
                            <v-list-item class="w-100">
                                <template v-slot:prepend>
                                    <v-avatar
                                        color="grey-darken-3"
                                        image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                    ></v-avatar>
                                </template>

                                <v-list-item-title v-if="getUserById(poststate.userId)">{{ getUserById(poststate.userId).name }}</v-list-item-title>

                                <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

                                <template v-slot:append>
                                    <div class="justify-self-end">
                                        <v-icon class="me-1" icon="mdi-heart"></v-icon>
                                        <span class="subheading me-2">256</span>
                                        <span class="me-1">·</span>
                                        <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                                        <span class="subheading">45</span>
                                    </div>
                                </template>
                            </v-list-item>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </template>

    <script>
        import { onMounted, ref,computed } from 'vue'
        import {useRouter} from 'vue-router'
        import {posts} from '../store/post'
        import {user} from '../store/user'
        export default {
            setup(){

                const post = posts()
                const users = user()
                const router = useRouter()
                const storeId = ref(null)
                const overlay = ref(true)
                const loading = ref(true)

                const getUserById = (userId) => {
                    return users.userStore.find(user => user.id === userId);
                };
                function randomeColor(){
                    return "hsl(" + Math.random() * 360 + ", 100%, 75% )";
                }

                onMounted(async () => {
                    loading.value = true
                    try{
                        await post.getPost()
                        await users.userApi()
                        storeId.value = users.userStore.filter(index => index.id)
                        // console.log(users.userStore.find(name => name.id))
                        // console.log(post.postStore.find(name => name.userId))
                        if(post.postStore.map(name => name.userId) === users.userStore.map(name => name.id)){
                            console.log(users.userStore.map(name => name.name))
                        }
                    }catch(error){
                        console.log(error)
                    }finally{
                        loading.value = false
                    }
                })

                return {
                    post,
                    storeId,
                    users,
                    getUserById,
                    randomeColor,
                    router,
                    overlay,
                    loading
                }
            }
        }
    </script>