const axios = require('axios')

const { API_URL } = process.env

class RangesApi {
  last(sensorId) {
    return axios.get(`${API_URL}/ranges/last/${sensorId}`)
      .then(res => res.data.data)
  }

  submit(sensorId, min, max) {
    return axios.post(`${API_URL}/ranges/submit/${sensorId}`, { min, max })
      .then(res => res.data.data)
  }
}

module.exports = new RangesApi()
