import React from 'react'
import { DrawerNavigator } from 'react-navigation'

import LastTemperature from './screens/LastTemperature'
import PeriodTemperature from './screens/PeriodTemperature'

const AppNavigator = DrawerNavigator({
  LastTemperature: { screen: LastTemperature },
  PeriodTemperature: { screen: PeriodTemperature },
})

export default () => <AppNavigator />
