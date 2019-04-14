import {
  GET_CARDS,
  INSERT_CARD,
} from '../actions/cards'

export default function cards(state = {}, action) {
  switch(action.type){
    case GET_CARDS:
      return {
        ...action.cards,
      }
    case INSERT_CARD:
      return {
        ...state,
        [action.card.title]: {
          ...state[action.card.title],
          [action.card.id]: action.card
        },
      }
    default:
      return state
  }
}
