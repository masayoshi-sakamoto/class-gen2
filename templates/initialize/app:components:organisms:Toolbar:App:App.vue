<template>
  <v-app-bar app hide-on-scroll flat color="white" dense>
    <v-app-bar-nav-icon @click="App.state.drawer = !App.state.drawer" />
    <v-spacer></v-spacer>
    <v-menu min-width="200">
      <template #activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-avatar size="36" color="grey"><v-icon dark>mdi-account</v-icon></v-avatar>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-for="menu in menus" :key="menu.id" :to="menu.to">
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { subs } from '@/entities/Menu'

export default Vue.extend({
  data() {
    return {
      menus: subs
    }
  }
})
</script>
