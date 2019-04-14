import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, black, lightgrey } from '../utils/colors'
import CountCards from './CountCards'

class DeckListItem extends React.Component {
  navigateTo = (deck, cardsQty) => {
    this.props.navigation.navigate('DeckOverview', {deck, cardsQty})
  }

  render() {
    const { deck, cardsQty } = this.props

    return (
      <TouchableOpacity onPress={() => this.navigateTo(deck,cardsQty)}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckName}>{deck.title}</Text>
          <CountCards qty={cardsQty} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    backgroundColor: white,
    padding: 10,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 4,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: black,
    shadowOffset: {
        width: 0,
        height: 3,
    }
  },
  deckName: {
    fontSize: 25,
    color: lightgrey,
    fontWeight: 'bold',
  },
})

function mapStateToProps ({cards}, {deck}) {
  const deckCards = cards[deck.title]
  const cardsQty = deckCards ? Object.keys(deckCards).length : 0
  return {
    cardsQty
  }
}

export default connect(mapStateToProps)(withNavigation(DeckListItem))
