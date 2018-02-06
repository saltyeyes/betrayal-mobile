<template id="page-character">
  <f7-page>
    <f7-navbar :bg-color="characterInfo.displayColor">
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>{{ characterInfo.name }}</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:settings_backup_restore" @click="resetCharacter({characterId})"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <div class="card character-info">
      <div class="row">
        <div class="card-avatar col-25"><img :src="imageName" /></div>
        <div class="card-body col-75">
          <div class="card-header">{{ characterInfo.name }}</div>
          <div class="card-content card-content-padding">
            <p>
              <span>{{ characterInfo.race }} {{ characterInfo.class }}</span>
              <span>&mdash;</span>
              <span>Age: {{ characterInfo.age }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
<!--       <div class="card-header">Stats</div> -->
      <div class="card-content">
        <div class="list">
          <ul>
            <stat-tracker v-for="stat in stats" :statId="stat.id" :characterId="characterId" :key="stat.id"></stat-tracker>
          </ul>
        </div>
      </div>
    </div>
    <div class="card special-info">
      <div class="card-header">Special: {{ characterInfo.special.name }}</div>
      <div class="card-content card-content-padding">
        <p><em>{{ characterInfo.special.description }}</em></p>
        <div class="list media-list" v-if="characterInfo.special.options">
          <ul class="special-options">
            <special-option v-for="(option, index) in characterInfo.special.options" :optionId='index' :option='option' :characterId='characterId' :key="index"></special-option>
          </ul>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
  import StatTracker from '../components/stat-tracker.vue'
  import SpecialOption from '../components/special-option.vue'
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader } from 'framework7-vue';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'page-character',
    components: {
      StatTracker,
      SpecialOption,
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader
    },
    created: function() {
      this.characterId = this.$f7route.params.charId.toString()
      console.log("Char ID: " + this.$f7route.params.charId.toString())
    },
    data () {
      return {
        specialOptionChoice: null
      }
    },
    methods: {
      ...mapActions(['resetCharacter'])
    },
    computed: {
      imageName: function() {
        return 'static/images/char-'+this.characterId+'.png'
      },
      characterInfo: function () {
        return this.characters[this.characterId];
      },
      ...mapGetters(['stats', 'characters'])
    },
  }
</script>
