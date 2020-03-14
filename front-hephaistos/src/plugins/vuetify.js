import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      edit: 'mdi-dropbox'
    }
  },
  theme: {
    dark: true
  }
})
