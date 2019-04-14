import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import CreateDeck from './CreateDeck'
import DeckOverview from './DeckOverview'
import DeckList from './DeckList'
import CreateCard from './CreateCard'
import Quiz from './Quiz'
import { white, heavygreen, lightgreen } from '../utils/colors'

const HomeTabNavigator = createMaterialTopTabNavigator({
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        title: 'My Decks',
      },
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        title: 'Create Decks',
      },
    },
  },{
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: lightgreen,
    },
    style: {
      backgroundColor: heavygreen,
    }
  }
})

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: heavygreen,
      height: 60,
    },
    headerTintColor: white,
    headerForceInset: { top: 'never', bottom: 'never' }
  }
}

const StackNavigator = createStackNavigator({
  Home: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null
    },
  },
  DeckOverview: {
    screen: DeckOverview,
    ...navigationOptions,
  },
  CreateCard: {
    screen: CreateCard,
    ...navigationOptions,
  },
  Quiz: {
    screen: Quiz,
    ...navigationOptions,
  },
},{})

export default createAppContainer(StackNavigator)
