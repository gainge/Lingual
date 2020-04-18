import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ListItem from './ListItem'
import GibFAB from './GibFAB'



export default class ListContainer extends Component {
  _keyExtractor = (item, index) => {
    return `${item.id}-${index}`;
  }

  _onSelect = (itemIndex) => {
    if (this.props.onSelect) {
      this.props.onSelect(itemIndex);
    }
  }

  _onAddItem = () => {
    if (this.props.onAddItem) {
      this.props.onAddItem();
    }
  }

  _renderItem = (item) => {
    let listItem = item.item;
    let index = item.index;
    // TODO: still have to have callback for edit and delete I guess
    return <ListItem content={this.props.renderItem(listItem)} onSelect={() => this._onSelect(index)} />
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <FlatList
          data={this.props.listData}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <GibFAB
          style={[this.props.FABStyle]}
          onPress={() => this._onAddItem()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

ListContainer.propTypes = {
  listData: PropTypes.array.isRequired,
}

