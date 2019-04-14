import {
  GET_DECKS,
  INSERT_DECK
} from '../actions/decks'

export default function decks(state = {}, action) {
  switch(action.type){
    case GET_DECKS:
      return {
        ...action.decks
      }
    case INSERT_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck,
      }
    default:
      return state
  }
}