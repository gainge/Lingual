
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

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
  static propTypes = {
    submitEnabled: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LingualModal
        isVisible={this.props.isVisible}
      >
        <View>
          {this.props.children}
          <View style={styles.buttonContainer}>
            <ModalButton
              title={Strings.cancelButtonText}
              titleStyle={styles.cancelButtonTitleStyle}
              containerStyle={styles.cancelButtonContainer}
              buttonStyle={styles.cancelButton}
              onPress={this.props.onCancel}
            />
            <ModalButton
              title={Strings.submitButtonText}
              disabled={!this.props.submitEnabled}
              containerStyle={styles.submitButtonContainer}
              buttonStyle={styles.submitButton}
              onPress={this.props.onSubmit}
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

    marginTop: 40,
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

