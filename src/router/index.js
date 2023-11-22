// define router 

import {createRouter,createWebHistory} from 'vue-router'
import home from '../view/home.vue'
import post from '../view/post.vue'
import album from '../view/album.vue'
import userInfor from  '../components/userInfor.vue'
import postById from '../components/postById.vue'
import photoAlbum from '../components/photoAlbum.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            component: home
        },
        {
            path: '/post',
            component: post
        },
        {
            path: '/post/:id',
            component: postById
        },
        {
            path: '/album',
            component: album
        },
        {
            path: '/user/:id',
            component: userInfor
        },
        {
            path: '/album/useralbId=:userId/:id',
            component: photoAlbum
        }
    ]
})

export default router