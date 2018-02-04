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