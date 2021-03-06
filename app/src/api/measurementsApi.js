import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

class MeasurementsApi {
  last(sensorId) {
    return axios.get(`${API_URL}/measurements/last/${sensorId}`)
      .then(res => res.data.data)
  }

  period(sensorId, fromEpoch, toEpoch) {
    return axios.get(`${API_URL}/measurements/period/${sensorId}?from=${fromEpoch}&to=${toEpoch}`)
      .then(res => res.data.data)
  }
}

export default new MeasurementsApi()
