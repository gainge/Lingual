
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Tooltip } from 'react-native-elements';

import List from '../model/List';

import ListDataDisplay from './ListDataDisplay'

export default class ListItem extends Component {


  _onMenuPress = () => {

  }

  render() {

    let content = this.props.content;

    // Optionally wrap content in touchable opacity based on onSelect callback
    if (this.props.onSelect) {
      content = (
        <TouchableOpacity activeOpacity={0.3} onPress={this.props.onSelect} >
          {content}
        </TouchableOpacity>
      )
    }

    // Return list item component
    return (
      <View style={[styles.itemContainer, this.props.style]}>
        {/* <View style={styles.iconContainer}>
          <Icon
            name="dots-vertical"
            type="material-community"
            size={25}
            onPress={this._onMenuPress}
          />
        </View> */}
        <View style={styles.dataContainer}>
          {content}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  iconContainer: {
    alignSelf: 'center',
  },
  dataContainer: {
    flex: 1,
    marginLeft: 10,
  },
})



ListItem.propTypes = {
  // list: PropTypes.instanceOf(List)
}


