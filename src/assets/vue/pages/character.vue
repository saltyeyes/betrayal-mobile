<template id="page-character">
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>{{ characterInfo.name }}</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:settings_backup_restore" @click="resetCharacter({characterId})"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <div class="card">
      <div class="card-header">Stats</div>
      <div class="card-content">
        <div class="list">
          <ul>
            <stat-tracker v-for="stat in stats" :statId="stat.id" :characterId="characterId" :key="stat.id"></stat-tracker>
          </ul>
        </div>
      </div>
    </div>
    <f7-block strong>
      <f7-block-title>{{ characterInfo.name }}</f7-block-title>
      <f7-block-header>{{ characterInfo.race }} {{ characterInfo.class }}</f7-block-header>
      <p>Special: {{ characterInfo.special.name }}</p>

    </f7-block>
  </f7-page>
</template>

<script>
  import StatTracker from '../components/stat-tracker.vue'
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader } from 'framework7-vue';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'page-character',
    components: {
      StatTracker,
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader
    },
    created: function() {
      this.characterId = this.$f7route.params.charId.toString()
      console.log("Char ID: " + this.$f7route.params.charId.toString())
    },
    methods: {
      ...mapActions(['resetCharacter'])
    },
    computed: {
      characterInfo: function () {
        return this.characters[this.characterId];
      },
      ...mapGetters(['stats', 'characters'])
    },
  }
</script>
