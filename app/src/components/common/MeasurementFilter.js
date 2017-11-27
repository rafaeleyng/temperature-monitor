import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Button,
  TextInput,
} from 'react-native'

import styles from '../../styles'

const SensorInput = ({
  value,
  onChangeText,
  onPressButton,
}) => (
  <View style={styles.measurementFilter}>
    <TextInput
      placeholder="Sensor id"
      style={{
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
      }}
      onChangeText={onChangeText}
      value={value}
    />
    <Button
      style={{ width: 200 }}
      onPress={onPressButton}
      title="Submit"
    />
  </View>
)

SensorInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPressButton: PropTypes.func.isRequired,
}

export default SensorInput
