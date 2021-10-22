<template>
  <v-app>
    <Loading></Loading>
    <v-main class="grey lighten-3">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'

export default Vue.extend({
  components: {
    Loading
  }
})
</script>
