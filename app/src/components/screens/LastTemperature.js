import React, { Component } from 'react'

import {
  StatusBar,
  Text,
  View,
} from 'react-native'

import moment from 'moment'

import Loader from '../common/Loader'
import MeasurementFilter from '../common/MeasurementFilter'
import ScreenTitle from '../common/ScreenTitle'
import SensorResultError from '../common/SensorResultError'
import SensorResultPlaceholder from '../common/SensorResultPlaceholder'

import measurementsApi from '../../api/measurementsApi'
import styles from '../../styles/index'
import COMPONENT_STATUS from '../../constants/componentStatus'

export default class LastTemperature extends Component {
  static navigationOptions = {
    drawerLabel: 'Current temperature',
  }

  state = {
    sensorId: '',
    status: COMPONENT_STATUS.EMPTY,
    data: null,
  }

  getData = () => {
    const { sensorId } = this.state

    this.setState({ status: COMPONENT_STATUS.LOADING })

    return measurementsApi
      .last(sensorId)
      .then((data) => {
        if (!data) {
          throw new Error(`No data for sensor ${sensorId}`)
        }
        return data
      })
      .then(data => this.setState({ status: COMPONENT_STATUS.SUCCESS, data }))
      .catch((err) => {
        console.log('Error while getting data', err) // eslint-disable-line no-console
        this.setState({ status: COMPONENT_STATUS.ERROR })
      })
  }

  handleChangeText = (sensorId) => {
    this.setState({ sensorId, status: COMPONENT_STATUS.EMPTY })
  }

  handlePressButton = () => {
    if (!this.state.sensorId) {
      return
    }
    this.getData()
  }

  renderPlaceholder = () => (<SensorResultPlaceholder />)
  renderError = () => (<SensorResultError sensorId={this.state.sensorId} />)
  renderLoader = () => (<Loader />)

  renderResult() {
    const { data, sensorId } = this.state
    const { temperature, timestamp } = data
    const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')

    return (
      <View>
        <Text
          style={styles.subtitleText}
        >
          {`Last temperature for sensor ${sensorId}`}
        </Text>
        <Text
          style={styles.bigText}
          onPress={this.getData}
        >
          {`${temperature} C°`}
        </Text>
        <Text
          style={styles.subtitleText}
        >
          {`Measured on ${date}`}
        </Text>
      </View>
    )
  }

  render() {
    const { status } = this.state

    let content
    if (status === COMPONENT_STATUS.EMPTY) {
      content = this.renderPlaceholder()
    } else if (status === COMPONENT_STATUS.LOADING) {
      content = this.renderLoader()
    } else if (status === COMPONENT_STATUS.SUCCESS) {
      content = this.renderResult()
    } else if (status === COMPONENT_STATUS.ERROR) {
      content = this.renderError()
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden />
        <ScreenTitle text={LastTemperature.navigationOptions.drawerLabel} />
        <MeasurementFilter
          value={this.state.sensorId}
          onChangeText={this.handleChangeText}
          onPressButton={this.handlePressButton}
        />
        {content}
      </View>
    )
  }
}
