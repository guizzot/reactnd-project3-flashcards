import React from 'react'
import { connect } from 'react-redux'
import DeckListItem from '../components/DeckListItem'
import { handleGetDecks } from '../actions/decks'
import { handleGetCards } from '../actions/cards'
import { ScrollView, View, StyleSheet } from 'react-native'
import { grey } from '../utils/colors'

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleGetDecks())
    dispatch(handleGetCards())
  }

  render() {
    const { decks } = this.props
    return (
      <ScrollView style={styles.container}>
          <View style={styles.deck}>
            {Object.keys(decks).map((title) => (
              <DeckListItem key={title} deck={decks[title]} />
            ))}
          </View> 
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: grey
  },
  deck : {
    padding:10
  }
})

function mapStateToProps ({decks}) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckList)
