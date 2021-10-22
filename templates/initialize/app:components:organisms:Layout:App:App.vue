<template>
  <v-app>
    <ToolbarApp></ToolbarApp>
    <NavigationApp></NavigationApp>
    <Loading></Loading>
    <v-main class="grey lighten-3">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import NavigationApp from '@/components/organisms/Navigation/App'
import ToolbarApp from '@/components/organisms/Toolbar/App'

export default Vue.extend({
  components: {
    Loading,
    NavigationApp,
    ToolbarApp
  },
  head() {
    if (this.App.state.menus) {
      const menu = this.App.state.menus
        .flatMap((prop) => (prop.children ? prop.children : prop))
        .find((prop: any) => (prop.to ? prop.to.name === this.$route.name : false))
      if (menu) {
        return {
          title: menu.title
        }
      }
    }
    return {
      title: 'エラー'
    }
  }
})
</script>
