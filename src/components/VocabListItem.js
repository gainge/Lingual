import React from 'react'
import { View, Text } from 'react-native'

const VocabListItem = (props) => {
  return (
    <View>
      <Text>{props.vocab.term}   |   {props.vocab.definition}</Text>
    </View>
  )
}

export default VocabListItem
