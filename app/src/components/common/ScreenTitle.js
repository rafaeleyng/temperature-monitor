import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
} from 'react-native'

import styles from '../../styles'

const ScreenTitle = ({ text }) => (
  <View>
    <Text
      style={styles.screenTitle}
    >
      {text}
    </Text>
  </View>
)

ScreenTitle.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ScreenTitle
