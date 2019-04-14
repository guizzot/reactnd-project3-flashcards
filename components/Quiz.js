import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightgrey, grey, heavygreen, black, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: `Quiz ${navigation.state.params.deck.title}`,
    }
  }

  state = {
    rightAnswers: 0,
    cardIndex: 0,
    showAnswer: false,
    finished: false,
  }

  showAnswer = () => {
    this.setState(() => ({
      showAnswer: true,
    }))
  }

  correctAnswer = () => {
    this.setState((state) => ({
      rightAnswers: state.rightAnswers + 1,
    }))
    this.nextCard()
  }

  nextCard = () => {
    if(this.state.cardIndex === this.props.cardsQty - 1){
      this.setState(() => ({
        finished: true,
      }))
      clearLocalNotification().then(setLocalNotification)
    } else {
      this.setState((state) => ({
        showAnswer: false,
        cardIndex: state.cardIndex + 1,
      }))
    }
  }

  restartQuiz = () => {
    this.setState(() => ({
      rightAnswers: 0,
      cardIndex: 0,
      showAnswer: false,
      finished: false,
    }))
  }

  render() {
    const { cards, cardSequence, cardsQty } = this.props
    const { cardIndex, showAnswer, rightAnswers, finished } = this.state
    const currentCardId = cardSequence[cardIndex]

    if(finished) {
      return (
        <ScrollView style={styles.container}>
          <Text style={[styles.title, { color: white }]}>Result</Text>
          <Text style={styles.cardCount}>Your points {rightAnswers} of {cardsQty}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.button]}>
              <Text style={styles.buttonText}>Back To Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.restartQuiz()} style={[styles.button]}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.cardCount}>Card {cardIndex + 1} of {cardsQty}</Text>
        </View>

        {showAnswer === false ?
          <View>
            <View style={styles.card}>
              <Text style={styles.title}>Question</Text>
              <Text style={styles.question}>{cards[currentCardId].question}</Text>
            </View>
            <TouchableOpacity onPress={() => this.showAnswer()} style={[styles.button]}>
              <Text style={styles.buttonText}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        : <View>
            <View style={styles.card}>
              <Text style={styles.title}>Correct answer?</Text>
              <Text style={styles.answer}>{cards[currentCardId].answer}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => this.nextCard()} style={[styles.button, {backgroundColor:red}]}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.correctAnswer()} style={[styles.button]}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: grey
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: white,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    backgroundColor: white,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderColor: black,
    borderWidth: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    color: heavygreen,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1
  },
  button: {
    backgroundColor: heavygreen,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 25
  },
  answer: {
    fontSize: 25
  }
})

function mapStateToProps ({decks, cards}, {navigation}) {
  const {deck} = navigation.state.params
  const deckCards = cards[deck.title]
  const cardSequence = deckCards ? Object.keys(deckCards).sort(function(a, b){return 0.5 - Math.random()}) : null
  const cardsQty = cardSequence.length
  return {
    deck: decks[deck.title],
    cards: deckCards,
    cardsQty,
    cardSequence,
  }
}

export default connect(mapStateToProps)(Quiz)
