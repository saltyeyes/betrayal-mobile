<template>
	<!-- App -->
	<div id="app">
		
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		
		<!-- Left Panel -->
    <f7-panel left reveal theme-dark>
      <f7-view id="left-panel-view">
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block strong>
            <p>Left panel content goes here</p>
          </f7-block>
          <f7-block-title>Baldur's Gate</f7-block-title>
          <character-list></character-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" main>
      <f7-page >
        <f7-navbar>
          <f7-nav-left>
            <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
          </f7-nav-left>
          <f7-nav-title>Betrayal</f7-nav-title>
        </f7-navbar>
        <f7-block-title>Baldur's Gate Characters:</f7-block-title>
        <character-grid></character-grid>
      </f7-page>
    </f7-view>
	
	</div>
</template>

<script>
	import CharacterGrid from './assets/vue/components/character-grid.vue'
	import CharacterList from './assets/vue/components/character-list.vue'
	import CharacterPage from './assets/vue/pages/character.vue'

	import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter } from 'framework7-vue';


	export default {
		components: {
	    CharacterGrid,
	    CharacterList,
	    CharacterPage,
	    f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter
	  }
	}
</script>
