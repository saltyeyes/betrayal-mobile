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
  var stats = state.characters[characterId.toString()].stats
  var defaultStats = JSON.parse(JSON.stringify(state.defaultCharacters[characterId.toString()].stats))
  for (var stat in stats) {
    stats[stat]['position'] = stats[stat]['start']
  }
  state.characters[characterId].resets += 1
}