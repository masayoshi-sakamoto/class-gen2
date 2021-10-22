<template>
  <LayoutAuth>
    <v-container fluid fill-height>
      <v-row justify="center" align="center" class="pa-2">
        <v-card max-width="480" width="100%" class="pa-1">
          <v-card-title class="justify-center logo-lg mb-4"><%= appName %></v-card-title>
          <v-card-subtitle class="text-center mb-4">サブタイトル</v-card-subtitle>
          <v-card-text>
            <FormSignin v-model="value" @submit="submit"></FormSignin>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import FormSignin from '@/components/organisms/Form/Signin'
import LoginEntity, { EmptyLoginEntityFactory } from '@/entities/Login'
import LoginUseCase from '@/usecases/auth/LoginUseCase'

interface IData {
  value: LoginEntity
}

export default Vue.extend({
  components: {
    LayoutAuth,
    FormSignin
  },
  data(): IData {
    return {
      value: EmptyLoginEntityFactory()
    }
  },
  head() {
    return {
      title: 'サインイン'
    }
  },
  methods: {
    async submit() {
      try {
        const usecase = new LoginUseCase(this.App)
        this.App.state.loading = true
        if (await usecase.execute(this.value)) {
          this.$router.push('/')
        }
      } catch (exception: any) {
        this.$nuxt.error(exception)
      } finally {
        this.App.state.loading = false
      }
    }
  }
})
</script>
