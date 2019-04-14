import React from 'react'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { grey, white, black, heavygreen } from '../utils/colors'

class CreateDeck extends React.Component {
  state = {
    title: '',
    submitedFlag: false,
  }

  handleSubmit = (e) => {
    this.props.dispatch(handleAddDeck(
      this.state.title
    )).then(result => {
      this.props.navigation.navigate('DeckOverview', { deck: result.deck, cardsQty:0 })
    })

    this.setState(() => ({
      title: '',
      submitedFlag: true,
    }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          style={styles.input}
          placeholder="Deck Name"
        />
        <TouchableOpacity onPress={this.handleSubmit} style={[styles.button]}>
          <Text style={styles.buttonText}>Create</Text>
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
  input: {
    borderColor: black,
    color:black,
    backgroundColor: white,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: heavygreen,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default connect()(CreateDeck)
