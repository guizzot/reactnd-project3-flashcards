import React from 'react'
import { View,Text, StyleSheet } from 'react-native'

const CountCards = (props) => {
  const { qty } = props

  return (
    <View style={styles.container}>
        <Text style={styles.zeroCards}>
          {qty === 0 && `0 cards! Create new cards for this deck!`}
        </Text>
        <Text> 
          {qty === 1 && `1 card`}
        </Text>
        <Text>
          {qty > 1 && `${qty} cards`}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontSize: 16
  },
  zeroCards : {
    color: 'red',
    fontWeight: 'bold'
  }
})

export default CountCards
