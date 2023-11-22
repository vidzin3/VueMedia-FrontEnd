<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="album in album.albumStore" cols="6" md="4" lg="4">
                <v-card
                :style="{backgroundColor:randomeColor()}"
                >
                <v-list-item>
                    <template v-slot:prepend>
                        <v-avatar image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                        <v-list-item-title>User Albums {{ album.userId }}</v-list-item-title>
                    </template>
                </v-list-item>
                    <v-card-text>
                        <p @click="router.push(`/album/useralbId=${album.userId}/${album.id}`)" class="text-body-1" style="cursor: pointer;">{{ album.title }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { onMounted } from 'vue'
    import {albums} from '../store/albums'
    import {useRouter} from 'vue-router'
    export default {
        setup(){
            const router = useRouter()
            const album = albums()

            function randomeColor(){
                return "hsl(" + Math.random() * 360 + ", 100%, 75% )";
            }

            onMounted(async () => {
                await album.getAlbum()
            })

            return{
                album,
                randomeColor,
                router
            }
        }
    }

</script>