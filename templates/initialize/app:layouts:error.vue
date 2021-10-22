<template>
  <LayoutAuth>
    <v-container fluid fill-height>
      <v-row justify="center" align="center" class="pa-2">
        <v-card max-width="480" width="100%" class="pa-1">
          <v-card-title class="justify-center logo-lg mb-4"><%= appName %></v-card-title>
          <v-card-subtitle class="text-center mb-4">サブタイトル</v-card-subtitle>
          <v-card-text class="text-center">
            <div class="logo-lg mb-2">{{ error.statusCode }}</div>
            <div class="mb-4">{{ error.message }}</div>
            <div>{{ error.statusCode === 404 ? pageNotFound : otherError }}</div>
            <div class="mt-10">
              <nuxt-link to="/">トップページに戻る</nuxt-link>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'

export default Vue.extend({
  components: {
    LayoutAuth
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'お探しのページは見つかりません',
      otherError: 'サーバーエラー'
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? 'お探しのページは見つかりません' : 'サーバーエラー'
    return {
      title
    }
  },
  watch: {
    error: {
      handler() {
        if (this.error.statusCode === 401) {
          this.App.state.clear()
          this.$router.push('/login')
        }
      },
      immediate: true
    }
  }
})
</script>
