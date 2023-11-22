//https://jsonplaceholder.typicode.com/albums
//https://jsonplaceholder.typicode.com/photos

import {defineStore} from 'pinia'
import axios from 'axios'

export const albums = defineStore('albums',{
    state:() => ({
        albumStore : [],
        photoId : []
    }),
    actions:{
        async getAlbum(){
            try{
                const res = await axios.get('https://jsonplaceholder.typicode.com/albums')
                this.albumStore = res.data
            }catch(error){
                console.log(error)
            }
        },
        async getPhoto(id){
            try{    
                const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
                this.photoId = res.data
            }catch(error){
                console.log(error)
            }
        }
    }
})