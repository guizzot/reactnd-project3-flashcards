import React from 'react'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/cards'
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { heavygreen, black, grey, white } from '../utils/colors'

class CreateCard extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Creating your New Card!',
    }
  }

  state = {
    submitted: false,
    question: '',
    answer: '',
  }

  handleInsert = (e) => {
    this.props.dispatch(handleAddCard(
      this.props.navigation.state.params.title,
      this.state.question,
      this.state.answer,
    ))

    this.setState(() => ({
      submitted: true,
      question: '',
      answer: ''
    }))

    this.props.navigation.goBack()
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          style={styles.input}
          placeholder="Input your Question"
        />
        <TextInput
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          style={styles.input}
          placeholder="Now, input the corresponding response"
        />
        <TouchableOpacity onPress={this.handleInsert} style={styles.button}>
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
})

export default connect()(CreateCard)
