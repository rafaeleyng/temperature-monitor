import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
} from 'react-native'

const ScreenTitle = ({ text }) => (
  <View >
    <Text>{text}</Text>
  </View>
)

ScreenTitle.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ScreenTitle
