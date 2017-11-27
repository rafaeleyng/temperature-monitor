import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Button,
  TextInput,
} from 'react-native'

const SensorInput = ({
  style,
  value,
  onChangeText,
  onPressButton,
}) => (
  <View style={style}>
    <TextInput
      placeholder="Sensor id"
      style={{
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
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
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPressButton: PropTypes.func.isRequired,
}

SensorInput.defaultProps = {
  style: {},
}

export default SensorInput
