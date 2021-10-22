<template>
  <v-navigation-drawer v-model="App.state.drawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="logo"> <%= appName %> </v-list-item-title>
        <v-list-item-subtitle class="caption">0.1.0</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav expand>
      <template v-for="menu in App.state.menus">
        <v-list-group v-if="menu.children" :key="menu.id" :prepend-icon="menu.icon" :group="menu.group">
          <template #activator>
            <v-list-item-title v-text="menu.title"></v-list-item-title>
          </template>
          <v-list-item
            v-for="child in menu.children"
            :key="menu.id + '-' + child.id"
            :to="child.to"
            exact
            @click.native="App.state.drawer = null"
          >
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item-group v-else :key="menu.id" color="primary">
          <v-list-item :to="menu.to" exact @click.native="App.state.drawer = null">
            <v-list-item-icon>
              <v-icon v-html="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
