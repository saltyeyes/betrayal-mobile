export const UPDATE_CHARACTER_STAT = (state, {characterId, statId, delta}) => {
  var stat = state.characters[characterId.toString()].stats[statId];
  if (stat.position + delta < 0) {
    return false;
  } else if (stat.position + delta >= stat.steps.length) {
    return false;
  } else {
    stat.position += delta;
    return true;
  }
}

export const INCREASE_STAT = (state, {characterId, statId}) => {
  return UPDATE_CHARACTER_STAT(state, {characterId, statId, delta: 1});
}

export const DECREASE_STAT = (state, {characterId, statId}) => {
  return UPDATE_CHARACTER_STAT(state, {characterId, statId, delta: -1});
}

export const RESET_CHARACTER = (state, {characterId}) => {
  var character = state.characters[characterId.toString()]
  var stats = character.stats
  // var defaultStats = JSON.parse(JSON.stringify(state.defaultCharacters[characterId.toString()].stats))
  for (var stat in stats) {
    stats[stat]['position'] = stats[stat]['start']
  }
  if (character.special.options && typeof character.special.chosen != "undefined") {
    character.special.chosen = -1;
  }
  character.resets += 1
}

export const UPDATE_CHOSEN_SPECIAL_OPTION = (state, {characterId, optionId}) => {
  var character = state.characters[characterId.toString()]
  character.special.chosen = optionId
}

export const UPDATE_SELECTED_OMEN = (state, {omenId}) => {
  state.hauntTable.selectedOmen = omenId;
}

export const UPDATE_SELECTED_TILE = (state, {tileId}) => {
  state.hauntTable.selectedTile = tileId;
}