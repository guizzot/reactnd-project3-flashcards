import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middlewares'
import { StyleSheet, View } from 'react-native'
import { MyStatusBar,setLocalNotification } from './utils/helpers'
import Navigator from './components/Navigator'
import { lightgreen } from './utils/colors'

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MyStatusBar backgroundColor={lightgreen} barStyle='light-content' />
          <Navigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
