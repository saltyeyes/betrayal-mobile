import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

var defaultCharacters = {"1":{"id":1,"color":"yellow","name":"Torskar Stonecleaver","race":"Dwarf","class":"Barbarian","age":130,"special":{"name":"Reckless Attack","description":"When you attack, you may roll 2 additional dice (maximum of 8 dice). If you do, after resolving the attack, take 1 die of physical damage.","combat-mod":{"stats":["might","speed","knowledge","sanity"],"type":"attack","flat":2}},"resets": 0,"stats":{"might":{"steps":[0,4,5,5,6,6,7,8,8],"start":3,"position":3},"speed":{"steps":[0,2,2,2,3,4,5,5,6],"start":5,"position":5},"sanity":{"steps":[0,2,2,3,4,5,5,6,7],"start":3,"position":3},"knowledge":{"steps":[0,2,2,3,3,5,5,6,6],"start":3,"position":3}}},"2":{"id":2,"color":"yellow","name":"Aldan Pyrite","race":"Dwarf","class":"Fighter","age":318,"special":{"name":"Protection","description":"When an adventurer, monster, or NPC on your tile would take any damage, you may choose to take the damage instead."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,6,6,7],"start":4,"position":4},"speed":{"steps":[0,3,4,4,4,5,6,7,8],"start":3,"position":3},"sanity":{"steps":[0,3,3,3,4,5,6,7,8],"start":4,"position":4},"knowledge":{"steps":[0,1,3,3,5,5,6,6,7],"start":3,"position":3}}},"3":{"id":3,"color":"purple","name":"Lia Faen Tlabbar","race":"Drow","class":"Warlock","age":254,"special":{"name":"Eldritch Blast","description":"When you attack, you may use Sanity instead of Might (your opponent rolls Sanity for defense). If you win, in addition to inflicting damage, you may move the defender 1 tile away.","combat-stat":"sanity","combat-mod":{"stats":["sanity"],"type":"move","flat":1}},"resets": 0,"stats":{"might":{"steps":[0,1,2,2,3,4,5,5,7],"start":4,"position":4},"speed":{"steps":[0,2,3,3,4,6,6,7,7],"start":5,"position":5},"sanity":{"steps":[0,3,4,5,5,6,7,7,8],"start":5,"position":5},"knowledge":{"steps":[0,1,3,3,4,5,6,6,8],"start":4,"position":4}}},"4":{"id":4,"color":"purple","name":"Avrixis Mizzrym","race":"Drow","class":"Ranger","age":436,"special":{"name":"Hunter's Mark","description":"Start the game with the square Hunter's Mark token. Once during your turn, you may place that token under an opponent within line of sight to add 1 to the result of your attack rolls against that opponent. The token is returned when the opponent is killed.","combat-bonus-flat":1,"token":{"name":"Hunter's Mark","count":1,"consumed":false,"target":"enemy"}},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,6,6,7],"start":3,"position":3},"speed":{"steps":[0,4,4,4,5,6,7,7,8],"start":5,"position":5},"sanity":{"steps":[0,1,2,3,4,5,5,5,7],"start":3,"position":3},"knowledge":{"steps":[0,2,3,3,4,5,5,5,7],"start":3,"position":3}}},"5":{"id":5,"color":"blue","name":"Gretchen Titchwillow","race":"Halfling","class":"Druid","age":112,"special":{"name":"Wild Shape","description":"Once per game, during your turn you can choose one wild shape:","options":[{"name":"Badger","stats":{"might":2,"sanity":-1}},{"name":"Mouse","stats":{"speed":2,"knowledge":-1}},{"name":"Owl","stats":{"knowledge":2,"might":-1}},{"name":"Tortoise","stats":{"sanity":2,"speed":-1}}]},"resets": 0,"stats":{"might":{"steps":[0,3,4,4,4,4,5,6,8],"start":3,"position":3},"speed":{"steps":[0,2,3,4,4,4,5,6,8],"start":4,"position":4},"sanity":{"steps":[0,1,1,2,4,4,4,5,6],"start":5,"position":5},"knowledge":{"steps":[0,2,3,3,4,4,5,6,8],"start":3,"position":3}}},"6":{"id":6,"color":"blue","name":"Tasha Brightbottle","race":"Halfling","class":"Rogue","age":175,"special":{"name":"Cunning Action","description":"Opponents don't slow your movement."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,3,4,5,6,7],"start":4,"position":4},"speed":{"steps":[0,3,4,5,5,6,6,7,7],"start":3,"position":3},"sanity":{"steps":[0,1,2,3,4,5,5,6,7],"start":3,"position":3},"knowledge":{"steps":[0,2,3,4,4,5,6,6,6],"start":4,"position":4}}},"7":{"id":7,"color":"white","name":"\"Grim\" Grusk Mugtug","race":"Half-Orc","class":"Paladin","age":60,"special":{"name":"Devotion","description":"Once during your turn, you may treat an event tile as if it didn't have an event symbol {event}, allowing you to skip drawing the card and continue moving after you discover that tile."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,5,5,6],"start":4,"position":4},"speed":{"steps":[0,2,3,3,5,5,6,6,7],"start":3,"position":3},"sanity":{"steps":[0,4,4,4,5,6,7,8,8],"start":3,"position":3},"knowledge":{"steps":[0,1,3,4,4,4,5,6,6],"start":4,"position":4}}},"8":{"id":8,"color":"white","name":"Vort Dormall","race":"Half-Orc","class":"Cleric","age":25,"special":{"name":"Healing Word","description":"Start the game with 2 square Healing Word tokens. Once during your turn, you may discard a Healing Word token to choose an adventurer on your tile (yourself included). They gain 1 in a trait that is below its starting value.","token":{"name":"Healing Word","count":2,"consumed":true,"target":"ally"}},"resets": 0,"stats":{"might":{"steps":[0,3,3,3,4,5,6,7,8],"start":3,"position":3},"speed":{"steps":[0,3,3,4,5,6,6,7,8],"start":3,"position":3},"sanity":{"steps":[0,3,3,3,4,5,6,6,6],"start":3,"position":3},"knowledge":{"steps":[0,2,3,3,4,5,6,7,8],"start":5,"position":5}}},"9":{"id":9,"color":"green","name":"Miska Silversong","race":"Human","class":"Bard","age":31,"special":{"name":"Bardic Inspiration","description":"Start the game with the square Bardic Inspiration token. During your turn, you may give the token to another adventurer within 3 tiles of you. They can return the token to you to add 1 to the result of a non-haunt roll during their turn. Return the token automatically when they are killed.","token":{"name":"Bardic Inspiration","count":1,"consumed":false,"target":"ally"}},"resets": 0,"stats":{"might":{"steps":[0,1,2,3,4,5,5,6,6],"start":3,"position":3},"speed":{"steps":[0,2,2,4,4,5,5,6,6],"start":4,"position":4},"sanity":{"steps":[0,1,3,3,4,5,5,6,7],"start":3,"position":3},"knowledge":{"steps":[0,4,5,5,5,5,6,7,8],"start":5,"position":5}}},"10":{"id":10,"color":"green","name":"Azadeh Rashka","race":"Human","class":"Monk","age":42,"special":{"name":"Flurry of Blows","description":"After resolving your attack during your turn, you may roll 1 die. If you roll a 0, take 1 point of physical damage. Otherwise, deal that much physical damage to the same defender. They do not roll defense for this additional damage.","combat-mod":{"stats":["sanity","knowledge","might","speed"],"type":"list","when":"after-combat","outcomes":{"0":{"type":"damage","target":"self","flat":1},"1":{"type":"damage","target":"defender","flat":1},"2":{"type":"damage","target":"defender","flat":2}}}},"resets": 0,"stats":{"might":{"steps":[0,2,2,3,3,4,4,6,7],"start":4,"position":4},"speed":{"steps":[0,4,4,4,4,5,6,8,8],"start":4,"position":4},"sanity":{"steps":[0,3,4,5,5,6,6,7,8],"start":3,"position":3},"knowledge":{"steps":[0,1,2,3,4,4,5,5,5],"start":3,"position":3}}},"11":{"id":11,"color":"red","name":"Dhadius the Scarlet","race":"Human","class":"Wizard","age":55,"special":{"name":"Magic Missile","description":"When you attack, you may use Knowledge instead of Might (your opponent rolls Knowledge for defense). If you do, you may attack any character within 1 tile. If you lose against a character not on your tile, you take no damage.","combat-stat":"knowledge","combat-mod":{"stats":["knowledge"],"type":"range","flat":1}},"resets": 0,"stats":{"might":{"steps":[0,2,2,2,4,4,5,6,6],"start":3,"position":3},"speed":{"steps":[0,3,4,4,4,4,6,7,8],"start":4,"position":4},"sanity":{"steps":[0,4,4,4,5,6,7,8,8],"start":3,"position":3},"knowledge":{"steps":[0,4,5,5,5,5,6,6,7],"start":4,"position":4}}},"12":{"id":12,"color":"red","name":"Ralvio Escanor","race":"Human","class":"Sorcerer","age":75,"special":{"name":"Wild Magic","description":"When you attack, you may use Knowledge or Sanity instead of Might (your opponent rolls that same trait for defense). If you do, roll 1 die. If you roll a blank, subtract 1 from your attack result.","combat-stat":"sanity","combat-mod":{"stats":["sanity","knowledge"],"type":"chance","when":"blank","flat":-1}},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,5,6,8],"start":3,"position":3},"speed":{"steps":[0,3,3,3,4,6,6,7,7],"start":4,"position":4},"sanity":{"steps":[0,3,4,4,4,5,6,6,7],"start":4,"position":4},"knowledge":{"steps":[0,3,4,4,5,6,7,7,8],"start":3,"position":3}}}};

const state = {
  defaultCharacters: JSON.parse(JSON.stringify(defaultCharacters)),
  characters: JSON.parse(JSON.stringify(defaultCharacters)),
  statInfo: {
    speed: {
      name: "Speed",
      short: "SPD",
      id: "speed",
      color: "red"
    },
    might: {
      name: "Might",
      short: "MGT",
      id: "might",
      color: "orange"
    },
    sanity: {
      name: "Sanity",
      short: "SAN",
      id: "sanity",
      color: "blue"
    },
    knowledge: {
      name: "Knowl.",
      short: "KNW",
      id: "knowledge",
      color: "green"
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
})