
import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import Strings from '../../assets/data/Strings'
import AppStyles from '../styles/AppStyles';
import HorizontalRule from './HorizontalRule';

import LingualModal from './LingualModal'


const ModalButton = (props) => {
  return (
    <Button
      {...props}
      containerStyle={[styles.sharedButtonContainerStyle, props.containerStyle]}
      buttonStyle={[styles.sharedButtonStyle, props.buttonStyle]}
    />
  )

}

export default class BasicFormModal extends Component {

  constructor(props) {
    super(props);

    const isVisible = props.isVisible

    this.state = {
      isVisible: isVisible
    }
  }

  render() {
    return (
      <LingualModal
        isVisible={this.state.isVisible}
      >
        <View>
          {this.props.children}
          <View style={styles.buttonContainer}>
            <ModalButton
              title={Strings.cancelButtonText}
              titleStyle={styles.cancelButtonTitleStyle}
              containerStyle={styles.cancelButtonContainer}
              buttonStyle={styles.cancelButton}
              onPress={this._onSubmit}
            />
            <ModalButton
              title={Strings.submitButtonText}
              disabled={!this.props.submitEnabled}
              containerStyle={styles.submitButtonContainer}
              buttonStyle={styles.submitButton}
              onPress={this._onSubmit}
            />
          </View>
        </View>
      </LingualModal>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,
  },
  sharedButtonContainerStyle: {

  },
  sharedButtonStyle: {
    paddingHorizontal: 40,
  },

  cancelButtonContainer: {

  },
  cancelButtonTitleStyle: {
    color: AppStyles.color.error,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: AppStyles.color.error,
  },
  submitButtonContainer: {

  },
  submitButton: {
    backgroundColor: AppStyles.color.secondary,
  }
})

