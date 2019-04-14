import {
  getAllDecks,
  insertNewDeck
} from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const INSERT_DECK = 'INSERT_DECK'

function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

function insertDeck (deck) {
  return {
    type: INSERT_DECK,
    deck,
  }
}

export function handleGetDecks () {
  return (dispatch) => {
    return getAllDecks()
            .then((decks) => {
              dispatch(getDecks(decks))
            })
  }
}

export function handleAddDeck (title) {
  return (dispatch) => {
    const data = {
      title: title
    }

    return insertNewDeck(data)
            .then(() => 
              dispatch(insertDeck(data))
            )
  }
}