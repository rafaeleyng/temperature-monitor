const axios = require('axios')

const { API_URL } = process.env

class SubscriptionsApi {
  subscribe(sensorId, chatId) {
    return axios.post(`${API_URL}/telegram-subscriptions/subscribe/${sensorId}/${chatId}`)
      .then(res => res.data.data)
  }

  unsubscribe(sensorId, chatId) {
    return axios.post(`${API_URL}/telegram-subscriptions/unsubscribe/${sensorId}/${chatId}`)
      .then(res => res.data.data)
  }
}

module.exports = new SubscriptionsApi()
