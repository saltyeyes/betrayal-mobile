// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'

// OR for Material Theme:
import Framework7Theme from './assets/less/framework7.less'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

import Framework7Icons from 'framework7-icons/css/framework7-icons.css'
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css'

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'

import BetrayalIcons from './assets/sass/betrayal-icons.scss'

import fontawesome from '@fortawesome/fontawesome'
import faBolt from '@fortawesome/fontawesome-free-solid/faBolt'

fontawesome.library.add(faBolt)

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'
import CharacterGrid  from './assets/vue/components/character-grid.vue'
import CharacterList  from './assets/vue/components/character-list.vue'
import StatTracker    from './assets/vue/components/stat-tracker.vue'
import CharacterPage  from './assets/vue/pages/character.vue'
import HauntTablePage from './assets/vue/pages/haunt-table.vue'

import store from './store'

import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter } from 'framework7-vue';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: [
      {
        path: '/character/:charId',
        redirect: function (route, resolve, reject) {
          if (route.params.charId) {
            if (store.getters.characters.hasOwnProperty(route.params.charId.toString())) {
              console.log("Opening page for character with id '" + route.params.charId + "'.");
              resolve("/char/" + route.params.charId);
            } else {
              console.log("No character with id '" + route.params.charId + "' exists.");
              reject();
            }
          } else {
            console.log("No id supplied.");
            reject();
          }
        }
      },
      {
        path: '/char/:charId',
        component: CharacterPage
      },
      {
        path: '/haunt',
        component: HauntTablePage
      }
    ]

  },
  // Register App Component
  components: {
    app: App,
    CharacterGrid,
    CharacterList,
    StatTracker,
    CharacterPage,
    f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter
  },
  store
})
