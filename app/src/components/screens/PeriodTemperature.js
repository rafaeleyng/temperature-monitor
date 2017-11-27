import React, { Component } from 'react'

import {
  StatusBar,
  View,
} from 'react-native'

import {
  VictoryAxis,
  VictoryScatter,
  VictoryTheme,
  VictoryLine,
  VictoryChart,
} from 'victory-native'

import moment from 'moment'

import Loader from '../common/Loader'
import MeasurementFilter from '../common/MeasurementFilter'
import ScreenTitle from '../common/ScreenTitle'
import SensorResultError from '../common/SensorResultError'
import SensorResultPlaceholder from '../common/SensorResultPlaceholder'

import measurementsApi from '../../api/measurementsApi'
import styles from '../../styles/index'
import COMPONENT_STATUS from '../../constants/componentStatus'

export default class PeriodTemperature extends Component {
  static navigationOptions = {
    drawerLabel: 'Periods temperature',
  }

  state = {
    sensorId: '',
    status: COMPONENT_STATUS.EMPTY,
    data: null,
  }

  getData = () => {
    const { sensorId } = this.state
    const fromEpoch = (new Date()).setHours(new Date().getHours() - 1)
    const toEpoch = new Date().valueOf()

    this.setState({ status: COMPONENT_STATUS.LOADING })

    return measurementsApi
      .period(sensorId, fromEpoch, toEpoch)
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
    const { data } = this.state
    const temperatureList = data.map(t => ({
      x: moment(t.timestamp).format('DD/MM - hh:mm'),
      y: t.temperature,
    }))

    return (
      <View>
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domain={{ y: [0, 40] }}
        >
          <VictoryLine
            style={{ data: { stroke: 'rgba(75, 192, 192, 1)' } }}
            data={temperatureList}
          />
          <VictoryScatter
            style={{ data: { fill: 'rgba(75, 192, 192, 1)' } }}
            data={temperatureList}
            size={2}
          />
          <VictoryAxis
            tickCount={2}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
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
        <ScreenTitle text={PeriodTemperature.navigationOptions.drawerLabel} />
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
