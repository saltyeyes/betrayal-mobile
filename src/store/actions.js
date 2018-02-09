export const updateCharacterStat  = ({ commit }, payload) => {
  commit('UPDATE_CHARACTER_STAT', payload)
}

export const increaseStat  = ({ commit }, payload) => { 
  commit('INCREASE_STAT', payload)
}

export const decreaseStat  = ({ commit }, payload) => { 
  commit('DECREASE_STAT', payload)
}

export const resetCharacter  = ({ commit }, payload) => { 
  commit('RESET_CHARACTER', payload)
}

export const updateChosenSpecialOption  = ({ commit }, payload) => { 
  commit('UPDATE_CHOSEN_SPECIAL_OPTION', payload)
}

export const updateSelectedOmen  = ({ commit }, payload) => { 
  commit('UPDATE_SELECTED_OMEN', payload)
}

export const updateSelectedTile  = ({ commit }, payload) => { 
  commit('UPDATE_SELECTED_TILE', payload)
}