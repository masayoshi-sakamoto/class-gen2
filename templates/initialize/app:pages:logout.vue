<template>
  <v-app>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import LogoutUseCase from '@/usecases/auth/LogoutUseCase'

export default Vue.extend({
  components: {
    Loading
  },
  async fetch() {
    try {
      const usecase = new LogoutUseCase(this.App)
      await usecase.execute()
    } catch (exception: any) {
      this.$nuxt.error(exception)
    } finally {
      this.App.state.clear()
      this.$router.push('/login')
    }
  }
})
</script>
