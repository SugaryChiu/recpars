import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import mdPalette from '@/components/mdTheme/palette'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: mdPalette.primary[500],
    secondary: mdPalette.secondary[500],
    success: mdPalette.success[500],
    error: mdPalette.error[500],
    info: mdPalette.info[500],
  }
})
