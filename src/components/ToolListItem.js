import React from 'react'
import { View, Text } from 'react-native'

const ToolListItem = (props) => {
  return (
    <View>
      <Text>{props.tool.title}</Text>
    </View>
  )
}

export default ToolListItem

