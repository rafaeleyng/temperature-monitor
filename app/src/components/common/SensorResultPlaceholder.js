import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
} from 'react-native'

const SensorResultPlaceholder = ({
  style,
}) => (
  <View style={style}>
    <Text>Fill the filter above to get measurements information</Text>
  </View>
)

SensorResultPlaceholder.propTypes = {
  style: PropTypes.object,
}

SensorResultPlaceholder.defaultProps = {
  style: {},
}

export default SensorResultPlaceholder
