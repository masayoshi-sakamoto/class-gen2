import Vue from 'vue'
import ja from 'vee-validate/dist/locale/ja.json'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Object.keys(rules).forEach((key) => {
  const value: any = rules
  extend(key, value[key])
})

localize('ja', ja)
