<template id="page-haunt-table">
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link="Back"></f7-nav-left>
      <f7-nav-title>Haunt Checker</f7-nav-title>
    </f7-navbar>
    <div class="card">
      <div class="card-header">Haunt Triggers</div>
      <div class="card-content card-content-padding">
        <f7-list form>
          <f7-list-item smart-select :smart-select-params="{ openIn: 'popover', closeOnSelect: true }" title="Omen">
            <select name="haunt-omens" v-model="localSelectedOmen">
              <option disabled value>Tap to select...</option>
              <option v-for="(omen, index) in hauntOmens" :value="index" :selected="localSelectedOmen == index">{{ omen }}</option>
            </select>
          </f7-list-item>
          <f7-list-item smart-select :smart-select-params="{ openIn: 'popover', closeOnSelect: true }" title="Location">
            <select name="haunt-tiles" v-model="localSelectedTile">
              <option disabled :selected="localSelectedTile < 0 || localSelectedTile == null" value>Tap to select...</option>
              <option v-for="(tile, index) in hauntTiles" :value="index" :selected="localSelectedTile == index">{{ tile }}</option>
            </select>
          </f7-list-item>
        </f7-list>
      </div>
    </div>
    <div class="card" v-if="selectedHaunt != null">
      <div class="card-header">Haunt</div>
      <div class="card-content card-content-padding">
        <h1>Haunt {{ selectedHaunt.id }}</h1>
      </div>
    </div>
    <div class="card" v-if="selectedHaunt != null">
      <div class="card-header">Traitor</div>
      <div class="card-content card-content-padding">
        
      </div>
    </div>
  </f7-page>
</template>

<script>
  import { f7List, f7ListItem, f7Accordion, f7AccordionItem, f7AccordionToggle, f7AccordionContent, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader } from 'framework7-vue';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'page-haunt-table',
    data () {
      return {
        localSelectedOmen: '',
        localSelectedTile: ''
      }
    },
    components: {
      f7List, f7ListItem, f7Accordion, f7AccordionItem, f7AccordionToggle, f7AccordionContent, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7NavRight, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader
    },
    created: function() {
      this.localSelectedOmen = this.selectedOmen == null ? '' : this.selectedOmen;
      this.localSelectedTile = this.selectedTile == null ? '' : this.selectedTile;
    },
    watch: {
      localSelectedOmen (omenId) {
        console.log(omenId);
        this.$store.dispatch('updateSelectedOmen', {omenId});
      },
      localSelectedTile (tileId) {
        console.log(tileId);
        this.$store.dispatch('updateSelectedTile', {tileId});
      }
    },
    methods: {
      ...mapActions(['resetCharacter', 'updateSelectedOmen', 'updateSelectedTile'])
    },
    computed: {
      selectedHaunt () {
        if (this.localSelectedOmen !== '' && this.localSelectedTile !== '') {
          console.log("Haunt ID: ", this.hauntTable[this.localSelectedTile][this.localSelectedOmen]);
        } else {
          console.log("Haunt ID: ", null);
        }

        return this.localSelectedOmen === '' || this.localSelectedTile === '' ? null : this.hauntInfo[this.hauntTable[this.localSelectedTile][this.localSelectedOmen]]
      },
      ...mapGetters(['stats', 'characters', 'hauntOmens', 'hauntTiles', 'selectedOmen', 'selectedTile', 'hauntTable', 'hauntInfo'])
    },
  }
</script>
