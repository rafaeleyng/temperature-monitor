const axios = require('axios')

const { API_URL } = process.env

class SettingsApi {
  submit(key, value) {
    return axios.post(`${API_URL}/settings/submit`, { key, value })
      .then(res => res.data.data)
  }
}

module.exports = new SettingsApi()
