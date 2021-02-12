import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet } from 'react-native'

import ListContainer from '../components/ListContainer';
import Page from '../components/Page';

import { TOPICS, TOOLS, VOCAB } from '../util/Constants'
import TopicListItem from '../components/TopicListItem';
import ToolListItem from '../components/ToolListItem';
import VocabListItem from '../components/VocabListItem';
import GibFAB from '../components/GibFAB';
import AppStyles from '../styles/AppStyles';
import LingualModal from '../components/LingualModal';

export default class ListScreen extends Component {
  constructor(props) {
    super(props);

    const list = this.props.navigation.getParam('list');
    const modelType = this.props.navigation.getParam('modelType');
    const modalShown = false;


    this.state = {
      list: list,
      modelType: modelType,
      modalShown: modalShown,
    }
  }



  _showModal = () => {
    this.setState({ modalShown: true });
  }
  // TODO: pass more params to specify action...
  // ACTUALLY we don't even need to do that, because the state is kept here!
  // And the modal will have all the data packaged and ready to go for us
  // extract modal to it's own component
  // it can handle all the data bundling for us
  // just need to give it this method as a callback for the add
  // actually important to distinguish 'adding' (a modal button action)
  // vs "clicking the add FAB", which just allows data entry
  _onAddItem = () => {
    this._showModal();
  }

  // TODO: this is where we also would show the modal for adding an item
  // because this is where the state for the model type is kept...
  // ye


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
        <GibFAB
          style={[this.props.FABStyle]}
          onPress={() => this._onAddItem()}
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
