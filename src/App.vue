<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="blue-grey-darken-3">
      <v-sheet
        color="black"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="blue-grey-darken-4"
          size="64"
        ></v-avatar>

        <div>DavidZin2@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="route"
          link
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-3">
          <v-btn color=black block>Made By David</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="blue-grey-darken-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Home</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import {RouterView} from 'vue-router'

  
  const links = [
    ['mdi-inbox-arrow-down', 'Post' , "/post"],
    ['mdi-delete', 'Albums' , '/album'],
    ['mdi-alert-octagon', 'User', '/'],
  ]

  const drawer = ref(null)
</script>

<script>
  export default {
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
    }),
  }
</script>