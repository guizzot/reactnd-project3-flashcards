import {
  getAllCards,
  insertNewCard
} from '../utils/api'

export const GET_CARDS = 'GET_CARDS'
export const INSERT_CARD = 'INSERT_CARD'

function getCards (cards) {
  return {
    type: GET_CARDS,
    cards
  }
}

function insertCard (card) {
  return {
    type: INSERT_CARD,
    card,
  }
}

export function handleGetCards () {
  return (dispatch) => {
    return getAllCards()
            .then((cards) => {
              dispatch(getCards(cards))
            })
            .catch(error => console.warn(error))
  }
}

export function handleAddCard (title, question, answer) {
  return (dispatch) => {
    const data = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 15),
      title,
      question,
      answer,
    }

    insertNewCard(data)
      .then(() => 
        dispatch(insertCard(data))
      )
      .catch(error => console.warn(error))
  }
}
