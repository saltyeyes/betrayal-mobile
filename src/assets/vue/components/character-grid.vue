<template id="character-grid">
  <f7-row :no-gap="true">
    <f7-col width=50 v-for="character in characters" :key="character.id">
      <f7-link :href="'/character/' + character.id" :animate="false" no-link-class  >
        <f7-card>
          <f7-card-header><img :src="imageName(character)" class="character-card-avatar" /></f7-card-header>
          <f7-card-content>
            <p class="character-card-title">{{ character.name }}</p>
            <p class="character-card-subtitle">{{ character.race }} {{ character.class }}</p>
            <p class="character-card-special">Special: {{ character.special.name }}</p>
          </f7-card-content>
        </f7-card>
      </f7-link>
    </f7-col>
  </f7-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter } from 'framework7-vue';

  export default {
    name: 'character-grid',
    methods: {
      imageName: function(character) {
        return 'static/images/char-token-'+character.color+'.png'
      },
    },
    computed: {
      ...mapGetters(['characters']),
    },
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter
    }
  }
</script>