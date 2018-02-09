import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

var defaultCharacters = {"1":{"id":1,"color":"yellow","displayColor":"amber","name":"Torskar Stonecleaver","race":"Dwarf","class":"Barbarian","age":130,"special":{"name":"Reckless Attack","description":"When you attack, you may roll 2 additional dice (maximum of 8 dice). If you do, after resolving the attack, take 1 die of physical damage.","combat-mod":{"stats":["might","speed","knowledge","sanity"],"type":"attack","flat":2}},"resets": 0,"stats":{"might":{"steps":[0,4,5,5,6,6,7,8,8],"start":3,"position":3,"extra":0},"speed":{"steps":[0,2,2,2,3,4,5,5,6],"start":5,"position":5,"extra":0},"sanity":{"steps":[0,2,2,3,4,5,5,6,7],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,2,2,3,3,5,5,6,6],"start":3,"position":3,"extra":0}}},"2":{"id":2,"color":"yellow","displayColor":"amber","name":"Aldan Pyrite","race":"Dwarf","class":"Fighter","age":318,"special":{"name":"Protection","description":"When an adventurer, monster, or NPC on your tile would take any damage, you may choose to take the damage instead."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,6,6,7],"start":4,"position":4,"extra":0},"speed":{"steps":[0,3,4,4,4,5,6,7,8],"start":3,"position":3,"extra":0},"sanity":{"steps":[0,3,3,3,4,5,6,7,8],"start":4,"position":4,"extra":0},"knowledge":{"steps":[0,1,3,3,5,5,6,6,7],"start":3,"position":3,"extra":0}}},"3":{"id":3,"color":"purple","displayColor":"purple","name":"Lia Faen Tlabbar","race":"Drow","class":"Warlock","age":254,"special":{"name":"Eldritch Blast","description":"When you attack, you may use Sanity instead of Might (your opponent rolls Sanity for defense). If you win, in addition to inflicting damage, you may move the defender 1 tile away.","combat-stat":"sanity","combat-mod":{"stats":["sanity"],"type":"move","flat":1}},"resets": 0,"stats":{"might":{"steps":[0,1,2,2,3,4,5,5,7],"start":4,"position":4,"extra":0},"speed":{"steps":[0,2,3,3,4,6,6,7,7],"start":5,"position":5,"extra":0},"sanity":{"steps":[0,3,4,5,5,6,7,7,8],"start":5,"position":5,"extra":0},"knowledge":{"steps":[0,1,3,3,4,5,6,6,8],"start":4,"position":4,"extra":0}}},"4":{"id":4,"color":"purple","displayColor":"purple","name":"Avrixis Mizzrym","race":"Drow","class":"Ranger","age":436,"special":{"name":"Hunter's Mark","description":"Start the game with the square Hunter's Mark token. Once during your turn, you may place that token under an opponent within line of sight to add 1 to the result of your attack rolls against that opponent. The token is returned when the opponent is killed.","combat-bonus-flat":1,"token":{"name":"Hunter's Mark","count":1,"consumed":false,"target":"enemy"}},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,6,6,7],"start":3,"position":3,"extra":0},"speed":{"steps":[0,4,4,4,5,6,7,7,8],"start":5,"position":5,"extra":0},"sanity":{"steps":[0,1,2,3,4,5,5,5,7],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,2,3,3,4,5,5,5,7],"start":3,"position":3,"extra":0}}},"5":{"id":5,"color":"blue","displayColor":"blue","name":"Gretchen Titchwillow","race":"Halfling","class":"Druid","age":112,"special":{"name":"Wild Shape","description":"Once per game, during your turn you can choose one wild shape:","chosen":-1,"options":[{"name":"Badger","stats":{"might":2,"sanity":-1}},{"name":"Mouse","stats":{"speed":2,"knowledge":-1}},{"name":"Owl","stats":{"knowledge":2,"might":-1}},{"name":"Tortoise","stats":{"sanity":2,"speed":-1}}]},"resets": 0,"stats":{"might":{"steps":[0,3,4,4,4,4,5,6,8],"start":3,"position":3,"extra":0},"speed":{"steps":[0,2,3,4,4,4,5,6,8],"start":4,"position":4,"extra":0},"sanity":{"steps":[0,1,1,2,4,4,4,5,6],"start":5,"position":5,"extra":0},"knowledge":{"steps":[0,2,3,3,4,4,5,6,8],"start":3,"position":3,"extra":0}}},"6":{"id":6,"color":"blue","displayColor":"blue","name":"Tasha Brightbottle","race":"Halfling","class":"Rogue","age":175,"special":{"name":"Cunning Action","description":"Opponents don't slow your movement."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,3,4,5,6,7],"start":4,"position":4,"extra":0},"speed":{"steps":[0,3,4,5,5,6,6,7,7],"start":3,"position":3,"extra":0},"sanity":{"steps":[0,1,2,3,4,5,5,6,7],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,2,3,4,4,5,6,6,6],"start":4,"position":4,"extra":0}}},"7":{"id":7,"color":"white","displayColor":"gray","name":"\"Grim\" Grusk Mugtug","race":"Half-Orc","class":"Paladin","age":60,"special":{"name":"Devotion","description":"Once during your turn, you may treat an event tile as if it didn't have an event symbol {event}, allowing you to skip drawing the card and continue moving after you discover that tile."},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,5,5,6],"start":4,"position":4,"extra":0},"speed":{"steps":[0,2,3,3,5,5,6,6,7],"start":3,"position":3,"extra":0},"sanity":{"steps":[0,4,4,4,5,6,7,8,8],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,1,3,4,4,4,5,6,6],"start":4,"position":4,"extra":0}}},"8":{"id":8,"color":"white","displayColor":"gray","name":"Vort Dormall","race":"Half-Orc","class":"Cleric","age":25,"special":{"name":"Healing Word","description":"Start the game with 2 square Healing Word tokens. Once during your turn, you may discard a Healing Word token to choose an adventurer on your tile (yourself included). They gain 1 in a trait that is below its starting value.","token":{"name":"Healing Word","count":2,"consumed":true,"target":"ally"}},"resets": 0,"stats":{"might":{"steps":[0,3,3,3,4,5,6,7,8],"start":3,"position":3,"extra":0},"speed":{"steps":[0,3,3,4,5,6,6,7,8],"start":3,"position":3,"extra":0},"sanity":{"steps":[0,3,3,3,4,5,6,6,6],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,2,3,3,4,5,6,7,8],"start":5,"position":5,"extra":0}}},"9":{"id":9,"color":"green","displayColor":"green","name":"Miska Silversong","race":"Human","class":"Bard","age":31,"special":{"name":"Bardic Inspiration","description":"Start the game with the square Bardic Inspiration token. During your turn, you may give the token to another adventurer within 3 tiles of you. They can return the token to you to add 1 to the result of a non-haunt roll during their turn. Return the token automatically when they are killed.","token":{"name":"Bardic Inspiration","count":1,"consumed":false,"target":"ally"}},"resets": 0,"stats":{"might":{"steps":[0,1,2,3,4,5,5,6,6],"start":3,"position":3,"extra":0},"speed":{"steps":[0,2,2,4,4,5,5,6,6],"start":4,"position":4,"extra":0},"sanity":{"steps":[0,1,3,3,4,5,5,6,7],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,4,5,5,5,5,6,7,8],"start":5,"position":5,"extra":0}}},"10":{"id":10,"color":"green","displayColor":"green","name":"Azadeh Rashka","race":"Human","class":"Monk","age":42,"special":{"name":"Flurry of Blows","description":"After resolving your attack during your turn, you may roll 1 die. If you roll a 0, take 1 point of physical damage. Otherwise, deal that much physical damage to the same defender. They do not roll defense for this additional damage.","combat-mod":{"stats":["sanity","knowledge","might","speed"],"type":"list","when":"after-combat","outcomes":{"0":{"type":"damage","target":"self","flat":1},"1":{"type":"damage","target":"defender","flat":1},"2":{"type":"damage","target":"defender","flat":2}}}},"resets": 0,"stats":{"might":{"steps":[0,2,2,3,3,4,4,6,7],"start":4,"position":4,"extra":0},"speed":{"steps":[0,4,4,4,4,5,6,8,8],"start":4,"position":4,"extra":0},"sanity":{"steps":[0,3,4,5,5,6,6,7,8],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,1,2,3,4,4,5,5,5],"start":3,"position":3,"extra":0}}},"11":{"id":11,"color":"red","displayColor":"red","name":"Dhadius the Scarlet","race":"Human","class":"Wizard","age":55,"special":{"name":"Magic Missile","description":"When you attack, you may use Knowledge instead of Might (your opponent rolls Knowledge for defense). If you do, you may attack any character within 1 tile. If you lose against a character not on your tile, you take no damage.","combat-stat":"knowledge","combat-mod":{"stats":["knowledge"],"type":"range","flat":1}},"resets": 0,"stats":{"might":{"steps":[0,2,2,2,4,4,5,6,6],"start":3,"position":3,"extra":0},"speed":{"steps":[0,3,4,4,4,4,6,7,8],"start":4,"position":4,"extra":0},"sanity":{"steps":[0,4,4,4,5,6,7,8,8],"start":3,"position":3,"extra":0},"knowledge":{"steps":[0,4,5,5,5,5,6,6,7],"start":4,"position":4,"extra":0}}},"12":{"id":12,"color":"red","displayColor":"red","name":"Ralvio Escanor","race":"Human","class":"Sorcerer","age":75,"special":{"name":"Wild Magic","description":"When you attack, you may use Knowledge or Sanity instead of Might (your opponent rolls that same trait for defense). If you do, roll 1 die. If you roll a blank, subtract 1 from your attack result.","combat-stat":"sanity","combat-mod":{"stats":["sanity","knowledge"],"type":"chance","when":"blank","flat":-1}},"resets": 0,"stats":{"might":{"steps":[0,2,3,3,4,5,5,6,8],"start":3,"position":3,"extra":0},"speed":{"steps":[0,3,3,3,4,6,6,7,7],"start":4,"position":4,"extra":0},"sanity":{"steps":[0,3,4,4,4,5,6,6,7],"start":4,"position":4,"extra":0},"knowledge":{"steps":[0,3,4,4,5,6,7,7,8],"start":3,"position":3,"extra":0}}}};

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
      name: "Knowledge",
      short: "KNW",
      id: "knowledge",
      color: "green"
    }
  },
  hauntTable: {
    omens: ["Berserker Axe", "Book of Spells", "Cursed Armor", "Deck of Many Things", "Dimensional Shackles", "Eye of Vecna", "Figurine of Wondrous Power", "Homunculus", "Iron Flask of Tuerny", "Meenlock", "Pipes of Haunting", "Symbol of Bhaal", "Whispering Skull"],
    tiles: ["Arcane Retreat", "Beast's Lair", "Cursed Statue", "Executioner's Block", "Gladiator Pit", "Haunted Alley", "House of Blood", "Kobold Hideout", "Murder Row", "Neglected Shrine", "Sacrificial Chamber", "Shrine to Bhaal", "Shrine to Gargauth"],
    table: [
      [12, 28, 13, 50, 11, 41, 41, 25, 13, 28, 31, 28, 19],
      [12,  8,  5, 50,  3,  3,  5,  5,  8, 43, 23,  4, 19],
      [ 2, 39, 48, 43, 14, 21, 48, 48,  2, 48, 38, 22, 24],
      [14, 42, 16, 47, 14, 30,  2, 32, 16,  2, 31, 16, 42],
      [ 9,  7, 41, 17, 11, 21,  7, 45, 29,  4,  1, 22, 17],
      [27, 42, 13, 43, 14, 30, 45, 27, 13, 27, 31, 27, 20],
      [18, 45, 26, 43, 33, 30, 26, 18, 40, 18, 26, 18, 24],
      [ 9, 39, 15, 15,  3,  3,  7, 32, 29, 35,  1, 15, 17],
      [20, 37, 20, 45, 33, 37, 37,  4, 20, 38, 38, 38, 24],
      [ 6, 39, 10, 47,  6, 21, 10, 32, 36,  6, 31, 22, 10],
      [ 9, 39, 35, 47,  1, 21, 36, 25, 29, 35, 23, 22, 19],
      [12, 49, 35, 50, 11, 21, 49, 25, 49, 25, 23, 49, 36],
      [34, 46, 44, 46, 33, 44, 42, 44, 40, 44, 34, 46, 34]
    ],
    selectedOmen: null,
    selectedTile: null
  },
  haunts: {
    info: {1:{"id":1,"name":"Do Beholders Dream of Electric Eye Rays?","author":"Ben Petrisor","style":"multiple","traitor":[{"style":"icon","icon":"fighter","text":"Aldan Pyrite _(fighter)_"},{"style":"stat","stat":"knowledge","text":"lowest Knowledge"}]},2:{"id":2,"name":"Glurk Rises","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},3:{"id":3,"name":"Hulking Vengeance","author":"Adam Lee","style":"cooperative","traitor":["None"]},4:{"id":4,"name":"Troll Hunt!","author":"Ben Petrisor","style":"cooperative","traitor":["None"]},5:{"id":5,"name":"Labyrinth","author":"Chris Dupuis","style":"stat","traitor":[{"style":"stat","stat":"knowledge","text":"lowest Knowledge"}]},6:{"id":6,"name":"The Gulthias Tree","author":"Christ Tulach & Kat Kruger","style":"multiple","traitor":[{"style":"icon","icon":"druid","text":"Gretchen Titchwillow _(druid)_"},{"style":"stat","stat":"sanity","text":"lowest Sanity"}]},7:{"id":7,"name":"Tonight's Special: Brains!","author":"Adam Lee","style":"stat","traitor":[{"style":"stat","stat":"sanity","text":"lowest Sanity"}]},8:{"id":8,"name":"Staking you Claim","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},9:{"id":9,"name":"Alone Against the Dead","author":"Adam Lee","style":"one-hero","traitor":["Each adventurer except for the haunt revealer"]},10:{"id":10,"name":"Rabble Rousers","author":"Mike Mearls","style":"normal","traitor":["Haunt revealer"]},11:{"id":11,"name":"You'll have the House Slaad with that","author":"Sam Simpson","style":"multiple","traitor":[{"style":"icon","icon":"wizard","text":"Dhadius the Scarlet _(wizard)_"},{"style":"stat","stat":"sanity","text":"lowest Sanity"}]},12:{"id":12,"name":"Blackrazor","author":"Bart Carroll","style":"normal","traitor":["Haunt revealer"]},13:{"id":13,"name":"Juiblex Commands","author":"Chris Dupuis","style":"normal","traitor":["Haunt revealer"]},14:{"id":14,"name":"The Battle For Baldur's Gate","author":"Mike Mearls","style":"cooperative","traitor":["None"]},15:{"id":15,"name":"Vermin Sweep","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},16:{"id":16,"name":"Need a Hand?","author":"Mike Mearls","style":"cooperative","traitor":["None"]},17:{"id":17,"name":"An Eye in the Sky","author":"Mike Mearls","style":"multiple","traitor":[{"style":"icon","icon":"warlock","text":"Lia Faen Tlabbar _(warlock)_"},"haunt revealer"]},18:{"id":18,"name":"Rats on a Pier","author":"Chris Dupuis","style":"multiple","traitor":[{"style":"icon","icon":"wererat","text":"The adventurer with the Wererat event card"},"haunt revealer"]},19:{"id":19,"name":"Thick as Thieves","author":"David Mcdarby","style":"hidden","traitor":["Hidden traitor"]},20:{"id":20,"name":"They Hide Among Us","author":"Chris Dupuis","style":"stat","traitor":[{"style":"stat","stat":"speed","text":"lowest Speed"}]},21:{"id":21,"name":"Priscilla","author":"Adam Lee","style":"multiple","traitor":[{"style":"icon","icon":"ranger","text":"Avrixis Mizzrym _(ranger)_"},{"style":"stat","stat":"speed","text":"highest Speed"}]},22:{"id":22,"name":"Battle of the Bhaalspawn","author":"Adam Lee","style":"all-traitors","traitor":["Everyone"]},23:{"id":23,"name":"The Piper of Bhaal","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},24:{"id":24,"name":"A Pufflebird in the Hand...","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},25:{"id":25,"name":"For the Glory of Tyr","author":"Dan Fairchild & Diane Molinari","style":"stat","traitor":[{"style":"stat","stat":"knowledge","text":"lowest Knowledge"}]},26:{"id":26,"name":"Call of the Draakhorn","author":"Ben Petrisor","style":"normal","traitor":["Haunt revealer"]},27:{"id":27,"name":"Ravenloft Calls","author":"Mike Mearls","style":"future-traitor","traitor":["None yet..."]},28:{"id":28,"name":"The Mad Wizards","author":"Adam Lee","style":"cooperative","traitor":["None"]},29:{"id":29,"name":"Bottle Lightning","author":"Adam Lee","style":"normal","traitor":["Haunt revealer"]},30:{"id":30,"name":"Darkness Falls","author":"Chris Dupuis","style":"cooperative","traitor":["None"]},31:{"id":31,"name":"Pipes of the Banshee","author":"Christ Dupuis","style":"normal","traitor":["Oldest adventurer, except for the haunt revealer"]},32:{"id":32,"name":"Sphere of Annihilation","author":"Chris Dupuis","style":"normal","traitor":["Haunt revealer"]},33:{"id":33,"name":"The Will of Yeenoghu","author":"Ben Petrisor","style":"multiple","traitor":[{"style":"icon","icon":"barbarian","text":"Torskar Stonecleaver _(barbarian)_"},{"style":"stat","stat":"sanity","text":"lowest Sanity"}]},34:{"id":34,"name":"Two Heads are Worse than One","author":"Ben Petrisor","style":"future-traitor","traitor":["None yet..."]},35:{"id":35,"name":"A Mother's Fury","author":"Dan Fairchild & Diane Molinari","style":"cooperative","traitor":["None"]},36:{"id":36,"name":"The Big Score","author":"Adam Lee","style":"future-traitor","traitor":["None yet..."]},37:{"id":37,"name":"A Killer Among Us","author":"Chris Dupuis","style":"hidden","traitor":["Hidden traitor"]},38:{"id":38,"name":"Fire in the Sky","author":"Chris Dupuis","style":"cooperative","traitor":["None"]},39:{"id":39,"name":"The Death Curse","author":"Chris Dupuis","style":"multiple","traitor":[{"style":"icon","icon":"monk","text":"Azadeh Rashka _(monk)_"},"haunt revealer"]},40:{"id":40,"name":"Infernal Machine","author":"Bart Carroll","style":"normal","traitor":["Haunt revealer"]},41:{"id":41,"name":"Hail Olhydra!","author":"Bart Carroll","style":"normal","traitor":["Haunt revealer"]},42:{"id":42,"name":"Rust Monsters to the Rescue!","author":"Bart Carroll","style":"multiple","traitor":[{"style":"icon","icon":"bard","text":"Miska Silversong _(bard)_"},{"style":"stat","stat":"knowledge","text":"lowest Knowledge"}]},43:{"id":43,"name":"Stickleback","author":"Adam Lee","style":"multiple","traitor":[{"style":"icon","icon":"paladin","text":"\"Grim\" Grusk Mugtug _(paladin)_"},{"style":"stat","stat":"might","text":"highest Might"}]},44:{"id":44,"name":"By the Light of the Pale Moon","author":"Adam Lee","style":"future-traitor","traitor":["None yet..."]},45:{"id":45,"name":"Forever Mead","author":"Michael Dunlap","style":"multiple","traitor":[{"style":"icon","icon":"sorcerer","text":"Ralvio Escanor _(sorcerer)_"},{"style":"stat","stat":"might","text":"lowest Might"}]},46:{"id":46,"name":"Master of Illusion","author":"Chis Tulach & Kat Kruger","style":"stat","traitor":[{"style":"stat","stat":"knowledge","text":"lowest Knowledge"}]},47:{"id":47,"name":"The Mark of Baphomet","author":"Tyson Moyer","style":"multiple","traitor":[{"style":"icon","icon":"cleric","text":"Vort Dormall _(cleric)_"},{"style":"stat","stat":"might","text":"lowest Might"}]},48:{"id":48,"name":"Demon Slayers","author":"Michael Dunlap","style":"cooperative","traitor":["None"]},49:{"id":49,"name":"The Dark Light of Bhaal","author":"Kim Lundstrom","style":"normal","traitor":["Haunt revealer"]},50:{"id":50,"name":"Down to the Wire","author":"Noah Millrod","style":"multiple","traitor":[{"style":"icon","icon":"rogue","text":"Tasha Brightbottle _(rogue)_ unless she is the haunt revealer"},{"style":"direction","direction":"left","text":"left of the haunt revealer"}]}}
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
})