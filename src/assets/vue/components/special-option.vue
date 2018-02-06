<template id="special-option">
  <li class="special-option" :class="[isChosen?'chosen-option':'not-chosen']">
    <label class="item-content item-radio">
      <input type="radio" name="special-option" :value="optionId" @change="updateChosenSpecialOption()" :disabled="chosenId != -1" />
      <i class="icon icon-radio"></i>
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title">
            <strong>{{ option.name }}</strong>
          </div>
        </div>
        <div class="item-subtitle">
          <span v-for="(delta, statName, index) of option.stats">
            <template v-if="delta>=0">+</template>{{ delta }}
            {{ stats[statName].name }}
            <template v-if="index < Object.keys(option.stats).length - 1">, </template>
          </span>
        </div>
      </div>
    </label>
  </li>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter } from 'framework7-vue';

  export default {
    name: 'special-option',
    props: ['optionId', 'option', 'characterId'],
    // watchers: {

    // },
    computed: {
      checked () {
        return this.characters[this.characterId].special.chosen == this.optionId ? "checked" : "false"
      },
      chosenId () {
        return this.characters[this.characterId].special.chosen
      },
      isChosen () {
        return this.chosenId == this.optionId
      },
      ...mapGetters(['characters', 'stats']),
    },
    methods: {
      updateChosenSpecialOption() {
        this.$store.dispatch('updateChosenSpecialOption', {characterId: this.characterId, optionId: this.optionId});
      },
    },
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter
    }
  }
</script>