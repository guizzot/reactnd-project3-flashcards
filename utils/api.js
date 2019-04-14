import { AsyncStorage } from 'react-native'

const FLASHCARD_CARDS_STORAGE_KEY = 'MobileFlashcards:Cards'
const FLASHCARD_DECKS_STORAGE_KEY = 'MobileFlashcards:Decks'

export function getAllDecks () {
  return AsyncStorage.getItem(FLASHCARD_DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function insertNewDeck (deck) {
  return AsyncStorage.mergeItem(FLASHCARD_DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function getAllCards () {
  return AsyncStorage.getItem(FLASHCARD_CARDS_STORAGE_KEY)
    .then(JSON.parse)
}

export function insertNewCard (card) {
  return AsyncStorage.getItem(FLASHCARD_CARDS_STORAGE_KEY)
  .then(data => {
    const currentCards = JSON.parse(data)

    //if doesn't exists, need merge
    if(currentCards === null || !currentCards[card.title]){
      AsyncStorage.mergeItem(FLASHCARD_CARDS_STORAGE_KEY, JSON.stringify({
        [card.title]: {
          [card.id]:card
        }
      }))
    } else {
      
      AsyncStorage.setItem(FLASHCARD_CARDS_STORAGE_KEY, JSON.stringify({
        ...currentCards,
        [card.title]: {
          ...currentCards[card.title],
          [card.id]: card
        },
      }
    ))
    }
  })
}
