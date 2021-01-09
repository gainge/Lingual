import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'

import { connect } from 'react-redux'

import ListContainer from './../components/ListContainer'
import GibFAB from '../components/GibFAB';
import Page from '../components/Page';
import LingualModal from '../components/LingualModal';
import ListCreation from '../components/ListCreation';

import { showModal, hideModal, addList } from '../store/Actions'

import { uuid } from '../util/UUID'
import { TOPICS, TOOLS, VOCAB, TEST } from '../util/Constants'
import List from '../model/List'
import TabBar from '../components/TabBar';
import ListDataDisplay from '../components/ListDataDisplay';
import AppStyles from '../styles/AppStyles';

const COLORS = [
  AppStyles.color.alternateMid,
  AppStyles.color.alternateNeutral,
  AppStyles.color.alternateLight,
]

class ListOverViewScreen extends Component {
  constructor(props) {
    super(props);

    const tabs = [
      { label: TOPICS },
      { label: TOOLS },
      { label: VOCAB },
    ]

    this.state = {
      tabs: tabs,
      datasets: props.datasets,
      activeTabIndex: 0,
    }
  }

  _onSelectTab = (tabIndex) => {
    let newActiveTab = tabIndex;

    this.props.navigation.setParams({ backgroundColor: COLORS[tabIndex] });

    this.setState({ activeTabIndex: newActiveTab });
  }

  _onSelectListItem = (itemIndex) => {
    // Navigate to list screen, providing the selected list ID and model type?
    // I guess we pass in the label or something?
    const currentList = this.state.datasets[this.state.activeTabIndex][itemIndex];

    this.props.navigation.navigate('List', { list: currentList, modelType: this._getCurrentListType(), backgroundColor: COLORS[this.state.activeTabIndex] });
  }

  _onAddItem = () => {
    console.log('Heyo, you tryna add my guy?');
  }

  _getCurrentListType = () => {
    return this.state.tabs[this.state.activeTabIndex].label;
  }

  _renderItem = (list) => {
    return <ListDataDisplay title={list.title} items={list.items} />
  }

  render() {
    return (
      <Page>
        <TabBar tabs={this.state.tabs} activeTab={this.state.activeTabIndex} onSelectTab={this._onSelectTab} />
        <ListContainer
          onSelect={this._onSelectListItem}
          onAddItem={this._onAddItem}
          listData={this.state.datasets[this.state.activeTabIndex]}
          renderItem={this._renderItem}
        />
      </Page>
    )
  }
}


class OldListOverViewScreen extends Component {
  _showModal = () => {
    this.props.showModal();
  }

  _hideModal = () => {
    this.props.hideModal();
  }

  _addList = (listName) => {
    // Validate list
    // Call dispatch prop homie
    // that's totally not always going to be dispatch
    // And could definitely be anything because this component is contextless
    if (!listName) {
      return;
    }

    // Otherwise we have to make a model object and use the dispatch dude
    const date = new Date().getTime();
    const id = uuid();

    const newList = new List(id, listName, date);

    // TODO: investigate proptypes warning on adding list?

    // Actually update some state, how about
    this.props.addList(newList);
    this._hideModal();
  }

  _onSelectList = (index) => {
    // Select list
    // This is where it would be good to structure things by ID
    // I think that we can work on refactoring that later / in a bit
    const selectedList = this.props.lists[index];

    // this.props.navigation.navigate('List', {list: selectedList})
    Alert.alert('TO BE IMPLEMENTED BUT IT GON BE FREE DW BB');

    // Time to set selected and navigate?
    // Hmmmm, actually maybe we shouldn't be handling the navigation?
    // Actually maybe we should lol
  }


  render() {
    return (
      <Page>
        <ListContainer lists={this.props.lists} onSelect={this._onSelectList} />
        <GibFAB
          onPress={this._showModal}
        />

        <LingualModal
          isVisible={this.props.modalShown}
          onClose={this._hideModal}
        >
          <ListCreation
            onSubmit={this._addList}
          />

        </LingualModal>
      </Page>
    )
  }
}


const mapStateToProps = state => ({
  datasets: [
    state.topics,
    state.tools,
    state.vocab,
  ],

  lists: state.lists,
  modalShown: state.modalShown,
})

const mapDispatchToProps = {
  // TODO: add dispatch actions for like, adding and editing stuff
  // but that's a little bit more mid-term for where we're at right now
  // how about we just focus on getting things rendered.

  showModal,
  hideModal,
  addList,
}

let ListOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(ListOverViewScreen)


export default class ListOverview extends Component {
  render() {
    return (
      <ListOverviewContainer navigation={this.props.navigation} />
    )
  }
}
