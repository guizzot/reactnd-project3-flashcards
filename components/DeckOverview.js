import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import CountCards from './CountCards'
import { heavygreen, lightgreen, white, grey, lightgrey } from '../utils/colors'

class DeckOverview extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title,
    }
  }

  startQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck})
  }

  newCard = (title) => {
    this.props.navigation.navigate('CreateCard', {title})
  }

  render() {
    const { deck, cardsQty } = this.props

    return (
      <ScrollView style={styles.container}>
        <View style={styles.deckContainer}>
          <CountCards qty={cardsQty} />
        </View>

        {cardsQty > 0 &&
          <TouchableOpacity 
            onPress={() => this.startQuiz(deck)} 
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => this.newCard(deck.title)} style={[styles.button]}>
          <Text style={styles.buttonText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: grey
  },
  deckContainer: {
    backgroundColor: white,
    color:lightgrey,
    padding: 10,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 4,
  },
  button: {
    backgroundColor: heavygreen,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

function mapStateToProps ({decks, cards}, {navigation}) {
  const title = navigation.state.params.deck.title
  const deckCards = cards[title]
  const cardsQty = deckCards ? Object.keys(deckCards).length : 0
  return {
    deck: decks[title],
    cardsQty,
  }
}

export default connect(mapStateToProps)(DeckOverview)
