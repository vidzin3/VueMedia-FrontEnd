// define user store 
import {defineStore} from 'pinia'
import axios from 'axios'

export const user = defineStore('user',{
    state:() => ({
        userStore:[]
    }),
    actions:{
        async userApi(){
            try{
                const res = await axios.get('https://jsonplaceholder.typicode.com/users')
                this.userStore = res.data
            }catch(error){
                console.log(error)
            }
        }
    }
})