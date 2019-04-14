import React from 'react'
import { AsyncStorage } from 'react-native'
import { Constants, Notifications, Permissions } from 'expo'
import { View, StatusBar } from 'react-native'

const FLASHCARD_NOTIFICATION_KEY = 'MobileFlashcards:Notifications'

export function MyStatusBar({backgroundColor,...props}){
    return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARD_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'THAT QUIZ-QUIZ! - BROWN, Chris',
    body: "Don't forget your quiz today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARD_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            AsyncStorage.setItem(FLASHCARD_NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}