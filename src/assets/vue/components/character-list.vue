<template id="character-list">
  <f7-list>
    <f7-list-item v-for="character in characters" :key="character.id" :link="'/character/' + character.id" :title="character.name" view="#main-view" panel-close></f7-list-item>
  </f7-list>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter } from 'framework7-vue';

  export default {
    name: 'character-list',
    computed: mapGetters(['characters']),
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter
    }
  }
</script>