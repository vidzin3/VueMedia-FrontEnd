//https://jsonplaceholder.typicode.com/posts
//https://jsonplaceholder.typicode.com/comments

import axios from 'axios'
import {defineStore} from 'pinia'

export const posts = defineStore('post',{
    state:()=>({
        postStore : [],
        comment:[],
        postById:[],
        postIdComment:[]
    }),
    actions:{
        async getPost(){
            try{
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
                this.postStore = res.data
            }catch(error){
                console.log(error)
            }
        },
        async getComment(){
            try{
                const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
                this.comment = res.data
            }catch(error){
                console.log(error)
            }
        },
        async getpostById(id){
            try{
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                this.postById = res.data
            }catch(error){
                console.log(error)
            }
        },
        async getPostIdComment(id){
            try{
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                this.postIdComment = res.data
            }catch(error){
                console.log(error)
            }
        }
    }
})