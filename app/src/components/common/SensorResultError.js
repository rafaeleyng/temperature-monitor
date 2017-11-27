import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
} from 'react-native'

const SensorResultError = ({
  sensorId,
  style,
}) => (
  <View style={style}>
    <Text>{`Couldn't get data for sensor ${sensorId}`}</Text>
  </View>
)

SensorResultError.propTypes = {
  sensorId: PropTypes.string.isRequired,
  style: PropTypes.object,
}

SensorResultError.defaultProps = {
  style: {},
}

export default SensorResultError
