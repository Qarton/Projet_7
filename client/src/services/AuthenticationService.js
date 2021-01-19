import Api from '@/services/api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  index (userId) {
    return Api().get(`user/${userId}`)
  },
  delete (userId) {
    return Api().delete(`user/${userId}`)
  }
}
