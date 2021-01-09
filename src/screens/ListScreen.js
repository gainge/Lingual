import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet } from 'react-native'

import ListContainer from '../components/ListContainer';
import Page from '../components/Page';

import { TOPICS, TOOLS, VOCAB } from '../util/Constants'
import TopicListItem from '../components/TopicListItem';
import ToolListItem from '../components/ToolListItem';
import VocabListItem from '../components/VocabListItem';
import AppStyles from '../styles/AppStyles';

export default class ListScreen extends Component {
  constructor(props) {
    super(props);

    const list = this.props.navigation.getParam('list');
    const modelType = this.props.navigation.getParam('modelType');


    this.state = {
      list: list,
      modelType: modelType,
    }
  }

  _renderItem = (item) => {
    // This is where we need to reflect on the model type, yeah?
    switch (this.state.modelType) {
      case TOPICS:
        return <TopicListItem topic={item} />
      case TOOLS:
        return <ToolListItem tool={item} />
      case VOCAB:
        return <VocabListItem vocab={item} />
      default:
        return <Text>I have no idea what this is</Text>
    }
  }

  render() {
    return (
      <Page style={{backgroundColor: AppStyles.color.activeTab}}>
        <ListContainer
          listData={this.state.list.items}
          renderItem={this._renderItem}
          itemContainerStyle={[styles.generalItemContainer, styles[this.state.modelType]]}
        />
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  generalItemContainer: {
    marginVertical: 2,
    elevation: 1,
    marginHorizontal: 5,
    borderRadius: 3,
  },
  [TOPICS]: {
    backgroundColor: AppStyles.color.alternateMid,
  },
  [TOOLS]: {
    backgroundColor: AppStyles.color.alternateNeutral,
  },
  [VOCAB]: {
    backgroundColor: AppStyles.color.alternateLight,
  },

})
