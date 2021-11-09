
import React, { Component } from 'react'
import { Text, View, StyleSheet, Keyboard } from 'react-native'
import { Input } from 'react-native-elements'

import Strings from '../../assets/data/Strings'
import BasicFormModal from './BasicFormModal'

export default class NewListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: ''
   }
  }

  _onSubmit = () => {
    Keyboard.dismiss();
    // This is where we'd invoke the storage callback thing p sure
    // NO
    // DO IT IN THE HOSTING COMPONENT
    // THAT WAY WE CAN MAKE THE SUBMIT BEHAVIOR SWAPPABLE
    // RE-USE FOR ADD AND EDIT
    // all caps lock no chill
    console.log(`submitting ${this.state.listName}`);
    // this.props.onSubmit();
  }

  _onCancel = () => {
    console.log('cancellin?');
    this.props.onCancel();
  }

  _fieldsAreFiled = () => {
    return this.state.listName !== '';
  }

  render() {
    return (
      <View>
        <BasicFormModal
          isVisible={this.props.isVisible}
          submitEnabled={this._fieldsAreFiled()}
          onSubmit={this._onSubmit}
          onCancel={this._onCancel}
        >
          <Input
            label={Strings.newListNamePrompt}
            value={this.state.listName}
            onChangeText={(text) => this.setState({listName: text})}
            containerStyle={styles.inputContainer}
          />
        </BasicFormModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 0,
  },
})
