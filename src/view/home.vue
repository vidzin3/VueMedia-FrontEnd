<template>
    <v-progress-linear v-if="loading" indeterminate color="red"></v-progress-linear>
    <v-container
        v-else
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-list lines="two">
                <v-list-subheader color="orange" :title="card"></v-list-subheader>

                <template v-for="n in users.userStore" :key="n">
                  <v-list-item @click="router.push(`/user/${n.id}`)">
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"
                        image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      >
                      </v-avatar>
                    </template>
                    
                    <v-list-item-title :title="`Message ${n}`">{{ n.name }}</v-list-item-title>
                    <v-list-item-title :title="`Message ${n}`" class="text-caption">Username: {{ n.username }}</v-list-item-title>

                    <v-list-item-subtitle title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import {user} from '../store/user'
    import {useRouter} from 'vue-router'

    export default {
        setup(){
            const users = user()
            const cards = ['Today']
            const loading = ref(true)
            const router =  useRouter()

            onMounted(async () => {
                loading.value = true
                try{
                    await users.userApi()
                }catch(error){
                    console.log(error)
                }finally{
                    loading.value = false
                }
            })

            return{
                cards,
                users,
                router,
                loading
            }
        }
    }
</script>