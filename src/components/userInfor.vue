<template>
    <v-container fluid>
        <v-card v-if="storeUser">
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar color="grey-darken-1"></v-avatar>
                </template>
                <v-list-item-title>{{ storeUser.name }}</v-list-item-title>
                <v-list-item-title>Username: {{ storeUser.name }}</v-list-item-title>
            </v-list-item>
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="6" md="6">
                        <v-list-item-title>The Information</v-list-item-title>
                        <v-list-item>
                            Email : {{ storeUser.email }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            Phone : {{ storeUser.phone }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            Website : {{ storeUser.website }}
                        </v-list-item>
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                        <v-list-item-title>The Job</v-list-item-title>
                            <v-list-item>
                                Company : {{ storeUser.company.name }}
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                catchPhrase : {{ storeUser.company.catchPhrase }}
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                business : {{ storeUser.company.bs }}
                            </v-list-item>
                            <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                        <v-list-item-title>The Address</v-list-item-title>
                        <v-list-item>
                            street : {{ storeUser.address.street }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            city : {{ storeUser.address.city }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            suite : {{ storeUser.address.suite }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            zipcode : {{ storeUser.address.zipcode }}
                        </v-list-item>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
    import {useRoute} from 'vue-router'
    import {posts} from '../store/post'
    import { ref, watch } from 'vue'
    import {user} from '../store/user'
    
    export default {
        setup(){
            const userPost = posts()
            const route = useRoute()
            const userId = user()
            const storeUser = ref(null)

            watch(()=> route.params.id,
                async (newId) => {
                    try{
                        await userPost.getPost()
                        await userId.userApi()
                        storeUser.value = userId.userStore.find(index => index.id == newId)
                    }catch(error){
                        console.log(error)
                    }
                },
                {
                    immediate : true
                }
            )

            return{
                route,
                storeUser
            }
        }
    }
</script>